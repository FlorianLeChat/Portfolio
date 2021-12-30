<!DOCTYPE html>

<?php
	// Point d'entrée de l'environnement des scripts.
	include_once($_SERVER["DOCUMENT_ROOT"] . "/portfolio/include/controllers/_main.php");

	// Contrôleur permettant d'authentifier un utilisateur.
	include_once($_SERVER["DOCUMENT_ROOT"] . "/portfolio/include/controllers/user.php");

	$user = new Portfolio\Controllers\UserAuthentication();
	$user->connector = $connector;	// Liaison avec la base de données.

	// On définit la page actuelle.
	$file = "admin";

	// On vérifie si l'utilisateur est connecté.
	if (!$user->isConnected())
	{
		http_response_code(401);
		header("Location: login.php");
		exit();
	}
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
			<h1>Administration</h1>

			<!-- Description succincte -->
			<h2>Gestion du contenu dynamique de la base de données</h2>

			<!-- Heure actuelle -->
			<p>00:00:00</p>

			<!-- Information de connexion -->
			<p>Connecté en tant que « <?php echo($user->getUsername()); ?> »</p>
		</header>

		<main>
			<!-- Vidéo en arrière-plan -->
			<video autoplay muted loop>
				<source src="../media/landing.mp4" type="video/mp4" />
			</video>

			<!-- Visualisation et édition des tables -->
			<section id="tables">
				<h2>Édition des données</h2>

				<!-- Description de la section -->
				<p>
					Voici toutes les tables présentes dans la base de données.
					Cliquez sur l'une d'en elles pour accéder à son contenu et le modifier librement.
					Par soucis de préserver les performances du site, la visualisation se fait par tranche de <strong>50</strong> résultats.
					Pour avoir la suite des résultats d'une table, sélectionnez de nouveau la même catégorie.
				</p>

				<!-- Sélection de la catégorie -->
				<form method="POST">
					<?php
						$result = $connector->query("SHOW TABLES;")->fetchAll();

						echo("<ul id=\"categories\">");

						foreach ($result as $key => $value)
						{
							$name = $value["Tables_in_portfolio"];

							echo(<<<LI
								<li>
									<button type="submit" name="table" value="$name">
										<span>$name</span>
									</button>
								</li>
							LI);
						}

						echo("</ul>");
					?>
				</form>

				<!-- Modification des données -->
				<?php
					if ($_SERVER["REQUEST_METHOD"] == "POST")
					{
						$table = $_POST["table"];
						$result = $connector->query("SELECT * FROM $table LIMIT 50;")->fetchAll();

						echo("<ul id=\"results\">");

						print_r($result);

						foreach ($result as $key => $value)
						{

						}

						echo("</ul>");
					}
				?>
			</section>
		</main>

		<!-- Pied-de-page du site -->
		<footer>
			<ul>
				<!-- Déconnexion de l'interface -->
				<li><a href="logout.php">Se déconnecter</a></li>
			</ul>
		</footer>
	</body>
</html>