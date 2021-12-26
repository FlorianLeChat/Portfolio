<?php
	//
	// Contrôleur de récupération et la gestion des traductions.
	//
	namespace Portfolio\Controllers;

	include_once("include/models/language.php");

	use Portfolio\Models\Language;

	// Classe permettant de manipuler les traductions.
	class Translation extends Language
	{
		//
		// Permet de vérifier si une langue existe au niveau de la base de données.
		//
		public function checkLanguage(string $code): bool
		{
			// On récupère toutes les langues disponibles avant de les comparer à
			//	l'entrée de l'utilisateur.
			return array_search(strtoupper($code), $this->getLanguages()) !== false;
		}

		//
		// Permet de récupérer toutes les langues disponibles dans la base de données.
		//
		public function getLanguages(): array
		{
			// On prépare et on exécute une requête SQL pour récupérer toutes les langues
			// 	ayant reçu au moins une traduction.
			$query = $this->connector->prepare("SELECT DISTINCT `target_language` FROM `translations`;");
			$query->execute();

			// On retourne alors la colonne des codes de langues.
			return array_column($query->fetchAll(), "target_language");
		}

		//
		// Permet de remplacer certains caractères spéciaux dans leur équivalent en HTML.
		// 	Note : cette fonction respecte la convention suivante - https://support.discord.com/hc/en-us/articles/210298617
		//
		public function formatString(string $phrase): string
		{
			// Remplacement des retours chariot/sauts de ligne SQL par la balise "<br />".
			$phrase = str_replace("\r\n", "<br />", $phrase);

			// Remplacement des urls formattés "[url=<link>](<name>)" par la balise "<a href="<link>"><name>".
			$phrase = preg_replace("/\[url=([^\]]*)]\(([^)]*)\)/", "<a href=\"$1\">$2</a>", $phrase);

			// Replacement des caractères "**" en balise "<strong>".
			// 	Source : https://stackoverflow.com/a/56426710
			$count = 0;
			$phrase = preg_replace_callback("/[**]{2}/", function(array $matches)
				use (&$count)										// Modification par référence de la variable
				{
					++$count;										// Nombre d'itérations
					return $count % 2 ? "<strong>" : "</strong>";	// Modulo 2 pour déterminer si balise ouvrante ou fermante
				},
			$phrase);

			// Replacement des caractères "*" en balise "<em>".
			// 	Note : en cas de difficulté de compréhension, voir commentaires ci-dessus.
			$count = 0;
			$phrase = preg_replace_callback("/\*(?!\*)/", function(array $matches)
				use (&$count)
				{
					++$count;
					return $count % 2 ? "<em>" : "</em>";
				},
			$phrase);

			return $phrase;
		}

		//
		// Permet de récupérer une seule traduction dans une table donnée.
		// 	Note : cette fonction retournera forcément une chaîne de caractère non-vide.
		//
		public function getPhrase(string $name, string $table = "translations"): string
		{
			// On prépare et on exécute la requête SQL.
			$query = $this->connector->prepare("SELECT `translated_string`, `target_language` FROM $table WHERE `source_string` = ?;");
			$query->execute([$name]);

			$result = $query->fetchAll();

			// On vérifie ensuite le résultat de la requête.
			if (gettype($result) == "array" && count($result) > 0)
			{
				// Si le résultat est un tableau avec au moins un résultat,
				//	alors on tente de récupérer la traduction de la langue
				//	actuelle, cependant si elle est manquante, on utilise le
				//	français comme « langue de secours ».
				$languages = array_column($result, "target_language");
				$target_key = array_search($this->getCode(), $languages) || array_search("FR", $languages);

				return $this->formatString($result[$target_key]["translated_string"]);
			}

			// Dans le dernier, on affiche enfin la chaîne source indiquant
			//	que la traduction est manquante ou invalide.
			return "@$name";
		}

		//
		// Permet de récupérer une ou plusieurs traductions dans une table
		//	donnée et par une expression rationnelle (pattern).
		// 	Note : cette fonction retournera forcément un tableau associatif non-vide.
		//
		public function getPhrases(string $search, string $table = "translations"): array
		{
			// On prépare et on exécute la requête SQL.
			$query = $this->connector->prepare("SELECT `translated_string`, `target_language`, `source_string` FROM $table WHERE `source_string` LIKE ?;");
			$query->execute(["%$search%"]);

			$result = $query->fetchAll();

			// On vérifie le résultat de la requête.
			if (gettype($result) == "array")
			{
				// On calcule le nombre de résultat unique dans les clés
				//	de toutes les langues enregistrées.
				$keys = array_unique(array_column($result, "source_string"));
				$unique_keys = count($keys);

				// On filtre et on calcule ensuite le nombre de résultats dans
				//	la langue actuellement sélectionnée.
				$translations = array_filter($result, function($value)
				{
					return $value["target_language"] == $this->getCode();
				});

				// On calcule alors le décalage entre le nombre de traductions
				// 	que l'on devrait obtenir et le nombre obtenu avec la langue
				//	actuelle.
				//	Note : cela permet de détecter si les traductions sont incomplètes.
				$offset = $unique_keys - count($translations);

				if ($offset > 0)
				{
					// On réarrange les traductions de la langue sélectionnée et
					//	on filtre les résultats obtenus précédemment pour s'en servir
					//	comme « langue de secours ».
					$translations = array_values($translations);

					$result = array_filter($result, function($value)
					{
						return $value["target_language"] == "FR";
					});

					// On fusionne après la langue de secours et les résultats de la
					//	langue récupérée pour obtenir une traduction « complète ».
					foreach ($translations as $value)
					{
						$indice = array_search($value["source_string"], $keys);

						$result[$indice] = $value;
					}
				}
				else
				{
					// Aucune modification ne doit être apportée.
					$result = $translations;
				}
			}
			else
			{
				// Dans le cas contraire, on lance une exception pour avertir le développeur
				//	qu'il y a un problème avec la requête SQL.
				throw new \Exception("Erreur lors de la récupération des traductions pour : $search");
			}

			// On modifie enfin le résultat final pour rendre plus facile la manipulation
			//	des données par les scripts des vues.
			foreach ($result as $value)
			{
				$result[$value["source_string"]] = $this->formatString($value["translated_string"]);
			}

			return $result;
		}
	}
?>