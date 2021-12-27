<?php
	//
	// Ceci est le fichier permettant de contrôler la vue de la page des projets/réalisations.
	//

	// On définit le jeu de caractère des en-têtes EXIF
	// 	en UTF-8 (cela est utile pour lire correctement
	//	les commentaires des images).
	// 	Source : https://www.php.net/manual/fr/function.exif-read-data.php#Notes
	ini_set("exif.encode_unicode", "UTF-8");

	// On récupère les traductions nécessaires pour certaines
	//	données des projets.
	$projects = $translation->getPhrases("project");

	// On récupère les données brutes des projets.
	$projects_html = "";
	$projects_data = $data->getProjects(["identifier", "creation_date", "source_url", "languages"]);

	// On récupère toutes les images présentes dans le répertoire
	//	des images du projet.
	$path = "images/projects/";
	$files = scandir($path);

	if (PHP_OS == "Linux")
	{
		// Les environnements Linux (dont mon serveur Web sous Debian) souffrent
		//	d'un « bug » lorsque des répertoires sont analysés sous Linux,
		//	on applique donc un petit correctif.
		// 	Source : https://www.php.net/manual/fr/function.scandir.php#107215
		$files = array_diff($files, array("..", "."));	// Suppression des chemins invalides.
		$files = array_values($files);					// Réarrangement des indices du tableau.
	}

	foreach ($projects_data as $key => $value)
	{
		// On construit le titre du projet.
		// Note : durant cette étape, il est nécessaire de vérifier
		//	si le projet est « open source », dans ce cas, un lien
		//	clickable doit être ajouté.
		$url = $value["source_url"];
		$identifier = $value["identifier"];

		$name = $projects["project_" . $identifier . "_title"];
		$title = $name;

		if (!empty($url))
		{
			// Le projet possède un dépot public !
			$title = "<a href=\"$url\">$name</a>";
		}

		// On construit ensuite les images présentes dans la galerie
		//	des photos (uniquement si le répertoire existe).
		$images = "\n";

		if (is_dir($path))
		{
			foreach ($files as $key => $image)
			{
				// On vérifie si le chemin d'accès de l'image semble
				//	appartenir au projet actuellement à l'étape de la boucle.
				if (str_contains($image, $identifier))
				{
					// À ce niveau, le chemin d'accès doit comporter le nom
					//	de l'image récupéré précédemment.
					$image = $path . $image;

					// On tente de lire l'en-tête des images de la galerie des photos
					//	pour récupérer les commentaires insérées au préalable.
					$header = exif_read_data($image);

					if (array_key_exists("Comments", $header))
					{
						// Le champ des commentaires existe, on réalise une conversion
						//	du jeu de caractères pour obtenir une description lisible.
						$label = mb_convert_encoding($header["Comments"], "byte2le");
					}
					else
					{
						// Dans le cas contraire, on indique une valeur par défaut.
						$label = "N/A";
					}

					// On assemble les données récupérées pour créer la structure HTML
					//	requise pour la disposition en CSS.
					$images .= <<<IMAGE
						\t\t<div>
							\t\t<a href="$image">
								\t\t<img src="$image" draggable="false" alt="Image - $key" />
							\t\t</a>

							\t\t<p>$label</p>
						\t\t</div>\n
					IMAGE;
				}
			}
		}

		// On construit après les images qui représentent les logos
		//	de programmation utilisés par les projets.
		$logos = "";
		$languages = json_decode($value["languages"]);

		foreach ($languages as $language)
		{
			$logos .= "<img src=\"images/languages/$language.svg\" height=\"40\" draggable=\"false\" alt=\"Logo - $language\" />\n";
		}

		// On assemble enfin toutes les parties créées précédemment
		// 	pour faire une succession d'articles qui décrivent chacun
		//	les projets de manière détaillée.
		$date = $value["creation_date"];
		$description = $projects["project_" . $identifier . "_description"];

		$projects_html .= <<<ARTICLE
			<!-- Project : $name -->
			<article id="$identifier">
				<div class="properties">
					<!-- Icône -->
					<img src="images/projects/logo_$identifier.svg" width="64" height="64" draggable="false" alt="Logo - $name" />

					<!-- Nom -->
					<h2>$title</h2>

					<!-- Date -->
					<h3><em>$date</em></h3>

					<!-- Description -->
					<p>$description</p>
				</div>

				<hr />

				<!-- Galerie photos -->
				<div class="images">
					$images
				</div>

				<hr />

				<div class="languages">
					<!-- Icônes des langages utilisés -->
					$logos
				</div>
			</article>\n\n
		ARTICLE;
	}
?>

<?php
	echo($projects_html);
?>