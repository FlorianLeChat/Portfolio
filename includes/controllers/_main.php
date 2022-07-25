<?php
	//
	// Contrôleur principal de la création et de la gestion
	//	de l'environnement d'exécution des scripts PHP.
	//

	// On affiche les erreurs liées au PHP.
	ini_set("display_errors", 1);
	ini_set("display_startup_errors", 1);

	error_reporting(E_ALL);

	// Fonctions de compatibilité pour PHP 7 et versions inférieures.
	// Ces fonctions sont nativement présentes sur PHP 8.
	if (!function_exists("str_contains"))
	{
		// Permet de vérifier si une sous-chaîne est présente dans
		//	une chaîne de caractères spécifiée.
		// 	Source : https://www.php.net/manual/fr/function.str-contains.php#125977
		function str_contains(string $source, string $search): bool
		{
			return mb_strpos($source, $search) !== false;
		}
	}

	if (!function_exists("str_starts_with"))
	{
		// Permet de vérifier si une sous-chaîne est présente
		//	au début d'une chaîne de caractères spécifiée.
		//	Source : https://www.php.net/manual/fr/function.str-starts-with.php#125913
		function str_starts_with(string $source, string $search): bool
		{
			return strncmp($source, $search, mb_strlen($search)) === 0;
		}
	}

	// Vérification systématique de l'authenticité de l'utilisateur au travers
	//	des services de Google reCAPTCHA pendant la soumission d'un formulaire.
	$recaptcha = $_POST["recaptcha"] ?? "";

	if (!empty($recaptcha))
	{
		// Exécution de la requête de vérification auprès des services Google.
		$secret = "<secret_key>";
		$request = curl_init();

		curl_setopt($request, CURLOPT_URL, "https://www.google.com/recaptcha/api/siteverify?secret=$secret&response=$recaptcha");
		curl_setopt($request, CURLOPT_RETURNTRANSFER, true);

		$result = json_decode(curl_exec($request), true);

		curl_close($request);

		// Récupération de la réponse et application des mesures adéquates
		//	afin d'empêcher ou non l'exécution du script du formulaire.
		if (is_array($result) && ($result["success"] === false || $result["score"] < 0.7))
		{
			http_response_code(401);
			header("Refresh: 0");
			exit();
		}
	}

	// On initialise le système des sessions PHP.
	session_start();

	// On réalise après la création des classes de l'ensemble du site.
	require_once("user.php");
	require_once("form.php");
	require_once("file.php");
	require_once("database.php");
	require_once("language.php");

	use Portfolio\Controllers as Raven;

	$user = new Raven\UserAuthentication();		// Authentification des utilisateurs.
	$form = new Raven\FormValidation();			// Validation des données des formulaires.
	$admin = new Raven\AdminManager();			// Contrôle des données administrateurs.
	$upload = new Raven\FileHandler();			// Gestion des fichiers téléversés.
	$connector = new Raven\Connector();			// Connexion à la base de données.
	$translation = new Raven\Translation();		// Liaison des traductions au connecteur SQL.
	$public_data = new Raven\PublicData();		// Données publiques du site.

	$connector = $connector->getPDO();

	$user->connector = $connector;
	$form->translation = $translation;
	$translation->connector = $connector;

	// On récupère ensuite la langue demandée par l'utilisateur.
	$language = htmlentities($_POST["language"] ?? "", ENT_QUOTES);

	if (empty($language))
	{
		// La langue est absente des paramètres, on tente de la
		// 	récupérer via l'en-tête HTTP ou via les sessions.
		$language = substr(strtoupper($_SERVER["HTTP_ACCEPT_LANGUAGE"] ?? $translation->getCode()), 0, 2);
	}

	// On vérifie alors si la langue est disponible.
	if ($translation->checkLanguage($language))
	{
		// La langue est disponible.
		$translation->setCode($language);
	}
	else
	{
		// Dans le cas contraire, on récupère la dernière
		//	langue définie.
		$language = $translation->getCode();
	}

	// On récupère enfin la page demandée.
	$file = htmlentities($_GET["target"] ?? "", ENT_QUOTES);

	if (empty($file) || !file_exists(__DIR__ . "/../views/$file.php"))
	{
		// Si la variable est vide ou invalide, on cible la page par défaut.
		$file = "index";
	}
?>