<!DOCTYPE html>

<?php
	// Point d'entrée de l'environnement des scripts.
	require_once("../include/controllers/_main.php");

	// Contrôleur permettant d'authentifier un utilisateur.
	require_once($root . "/include/controllers/user.php");

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
		require_once($root . "/include/views/1_head.php");
	?>

	<body>
		<main>
			<!-- Vidéo en arrière-plan -->
			<video autoplay muted loop>
				<source src="../media/logout.mp4" type="video/mp4" />
			</video>

			<!-- Page de déconnexion -->
			<section id="logout">
				<h1>Déconnecté</h1>

				<h2>Vous avez bien été déconnecté de l'administration.</h2>

				<a href="./"><strong>Cliquez ici</strong> pour revenir à la page d'accueil.</a>
			</section>
		</main>
	</body>
</html>