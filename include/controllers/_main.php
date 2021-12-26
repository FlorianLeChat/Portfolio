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
	include_once("include/controllers/language.php");
	include_once("include/controllers/database.php");

	use Portfolio\Controllers\Translation;
	use Portfolio\Controllers\Connector;
	use Portfolio\Controllers\Data;

	session_start();

	$connector = new Connector();			// Connexion à la base de données.
	$connector = $connector->getPDO();

	$translation = new Translation();		// Liaison des traductions au connecteur.
	$translation->connector = $connector;

	$data = new Data();						// Données générales du site.

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
?>