<!DOCTYPE html>

<?php
	// Point d'entrée de l'environnement des scripts.
	require_once("../includes/controllers/_main.php");

	// Contrôleur permettant d'authentifier un utilisateur.
	require_once("../includes/controllers/user.php");

	$user = new Portfolio\Controllers\UserAuthentication();
	$user->connector = $connector;	// Liaison avec la base de données.

	// On définit la page actuelle.
	$file = "admin";

	// On tente de connecter ensuite l'utilisateur si ce
	//	n'est pas déjà le cas et si la requête actuelle
	//	 est une requête POST.
	$message = "";
	$connected = $user->isConnected();

	if (!$connected && $_SERVER["REQUEST_METHOD"] == "POST")
	{
		$connected = $user->authenticate($_POST);

		// Si le script continue ici, alors l'authentification
		//	semble avoir échouée, on affiche un message d'erreur.
		$message = "L'authentification a échouée. Veuillez recommencer.";
	}
	else
	{
		// Dans le cas contraire, on tente de connecter l'utilisateur
		//	s'il possède un jeton d'authentification.
		if (isset($_SERVER["HTTPS"]) && !empty($_COOKIE["generated_token"]))
		{
			$connected = $user->compareToken($_COOKIE["generated_token"]);

			// La session de token peut avoir expirée depuis, donc on prépare
			//	un message pour avertir l'utilisateur.
			$message = "Votre session de connexion a expirée. Une reconnexion est nécessaire.";
		}
	}

	// On vérifie enfin si l'utilisateur est authentifié.
	// 	Note : l'utilisateur peut être déjà connecté et/ou avoir
	//		été authentifié lors de l'étape précédente.
	if ($connected)
	{
		if (isset($_POST["remember_me"]))
		{
			// L'utilisateur peut demander de se souvenir de sa connexion
			//	lors de sa prochaine venue sur la page.
			$token = bin2hex(random_bytes(32));
			$user->storeToken($token);

			setcookie("generated_token", $token, strtotime("+30 days"), "/portfolio/admin/", $_SERVER["HTTP_HOST"], false);
		}

		http_response_code(302);

		header("Location: ./");

		exit();
	}
?>

<html lang="fr">
	<!-- En-tête du site -->
	<?php
		require_once("../includes/views/1_head.php");
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

			<!-- Heure actuelle -->
			<p>00:00:00</p>
		</header>

		<main>
			<!-- Vidéo en arrière-plan -->
			<video autoplay muted loop>
				<source src="../assets/videos/login.mp4" type="video/mp4" />
			</video>

			<!-- Formulaire de connexion -->
			<section id="login">
				<h2>Contenu protégé</h2>

				<!-- Message d'erreur -->
				<p id="failed"><?php echo($message); ?></p>

				<!-- Formulaire -->
				<form method="POST">
					<!-- Nom d'utilisateur -->
					<label for="username">Nom d'utilisateur</label>
					<input type="text" autocomplete="username" spellcheck="false" id="username" name="username" placeholder="username" required />

					<!-- Mot de passe -->
					<label for="password">Mot de passe</label>
					<input type="password" autocomplete="current-password" spellcheck="false" id="password" name="password" placeholder="password" required />

					<!-- Bouton d'affichage du mot de passe -->
					<label for="clear">Afficher le mot de passe</label>
					<input type="checkbox" id="clear" /><br /><br />

					<!-- Se souvenir de la connexion -->
					<label for="remember_me">Se souvenir de moi</label>
					<input type="checkbox" id="remember_me" name="remember_me" /><br /><br />

					<!-- Validation -->
					<input type="submit" value="Envoyer" />
				</form>
			</section>
		</main>
	</body>
</html>