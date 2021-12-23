<?php
	// Ceci est le fichier de la page d'accueil du site
?>

<!-- À propos de moi -->
<section id="aboutme">
	<h3>#informations</h3>

	<h2>À propos de moi</h2>

	<p>
		Bienvenue sur mon portfolio !
		<br /><br />
		Je suis Florian, un développeur français de 22 ans.
		Je suis principalement un développeur <em>back-end</em> (NodeJS, PHP, ...) mais je suis
		vraiment intéressé par l'apprentissage du <em>front-end</em> (HTML, CSS, JavaScript, ...)
		et du design UI/UX.
		<br /><br />
		J'ai également de l'expérience dans les langages de script et de programmation comme le Lua,
		le Python et le C# (avec .NET Core). Cela inclut évidemment des connaissances solides dans
		les systèmes de sauvegarde SQLite et MySQL utilisés également dans le Web.
		<br /><br />
		Vous pourrez en apprendre plus sur moi, mes expériences, mes projets et mes compétences grâce
		à ce Portfolio.
	</p>
</section>

<!-- Projets -->
<section id="projects">
	<!-- Vagues du début -->
	<img src="images/decorations/projects_waves_top_blue.svg" alt="" />

	<!-- Listes des projets -->
	<h3>#projects</h3>

	<h2>&#8250; <a href="?target=projects">Projets</a> &#8249;</h2>

	<div class="container">
		<div class="row">
			<article data-image="images/projects/placeholder.jpg">
				<h3><a href="?target=projects&name=raven">Raven Framework</a></h3>
			</article>

			<article data-image="images/projects/placeholder.jpg">
				<h3><a href="?target=projects&name=discordbot">Florian's Bot</a></h3>
			</article>

			<article data-image="images/projects/placeholder.jpg">
				<h3><a href="?target=projects&name=facepunch">Facepunch Commits Monitor</a></h3>
			</article>
		</div>

		<div class="row">
			<article data-image="images/projects/placeholder.jpg">
				<h3><a href="?target=projects&name=phpstorage">Simple File Storage</a></h3>
			</article>

			<article data-image="images/projects/placeholder.jpg">
				<h3><a href="?target=projects&name=steam">Steam Collection Download Size Calculator</a></h3>
			</article>

			<article data-image="images/projects/placeholder.jpg">
				<h3><a href="?target=projects&name=python">Python RPG</a></h3>
			</article>
		</div>
	</div>

	<!-- Vagues de fin -->
	<img src="images/decorations/projects_waves_bottom_blue.svg" alt="" />
</section>

<!-- Compétences -->
<section id="skills">
	<h3>#skills</h3>

	<h2>&#8250; <a href="?target=skills">Compétences</a> &#8249;</h2>

	<div>
		<article>
			<img src="images/skills/school.svg" draggable="false" width="64" height="64" alt="Image représentant une école." />

			<h2>Parcours scolaire & diplômes</h2>

			<p>
				<strong><a href="?target=skills&name=school">Cliquez ici</a></strong> pour en savoir plus sur
				mon parcours scolaire ainsi que les diplômes et certificats que j'ai pu obtenir
				jusqu'à aujourd'hui.
			</p>
		</article>

		<article>
			<img src="images/skills/work.svg" draggable="false" width="64" height="64" alt="Image représentant le travail." />

			<h2>Compétences professionnelles</h2>

			<p>
				<strong><a href="?target=skills&name=work">Cliquez ici</a></strong> pour en savoir plus sur mes
				compétences acquises durant mon apprentissage en autodidacte mais aussi lors de
				stages en milieu professionnel.
			</p>
		</article>
	</div>
</section>

<!-- Contact -->
<section id="contact">
	<h3>#contact</h3>

	<h2>&#8250; <a href="?target=contact">Contact</a> &#8249;</h2>

	<h2>Un projet ? Une demande ?<br /><br />Contactez-moi !</h2>

	<span><a href="?target=contact">Formulaire de contact</a></span>
</section>