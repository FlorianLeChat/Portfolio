<?php
	//
	// Contrôleur de gestion des fichiers téléversés.
	//
	namespace Portfolio\Controllers;

	require_once(__DIR__ . "/../models/file.php");

	use Portfolio\Models\File;

	// Classe permettant de traiter un fichier.
	final class FileHandler extends File
	{
		// Chemin d'accès vers le dossier des images.
		private const PATH = "../assets/images/";

		// Taille d'un fichier informatique.
		private const UNITS = ["B", "KB", "MB", "GB", "TB"];

		// Extensions et types MIME autorisés.
		private const EXTENSIONS = [
			"jpg" => "image/jpeg", "jpeg" => "image/jpeg",
			"png" => "image/png",
			"gif" => "image/gif",
			"webp" => "image/webp"
		];

		// Messages d'erreurs compréhensibles par l'utilisateur.
		private const ERROR_MESSAGES = [
			0 => "Il n'y a pas d'erreur, le fichier a été téléchargé avec succès.",
			1 => "Le poids du fichier téléchargé dépasse la directive « upload_max_filesize » de la configuration php.ini.",
			2 => "Le poids du fichier téléchargé dépasse la directive « MAX_FILE_SIZE » spécifiée dans le formulaire HTML.",
			3 => "Le fichier téléchargé n'a été que partiellement transféré.",
			4 => "Aucun fichier n'a été téléchargé.",
			6 => "Le dossier temporaire est introuvable.",
			7 => "Impossible d'écrire le fichier sur le disque.",
			8 => "Une extension PHP a arrêtée le téléchargement du fichier.",
		];

		//
		// Permet de convertir une taille binaire (bytes) en taille sous forme
		//	de chaîne de caractères lisible par l'homme.
		// Source : https://browse-tutorials.com/snippet/convert-file-size-bytes-nice-human-readable-format-php
		//
		private function bytesToString(int $size): string
		{
			$power = $size > 0 ? floor(log($size, 1024)) : 0;

			return number_format($size / pow(1024, $power), 2, ",", " ") . " " . self::UNITS[$power];
		}

		//
		// Permet de convertir une taille sous forme de chaîne de caractères
		//	en taille binaire (bytes).
		// Source : https://www.php.net/manual/en/function.ini-get.php#96996
		//
		private function stringToBytes(string $size): int
		{
			switch (substr($size, -1))
			{
				case "M": case "m":
					// Megabytes
					return (int)$size * 1048576;
				case "G": case "g":
					// Gigabytes
					return (int)$size * 1073741824;
				default:
					// Bytes
					return (int)$size;
			}
		}

		//
		// Permet de traiter intégralement le téléversement de fichiers.
		// 	Note : cette fonction n'utilise pas les informations contenu dans
		//		la variable $_FILE car elles peuvent manipuler facilement par
		//		l'utilisateur.
		//
		public function process(array $file, string $path): string
		{
			// On vérifie d'abord si le téléchargement s'est effectué sans problème.
			$error = $file["error"];

			if ($error != UPLOAD_ERR_OK)
			{
				return self::ERROR_MESSAGES[$error];
			}

			// On vérifie d'abord si le nom du fichier est valide.
			$real_name = basename($file["name"] ?? "");		// Nom réel.
			$temporary_name = $file["tmp_name"] ?? "";		// Nom temporaire.

			if (mb_strlen($real_name) > 255)
			{
				return "Le nom du fichier sélectionné est trop grand.";
			}
			elseif (!preg_match("`^[-0-9A-Z_\.]+$`i", $real_name))
			{
				return "Le nom du fichier comporte des caractères invalides.";
			}

			$this->setName($real_name); // Nom validé.

			// On vérifie si le fichier a bien été téléchargé par le serveur.
			if (!is_uploaded_file($temporary_name))
			{
				return "Le fichier sélectionné n'a pas été téléchargé par le serveur.";
			}

			// On vérifie si le répertoire de stockage est manquant ou invalide.
			// Note : si le répertoire est manquant mais valide, on tente de le créer.
			if (!is_dir(self::PATH . $path) && !mkdir(self::PATH . $path, 0755, true))
			{
				return "Le répertoire de stockage « $path » est manquant ou invalide.";
			}

			// On vérifie ensuite si ce même répertoire est accessible en écriture.
			if (!is_writable(self::PATH . $path))
			{
				return "Le répertoire de stockage « $path » n'a pas les autorisations en écriture.";
			}

			// On vérifie après si le fichier ne dépasse par la limite imposée.
			$size = filesize($temporary_name);
			$max_size = $this->stringToBytes(ini_get("upload_max_filesize"));
			$formatted_size = $this->bytesToString($size);

			if ($size <= 0)
			{
				return "Le fichier ne contient rien ou est vide de tout contenu.";
			}
			elseif ($size > $max_size)
			{
				return "Le fichier dépasse la taille limite de $formatted_size.";
			}

			$this->setSize($size); // Taille validée.

			// On vérifie alors si l'extension du fichier est autorisée.
			$type = new \finfo(FILEINFO_MIME_TYPE);
			$type = $type ? $type->file($temporary_name) : "";

			if (!array_search($type, self::EXTENSIONS, true))
			{
				return "L'extension du fichier n'est pas autorisée. Liste des extensions autorisées : " . implode(", ", array_keys(self::EXTENSIONS)) . ".";
			}

			$this->setType($type); // Extension validée.

			// On déplace enfin le fichier temporaire dans le dossier ciblé.
			$path = self::PATH . $path . "/" . $real_name;

			if (move_uploaded_file($temporary_name, $path))
			{
				// Si tout s'est passé correctement, on affiche le
				//	récapitulatif du téléversement.
				return "Nom du fichier : $real_name\nTaille du fichier : $formatted_size\nType du fichier : $type\nChemin d'accès : $path";
			}
			else
			{
				// Dans le cas contraire, on affiche une erreur.
				return "Il est impossible de déplacer le fichier temporaire.";
			}
		}

		//
		// Permet de générer la structure HTML qui permet de choisir le
		//	dossier de destination des fichiers téléversés.
		//
		public function generateHTMLPath(): string
		{
			// On lance une analyse du dossier des images du serveur.
			$html = "";
			$elements = scandir(self::PATH);

			// On applique ensuite un micro-correctif pour les systèmes Linux.
			// Pour plus de détails, rendez-vous dans « views/projects.php »
			//	entre la ligne 25 et 33.
			$elements = array_diff($elements, array("..", "."));
			$elements = array_values($elements);

			// On créé après la liste des éléments marqués comme étant un
			//	dossier et non pas un fichier.
			foreach ($elements as $element)
			{
				if (is_dir(self::PATH . $element))
				{
					$html .= "<option value=\"$element\">$element</option>";
				}
			}

			// On retourne enfin le HTML généré.
			return $html;
		}
	}
?>