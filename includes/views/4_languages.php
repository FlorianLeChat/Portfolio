<?php
	//
	// Ceci est le fichier permettant de contrôler la vue du sélecteur de langues.
	//

	// On réorganise la position des drapeaux en prenant compte
	//	de la langue actuellement active.
	$languages_data = $translation->getLanguages();

	if ($language != "FR")
	{
		// Si la langue active n'est pas le français, alors on
		//	va rechercher son indice dans les données actuelle.
		$indice = array_search($language, $languages_data);

		// On place ensuite sa valeur à la toute première position.
		array_unshift($languages_data, $languages_data[$indice]);

		// On supprime enfin son ancienne place dans le tableau.
		unset($languages_data[$indice + 1]);
	}

	// On construit après la structure HTML du sélecteur de langues.
	$languages = $translation->getPhrases("language");
	$flags_html = PHP_EOL;

	foreach ($languages_data as $language)
	{
		$language = strtolower($language);				// Code ISO-3166 en minuscule
		$code = $language == "en" ? "gb" : $language;	// Ignore les variantes régionales (ex: FR_fr, FR_ca...)
		$name = $languages["language_$language"];		// Nom de la langue

		// On itére enfin à travers les langues pour contruire
		//	les boutons des drapeaux.
		$flags_html .= "
			<li>
				<!-- $name -->
				<button type=\"submit\" name=\"language\" value=\"$language\">
					<i class=\"fi fi-$code\"></i>
					<span>$name</span>
				</button>
			</li>
		";
	}
?>

<aside>
	<!-- Sélection de la langue -->
	<form method="POST" action="?target=<?= $file; ?>">
		<ul id="flags">
			<?= $flags_html; ?>
		</ul>
	</form>

	<!-- Retour au début de la page -->
	<a href="#" id="scrollTop"></a>
</aside>