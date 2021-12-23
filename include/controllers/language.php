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
		}

		//
		// Permet de récupérer une seule traduction dans une table donnée.
		//
		public function getPhrase(string $name, string $table): string
		{
			// Création et exécution de la requête.
			$query = $this->connector->prepare("SELECT `translated_string` FROM $table WHERE `source_string` = ? AND `target_language` = ? LIMIT 1;");
			$query->execute([
				$name,				// Mot-clé du mot
				$this->getCode()	// Code ISO de la langue
			]);

			$result = $query->fetch(); // Un seul résultat.

			if (gettype($result) == "array" && count($result) > 0)
			{
				// Si le résultat est une liste numérique et contenant
				//	plus d'un résultat, alors on retourne la traduction.
				return $result["translated_string"];
			}

			// Dans le cas contraire, on envoie l'identifiant de
			//	la traduction pour signifier qu'il y a eu un problème
			//	lors de sa récupération.
			return "@$name";
		}

		//
		// Permet de récupérer une ou plusieurs traductions dans une table
		//	donnée et par une expression rationnelle (pattern).
		//
		public function getPhrases(string $search, string $table, int $limit): array
		{
			// Création et exécution de la requête.
			$query = $this->connector->prepare("SELECT `translated_string` FROM $table WHERE `source_string` LIKE ? AND `target_language` = ? LIMIT ?;");
			$query->execute([
				$search . "%",		// Expression de référence
				$this->getCode(),	// Code ISO de la langue
				$limit				// Nombre limite de résultats
			]);

			$result = $query->fetchAll(); // Plus d'un résultat.

			if (count($result) > 0)
			{
				// Si le résultat est une liste contenant plus d'un
				// 	résultat, alors on retourne la liste complète.
				return $result;
			}
			else
			{
				// Dans le cas contraire, on lance une exception pour
				//	avertir le développeur qu'il y a un problème avec
				//	la requête SQL.
				throw new \Exception("Erreur lors de la récupération des traductions pour : $search");
			}
		}
	}
?>