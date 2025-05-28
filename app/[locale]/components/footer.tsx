//
// Composant du pied de page du site.
//
import { faPhp } from "@fortawesome/free-brands-svg-icons";
import { getTranslations } from "next-intl/server";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default async function Footer()
{
	// Déclaration des variables d'état.
	const messages = await getTranslations();

	// Affichage du rendu HTML du composant.
	return (
		<footer>
			<span>
				{/* Lien vers le dépôt GitHub du projet */}
				{messages.rich( "landing.footer_madeby", {
					a: ( chunks ) => (
						<a
							rel="noopener noreferrer"
							href="https://github.com/FlorianLeChat"
							target="_blank"
						>
							{chunks}
						</a>
					)
				} )}

				{/* Date de création du site */}
				<small>&copy; {new Date().getFullYear()}</small>
			</span>

			{/* Lien vers l'ancienne version du site */}
			<small>
				<FontAwesomeIcon icon={faPhp} />

				{messages.rich( "landing.footer_legacy", {
					a: ( chunks ) => (
						<a href="https://legacy.florian-dev.fr/portfolio/">
							{chunks}
						</a>
					)
				} )}
			</small>
		</footer>
	);
}