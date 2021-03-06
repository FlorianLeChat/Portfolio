<?php
	//
	// Contrôleur de la connexion et la gestion de la base de données SQL.
	//
	namespace Portfolio\Controllers;

	require_once(__DIR__ . "/../models/database.php");

	use PDO;
	use Portfolio\Models\Form;
	use Portfolio\Models\Database;

	// Classe permettant d'établir la liaison avec la base de données.
	class Connector extends Database
	{
		public function __construct()
		{
			// On indique les informations de connexions.
			$link = sprintf("mysql:host=%s;dbname=%s;charset=%s;port=%s", $this->getHost(), $this->getDatabase(), $this->getCharset(), $this->getPort());
			$options = [
				PDO::ATTR_ERRMODE			 	=> PDO::ERRMODE_EXCEPTION,
				PDO::ATTR_DEFAULT_FETCH_MODE	=> PDO::FETCH_ASSOC,
				PDO::ATTR_EMULATE_PREPARES 		=> false,
			];

			// On tente ensuite de créer le connecteur avec les informations renseignés.
			try
			{
				$this->setPDO(new PDO($link, $this->getUsername(), $this->getPassword(), $options));
			}
			catch (\PDOException $error)
			{
				throw new \PDOException($error->getMessage(), (int)$error->getCode());
			}
		}
	}

	// Classe permettant de récupérer les données publiques du site.
	final class PublicData extends Connector
	{
		//
		// Permet d'ajouter un message reçu depuis le formulaire dans la base
		//	de données pour y accéder dans l'interface d'administration.
		//
		public function addFormMessage(Form $data): void
		{
			$query = $this->connector->prepare("INSERT INTO messages (`firstname`, `lastname`, `email`, `subject`, `content`) VALUES (?, ?, ?, ?, ?);");
			$query->execute([$data->getFirstname(), $data->getLastname(), $data->getEmail(), $data->getSubject(), $data->getContent()]);
		}

		//
		// Permet de récupérer des informations les données d'une ou plusieurs
		//	colonnes présentes dans la base de données.
		//
		public function getTableData(string $table, array $columns, bool $offset_start = false): array
		{
			// On transforme la liste numérique en chaîne de caractère
			//	comprise par la base de données via une requête SQL.
			$columns = count($columns) > 1 ? implode(", ", $columns) : $columns[0];

			// On effectue ensuite la requête avec les colonnes demandées.
			$query = $this->connector->prepare("SELECT $columns FROM `$table` ORDER BY `position` ASC;");
			$query->execute();

			$result = $query->fetchAll();

			// On réordonne (si demandé) le résultat de la requête SQL
			// 	pour que l'indice commence à 1 et non pas à 0. Cela peut
			//	être sur certaines opérations arithmétique de base.
			if ($offset_start)
			{
				array_unshift($result, "");	// Décalage de 1.
				unset($result[0]);			// Suppression de l'indice 0.
			}

			return $result;
		}
	}

	// Classe permettant de gérer les données administrateur.
	final class AdminManager extends Connector
	{
		//
		// Permet de filter les données présentes en paramètres POST
		//	afin de récupérer celles liées à un identifiant unique.
		//
		private function filterPostData(string $identifier, array $data): array
		{
			// Filtrage des données par l'identifiant présumé.
			$data = array_filter($data, function($key)
				use (&$identifier) // Utiliser « global $identifier; » me retourne une valeur étrange...
				{
					return str_contains($key, "_$identifier");
				},
			ARRAY_FILTER_USE_KEY);

			// Suppression de l'identifiant sur le nom nom des clés.
			// 	Exemple : "source_string_25" => "source_string".
			foreach ($data as $key => $value)
			{
				// Remplacement du nom de la clé.
				$name = str_replace("_$identifier", "", $key);

				// Ajout d'une nouvelle définition.
				$data[$name] = $value;

				// Suppression de l'ancienne entrée.
				unset($data[$key]);
			}

			return $data;
		}

		//
		// Permet d'effectuer l'insertion d'une ligne quelconque dans
		//	la base de données.
		//
		private function insertRow(string $table, array $fields, array $values): void
		{
			// Génération des champs pour la requête suivante.
			$fields_parameters = implode(", ", $fields);
			$values_parameters = implode(", ", array_fill(0, count($values), "?")); // Résultat : "?, ?, ?, ..."

			// Exécution de la requête d'insertion.
			$query = $this->connector->prepare("INSERT IGNORE INTO `$table` ($fields_parameters) VALUES ($values_parameters);");
			$query->execute($values);
		}

		//
		// Permet de mettre à jour les données actuelles d'une ligne quelconque
		//	dans la base de données.
		//
		private function updateRow(string $identifier, string $table, array $fields, array $values): void
		{
			// Génération du champs pour la requête suivante.
			$length = count($fields) - 1;
			$parameters = "";

			foreach ($fields as $indice => $field)
			{
				$parameters .= $field . " = ?";

				if ($indice < $length)
				{
					// Seul le dernier paramètre ne possède pas de délimiteur.
					$parameters .= ", ";
				}
			}

			// Récupération de la valeur initiale avant modification.
			$where_data = $this->connector->query("SELECT * FROM `$table` LIMIT 1 OFFSET $identifier;")->fetch();

			$where_field = array_key_first($where_data);	// Nom de la première colonne.
			$where_value = $where_data[$where_field];		// Valeur de la première colonne.

			$values[] = $where_value;						// Insertion dans les paramètres de la requête.

			// Exécution de la requête de mise à jour.
			$query = $this->connector->prepare("UPDATE IGNORE `$table` SET $parameters WHERE $where_field = ?;");
			$query->execute($values);
		}

		//
		// Permet de supprimer une ligne quelconque dans la base de données.
		//
		private function deleteRow(string $identifier, string $table): void
		{
			// Récupération de la valeur initiale avant modification.
			$where_data = $this->connector->query("SELECT * FROM `$table` LIMIT 1 OFFSET $identifier;")->fetch();

			$where_field = array_key_first($where_data);	// Nom de la première colonne.
			$where_value = $where_data[$where_field];		// Valeur de la première colonne.

			// Exécution de la requête de suppression.
			$query = $this->connector->prepare("DELETE FROM `$table` WHERE $where_field = ?;");
			$query->execute([$where_value]);
		}

		//
		// Permet de calculer le décalage qui doit être appliqué à la requête SQL
		//	pour afficher toutes les lignes d'une table.
		//
		private function computeOffset(int $count, string $previous_table, string $requested_table, int $offset): int
		{
			// On vérifie si la table précédente est la même que celle demandée.
			if ($previous_table == $requested_table)
			{
				// On calcule alors la prochaine tranche de résultats.
				$next_chunk = $offset + $count;

				// On récupère ensuite le nombre limite de résultats.
				$table_size = $this->connector->query("SELECT COUNT(*) FROM `$requested_table`;")->fetch();
				$table_size = $table_size["COUNT(*)"];

				if ($next_chunk > $table_size)
				{
					// Risque de dépassement du nombre de résultats, on calcule le
					//	nombre restants de résultats. Si cette valeur est nulle, on
					//	procède à une réinitialisation du compteur.
					$left = $table_size - $next_chunk;
					$offset = $left > 0 ? $left : 0;
				}
				else
				{
					// Il reste encore des résultats pour la prochaine tranche, on
					//	continue de procéder à un décalage des résultats.
					$offset = $next_chunk;
				}
			}
			else
			{
				// Dans le cas contraire, on réinitialise ce décalage.
				$offset = 0;
			}

			// On retourne enfin le décalage calculé.
			return $offset;
		}

		//
		// Permet de gérer les demandes de changements dans la base de données.
		//
		public function requestChange(array $identifier, string $table, array $data): void
		{
			// On récupère d'abord les données associées à l'identifiant unique
			//	présumé de la table.
			$identifier = filter_var(array_key_first($identifier), FILTER_SANITIZE_NUMBER_INT);
			$data = $this->filterPostData($identifier, $data);

			// On récupère ensuite le type de modification sur la base de données.
			$type = array_key_last($data);

			unset($data[$type]);

			// On récupère après toutes les clés et les valeurs des données.
			$fields = array_keys($data);
			$values = array_values($data);

			if ($table == "users" && !str_starts_with($values[1], "$2y$"))
			{
				// Si c'est une action dans la table utilisateurs, on vérifie si
				//	le champ de mot passe doit être hashé.
				$values[1] = password_hash($values[1], PASSWORD_DEFAULT);
			}

			// On effectue enfin l'action à réaliser.
			switch ($type)
			{
				// Insertion d'une ligne.
				case "add":
					$this->insertRow($table, $fields, $values);
					break;

				// Mise à jour d'une ligne.
				case "update":
					$this->updateRow($identifier, $table, $fields, $values);
					break;

				// Suppression d'une ligne.
				case "remove":
					$this->deleteRow($identifier, $table);
					break;
			}
		}

		//
		// Permet de créer la structure HTML qui représente toutes les tables
		//	présentes dans la base de données du site.
		//
		public function generateHTMLTables(): string
		{
			$html = "";
			$tables = $this->connector->query("SHOW TABLES;")->fetchAll();
			$database = $this->getDatabase();

			foreach ($tables as $table)
			{
				$name = $table["Tables_in_$database"];
				$html .= "
					<li>
						<input type=\"submit\" name=\"show\" value=\"$name\" />
					</li>
				";
			}

			return $html;
		}

		//
		// Permet de créer la structure HTML des données (lignes et colonnes)
		//	représentatives d'une table SQL.
		//
		public function generateHTMLData(int $count, string $table, bool $needOffset): string
		{
			// On calcule d'abord un décalage pour limiter les résultats afin
			//	d'améliorer les performances d'affichage.
			// 	Note : ce décalage est uniquement appliqué lors d'une visualisation
			//		et non pas pour les autres actions.
			if ($needOffset)
			{
				// La page a demandé le modifier le décalage.
				$offset = $this->computeOffset($count, $_SESSION["selected_table"] ?? "", $table, $_SESSION["table_offset"] ?? 0);
			}
			else
			{
				// Dans le cas contraire, on reprend la dernière tranche.
				$offset = $_SESSION["table_offset"] ?? 0;
			}

			$_SESSION["table_offset"] = $offset;
			$_SESSION["selected_table"] = $table;

			// On exécute les requêtes SQL grâce aux paramètres obtenus précédemment.
			$rows = $this->connector->query("SELECT * FROM $table LIMIT $count OFFSET $offset;")->fetchAll();
			$columns = $this->connector->query("SHOW COLUMNS FROM $table;")->fetchAll();

			// On fabrique après la structure HTML pour l'en-tête de la table.
			$html = "<thead><tr>";

			foreach ($columns as $column)
			{
				$html .= "<th>" . $column["Field"] . "</th>";
			}

			$html .= "<th></th><tr/></thead><tbody>";

			// On fabrique ensuite la structure HTML pour chaque ligne.
			foreach ($rows as $row)
			{
				// Chaque colonne doit être séparé entre elles.
				// 	Note : les noms des champs de saisies sont composés de façon
				//		à pouvoir être identifié indépendamment des autres.
				$html .= "<tr>";
				$identifier = null;

				foreach ($row as $key => $value)
				{
					if ($identifier == null)
					{
						// On met en mémoire l'identifiant unique (présumé) de la
						//	colonne pour l'action du formulaire.
						$identifier = $offset;
					}

					$html .= "<td><textarea name=\"" . $key . "_" . $offset . "\">$value</textarea></td>";
				}

				// Création des actionneurs pour le formulaire.
				$html .= "
						<td>
							<input type=\"submit\" name=\"update_$identifier\" value=\"Éditer\" />
						</td>
						<td>
							<input type=\"submit\" name=\"remove_$identifier\" value=\"Supprimer\" />
						</td>
					</tr>
				";

				$offset++;
			}

			// On fabrique enfin une dernière ligne de champs pour ajouter une
			//	information dans la table.
			$html .= "<tr>";
			$length = count($rows);

			for ($indice = 0; $indice < count($columns); $indice++)
			{
				$html .= "<td><textarea name=\"" . $columns[$indice]["Field"] . "_" . $length . "\"></textarea></td>";
			}

			// Création des actionneurs pour le formulaire.
			$html .= "
					<td>
						<input type=\"submit\" name=\"add_$length\" value=\"Ajouter\" />
					</td>
				</tr>
			</tbody>
			";

			return $html;
		}
	}
?>