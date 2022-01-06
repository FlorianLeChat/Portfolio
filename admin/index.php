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
				<input type="submit" name="table" value="$name" />
			</li>\n
		LI;
	}

	// On vérifie après si la requête actuelle est de type et si
	//	on demande à ce qu'on affiche le contenu d'une table.
	if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST["table"]))
	{
		// On récupère toutes les colonnes et les lignes.
		//	Note : on limite le nombre de récupération à 10 pour éviter
		//		les problèmes de performances.
		$table = $_POST["table"];
		$columns = $connector->query("SHOW COLUMNS FROM $table;")->fetchAll();
		$rows = $connector->query("SELECT * FROM $table LIMIT 25 OFFSET 0;")->fetchAll();

		// On fabrique la structure HTML pour l'en-tête de la table.
		$data_html = "<thead>\n\t<tr>\n";

		foreach ($columns as $key => $value)
		{
			$data_html .= "\t\t<th>" . $value["Field"] . "</th>\n";
		}

		$data_html .= "\t\t<th></th>\n\t<tr/>\n</thead>\n";

		// On fabrique la structure HTML pour chaque ligne.
		$data_html .= "<tbody>\n";

		foreach ($rows as $row)
		{
			// Chaque colonne doit être séparé entre elles.
			$data_html .= "\t<tr>\n";

			foreach ($row as $key => $value)
			{
				$data_html .= "\t\t<td><textarea name=\"$key\">$value</textarea></td>\n";
			}

			$data_html .= "\t\t<td><input type=\"submit\" value=\"Supprimer\" /></td>\n\t</tr>\n";
		}

		// On fabrique enfin une dernière liste
		$data_html .= "\t<tr>\n";

		for ($indice = 0; $indice < count($columns); $indice++)
		{
			$data_html .= "\t\t<td><textarea name=\"$key\"></textarea></td>\n";
		}

		$data_html .= "\t\t<td><input type=\"submit\" value=\"Ajouter\" /></td>\n\t</tr>\n</tbody>\n";
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
					Voici toutes les tables présentes dans la base de données.
					Cliquez sur l'une d'en elles pour accéder à son contenu et le modifier librement.
					Par soucis de préserver les performances du site, la visualisation se fait par tranche de <strong>50</strong> résultats.
					Pour avoir la suite des résultats d'une table, sélectionnez de nouveau la même catégorie.
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