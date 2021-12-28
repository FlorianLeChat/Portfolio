<?php
	//
	// Contrôleur principal de la création et de la gestion
	//	de l'environnement d'exécution des scripts PHP.
	//

	// On affiche les erreurs liées au PHP.
	ini_set("display_errors", 1);
	ini_set("display_startup_errors", 1);

	error_reporting(E_ALL);

	// On réalise la création de certaines variables cruciales.
	// 	Note : on utilise la variable globale « $_SERVER["DOCUMENT_ROOT"] » dans notre cas
	//		afin de permettre d'inclure ces fichiers indépendamment de la position du fichier
	//		demandeur comme par exemple le dossier « admin » de la page d'administration.
	include_once($_SERVER["DOCUMENT_ROOT"] . "/portfolio/include/controllers/language.php");
	include_once($_SERVER["DOCUMENT_ROOT"] . "/portfolio/include/controllers/database.php");
	include_once($_SERVER["DOCUMENT_ROOT"] . "/portfolio/include/controllers/form.php");

	session_start();

	$connector = new Portfolio\Controllers\Connector();		// Connexion à la base de données.
	$connector = $connector->getPDO();

	$translation = new Portfolio\Controllers\Translation();	// Liaison des traductions au connecteur.
	$translation->connector = $connector;

	$data = new Portfolio\Controllers\Data();				// Données générales du site.

	// On récupère ensuite la langue demandée par l'utilisateur.
	$language = htmlspecialchars($_POST["language"] ?? "");

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

	$language = $translation->getCode(); // Valeur finale de la langue.

	// On récupère enfin la page demandée.
	$file = htmlspecialchars($_GET["target"] ?? "");

	if (empty($file))
	{
		$file = "index"; // Page par défaut.
	}
?>