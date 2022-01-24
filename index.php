<!DOCTYPE html>

<?php
	// Point d'entrée de l'environnement des scripts.
	require_once("include/controllers/_main.php");
?>

<html lang="<?php echo($language); ?>">
	<!-- En-tête du site -->
	<?php
		require_once("include/views/1_head.php");
	?>

	<body>
		<!-- Avertissement page sans JavaScript -->
		<noscript>Votre navigateur ne supporte pas ou refuse de charger le JavaScript.</noscript>

		<!-- En-tête de la page -->
		<?php
			require_once("include/views/2_header_$file.php");
		?>

		<main>
			<!-- Barre de navigation -->
			<?php
				require_once("include/views/3_navigation_$file.php");
			?>

			<!-- Navigation latérale -->
			<?php
				require_once("include/views/4_languages.php");
			?>

			<!-- Contenu de la page demandé -->
			<?php
				require_once("include/views/$file.php");
			?>

			<!-- Overlay des contributions -->
			<?php
				require_once("include/views/5_contributions.php");
			?>
		</main>

		<!-- Pied-de-page du site -->
		<?php
			require_once("include/views/6_footer.php");
		?>
	</body>
</html>