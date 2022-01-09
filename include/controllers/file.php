<?php
	//
	// Contrôleur de gestion des données utilisateurs.
	//
	namespace Portfolio\Controllers;

	include_once($_SERVER["DOCUMENT_ROOT"] . "/portfolio/include/models/file.php");

	use Portfolio\Models\File;

	// Classe permettant de traiter un fichier.
	class FileHandler extends File
	{
		public $message = "";							// Message de validation/d'erreur.
		private $units = ["B", "KB", "MB", "GB", "TB"];	// Taille d'un fichier informatique.
		private $path = "../images/";					// Chemin d'accès vers le dossier des images.

		//
		// Permet de convertir une taille binaire en taille lisible par l'homme.
		// Source : https://browse-tutorials.com/snippet/convert-file-size-bytes-nice-human-readable-format-php
		//
		private function formatSize(int $size): string
		{
			$power = $size > 0 ? floor(log($size, 1024)) : 0;

			return number_format($size / pow(1024, $power), 2, ",", " ") . " " . $this->units[$power];
		}

		//
		//
		// 	Note : cette fonction n'utilise pas les informations contenu dans
		//		la variable $_FILE car elles peuvent manipuler facilement par
		//		l'utilisateur.
		//
		public function process(array $file, string $path): string
		{
			// array(5) { ["name"]=> string(41) "13739560_1845045812390581_110493324_n.jpg"
			// ["type"]=> string(10) "image/jpeg" ["tmp_name"]=> string(14) "/tmp/phpJ8d8mZ" ["error"]=> int(0) ["size"]=> int(48281) }


			// On récupère le nom du fichier (temporaire et réel).
			$real_name = $file["name"] ?? "";
			$temp_name = $file["tmp_name"] ?? "";

			// On vérifie si le fichier a bien été téléchargé par le serveur.
			if (!is_uploaded_file($temp_name))
			{
				$this->message = "Le fichier sélectionné n'a pas été téléchargé par le serveur.";
				return false;
			}

			// On vérifie si le répertoire de sauvegarde est manquant.
			if (!is_dir($this->path) && !mkdir($this->path, 0755, true))
			{
				$this->message = "Le répertoire de stockage « " . $this->path . " » est manquant.";
				return false;
			}

			// On vérifie si le téléchargement s'est effectué sans problème.
			// // Messages d'erreurs compréhensible par l'utilisateur final.
			// const ERROR_MESSAGES = [
			// 	0 => "Il n'y a pas d'erreur, le fichier a été téléchargé avec succès.",
			// 	1 => "Le poids du fichier téléchargé dépasse la directive « upload_max_filesize » de la configuration php.ini.",
			// 	2 => "Le poids du fichier téléchargé dépasse la directive « MAX_FILE_SIZE » spécifié dans le formulaire HTML.",
			// 	3 => "Le fichier téléchargé n'a été que partiellement transféré.",
			// 	4 => "Aucun fichier n'a été téléchargé.",
			// 	6 => "Le dossier temporaire est introuvable.",
			// 	7 => "Impossible d'écrire le fichier sur le disque.",
			// 	8 => "Une extension PHP a arrêté le téléchargement du fichier.",
			// ];

			// if ($error != UPLOAD_ERR_OK)
			// {
			// 	return ERROR_MESSAGES[$error];
			// }

			// On vérifie si le fichier ne dépasse par la limite imposée.
			$size = filesize($temp_name);

			if ($size == 0)
			{
				$this->message = "Le fichier ne contient rien ou vide de tout contenu.";
				return false;
			}
			else if ($size > MAX_SIZE)
			{
				$this->message = "Le fichier dépasse la taille limite de " . formatSize(MAX_SIZE) . ".";
				return false;
			}

			// On vérifie le type du fichier.
			$type = new finfo(FILEINFO_MIME_TYPE);
			$type = $type ? $type->file($temp_name) : "";

			// On vérifie alors si l'extension du fichier est autorisée.
			// Note : on évite d'utiliser l'extension/le type envoyé par le client (risque de manipulation).
			// if (!array_search($type, EXTENSIONS, true))
			// 	return "L'extension du fichier n'est pas autorisée. Liste des extensions autorisées : " . implode(", ", array_keys(EXTENSIONS)) . ".";

			// On vérifie alors si les données ont été validées avec succès.
			// if (is_bool($state))
			// {
			// 	$url = STORAGE_FOLDER . "/" . sha1_file($temp_name) . "." . explode("/", $type)[1];

			// 	if (move_uploaded_file($temp_name, $url))
			// 	{
			// 		// On déplace enfin le fichier en indiquant ses informations.
			// 		$size = formatSize($size);

			// 		return <<<RESULT
			// 			<ul>
			// 				<li>Nom du fichier : $real_name</li>
			// 				<li>Taille du fichier : $size</li>
			// 				<li>Type du fichier : $type</li>
			// 				<li>URL final : <a href="$url" target="_blank">$_SERVER[HTTP_HOST]/$url</a></li>
			// 			</ul>
			// 		RESULT;
			// 	}
			// 	else
			// 	{
			// 		// Dans le cas contraire, on affiche un message d'erreur.
			// 		return "Il est impossible de déplacer le fichier temporaire.";
			// 	}
			// }

			// On retourne le message d'erreur en tout dernière possibilité.
			return true;
		}

		//
		// Permet de générer la structure HTML qui permet de choisir le
		//	dossier de destination des fichiers téléversés.
		//
		public function generateHTMLPath(): string
		{
			// On lance une analyse du dossier des images du serveur.
			$html = "";
			$elements = scandir($this->path);

			// On applique ensuite un micro-correctif pour les systèmes Linux.
			// Pour plus de détails, rendez-vous dans « views/projects.php »
			//	entre la ligne 25 et 33.
			if (PHP_OS == "Linux")
			{
				$elements = array_diff($elements, array("..", "."));
				$elements = array_values($elements);
			}

			// On créé après la liste des éléments marqués comme étant un
			//	dossier et non pas un fichier.
			foreach ($elements as $element)
			{
				if (is_dir($this->path . $element))
				{
					$html .= "<option value=\"$element\">$element</option>\n";
				}
			}

			// On retourne enfin le HTML généré.
			return $html;
		}
	}
?>