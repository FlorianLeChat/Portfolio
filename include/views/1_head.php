<?php
	//
	// Ceci est le fichier permettant de contrôler la vue de l'en-tête du site.
	//

	// On récupère les traductions depuis la base de données.
	$head = $translation->getPhrases("head");

	// On détermine le chemin d'accès vers les feuilles de style
	//	CSS et fichiers JavaScript.
	//	Note : cette vérification est faite pour inclure ce fichier
	//		dans la page d'administration.
	$path = "";

	if (str_contains($_SERVER["SCRIPT_NAME"], "admin"))
	{
		$path = "../$path";
	}
?>

<head>
	<!-- Méta-données du document -->
	<meta charset="utf-8" />
	<meta name="Author" content="Florian Trayon" />
	<meta name="description" content="<?php echo($head["head_description"]); ?>" />
	<meta name="keywords" lang="<?php echo($language); ?>" content="portfolio, web, html, css, frontend, backend, fullstack" />
	<meta name="robots" content="noindex" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />

	<!-- Titre du document -->
	<title><?php echo($head["head_title"]); ?></title>

	<!-- Pré-connexion des ressources externes -->
	<link rel="preconnect" href="https://fonts.gstatic.com" />
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://cdnjs.cloudflare.com" />

	<!-- Polices & feuilles de style CSS -->
	<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;700&display=swap" crossorigin />
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css" crossorigin />
	<link rel="stylesheet" href="<?php echo($path . "styles/main.css"); ?>" />
	<link rel="stylesheet" href="<?php echo($path . "styles/$file.css"); ?>" />

	<!-- Scripts JavaScript -->
	<script src="<?php echo($path . "scripts/main.js"); ?>" defer></script>
	<script src="<?php echo($path . "scripts/$file.js"); ?>" defer></script>

	<!-- Icône du document (16x16) -->
	<link rel="icon" href="<?php echo($path . "images/favicon.ico"); ?>" type="image/x-icon" />
</head>