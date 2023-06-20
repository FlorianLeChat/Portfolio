//
// Route vers la page de connexion à l'administration de l'ancienne version du site.
//

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
				<source src={`${ getBasePath() }/assets/videos/login.mp4`} type="video/mp4" />
			</video>

			{/* Formulaire de connexion */}
			<section id="login">
				<h2>Contenu protégé</h2>

				{/* Message d'erreur */}
				<p id="failed" />

				{/* Formulaire */}
				<form method="POST">
					{/* Nom d'utilisateur */}
					<label htmlFor="username">Nom d&#39;utilisateur</label>

					<input
						type="text" autoComplete="username" spellCheck="false"
						id="username" placeholder="username" required
					/>

					{/* Mot de passe */}
					<label htmlFor="password">Mot de passe</label>

					<input
						type="password" autoComplete="current-password" spellCheck="false"
						id="password" placeholder="password" required
					/>

					{/* Récupération du mot de passe */}
					<a href="/">Mot de passe oublié ?</a>

					{/* Bouton d'affichage du mot de passe */}
					<label htmlFor="clear">Afficher le mot de passe</label>
					<input type="checkbox" id="clear" /><br /><br />

					{/* Se souvenir de la connexion */}
					<label htmlFor="remember_me">Se souvenir de moi</label>
					<input type="checkbox" id="remember_me" /><br /><br />

					{/* Validation */}
					<input type="submit" value="Envoyer" />
				</form>
			</section>
		</>
	);
}