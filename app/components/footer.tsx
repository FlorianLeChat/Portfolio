//
// Composant du pied de page du site.
//
import Link from "next/link";
import { Trans } from "react-i18next/TransWithoutContext";
import { faPhp } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
			{
				( process.env.NEXT_PUBLIC_RECAPTCHA_ENABLED === "true" ) && (
					<small>
						<Trans
							i18nKey="pages.index.footer_recaptcha"
							components={{
								a1: <a href="https://policies.google.com/privacy">...</a>,
								a2: <a href="https://policies.google.com/terms">...</a>
							}}
						/>
					</small>
				)
			}

			{/* Lien vers l'ancienne version du site */}
			<small>
				<FontAwesomeIcon icon={faPhp} />

				<Trans
					i18nKey="pages.index.footer_legacy"
					components={{
						a: <Link href="/legacy" />
					}}
				/>
			</small>
		</footer>
	);
}