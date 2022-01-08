<?php
	//
	// Contrôleur de la connexion et la gestion de la base de données SQL.
	//
	namespace Portfolio\Controllers;

	include_once($_SERVER["DOCUMENT_ROOT"] . "/portfolio/include/models/database.php");

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
	class PublicData extends Connector
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
			// On tranforme la liste numérique en chaîne de caractère
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
	class AdminManager extends Connector
	{
		//
		// Permet de créer la structure HTML qui représente toutes les tables
		//	présentes dans la base de données du site.
		//
		public function getHTMLTables(): string
		{
			$html = "";
			$tables = $this->connector->query("SHOW TABLES;")->fetchAll();

			foreach ($tables as $value)
			{
				$name = $value["Tables_in_portfolio"];
				$html .= <<<LI
					<li>
						<input type="submit" name="show" value="$name" />
					</li>\n
				LI;
			}

			return $html;
		}

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

			foreach ($fields as $key => $value)
			{
				$parameters .= $value . " = ?";

				if ($key < $length)
				{
					// Seul le dernier paramètre ne possède pas de délimiteur.
					$parameters .= ", ";
				}
			}

			// Récupération de la valeur initiale avant modification.
			$where_data = $this->connector->query("SELECT * FROM `$table` LIMIT 1 OFFSET $identifier;")->fetch();

			$where_field = array_key_first($where_data);	// Nom de la première colonne.
			$where_value = $where_data[$where_field];		// Valeur de la première colonbne.

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
			$where_value = $where_data[$where_field];		// Valeur de la première colonbne.

			// Exécution de la requête de suppression.
			$query = $this->connector->prepare("DELETE FROM `$table` WHERE $where_field = ?;");
			$query->execute([$where_value]);
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

			// On effectue enfin l'action à réaliser.
			if ($type == "add")
			{
				// Insertion d'une ligne.
				$this->insertRow($table, $fields, $values);
			}
			elseif ($type == "update")
			{
				// Mise à jour d'une ligne.
				$this->updateRow($identifier, $table, $fields, $values);
			}
			elseif ($type == "remove")
			{
				// Suppression d'une ligne.
				$this->deleteRow($identifier, $table);
			}
		}
	}
?>