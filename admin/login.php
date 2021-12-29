<!DOCTYPE html>

<?php
	// Point d'entrée de l'environnement des scripts.
	include($_SERVER["DOCUMENT_ROOT"] . "/portfolio/include/controllers/_main.php");

	//
	$file = "admin";

	// Si authentification OK alors page principale
?>

<html lang="fr">
	<!-- En-tête du site -->
	<?php
		include_once($_SERVER["DOCUMENT_ROOT"] . "/portfolio/include/views/1_head.php");
	?>

	<body>
		<!-- Avertissement page sans JavaScript -->
		<noscript>Votre navigateur ne supporte pas ou refuse de charger le JavaScript.</noscript>

		<!-- En-tête de la page -->
		<header>
			<!-- Titre de la catégorie -->
			<h1>Authentification</h1>

			<!-- Description succincte -->
			<h2>Pour accéder à cette ressource, vous devez vous identifier.</h2>
		</header>

		<main>
			<section id="login">
				<h2>Contenu protégé</h2>

				<!-- Message d'erreur -->
				<p id="failed">L'authentification a échouée. Veuillez recommencer.</p>

				<!-- Formulaire -->
				<form method="POST">
					<!-- Nom d'utilisateur -->
					<label for="username">Nom d'utilisateur</label>
					<input type="text" spellcheck="false" id="username" name="username" placeholder="username" required />

					<!-- Mot de passe -->
					<label for="password">Mot de passe</label>
					<input type="password" spellcheck="false" id="password" name="password" placeholder="password" required />

					<!-- Bouton d'affichage du mot de passe -->
					<label for="clear">Afficher le mot de passe</label>
					<input type="checkbox" id="clear" /><br /><br />

					<!-- Validation -->
					<input type="submit" value="Envoyer" />
				</form>
			</section>
		</main>
	</body>
</html>