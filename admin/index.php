<!DOCTYPE html>

<?php
	// Point d'entrée de l'environnement des scripts.
	include_once($_SERVER["DOCUMENT_ROOT"] . "/portfolio/include/controllers/_main.php");

	// Contrôleur permettant d'authentifier un utilisateur.
	include_once($_SERVER["DOCUMENT_ROOT"] . "/portfolio/include/controllers/user.php");

	$user = new Portfolio\Controllers\UserAuthentication();
	$user->connector = $connector;	// Liaison avec la base de données.

	// On définit la page actuelle.
	$file = "admin";

	// On vérifie si l'utilisateur est connecté.
	if (!$user->isConnected())
	{
		http_response_code(401);
		header("Location: login.php");
		exit();
	}

	// On récupère ensuite toutes les tables présentes dans
	//	la base de données du site.
	$tables_html = "";
	$tables_data = $connector->query("SHOW TABLES;")->fetchAll();

	foreach ($tables_data as $value)
	{
		$name = $value["Tables_in_portfolio"];
		$tables_html .= <<<LI
			<li>
				<input type="submit" name="show" value="$name" />
			</li>\n
		LI;
	}

	// On vérifie après si la requête actuelle est de type POST.
	if ($_SERVER["REQUEST_METHOD"] == "POST")
	{
		// On tente de récupérer la table sélectionnée actuelle.
		// 	Note : lors d'une édition ou d'une suppression, l'information
		//		n'est plus présente en paramètre POST et doit donc être
		//		récupéré dans les données de la SESSION.
		$table = $_POST["show"] ?? $_SESSION["selected_table"] ?? "";

		// On récupère l'identifiant unique présumé de la table avant
		//	d'y récupérer les données associées.
		// 	Note : le numéro se trouve en suffixe du nom de l'action.
		//	Exemple : "add_25", identifiant 25.
		$identifier = array_filter($_POST, function($key)
		{
			return (str_contains($key, "add_") || str_contains($key, "update_") || str_contains($key, "remove_"));
		}, ARRAY_FILTER_USE_KEY);

		if (is_array($identifier) && count($identifier) > 0)
		{
			// On récupère l'identifiant unique présumé de la table avant
			//	d'y récupérer les données associées.
			$identifier = filter_var(array_key_first($identifier), FILTER_SANITIZE_NUMBER_INT);
			$data = array_filter($_POST, function($key)
			{
				global $identifier;
				return str_contains($key, "_$identifier");
			}, ARRAY_FILTER_USE_KEY);

			// On supprime l'identifiant du nom des clés de la table visée.
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

			// On récupère le type de modification sur la base de données.
			$type = array_key_last($data);

			unset($data[$type]);

			// On récupère toutes les clés et les valeurs des données.
			$fields_data = array_keys($data);
			$values_data = array_values($data);

			// On réalise un ajout d'un contenu.
			if ($type == "add")
			{
				// Génération des champs pour la requête suivante.
				$fields_parameters = implode(", ", $fields_data);
				$values_parameters = implode(", ", array_fill(0, count($values_data), "?")); // Résultat : "?, ?, ?, ..."

				// Exécution de la requête d'insertion.
				$query = $connector->prepare("INSERT IGNORE INTO `$table` ($fields_parameters) VALUES ($values_parameters);");
				$query->execute($values_data);
			}
			// On réalise une édition d'un contenu.
			elseif ($type == "update")
			{
				// Génération du champs pour la requête suivante.
				$length = count($fields_data) - 1;
				$parameters = "";

				foreach ($fields_data as $key => $value)
				{
					$parameters .= $value . " = ?";

					if ($key < $length)
					{
						// Seul le dernier paramètre ne possède pas de délimiteur.
						$parameters .= ", ";
					}
				}

				// Récupération de la valeur initiale avant modification.
				$where_data = $connector->query("SELECT * FROM `$table` LIMIT 1 OFFSET $identifier;")->fetch();

				$where_field = array_key_first($where_data);	// Nom de la première colonne.
				$where_value = $where_data[$where_field];		// Valeur de la première colonbne.

				$values_data[] = $where_value;					// Insertion dans les paramètres de la requête.

				// Exécution de la requête de mise à jour.
				$query = $connector->prepare("UPDATE IGNORE `$table` SET $parameters WHERE $where_field = ?;");
				$query->execute($values_data);
			}
			// On réalise la suppression d'un contenu.
			elseif ($type == "remove")
			{
				// Récupération de la valeur initiale avant modification.
				$where_data = $connector->query("SELECT * FROM `$table` LIMIT 1 OFFSET $identifier;")->fetch();

				$where_field = array_key_first($where_data);	// Nom de la première colonne.
				$where_value = $where_data[$where_field];		// Valeur de la première colonbne.

				// Exécution de la requête de suppression.
				$query = $connector->prepare("DELETE FROM `$table` WHERE $where_field = ?;");
				$query->execute([$where_value]);
			}
		}

		// On réalise l'affichage d'un contenu.
		//	Note : cette action se réalisera automatique après un ajout,
		//		une édition ou une suppression d'un contenu.
		if (isset($table))
		{
			// On récupère toutes les colonnes et les lignes de la table.
			//	Note : on limite le nombre de récupération à 25 pour éviter
			//		les problèmes de performances.
			$offset = $_SESSION["table_offset"] ?? 0;

			if ($table == $_SESSION["selected_table"] ?? "")
			{
				// Augmentation du décalage des résultats si la table sélectionnée
				//	et la même que lors de la dernière requête.
				$offset += 25;
			}
			else
			{
				// Dans le cas contraire, on réinitialise ce décalage.
				$offset = 0;
			}

			$_SESSION["selected_table"] = $table;	// Table sélectionnée.
			$_SESSION["table_offset"] = $offset;	// Décalage actuel.

			// On exécute les requêtes SQL grâce aux paramètres obtenus précédemment.
			$rows = $connector->query("SELECT * FROM $table LIMIT 25 OFFSET $offset;")->fetchAll();
			$columns = $connector->query("SHOW COLUMNS FROM $table;")->fetchAll();

			// On fabrique la structure HTML pour l'en-tête de la table.
			$data_html = "<thead>\n\t<tr>\n";

			foreach ($columns as $value)
			{
				$data_html .= "\t\t<th>" . $value["Field"] . "</th>\n";
			}

			$data_html .= "\t\t<th></th>\n\t<tr/>\n</thead>\n";

			// On fabrique la structure HTML pour chaque ligne.
			$indice = 0;
			$data_html .= "<tbody>\n";

			foreach ($rows as $row)
			{
				// Chaque colonne doit être séparé entre elles.
				// 	Note : les noms des champs de saisies sont composés de façon
				//		à pouvoir être identifié indépendamment des autres.
				$data_html .= "\t<tr>\n";
				$identifier = null;

				foreach ($row as $key => $value)
				{
					if ($identifier == null)
					{
						// On met en mémoire l'identifiant unique (présumé) de la
						//	colonne pour l'action du formulaire.
						$identifier = $indice;
					}

					$data_html .= "\t\t<td><textarea name=\"" . $key . "_" . $indice . "\">$value</textarea></td>\n";
				}

				// Création des actionneurs pour le formulaire.
				$data_html .= <<<TD
						<td>
							<input type="submit" name="update_$identifier" value="Éditer" />
						</td>
						<td>
							<input type="submit" name="remove_$identifier" value="Supprimer" />
						</td>
					</tr>\n
				TD;

				$indice = $indice + 1;
			}

			// On fabrique une dernière ligne de champs pour ajouter une
			//	information dans la table.
			$length = count($rows);
			$data_html .= "\t<tr>\n";

			for ($indice = 0; $indice < count($columns); $indice++)
			{
				$data_html .= "\t\t<td><textarea name=\"" . $columns[$indice]["Field"] . "_" . $length . "\"></textarea></td>\n";
			}

			// Création des actionneurs pour le formulaire.
			$data_html .= <<<TD
					<td>
						<input type="submit" name="add_$length" value="Ajouter" />
					</td>
				</tr>
			</tbody>\n
			TD;
		}
	}
