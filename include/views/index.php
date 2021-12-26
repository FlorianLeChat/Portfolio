<?php
	//
	// Ceci est le fichier permettant de contrôler la vue de la page d'accueil du site.
	//

	// On récupère les traductions pour chacune des sections.
	$about_me = $translation->getPhrases("about_me");	// Section « à propos de moi »
	$projects = $translation->getPhrases("project");	// Section « mes projets »
	$skills = $translation->getPhrases("skills");		// Section « mes compétences »
	$contact = $translation->getPhrases("contact");		// Section « contact »

	// On récupère ensuite les projets.
	$projects_html = "<div class=\"row\">\n";
	$projects_data = $data->getProjects(["identifier", "background_image"]);
	$projects_length = count($projects_data);

	foreach ($projects_data as $key => $value)
	{
		// On récupère certaines données des projets.
		$identifier = $value["identifier"];							// Identifiant du projet
		$image = $value["background_image"];						// Image de fond en page d'accueil
		$name = $projects["project_" . $identifier . "_title"];		// Nom du projet

		// On les assemble par la suite sous forme d'articles.
		$projects_html .= <<<ARTICLE
			\t\t<!-- Project numéro $key -->
			\t\t<article data-image="images/projects/$image">
				\t\t<h3><a href="?target=projects&name=$identifier">$name</a></h3>
			\t\t</article>\n
		ARTICLE;

		// On sépare les projets par groupe de 3 pour obtenir
		//	la disposition attendue en CSS.
		if ($key > 0 && $key % 3 == 0)
		{
			// Fin d'un groupe.
			$projects_html .= "\t\t</div>\n";

			if ($key != $projects_length)
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
		&#8250; <a href="?target=projects"><?php echo($projects["projects_title"]); ?></a> &#8249;
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
		&#8250; <a href="?target=projects"><?php echo($skills["skills_title"]); ?></a> &#8249;
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
		&#8250; <a href="?target=projects"><?php echo($contact["contact_title"]); ?></a> &#8249;
	</h2>

	<h2>
		<?php echo($contact["contact_description"] . "\n"); ?>
	</h2>

	<span>
		<a href="?target=contact"><?php echo($contact["contact_button"]); ?></a>
	</span>
</section>