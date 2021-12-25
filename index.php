<!DOCTYPE html>

<?php
	// On affiche les erreurs liées au PHP.
	ini_set("display_errors", 1);
	ini_set("display_startup_errors", 1);

	error_reporting(E_ALL);

	// On réalise la création de certaines variables cruciales.
	include_once("include/controllers/language.php");
	include_once("include/controllers/database.php");

	use Portfolio\Controllers\Translation;
	use Portfolio\Controllers\Connector;
	use Portfolio\Controllers\Data;

	session_start();

	$connector = new Connector();		// Connexion à la base de données.
	$connector = $connector->getPDO();

	$translation = new Translation();	// Liaison des traductions au connecteur.
	$translation->connector = $connector;

	$data = new Data();					// Données générales du site.

	// On récupère ensuite la langue demandée par l'utilisateur.
	$language = htmlspecialchars($_GET["lang"]);

	if (empty($language))
	{
		// La langue est absent des paramètres, on tente de la
		// 	récupérer en interne via les sessions.
		$language = $translation->getCode();
	}
	else
	{
		// Dans l'autre cas, on vérifie la langue du paramètre GET
		//	avant de l'appliquer comme nouvelle langue (après vérification).
		if ($translation->checkLanguage($language))
		{
			$translation->setCode($language);
		}
	}

	// On récupère enfin la page demandée.
	$file = htmlspecialchars($_GET["target"]);

	if (empty($file))
	{
		$file = "index";	// Page par défaut.
	}

	echo("Langue : " . $language);
	echo("Fichier demandé : " . $file);
?>

<html lang="<?php echo($language); ?>">
	<!-- En-tête du site -->
	<?php
		include_once("include/views/1_head.php");
	?>

	<body>
		<!-- En-tête de la page -->
		<?php
			include_once("include/views/2_header.php");
		?>

		<main>
			<!-- Barre de navigation -->
			<?php
				include_once("include/views/3_navigation.php");
			?>

			<!-- Navigation latérale -->
			<?php
				include_once("include/views/4_languages.php");
			?>

			<!-- Contenu de la page demandé -->
			<?php
				include_once("include/views/$file.php");
			?>

			<!-- Overlay des contributions -->
			<?php
				include_once("include/views/5_contributions.php");
			?>
		</main>
	</body>

	<!-- Pied-de-page du site -->
	<?php
		include_once("include/views/6_footer.php");
	?>
</html>