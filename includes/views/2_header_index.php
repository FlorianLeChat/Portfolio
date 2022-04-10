<?php
	//
	// Ceci est le fichier permettant de contrôler la vue de l'en-tête de la page d'accueil.
	//

	// On récupère les deux traductions pour le titre et le sous-titre
	//	de la page.
	$header_index = $translation->getPhrases("header_index");

	// On récupère ensuite les plateformes qui doivent être affichées.
	$plateforms_html = "";
	$plateforms_data = $public_data->getTableData("plateforms", ["identifier", "hex_color", "target_url"]);

	foreach ($plateforms_data as $plateform)
	{
		$url = $plateform["target_url"];				// Lien cible
		$color = $plateform["hex_color"];				// Couleur hexadécimale de l'icône
		$identifier = $plateform["identifier"];			// Identifiant de la plateforme
		$name = ucfirst(strtolower($identifier));		// Nom de la plateforme (basé sur l'identifiant)

		// On assemble enfin les données pour afficher une série
		// 	de liens vers chaque plateforme.
		$plateforms_html .= "
			<a href=\"$url\" style=\"color: $color\" title=\"$name\" target=\"_blank\">
				<img src=\"assets/images/platforms/$identifier.svg\" width=\"32\" height=\"32\" draggable=\"false\" alt=\"Image - $name\" />
			</a>\n
		";
	}
?>

<!-- En-tête de la page -->
<header>
	<!-- Prénom & Nom -->
	<h1><?= $header_index["header_index_title"]; ?></h1>

	<!-- Description succincte -->
	<h2><?= $header_index["header_index_subtitle"]; ?></h2>

	<!-- Plateformes de communication -->
	<?= $plateforms_html; ?>

	<!-- Vagues de fin -->
	<img src="assets/images/decorations/header_waves_blue.svg" alt="" />
</header>