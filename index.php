<!DOCTYPE html>

<?php
	// Point d'entrée de l'environnement des scripts.
	require_once("includes/controllers/_main.php");
?>

<html lang="<?= $language; ?>" dir="auto" prefix="og: https://ogp.me/ns#">
	<!-- En-tête du site -->
	<?php
		require_once("includes/views/1_head.php");
	?>

	<body>
		<!-- Avertissement page sans JavaScript -->
		<noscript><?= $translation->getPhrase("html_no_javascript"); ?></noscript>

		<!-- En-tête de la page -->
		<?php
			require_once("includes/views/2_header_$file.php");
		?>

		<main>
			<!-- Barre de navigation -->
			<?php
				require_once("includes/views/3_navigation_$file.php");
			?>

			<!-- Navigation latérale -->
			<?php
				require_once("includes/views/4_languages.php");
			?>

			<!-- Contenu de la page demandé -->
			<?php
				require_once("includes/views/$file.php");
			?>

			<!-- Overlay des contributions -->
			<?php
				require_once("includes/views/5_contributions.php");
			?>
		</main>

		<!-- Pied-de-page du site -->
		<?php
			require_once("includes/views/6_footer.php");
		?>
	</body>
</html>