<?php
	//
	// Ceci est le fichier permettant de contrôler la vue de l'en-tête du site.
	//

	// On récupère les traductions depuis la base de données.
	$head = $translation->getPhrases("head");

	// On détermine le chemin d'accès vers les feuilles de style
	//	CSS et fichiers JavaScript.
	//	Note : cette vérification est faite pour inclure ce fichier
	//		dans la page d'administration.
	$path = "";

	if (str_contains($_SERVER["SCRIPT_NAME"], "admin"))
	{
		$path = "../$path";
	}
?>

<head>
	<!-- Méta-données du document -->
	<meta charset="utf-8" />
	<meta name="author" content="Florian Trayon" />
	<meta name="description" content="<?= $head["head_description"]; ?>" />
	<meta name="keywords" lang="<?= $language; ?>" content="portfolio, web, html, css, frontend, backend, fullstack" />
	<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
	<meta name="theme-color" content="#0085ff" />

	<meta property="og:type" content="website" />
	<meta property="og:url" content="<?= "http" . (!empty($_SERVER["HTTPS"]) ? "s" : "") . "://" . $_SERVER["HTTP_HOST"] . "/"; ?>" />
	<meta property="og:title" content="<?= $head["head_title"]; ?>" />
	<meta property="og:description" content="<?= $head["head_description"]; ?>" />
	<meta property="og:image" content="https://opengraph.githubassets.com/9705808f387952e68054c08ddbefffa93ca36c7917a948d1707ea5bf4a222fe6/FlorianLeChat/Portfolio" />

	<meta property="twitter:card" content="summary_large_image" />
	<meta property="twitter:url" content="<?= "http" . (!empty($_SERVER["HTTPS"]) ? "s" : "") . "://" . $_SERVER["HTTP_HOST"] . "/"; ?>" />
	<meta property="twitter:title" content="<?= $head["head_title"]; ?>" />
	<meta property="twitter:description" content="<?= $head["head_description"]; ?>" />
	<meta property="twitter:image" content="https://opengraph.githubassets.com/9705808f387952e68054c08ddbefffa93ca36c7917a948d1707ea5bf4a222fe6/FlorianLeChat/Portfolio" />

	<!-- Titre du document -->
	<title><?= $head["head_title"]; ?></title>

	<!-- Pré-connexion des ressources externes -->
	<link rel="preconnect" href="https://www.google.com" />
	<link rel="preconnect" href="https://www.gstatic.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" />
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://maxcdn.bootstrapcdn.com" />
	<link rel="preconnect" href="https://www.google-analytics.com" />

	<!-- Polices & feuilles de style CSS -->
	<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;700&display=swap" crossorigin="anonymous" />
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/normalize.css@8.0.1/normalize.min.css" crossorigin="anonymous" />
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/flag-icons@6.6.6/css/flag-icons.min.css" crossorigin="anonymous" />
	<link rel="stylesheet" href="<?= $path . "styles/$file.css"; ?>" media="screen" />

	<!-- Scripts JavaScript -->
	<script src="https://www.googletagmanager.com/gtag/js?id=<?= ANALYTICS_TAG; ?>" crossorigin="anonymous" defer></script>
	<script src="https://www.google.com/recaptcha/api.js?render=<?= CAPTCHA_PUBLIC_KEY; ?>" defer></script>
	<script src="https://cdn.jsdelivr.net/npm/vanilla-lazyload@17.8.3/dist/lazyload.min.js" crossorigin="anonymous" defer></script>

	<!--[if lte IE 9]>
		<script src="https://cdn.jsdelivr.net/npm/respond.js@1.4.2/dest/respond.min.js"></script>
		<script src="https://cdn.jsdelivr.net/npm/html5shiv@3.7.3/dist/html5shiv.min.js"></script>
	<![endif]-->

	<script src="<?= $path . "scripts/main.js"; ?>" defer></script>
	<script src="<?= $path . "scripts/$file.js"; ?>" defer></script>

	<script>
		// Clé de sécurité publique pour le service de Google reCAPTCHA.
		const captcha_public_key = "<?= CAPTCHA_PUBLIC_KEY; ?>";

		// Identifiant unique pour les mesures de Google Analytics.
		const analytics_identifier = "<?= ANALYTICS_TAG; ?>";
	</script>

	<!-- Icônes et manifeste du document -->
	<link rel="icon" type="image/webp" sizes="16x16" href="<?= $path . "assets/favicons/16x16.webp"; ?>" />
	<link rel="icon" type="image/webp" sizes="32x32" href="<?= $path . "assets/favicons/32x32.webp"; ?>" />
	<link rel="icon" type="image/webp" sizes="48x48" href="<?= $path . "assets/favicons/48x48.ico"; ?>" />
	<link rel="icon" type="image/webp" sizes="192x192" href="<?= $path . "assets/favicons/192x192.webp"; ?>" />
	<link rel="icon" type="image/webp" sizes="512x512" href="<?= $path . "assets/favicons/512x512.webp"; ?>" />

	<link rel="apple-touch-icon" href="<?= $path . "assets/favicons/180x180.webp"; ?>" />
	<link rel="manifest" href="<?= $path . "manifest.json"; ?>" />
</head>