//
// Composant du pied de page générique du site.
//
import { Trans } from "react-i18next/TransWithoutContext";

export default function Footer()
{
	// Affichage du rendu HTML du composant.
	return (
		<footer>
			<span>
				{/* Lien vers le dépôt GitHub du projet */}
				<Trans
					i18nKey="pages.index.footer_madeby"
					components={{
						a: <a href="https://github.com/FlorianLeChat">...</a>
					}}
				/>

				{/* Date de création du site */}
				<small>&copy; {new Date().getFullYear()}</small>
			</span>

			{/* Avertissement de Google reCAPTCHA */}
			<small>
				<Trans
					i18nKey="pages.index.footer_recaptcha"
					components={{
						a1: <a href="https://policies.google.com/privacy">...</a>,
						a2: <a href="https://policies.google.com/terms">...</a>
					}}
				/>
			</small>
		</footer>
	);
}