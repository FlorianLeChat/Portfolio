<?php
	//
	// Ceci est le fichier permettant de contrôler la vue de la barre de navigation (page de contact).
	//

	// On récupère les traductions des titres dans la base de données.
	$about_me_title = $translation->getPhrase("about_me_title");				// À propos de moi
	$header_projects_title = $translation->getPhrase("header_projects_title"); 	// Projets
	$header_skills_title = $translation->getPhrase("header_skills_title");		// Compétences
?>

<nav>
	<ul>
		<li><a href="?target=index"><?= $about_me_title; ?></a></li>
		<li><a href="?target=projects"><?= $header_projects_title; ?></a></li>
		<li><a href="?target=skills"><?= $header_skills_title; ?></a></li>
	</ul>
</nav>