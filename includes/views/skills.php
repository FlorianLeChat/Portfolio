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
	$degrees_data = $public_data->getTableData("degrees", ["identifier", "date", "graduated"]);
	$degrees_list_html = "";	// Liste des formations
	$degrees_resume_html = "";	// Résumé des formations

	foreach ($degrees_data as $degree)
	{
		$date = $degree["date"];										// Date de la formation
		$identifier = $degree["identifier"];							// Identifiant de la formation

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
		$degrees_list_html .= "
			<li data-bg=\"assets/images/skills/$identifier.webp\">
				<!-- Intitulé de la formation -->
				<h4>$title[0]</h4>

				<h5>$title[1]</h5>

				<!-- Lieu de formation -->
				<p><em>$location[0]</em></p>

				<p>$location[1]</p>

				<!-- Période de formation -->
				<p><strong>$date</strong></p>
		";

		// On réalise la même chose mais avec le résumé de
		//	chacune des formations.
		$description = $degrees["degree_" . $identifier . "_description"];	// Description de la formation
		$degrees_resume_html .= "
			<li>
				<p>
					$description
				</p>
			</li>
		";

		// On vérifie si la formation s'est terminée par
		//	l'obtention (ou non) d'un diplôme.
		if ($degree["graduated"] == "1")
		{
			$degrees_list_html .= "
				<!-- Diplôme obtenu -->
				<img src=\"#\" data-src=\"assets/images/skills/certificate.svg\" width=\"48\" height=\"48\" draggable=\"false\" alt=\"Diplôme obtenu\" decoding=\"async\" />
			";
		}

		$degrees_list_html .= "</li>";
	}

	// On fait la même chose avec les expériences et les
	//	compétences professionnelles.
	$experiences_data = $public_data->getTableData("experiences", ["identifier", "date"]);
	$skills_data = $public_data->getTableData("skills", ["name", "level"]);

	$experiences_html = "";	// Expériences
	$skills_html = "";		// Compétences

	foreach ($experiences_data as $experience)
	{
		$date = $experience["date"];												// Date de l'expérience
		$identifier = $experience["identifier"];									// Identifiant de l'expérience

		$company = $experiences["experience_" . $identifier . "_company"];			// Nom de l'entreprise
		$location = $experiences["experience_" . $identifier . "_location"];		// Lieu de l'expérience
		$description = $experiences["experience_" . $identifier . "_description"];	// Description de l'expérience

		$experiences_html .= "
			<li>
				<!-- Date et descriptif de l'événement -->
				<strong>$company | $date</strong>

				<p>
					$description
				</p>

				<em>$location</em>
			</li>
		";
	}

	foreach ($skills_data as $skill)
	{
		$name = $skill["name"];
		$level = $skill["level"];

		$skills_html .= "
			<div>
				<span>$name</span>
				<div class=\"circle\" data-level=\"$level\"></div>
			</div>
		";
	}
?>

<!-- Parcours scolaire -->
<section id="school">
	<h3>#school</h3>

	<h2>
		<?= $skills["skills_school_title"] . PHP_EOL; ?>
	</h2>

	<article id="list">
		<!-- Formations (liste) -->
		<h3>
			<?= $degrees["degrees_list_title"] . PHP_EOL; ?>
		</h3>

		<ul>
			<?= $degrees_list_html;?>
		</ul>
	</article>

	<article id="summary">
		<!-- Formations (résumé descriptif) -->
		<h3>
			<?= $degrees["degrees_resume_title"] . PHP_EOL; ?>
		</h3>

		<ul>
			<?= $degrees_resume_html; ?>
		</ul>
	</article>
</section>

<hr />

<!-- Compétences professionnelles -->
<section id="work">
	<h3>#work</h3>

	<h2>
		<?= $skills["skills_work_title"] . PHP_EOL; ?>
	</h2>

	<article id="experiences">
		<h3>
			<?= $experiences["experiences_title"] . PHP_EOL; ?>
		</h3>

		<ul>
			<?= $experiences_html; ?>
		</ul>
	</article>

	<article id="competences">
		<h3>
			<?= $competences["competences_title"] . PHP_EOL; ?>
		</h3>

		<!-- Descriptif des compétences -->
		<p>
			<?= $competences["competences_description"] . PHP_EOL; ?>
		</p>

		<hr />

		<!-- Représentations graphiques des compétences -->
		<?= $skills_html; ?>
	</article>
</section>