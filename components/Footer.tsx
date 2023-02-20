//
// Composant du pied de page générique du site.
//
import { Trans } from "next-i18next";

export default function Footer()
{
	// Affichage du rendu HTML du composant.
	return (
		<footer>
			{/* Lien vers le dépôt GitHub du projet */}
			<span><Trans i18nKey="pages.index.footer_madeby" components={{ a: <a href="https://github.com/FlorianLeChat" /> }} /></span>

			{/* Date de création du site */}
			<small>&copy; {new Date().getFullYear()}</small>
		</footer>
	);
}