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
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />

	<meta property="og:type" content="website" />
	<meta property="og:url" content="<?php echo($_SERVER["SERVER_NAME"]) ?>" />
	<meta property="og:title" content="<?php echo($head["head_title"]); ?>" />
	<meta property="og:description" content="<?php echo($head["head_description"]); ?>" />
	<meta property="og:image" content="https://opengraph.githubassets.com/9705808f387952e68054c08ddbefffa93ca36c7917a948d1707ea5bf4a222fe6/FlorianLeChat/Portfolio" />

	<meta property="twitter:card" content="summary_large_image" />
	<meta property="twitter:url" content="<?php echo($_SERVER["SERVER_NAME"]) ?>" />
	<meta property="twitter:title" content="<?php echo($head["head_title"]); ?>" />
	<meta property="twitter:description" content="<?php echo($head["head_description"]); ?>" />
	<meta property="twitter:image" content="https://opengraph.githubassets.com/9705808f387952e68054c08ddbefffa93ca36c7917a948d1707ea5bf4a222fe6/FlorianLeChat/Portfolio" />

	<!-- Titre du document -->
	<title><?php echo($head["head_title"]); ?></title>

	<!-- Pré-connexion des ressources externes -->
	<link rel="preconnect" href="https://fonts.gstatic.com" />
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://cdnjs.cloudflare.com" />
	<link rel="preconnect" href="https://www.google-analytics.com" />

	<!-- Polices & feuilles de style CSS -->
	<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;700&display=swap" crossorigin="anonymous" />
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css" crossorigin="anonymous" />
	<link rel="stylesheet" href="<?php echo($path . "styles/$file.css"); ?>" media="screen" />

	<!-- Scripts JavaScript -->
	<script src="https://www.googletagmanager.com/gtag/js?id=G-2J6NTCLNZT" defer></script>

	<!--[if lte IE 9]>
		<script src="https://cdn.jsdelivr.net/npm/html5shiv@3.7.3/dist/html5shiv.min.js"></script>
	<![endif]-->

	<script src="<?php echo($path . "scripts/main.js"); ?>" defer></script>
	<script src="<?php echo($path . "scripts/$file.js"); ?>" defer></script>

	<!-- Icône du document (16x16) -->
	<link rel="icon" href="<?php echo($path . "assets/images/favicon.ico"); ?>" type="image/x-icon" />
</head>