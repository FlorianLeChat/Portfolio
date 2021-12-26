<?php
	//
	// Ceci est le fichier permettant de contrôler la vue du sélecteur de langues.
	//

	// On récupère toutes les langues disponibles avant de
	//	récupérer leur traduction.
	$languages = $translation->getPhrases("language");		// Langues
	$backtotop = $translation->getPhrase("nav_backtotop");	// Bouton retour en haut de page

	$languages_data = $translation->getLanguages();

	// On réorganise la position des drapeaux en prenant compte
	//	de la langue actuellement active.
	$code = $translation->getCode();

	if ($code != "FR")
	{
		// Si la langue active n'est pas le français, alors on
		//	va rechercher son indice dans les données actuelle.
		$indice = array_search($code, $languages_data);

		// On place ensuite sa valeur à la toute première position.
		array_unshift($languages_data, $languages_data[$indice]);

		// On supprime enfin son ancienne place dans le tableau.
		unset($languages_data[$indice + 1]);
	}

	// On construit après la structure HTML du sélecteur de langues.
	$flags_html = "\n";

	foreach ($languages_data as $value)
	{
		$value = strtolower($value);				// Code ISO-3166 en minuscule
		$flag = $value == "en" ? "gb" : $value;		// Ignore les variantes régionales (ex: FR_fr, FR_ca...)
		$name = $languages["language_$value"];		// Nom de la langue

		// On itére enfin à travers les langues pour contruire
		//	les boutons des drapeaux.
		$flags_html .= <<<FLAG
			\t\t<li>
				\t\t<!-- $name -->
				\t\t<button type="submit" name="language" value="$value">
					\t\t<img src="images/flags/$flag.svg" width="21" height="16" draggable="false" alt="$name" />
					\t\t<span>$name</span>
				\t\t</button>
			\t\t</li>\n
		FLAG;
	}
?>

<aside>
	<!-- Sélection de la langue -->
	<form method="POST" action="?target=<?php echo($file); ?>">
		<ul id="flags">
			<?php
				echo($flags_html);
			?>
		</ul>
	</form>

	<!-- Retour au début de la page -->
	<button id="scrollTop" title="<?php echo($backtotop); ?>"></button>
</aside>