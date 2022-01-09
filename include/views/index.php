<?php
	//
	// Ceci est le fichier permettant de contrôler la vue de la page d'accueil du site.
	//

	// On récupère les traductions pour chacune des sections.
	$about_me = $translation->getPhrases("about_me");	// Section « À propos de moi »
	$projects = $translation->getPhrases("project");	// Section « Mes projets »
	$skills = $translation->getPhrases("skills");		// Section « Mes compétences »
	$contact = $translation->getPhrases("contact");		// Section « Contact »

	// On récupère ensuite les projets.
	$projects_html = "<div class=\"row\">\n";
	$projects_data = $public_data->getTableData("projects", ["identifier"], true);
	$projects_length = count($projects_data);

	foreach ($projects_data as $indice => $project)
	{
		// On récupère certaines données des projets.
		$identifier = $project["identifier"];							// Identifiant du projet
		$name = $projects["project_" . $identifier . "_title"];		// Nom du projet

		// On les assemble par la suite sous forme d'articles.
		$projects_html .= <<<ARTICLE
			\t\t<!-- Project numéro $indice -->
			\t\t<article data-image="images/projects/bg_$identifier.jpg">
				\t\t<h3><a href="?target=projects#$identifier">$name</a></h3>
			\t\t</article>\n
		ARTICLE;

		// On sépare les projets par groupe de 3 pour obtenir
		//	la disposition attendue en CSS.
		if ($indice > 0 && $indice % 3 == 0)
		{
			// Fin d'un groupe.
			$projects_html .= "\t\t</div>\n";

			if ($indice != $projects_length)
			{
				// Un nouveau groupe débute après la fin d'un groupe
				//	précédent sauf si la boucle a atteint la dernière
				//	valeur de la liste.
				$projects_html .= "\t\t<div class=\"row\">\n";
			}
		}
	}
?>

<!-- À propos de moi -->
<section id="aboutme">
	<h3>#aboutme</h3>

	<h2>
		<?php echo($about_me["about_me_title"] . "\n"); ?>
	</h2>

	<p>
		<?php echo($about_me["about_me_description"] . "\n"); ?>
	</p>
</section>

<!-- Projets -->
<section id="projects">
	<!-- Vagues du début -->
	<img src="images/decorations/projects_waves_top_blue.svg" alt="" />

	<!-- Listes des projets -->
	<h3>#projects</h3>

	<h2>
		&#8250; <a href="?target=projects"><?php echo($projects["header_projects_title"]); ?></a> &#8249;
	</h2>

	<div class="container">
		<?php
			echo($projects_html);
		?>
	</div>

	<!-- Vagues de fin -->
	<img src="images/decorations/projects_waves_bottom_blue.svg" alt="" />
</section>

<!-- Compétences -->
<section id="skills">
	<h3>#skills</h3>

	<h2>
		&#8250; <a href="?target=skills"><?php echo($skills["header_skills_title"]); ?></a> &#8249;
	</h2>

	<div>
		<article>
			<img src="images/skills/school.svg" draggable="false" width="64" height="64" alt="<?php echo($skills["skills_school_image"]); ?>" />

			<h2>
				<?php echo($skills["skills_school_title"] . "\n"); ?>
			</h2>

			<p>
				<?php echo($skills["skills_school_description"] . "\n"); ?>
			</p>
		</article>

		<article>
			<img src="images/skills/work.svg" draggable="false" width="64" height="64" alt="<?php echo($skills["skills_work_image"]); ?>" />

			<h2>
				<?php echo($skills["skills_work_title"] . "\n"); ?>
			</h2>

			<p>
				<?php echo($skills["skills_work_description"] . "\n"); ?>
			</p>
		</article>
	</div>
</section>

<!-- Contact -->
<section id="contact">
	<h3>#contact</h3>

	<h2>
		&#8250; <a href="?target=contact"><?php echo($contact["contact_title"]); ?></a> &#8249;
	</h2>

	<h2>
		<?php echo($contact["contact_message"] . "\n"); ?>
	</h2>

	<span>
		<a href="?target=contact"><?php echo($contact["contact_button"]); ?></a>
	</span>
</section>