<?php
	//
	ini_set("display_errors", 1);
	ini_set("display_startup_errors", 1);

	error_reporting(E_ALL);

	//
	$file = $_GET["target"];
	$language = "fr";

	if (isset($file))
	{
	}
	else
	{
		$file = "index";
	}
?>

<!DOCTYPE html>
<html lang="fr">
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