<?php
	//
	// Ceci est le fichier permettant de contrôler la vue de l'en-tête de la page de contact.
	//

	// On récupère les deux traductions pour le titre et le sous-titre
	//	de la page.
	$header_contact = $translation->getPhrases("header_contact");
?>

<!-- En-tête de la page -->
<header>
	<!-- Titre de la catégorie -->
	<h1><?php echo($header_contact["header_contact_title"]); ?></h1>

	<!-- Description succincte -->
	<h2><?php echo($header_contact["header_contact_subtitle"]); ?></h2>

	<!-- Vagues de fin -->
	<img src="images/decorations/header_waves_purple.svg" alt="" />
</header>