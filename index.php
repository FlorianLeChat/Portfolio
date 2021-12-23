<!DOCTYPE html>

<?php
	// On affiche les erreurs liées au PHP.
	ini_set("display_errors", 1);
	ini_set("display_startup_errors", 1);

	error_reporting(E_ALL);

	// On lance ensuite une session.
	session_start();

	include("include/controllers/language.php");

	// On créé après le mécanisme des traductions.
	use Portfolio\Controllers\Translation;

	$translation = new Translation();
	$translation = $translation->getCode();

	// On récupère enfin le fichier cible.
	$file = $_GET["target"];

	if (empty($file))
	{
		$file = "index";
	}

	echo("Langue : " . $translation);
	echo("Fichier demandé : " . $file);
?>

<html lang="<?php echo($translation); ?>">
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