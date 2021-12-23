<?php
	namespace Portfolio\Controllers;

	include_once("./include/models/language.php");
	include_once("./include/controllers/database.php");

	use Portfolio\Models\Language;
	use Portfolio\Controllers\Connector;

	// Classe permettant de manipuler les traductions.
	class Translation extends Language
	{
		//
		// Permet d'initialiser certains mécanismes lorsque la classe
		//	est instanciée par un script.
		//
		public function __construct()
		{
			// On instancie le connecteur SQL.
			$this->connector = new Connector();
			$this->connector = $this->connector->getPDO();

			// On vérifie ensuite si la langue n'est pas déjà enregistrée
			// 	dans la session actuelle.
			if (!empty($_SESSION) && isset($_SESSION["language"]))
			{
				$this->setCode($_SESSION["language"]);
			}
			else
			{
				// La FRANCE !
				$this->setCode("fr");
			}
		}

		//
		// Permet de récupérer une seule traduction.
		//
		public function getPhrase(string $name, string $table)
		{
			$query = $this->connector->prepare("SELECT `translated_string` FROM ? WHERE `source_string` = ? LIMIT 1;");
			$query->execute([
				$table,	// Nom de la table
				$name	// Mot-clé de référence
			]);

			$result = $query->fetch();

			return $result != "" ? $result : "@$name";
		}
	}
?>