//
// Route vers la page de déconnexion de l'administration de l'ancienne version du site.
//

// Importation des dépendances.
import Link from "next/link";

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
				<source src={`${ getBasePath() }/assets/videos/logout.mp4`} type="video/mp4" />
			</video>

			{/* Page de déconnexion */}
			<section id="logout">
				<h1>Déconnecté</h1>

				<h2>Vous avez bien été déconnecté de l&#39;administration.</h2>

				<Link href="/legacy"><strong>Cliquez ici</strong> pour revenir à la page d&#39;accueil.</Link>
			</section>
		</>
	);
}