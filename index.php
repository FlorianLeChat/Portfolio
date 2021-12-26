<!DOCTYPE html>

<?php
	// Point d'entrée de l'environnement des scripts.
	include("include/controllers/_main.php")
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