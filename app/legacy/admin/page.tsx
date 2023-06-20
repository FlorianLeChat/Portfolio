//
// Route vers la page principale de l'administration de l'ancienne version du site.
//

// Importation de la feuille de style.
import "./page.scss";

// Importation des fonctions utilitaires.
import { getBasePath } from "@/utilities/NextRouter";

// Affichage de la page.
export default function Page()
{
	// Affichage du rendu HTML de la page.
	return (
		<>
			{/* Vidéo en arrière-plan */}
			<video autoPlay muted loop>
				<source src={`${ getBasePath() }/assets/videos/landing.mp4`} type="video/mp4" />
			</video>

			{/* Visualisation et édition des tables */}
			<section id="tables">
				{/* Titre de la section */}
				<h2>Édition des données</h2>

				{/* Description de la section */}
				<p>
					Voici toutes les tables présentes dans la base de données du site.
					<br /><br />
					Tout d&#39;abord, sélectionnez une table afin d&#39;afficher une partie de son contenu.
					Ensuite, vous aurez la possibilité d&#39;ajouter de nouvelles données, les modifier
					mais également de les supprimer. Enfin, par soucis de performances générales,
					la visualisation du contenu des tables se fait par tranche de résultats.
					<br /><br />
					Lors de la première requête, vous obtiendrez les <strong>25</strong> premiers résultats
					puis en allant de nouveau sur cette même table, vous obtiendrez une seconde tranche de
					résultats et ainsi de suite jusqu&#39;à la fin.
				</p>

				{/* Sélection de la catégorie */}
				<form method="POST" id="categories">
					<ul>
						$tables_html;
					</ul>
				</form>

				{/* Modification des données */}
				<form method="POST" id="data">
					{/* Texte initial */}
					<p>Aucune table n&#39;est actuellement sélectionnée.</p>

					{/* Table des données */}
					<table>
						$data_html ?? PHP_EOL;
					</table>
				</form>
			</section>

			<hr />

			{/* Téléversement de fichiers */}
			<section id="upload">
				{/* Titre de la section */}
				<h2>Téléversement de fichiers</h2>

				{/* Description de la section */}
				<p>
					Cette zone permet de téléverser des fichiers vers le serveur.
					<br /><br />
					Cela comprend la sélection de l&#39;emplacement, mais aussi la visualisation du fichier qui sera envoyé.
					<br /><br />
					Attention, <strong>seules les images</strong> (de n&#39;importe quelle extension)
					sont autorisées par le serveur. Une limite de poids de !!! B est également imposée par PHP.
				</p>

				{/* Bouton de téléversement */}
				<form method="POST" encType="multipart/form-data">
					{/* Sélection du dossier de destination */}
					<label htmlFor="path">Choisissez l&#39;emplacement de destination.</label>
					<select id="path">
						$path_html;
					</select>

					{/* Sélection des fichiers */}
					<div>
						<h3>Pour ajouter une image, glissez et déposez là dans cette zone ou cliquez ici</h3>

						<input type="file" accept="audio/*,video/*,image/*" required />
					</div>

					{/* Aperçu des fichiers */}
					<div>
						{/* <img src="#" alt="Téléversement" /> */}

						<button type="button">Supprimer l&#39;image</button>
					</div>

					{/* Actionneur pour envoyer le fichier */}
					<input type="submit" value="Envoyer" />
				</form>
			</section>

			{/* Pied-de-page du site */}
			<footer>
				<ul>
					{/* Déconnexion de l'interface */}
					<li><a href="logout.php">Se déconnecter</a></li>
				</ul>
			</footer>
		</>
	);
}