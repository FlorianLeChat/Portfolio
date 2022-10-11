<!DOCTYPE html>

<?php
	// Point d'entrée de l'environnement des scripts.
	require_once("../includes/controllers/_main.php");

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

	// On génère la structure HTML des dossiers où se trouvent
	//	les images enregistrées sur le serveur.
	$path_html = $upload->generateHTMLPath();

	// On vérifie après si la requête actuelle est de type POST.
	if ($_SERVER["REQUEST_METHOD"] === "POST")
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

		// On réalise ensuite l'affichage de tout le contenu de la table.
		//	Note : cette action se réalisera automatique après une action
		//		sur la base de données.
		if (!empty($table))
		{
			$data_html = $admin->generateHTMLData(25, $table, empty($identifier));
		}

		// On vérifie enfin si l'utilisateur ne tente pas de téléverser un
		//	fichier sur le serveur afin de le traiter.
		if (!empty($_FILES))
		{
			$message = $upload->process($_FILES["upload"], $_POST["path"] ?? "");

			// À la fin du traitement, on affiche le message résultat de la fin.
			// Celui-ci peut indiquer une erreur ou tout simplement un succès.
			echo("<script type=\"text/javascript\">alert(`Traitement terminé.\n\n$message`)</script>");
		}
	}
?>

<html lang="fr">
	<!-- En-tête du site -->
	<?php
		require_once("../includes/views/1_head.php");
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
			<p>Connecté en tant que « <?= $user->getUsername(); ?> »</p>
		</header>

		<main>
			<!-- Vidéo en arrière-plan -->
			<video autoplay muted loop>
				<source src="#" data-src="../assets/videos/landing.mp4" type="video/mp4" />
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
						<?= $tables_html; ?>
					</ul>
				</form>

				<!-- Modification des données -->
				<form method="POST" id="data">
					<!-- Texte initial -->
					<p>Aucune table n'est actuellement sélectionnée.</p>

					<!-- Table des données -->
					<table>
						<?= $data_html ?? PHP_EOL; ?>
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
					Cette zone permet de téléverser des fichiers vers le serveur.
					<br /><br />
					Cela comprend la sélection de l'emplacement, mais aussi la visualisation du fichier qui sera envoyé.
					<br /><br />
					Attention, <strong>seules les images</strong> (de n'importe quelle extension) sont autorisées par le serveur.
					Une limite de poids de <?= ini_get("upload_max_filesize"); ?>B est également imposée par PHP.
				</p>

				<!-- Bouton de téléversement -->
				<form method="POST" enctype="multipart/form-data">
					<!-- Sélection du dossier de destination -->
					<label for="path">Choisissez l'emplacement de destination.</label>
					<select id="path" name="path">
						<?= $path_html; ?>
					</select>

					<!-- Sélection des fichiers -->
					<div>
						<h3>Pour ajouter une image, glissez et déposez là dans cette zone ou cliquez ici</h3>

						<input type="file" name="upload" accept="audio/*,video/*,image/*" required />
					</div>

					<!-- Aperçu des fichiers -->
					<div>
						<img src="#" alt="Image téléversé" />

						<button type="button">Supprimer l'image</button>
					</div>

					<!-- Actionneur pour envoyer le fichier -->
					<input type="submit" value="Envoyer" />
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