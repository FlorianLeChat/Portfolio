<?php
	//
	// Ceci est le fichier permettant de contrôler la vue de la page des compétences.
	//

	// On récupère les traductions pour la page entière.
	$skills = $translation->getPhrases("skills");
	$degrees = $translation->getPhrases("degree");
	$experiences = $translation->getPhrases("experience");
	$competences = $translation->getPhrases("competence");	// "skills" != "competences"

	// On récupère ensuite les données brutes des diplômes
	// 	avant de les fabriquer.
	$degrees_data = $data->getDegrees();
	$degrees_list_html = "";	// Liste des formations
	$degrees_resume_html = "";	// Résumé des formations

	foreach ($degrees_data as $value)
	{
		$date = $value["date"];											// Date de la formation
		$identifier = $value["identifier"];								// Identifiant de la formation

		// On sépare en deux le titre et le lieu de la formation
		//	pour obtenir les deux parties voulues.
		$title = $degrees["degree_" . $identifier . "_title"];			// Titre de la formation
		$title = explode("<br /><br />", $title);

		if (count($title) == 1)
		{
			// Certains intitulés de formation ne comporte pas
			//	d'options ou de disciplines supplémentaires.
			$title[1] = "";
		}

		$location = $degrees["degree_" . $identifier . "_location"];	// Lieu de la formation
		$location = explode("<br /><br />", $location);

		// On assemble les données pour réaliser une liste des
		//	formation avec des informations générales.
		$degrees_list_html .= <<<LI
			\t\t<li data-image="images/skills/$identifier.jpg">
				\t\t<!-- Intitulé de la formation -->
				\t\t<h4>$title[0]</h4>

				\t\t<h5>$title[1]</h5>

				\t\t<!-- Lieu de formation -->
				\t\t<p><em>$location[0]</em></p>

				\t\t<p>$location[1]</p>

				\t\t<!-- Période de formation -->
				\t\t<p><strong>$date</strong></p>
		LI;

		// On réalise la même chose mais avec le résumé de
		//	chacune des formations.
		$description = $degrees["degree_" . $identifier . "_description"];	// Description de la formation
		$degrees_resume_html .= <<<LI
			\t\t<li>
				\t\t<p>
					\t\t$description
				\t\t</p>
			\t\t</li>\n
		LI;

		// On vérifie si la formation s'est terminée par
		//	l'obtention (ou non) d'un diplôme.
		if ($value["graduated"] == "1")
		{
			$degrees_list_html .= <<<IMAGE
				\n\n\t\t\t\t<!-- Diplôme obtenu -->
				\t\t\t<img src="images/skills/certificate.svg" width="48" height="48" draggable="false" alt="Diplôme obtenu" />
			IMAGE;
		}

		$degrees_list_html .= "\n\t\t\t</li>\n";
	}

	// On fait la même chose avec les expériences et les
	//	compétences professionnelles.
	$experiences_data = $data->getExperiences();
	$skills_data = $data->getSkills();

	$experiences_html = "";	// Expériences
	$skills_html = "";		// Compétences

	foreach ($experiences_data as $value)
	{
		$date = $value["date"];														// Date de l'expérience
		$identifier = $value["identifier"];											// Identifiant de l'expérience

		$company = $experiences["experience_" . $identifier . "_company"];			// Nom de l'entreprise
		$location = $experiences["experience_" . $identifier . "_location"];		// Lieu de l'expérience
		$description = $experiences["experience_" . $identifier . "_description"];	// Description de l'expérience

		$experiences_html .= <<<LI
			\t\t<li>
				\t\t<!-- Date et descriptif de l'événement -->
				\t\t<strong>$company | $date</strong>

				\t\t<p>
					\t\t$description
				\t\t</p>

				\t\t<em>$location</em>
			\t\t</li>\n
		LI;
	}

	foreach ($skills_data as $value)
	{
		$name = $value["name"];
		$level = $value["level"];

		$skills_html .= <<<DIV
			\t\t<div>
				\t\t<span>$name</span>
				\t\t<div class="circle" data-level="$level"></div>
			\t\t</div>\n
		DIV;
	}
?>

<!-- Parcours scolaire -->
<section id="school">
	<h3>#school</h3>

	<h2>
		<?php echo($skills["skills_school_title"] . "\n"); ?>
	</h2>

	<article id="list">
		<!-- Formations (liste) -->
		<h3>
			<?php echo($degrees["degrees_list_title"] . "\n"); ?>
		</h3>

		<ul>
			<?php
				echo($degrees_list_html);
			?>
		</ul>
	</article>

	<article id="summary">
		<!-- Formations (résumé descriptif) -->
		<h3>
			<?php echo($degrees["degrees_resume_title"] . "\n"); ?>
		</h3>

		<ul>
			<?php
				echo($degrees_resume_html);
			?>
		</ul>
	</article>
</section>

<hr />

<!-- Compétences professionnelles -->
<section id="work">
	<h3>#work</h3>

	<h2>
		<?php echo($skills["skills_work_title"] . "\n"); ?>
	</h2>

	<article id="experiences">
		<h3>
			<?php echo($experiences["experiences_title"] . "\n"); ?>
		</h3>

		<ul>
			<?php
				echo($experiences_html);
			?>
		</ul>
	</article>

	<article id="competences">
		<h3>
			<?php echo($competences["competences_title"] . "\n"); ?>
		</h3>

		<!-- Descriptif des compétences -->
		<p>
			<?php echo($competences["competences_description"] . "\n"); ?>
		</p>

		<hr />

		<!-- Représentations graphiques des compétences -->
		<?php
			echo($skills_html);
		?>
	</article>
</section>