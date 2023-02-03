<?php
	//
	// Ceci est le fichier permettant de contrôler la vue de l'en-tête de la page des compétences.
	//

	// On récupère les deux traductions pour le titre et le sous-titre
	//	de la page.
	$header_skills = $translation->getPhrases("header_skills");
?>

<!-- En-tête de la page -->
<header>
	<!-- Titre de la catégorie -->
	<h1><?= $header_skills["header_skills_title"]; ?></h1>

	<!-- Description succincte -->
	<h2><?= $header_skills["header_skills_subtitle"]; ?></h2>

	<!-- Vagues de fin -->
	<img src="assets/images/decorations/header_waves_green.svg" alt="" decoding="async" />
</header>