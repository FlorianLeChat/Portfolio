<?php
	//
	// Ceci est le fichier permettant de contrôler la vue de l'en-tête de la page des projets.
	//

	// On récupère les deux traductions pour le titre et le sous-titre
	//	de la page.
	$header_projects = $translation->getPhrases("header_projects");
?>

<!-- En-tête de la page -->
<header>
	<!-- Titre de la catégorie -->
	<h1><?php echo($header_projects["header_projects_title"]); ?></h1>

	<!-- Description succincte -->
	<h2><?php echo($header_projects["header_projects_subtitle"]); ?></h2>

	<!-- Vagues de fin -->
	<img src="assets/images/decorations/header_waves_orange.svg" alt="" />
</header>