?>

<html lang="fr">
	<!-- En-tête du site -->
	<?php
		include_once($_SERVER["DOCUMENT_ROOT"] . "/portfolio/include/views/1_head.php");
	?>

	<body>
		<!-- Avertissement page sans JavaScript -->
		<noscript>Votre navigateur ne supporte pas ou refuse de charger le JavaScript.</noscript>

		<!-- En-tête de la page -->
		<header>
			<!-- Titre de la catégorie -->
			<h1>Administration</h1>

			<!-- Description succincte -->
			<h2>Gestion du contenu dynamique de la base de données</h2>

			<!-- Heure actuelle -->
			<p>00:00:00</p>

			<!-- Information de connexion -->
			<p>Connecté en tant que « <?php echo($user->getUsername()); ?> »</p>
		</header>

		<main>
			<!-- Vidéo en arrière-plan -->
			<video autoplay muted loop>
				<source src="../media/landing.mp4" type="video/mp4" />
			</video>

			<!-- Visualisation et édition des tables -->
			<section id="tables">
				<!-- Titre de la section -->
				<h2>Édition des données</h2>

				<!-- Description de la section -->
				<p>
					Voici toutes les tables présentes dans la base de données du site.
					<br /><br />
					Tout d'abord, sélectionnez une table afin d'afficher une partie de son contenu.
					Ensuite, vous aurez la possibilité d'ajouter de nouvelles données, les modifier mais également des les supprimer.
					Enfin, par soucis de performances générales, la visualisation du contenu des tables se fait par tranche de résultats.
					<br /><br />
					Lors de la première requête, vous obtiendrez les <strong>25</strong> premiers résultats puis en allant de nouveau sur cette
					même table, vous obtiendrez une seconde tranche de résultats et ainsi de suite jusqu'à la fin.
				</p>

				<!-- Sélection de la catégorie -->
				<form method="POST" id="categories">
					<ul>
						<?php
							echo($tables_html);
						?>
					</ul>
				</form>

				<!-- Modification des données -->
				<form method="POST" id="data">
					<table>
						<?php
							echo($data_html ?? "\n");
						?>
					</table>
				</form>
			</section>

			<hr />

			<!-- Téléversement de fichiers -->
			<section id="upload">
				<!-- Titre de la section -->
				<h2>Téléversement de fichiers</h2>

				<!-- Description de la section -->
				<p>
					Vous pouvez ici téléverser des fichiers.
				</p>

				<!-- Sélection du dossier -->

				<!-- Bouton de téléversement -->
				<form method="POST" enctype="multipart/form-data">
					<div>
						<!-- Sélection des fichiers -->
						<input type="file" name="upload" accept="image/*" />

						<h3>Pour ajouter une image, glissez et déposez là dans cette zone ou cliquez ici</h3>
					</div>

					<div>
						<!-- Aperçu des fichiers -->
						<img src="#" alt="Image" />

						<div class="image-title-wrap">
							<button type="button" onclick="removeUpload()" class="remove-image">Remove <span class="image-title">Uploaded Image</span></button>
						</div>
					</div>

					<input type="submit" value="Envoyer" /> <!-- onclick="$('.file-upload-input').trigger( 'click' )"> -->
				</form>
			</section>
		</main>

		<!-- Pied-de-page du site -->
		<footer>
			<ul>
				<!-- Déconnexion de l'interface -->
				<li><a href="logout.php">Se déconnecter</a></li>
			</ul>
		</footer>
	</body>
</html>