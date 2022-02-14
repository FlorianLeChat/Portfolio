<?php
	//
	// Contrôleur de gestion des données du formulaire de contact.
	//
	namespace Portfolio\Controllers;

	require_once(__DIR__ . "/../models/form.php");

	use Portfolio\Models\Form;

	// Classe permettant de faire les validations du formulaire.
	final class FormValidation extends Form
	{
		public string $message = "";	// Message de validation/d'erreur.
		private array $length = [];		// Limites de caractères.
		private const FIELDS = [		// Champs du formulaire.
			"firstname",
			"lastname",
			"email",
			"subject",
			"content"
		];

		//
		// Permet de vérifier les dimensions d'une chaîne de caractères.
		//
		private function checkBounds(string $input, string $field): string
		{
			// On vérifie si le champ possède une limitation de caractères
			//	ou non (typiquement le sujet n'a pas besoin d'être contrôlé).
			$data = $this->length;

			if (array_key_exists($field, $data))
			{
				// On récupère la taille de l'entrée utilisateur ainsi
				//	que les tailles limites du champ.
				$data = $data[$field];
				$length = mb_strlen($input);

				if ($length < $data[0])
				{
					// La taille du champ est trop petite, on retourne
					//	une chaîne de caractères vides pour bloquer la
					//	validation dans l'étape suivante.
					return "";
				}
				elseif ($length > $data[1])
				{
					// La taille du champ est trop grand, on retourne
					//	la chaîne de caractères tronquée par rapport
					//	à la limite imposée.
					return mb_substr($input, 0, $data[1]);
				}
			}

			// Dans le dernier cas, on retourne juste la chaîne de
			//	caractères originale.
			return $input;
		}

		//
		// Permet de « rendre propre » des chaînes de caractères pour
		//	détecter les entrées invalides ou malveillantes.
		//
		private function serializeInput(array $data, string $field) // : string|bool (nécessite PHP 8)
		{
			// On récupère la valeur du champ depuis les données
			//	récupérées du formulaire.
			$input = $data[$field] ?? "";

			// On convertit certains caractères spéciaux en balises
			//	HTML lisibles.
			$input = htmlentities($input);

			// On supprime les espaces en trop en début et à la fin de
			//	la chaîne de caractères.
			$input = trim($input);

			// On vérifie les dimensions de chaîne de caractères.
			$input = $this->checkBounds($input, $field);

			// On vérifie si le champ de l'adresse mail est valide.
			//	Note : en plus de vérifier similairement au HTML la validité
			//		du champ, on regarde si le nom de domaine de l'adresse
			//		est connu pour sa validité.
			if ($field == "email")
			{
				// Séparation du nom d'utilisateur et du nom de domaine.
				$domain = explode("@", $input)[1] ?? "invalid";

				if (!filter_var($input, FILTER_VALIDATE_EMAIL) || !checkdnsrr($domain, "MX"))
				{
					// Si le champ est invalide, on retourne une chaîne vide.
					$input = "";
				}
			}

			// Si la chaîne de caractères est vide, alors on retourne
			//	"false", dans le cas contraire, on retourne la chaîne
			//	modifiée précédemment.
			return $input == "" ? false : $input;
		}

		//
		// Permet de mettre en majuscule la première lettre d'une
		//	entrée utilisateur.
		//
		private function capitalize(string $input): string
		{
			$first = mb_substr($input, 0, 1);	// Première lettre.
			$rest = mb_substr($input, 1);		// Suite de la chaîne.

			return mb_strtoupper($first) . $rest;
		}

		//
		// Permet de remplacer certaines informations dans le message
		//	d'erreur qui doit être affiché à l'utilisateur si l'une
		//	des vérifications du formulaire échoue.
		//
		private function formatMessage(string $field): string
		{
			// On récupère d'abord la taille minimale et maximale du champ.
			$length = $this->length[$field];

			// On récupère ensuite le message d'erreur depuis la base de données.
			$message = $this->translation->getPhrase("contact_form_warning");

			// On remplace alors les trois parties du message par les données.
			$message = str_replace("$1", $field, $message);			// Nom du champ.
			$message = str_replace("$2", $length[0], $message);		// Taille minimale.
			$message = str_replace("$3", $length[1], $message);		// Taille maximale.

			// On retourne enfin le message modifié.
			return $message;
		}

		//
		// Permet de définir les limites de certains champs du formulaire.
		// 	Note : ces limites sont définies arbitrairement.
		//
		public function setLimits(array $limits)
		{
			$this->length = $limits;
		}

		//
		// Permet de vérifier chaque champ des données du formulaire qui ont
		//	été envoyés par l'utilisateur.
		//
		public function validate(array $data): bool
		{
			// On itére à travers tous les champs connus pour
			//	réaliser les vérifications.
			foreach ($this::FIELDS as $value)
			{
				// On rend propre l'entrée utilisateur avant
				//	de la vérifier.
				$field = $this->serializeInput($data, $value);

				if (!$field)
				{
					// Si elle est invalide, on prépare alors le
					//	message d'erreur qui doit être affiché.
					$this->message = $this->formatMessage($value);

					return false;
				}
				else
				{
					// Dans le cas contraire, on la place en mémoire
					//	après avoir mis la première lettre en majuscule.
					// 	(sauf l'adresse mail de la personne).
					if ($value != "email")
					{
						$field = $this->capitalize($field);
					}

					$this->{"set" . $this->capitalize($value)}($field);	// Exemple : "setFirstName()"
				}
			}

			// Arrivée à cette étape, les vérifications se sont déroulées avec succès.
			$this->message = $this->translation->getPhrase("contact_form_success");

			return true;
		}
	}
?>