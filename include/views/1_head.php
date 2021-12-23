<?php
	// Ceci est le fichier générique de l'en-tête du site
	$test = $translation->getPhrase("project_1_name", "languages");

	echo($test);

	$test2 = $translation->getPhrases("project_1", "languages", 2);

	print_r($test2);
?>

<head>
	<!-- Méta-données du document -->
	<meta charset="utf-8" />
	<meta name="Author" content="Florian Trayon" />
	<meta name="description" content="Mon portfolio de mes réalisations et de mes compétences !"/>
	<meta name="keywords" lang="fr" content="portfolio, web, html, css, frontend, backend, fullstack" />
	<meta name="robots" content="noindex" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />

	<!-- Titre du document -->
	<title>Florian Trayon - Portfolio</title>

	<!-- Pré-connexion des ressources externes -->
	<link rel="preconnect" href="https://fonts.gstatic.com" />
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://cdnjs.cloudflare.com" />

	<!-- Polices & feuilles de style CSS -->
	<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;700&display=swap" crossorigin />
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css" crossorigin />
	<link rel="stylesheet" href="styles/main.css" />
	<link rel="stylesheet" href="styles/<?php echo($file); ?>.css" />

	<!-- Scripts JavaScript -->
	<script src="scripts/main.js" defer></script>
	<script src="scripts/<?php echo($file); ?>.js" defer></script>

	<!-- Icône du document (16x16) -->
	<link rel="icon" href="images/favicon.ico" type="image/x-icon" />
</head>