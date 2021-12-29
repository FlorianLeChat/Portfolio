<?php
	//
	// Ceci est le fichier permettant de contrôler la vue du pied-de-page du site.
	//

	// On récupère les traductions depuis la base de données.
	$footer = $translation->getPhrases("footer");

	// On fabrique ensuite les paramètres qui doivent être ajoutés
	//	dans le lien vers l'overlay des contributions.
	$url = parse_url($_SERVER["REQUEST_URI"], PHP_URL_QUERY);
	$query = "?";

	if ($url != "")
	{
		// Un paramètre est déjà présent, on passe la requête
		//	en deuxième position.
		$query .= $url . "&thanks=1";
	}
	else
	{
		// Dans le cas contraire, on le passe en premier paramètre.
		$query .= "thanks=1";
	}
?>

<footer>
	<ul>
		<!-- Overlay des contributions -->
		<li><a href="<?php echo($query); ?>"><?php echo($footer["footer_contributions"]); ?></a></li>

		<!-- Interface d'administration (back office) -->
		<li><a href="admin/"><?php echo($footer["footer_admin"]); ?></a></li>

		<!-- Dépôt du code source -->
		<li><a href="https://github.com/FlorianLeChat/Portfolio"><?php echo($footer["footer_github"]); ?></a></li>
	</ul>
</footer>