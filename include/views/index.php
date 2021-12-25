<?php
	//
	// Ceci est le fichier permettant de contrôler la vue de la page d'accueil du site.
	//

	// On récupère les données de la section "à propos de moi".
	//	Note : on remplace les sauts de ligne SQL par leur équivalent en HTML (\n => <br />)
	$about_me = $translation->getPhrases("about_me");
	$about_me_description = str_replace("\r\n\r\n", "<br /><br />\n\t\t", $about_me["about_me_description"]);

	//
	$projects_title = $translation->getPhrase("projects_title");

	//
	$skills = $translation->getPhrases("skills");

	//
	$contact = $translation->getPhrases("contact");

	// ------------------------
	// PROJETS
	// ------------------------
	include_once("./include/controllers/database.php");

	use Portfolio\Controllers\Connector;

	$connector = new Connector();
	$connector = $connector->getPDO();

	$t1 = $connector->prepare("SELECT `identifier`, `background_image` FROM `projects` ORDER BY `projects`.`position` ASC;");
	$t1->execute();
	$t1 = $t1->fetchAll();

	array_unshift($t1, "");
	unset($t1[0]);

	$projects = "<div class=\"row\">\n";

	foreach ($t1 as $key => $value)
	{
		$image = $value["background_image"];
		$identifier = $value["identifier"];

		$name = $translation->getPhrase("project_" . $identifier . "_title");

		$projects .= <<<ARTICLE
			\t\t<!-- Project numéro $key -->
			\t\t<article data-image="images/projects/$image">
				\t\t<h3><a href="?target=projects&name=$identifier">$name</a></h3>
			\t\t</article>\n
		ARTICLE;

		if ($key > 0 && $key % 3 == 0)
		{
			$projects .= "\t\t</div>\n";

			if ($key != count($t1))
			{
				$projects .= "\t\t<div class=\"row\">\n";
			}
		}
	}
	// --------------------------
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
		&#8250; <a href="?target=projects"><?php echo($projects_title); ?></a> &#8249;
	</h2>

	<div class="container">
		<?php
			echo($projects);
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
			<img src="images/skills/school.svg" draggable="false" width="64" height="64" alt="Image représentant une école." />

			<h2>
				<?php echo($skills["skills_school_title"] . "\n"); ?>
			</h2>

			<p>
				<?php echo($skills["skills_school_description"] . "\n"); ?>
			</p>
		</article>

		<article>
			<img src="images/skills/work.svg" draggable="false" width="64" height="64" alt="Image représentant le travail." />

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