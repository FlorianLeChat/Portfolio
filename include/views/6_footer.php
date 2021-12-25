<?php
	//
	// Ceci est le fichier permettant de contrôler la vue du pied-de-page du site.
	//

	$footer = $translation->getPhrases("footer");
?>

<footer>
	<ul>
		<li><a href="?thanks=1"><?php echo($footer["footer_contributions"]); ?></a></li>
		<li><a href="admin/index.php"><?php echo($footer["footer_admin"]); ?></a></li>
		<li><a href="https://github.com/FlorianLeChat/Portfolio"><?php echo($footer["footer_github"]); ?></a></li>
	</ul>
</footer>