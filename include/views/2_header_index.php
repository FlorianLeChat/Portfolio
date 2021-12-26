<?php
	//
	// Ceci est le fichier permettant de contrôler la vue de l'en-tête de la page d'accueil.
	//

	// On récupère les deux traductions pour le titre et le sous-titre
	//	de la page.
	$header_index = $translation->getPhrases("header_index");

	// On récupère ensuite les plateformes qui doivent être affichées.
	$plateforms_html = "";
	$plateforms_data = $data->getPlateforms();

	foreach ($plateforms_data as $value)
	{
		$url = $value["target_url"];				// Lien cible
		$color = $value["hex_color"];				// Couleur hexadécimale de l'icône
		$identifier = $value["identifier"];			// Identifiant de la plateforme
		$name = ucfirst(strtolower($identifier));	// Nom de la plateforme (basé sur l'identifiant)

		// On assemble enfin les données pour afficher une série
		// 	de liens vers chaque plateforme.
		$plateforms_html .= <<<LINK
			<a href="$url" title="$name" target="_blank">
				<img data-color="$color" src="images/platforms/$identifier.svg" width="32" height="32" draggable="false" alt="Image - $name" />
			</a>\n
		LINK;
	}
?>

<!-- En-tête de la page -->
<header>
	<!-- Prénom & Nom -->
	<h1><?php echo($header_index["header_index_title"]); ?></h1>

	<!-- Description succincte -->
	<h2><?php echo($header_index["header_index_subtitle"]); ?></h2>

	<!-- Plateformes de communication -->
	<?php echo($plateforms_html); ?>

	<!-- Vagues de fin -->
	<img src="images/decorations/header_waves_blue.svg" alt="" />
</header>