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
	$projects_data = $public_data->getTableData("projects", ["identifier", "creation_date", "source_url", "languages"]);

	// On récupère toutes les images présentes dans le répertoire
	//	des images du projet.
	$path = "assets/images/projects/";
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

	foreach ($projects_data as $project)
	{
		// On construit le titre du projet.
		// Note : durant cette étape, il est nécessaire de vérifier
		//	si le projet est « open source », dans ce cas, un lien
		//	clickable doit être ajouté.
		$url = $project["source_url"];
		$identifier = $project["identifier"];

		$name = $projects["project_" . $identifier . "_title"];
		$title = $name;

		if (!empty($url))
		{
			// Le projet possède un dépôt public !
			$title = "<a href=\"$url\">$name</a>";
		}

		// On construit ensuite les images présentes dans la galerie
		//	des photos (uniquement si le répertoire existe).
		$images = PHP_EOL;
		$indice = 0;

		if (is_dir($path))
		{
			foreach ($files as $image)
			{
				// On vérifie si le chemin d'accès de l'image semble
				//	appartenir au projet actuellement à l'étape de la boucle.
				if (str_contains($image, $identifier . "_gallery"))
				{
					// À ce niveau, le chemin d'accès doit comporter le nom
					//	de l'image récupéré précédemment.
					$image = $path . $image;
					$indice++;

					// On tente de lire l'en-tête des images de la galerie des photos
					//	pour récupérer les commentaires insérées au préalable.
					$header = exif_read_data($image);

					if (array_key_exists("Comments", $header))
					{
						// Le champ des commentaires existe, on réalise des conversions
						//	du jeu de caractères pour obtenir une description lisible.
						$label = mb_convert_encoding($header["Comments"], "byte2le");
						$label = mb_convert_encoding($label, "HTML-ENTITIES", "byte2be");
					}
					else
					{
						// Dans le cas contraire, on indique une valeur par défaut.
						$label = "N/A";
					}

					// On assemble les données récupérées pour créer la structure HTML
					//	requise pour la disposition en CSS.
					$images .= "
						<div>
							<a href=\"$image\" target=\"_blank\">
								<img src=\"#\" data-src=\"$image\" draggable=\"false\" alt=\"Image - $indice\" />
							</a>

							<figcaption>$label</figcaption>
						</div>
					";
				}
			}
		}

		// On construit après les images qui représentent les logos
		//	de programmation utilisés par les projets.
		$logos = "";
		$languages = array_reverse(json_decode($project["languages"]));

		foreach ($languages as $language)
		{
			$logos .= "<img src=\"#\" data-src=\"assets/images/languages/$language.svg\" height=\"40\" draggable=\"false\" alt=\"Logo - $language\" />";
		}

		// On assemble enfin toutes les parties créées précédemment
		// 	pour faire une succession d'articles qui décrivent chacun
		//	les projets de manière détaillée.
		$date = $project["creation_date"];
		$description = $projects["project_" . $identifier . "_description"];

		$projects_html .= "
			<!-- Project : $name -->
			<article id=\"$identifier\">
				<div class=\"properties\">
					<!-- Icône -->
					<img src=\"#\" data-src=\"assets/images/projects/logo_$identifier.svg\" width=\"64\" height=\"64\" draggable=\"false\" alt=\"Logo - $name\" />

					<!-- Nom -->
					<h2>$title</h2>

					<!-- Date -->
					<h3><em>$date</em></h3>

					<!-- Description -->
					<p>$description</p>
				</div>

				<hr />

				<!-- Galerie photos -->
				<div class=\"images\">
					<img src=\"#\" data-src=\"assets/images/decorations/arrow_left.svg\" alt=\"\" />
					$images
					<img src=\"#\" data-src=\"assets/images/decorations/arrow_right.svg\" alt=\"\" />
				</div>

				<hr />

				<div class=\"languages\">
					<!-- Icônes des langages utilisés -->
					$logos
				</div>
			</article>
		";
	}

	echo($projects_html);
?>