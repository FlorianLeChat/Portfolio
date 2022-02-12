<?php
	//
	// Ceci est le fichier permettant de contrôler la vue de l'overlay des contributions.
	//

	// On récupère la traduction du titre de l'overlay.
	$contribution_title = $translation->getPhrase("footer_contributions");

	// On récupère ensuite toutes les contributions
	//	depuis la base de données.
	$contributions_html = "";
	$contributions_data = $public_data->getTableData("contributions", ["firstname", "lastname", "details"]);

	foreach ($contributions_data as $contribution)
	{
		$name = $contribution["firstname"] . " " . $contribution["lastname"];	// Prénom et nom de famille
		$details = $contribution["details"];									// Description de la contribution

		// On assemble enfin les données sous forme
		//	d'items dans une liste.
		$contributions_html .= "
			\t<li>
				\t<h3>$name</h3>

				\t<p>
					\t$details
				\t</p>
			\t</li>\n
		";
	}
?>

<section id="contributions">
	<h2>Contributions</h2>

	<audio id="jazz" loop>
		<!-- Musique d'ambiance spéciale à la section -->
		<source src="assets/sounds/jazz.mp3" type="audio/mp3">
	</audio>

	<ul>
		<!-- Description de chaque contribution -->
		<?php
			echo($contributions_html);
		?>
	</ul>
</section>