<!DOCTYPE html>

<?php
	// Point d'entrée de l'environnement des scripts.
	include_once($_SERVER["DOCUMENT_ROOT"] . "/portfolio/include/controllers/_main.php");

	// Contrôleur permettant d'authentifier un utilisateur.
	include_once($_SERVER["DOCUMENT_ROOT"] . "/portfolio/include/controllers/user.php");

	$user = new Portfolio\Controllers\UserAuthentication();
	$user->connector = $connector;	// Liaison avec la base de données.

	// On définit ensuite la page actuelle.
	$file = "admin";

	// On procède enfin à la déconnexion de l'utilisateur.
	$user->destroy();
?>

<html lang="fr">
	<!-- En-tête du site -->
	<?php
		include_once($_SERVER["DOCUMENT_ROOT"] . "/portfolio/include/views/1_head.php");
	?>

	<body>
		<main>
			<!-- Page de déconnexion -->
			<section id="logout">
				<h1>Déconnecté</h1>

				<h2>Vous avez bien été déconnecté de l'administration.</h2>

				<a href="./"><strong>Cliquez ici</strong> pour revenir à la page d'accueil.</a>
			</section>
		</main>
	</body>
</html>