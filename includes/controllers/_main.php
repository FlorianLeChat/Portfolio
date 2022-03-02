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

	// On réalise la création de certaines variables cruciales.
	require_once("language.php");
	require_once("database.php");
	require_once("form.php");

	session_start();

	$connector = new Portfolio\Controllers\Connector();		// Connexion à la base de données.
	$connector = $connector->getPDO();

	$translation = new Portfolio\Controllers\Translation();	// Liaison des traductions au connecteur.
	$translation->connector = $connector;

	$public_data = new Portfolio\Controllers\PublicData();	// Données publiques du site.

	// On récupère ensuite la langue demandée par l'utilisateur.
	$language = htmlentities($_POST["language"] ?? "");

	if (empty($language))
	{
		// La langue est absente des paramètres, on tente de la
		// 	récupérer via l'en-tête HTTP ou via les sessions.
		$language = substr(strtoupper($_SERVER["HTTP_ACCEPT_LANGUAGE"] ?? $translation->getCode()), 0, 2);
	}

	// On vérifie ensuite si la langue est disponible.
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
	$file = htmlentities($_GET["target"] ?? "");

	if (empty($file) || ($file != "index" && $file != "projects" && $file != "skills" && $file != "contact"))
	{
		// Si la variable est vide ou invalide, on cible la page par défaut.
		$file = "index";
	}
?>