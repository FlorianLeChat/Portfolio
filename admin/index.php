<!DOCTYPE html>

<?php
	// Point d'entrée de l'environnement des scripts.
	include_once($_SERVER["DOCUMENT_ROOT"] . "/portfolio/include/controllers/_main.php");

	// Création des classes nécessaires.
	include_once($_SERVER["DOCUMENT_ROOT"] . "/portfolio/include/controllers/user.php");

	$user = new Portfolio\Controllers\UserAuthentication();	// Mécanisme d'authentification.
	$user->connector = $connector;

	$admin = new Portfolio\Controllers\AdminManager();		// Contrôle des données admistrateur.

	// On définit la page actuelle.
	$file = "admin";

	// On vérifie si l'utilisateur est connecté.
	if (!$user->isConnected())
	{
		http_response_code(401);
		header("Location: login.php");
		exit();
	}

	// On génère la structure HTML de toutes les tables présentes
	//	dans la base de données du site.
	$tables_html = $admin->generateHTMLTables();

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
			// On effectue alors une requête de changement.
			$admin->requestChange($identifier, $table, $_POST);
		}

		// On réalise l'affichage de tout le contenu de la table.
		//	Note : cette action se réalisera automatique après une action
		//		sur la base de données.
		if (isset($table))
		{
			$data_html = $admin->generateHTMLData(25, $table);
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
					Ensuite, vous aurez la possibilité d'ajouter de nouvelles données, les modifier mais également de les supprimer.
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
					<!-- Texte initial -->
					<p>Aucune table est actuellement sélectionnée.</p>

					<!-- Table des données -->
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