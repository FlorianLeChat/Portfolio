//
// Page utilisée pour générer le contenu dynamique HTML de la page.
//  Source : https://nextjs.org/docs/advanced-features/custom-document
//

// Importation des dépendances.
import Script from "next/script";
import { Html, Main, Head, NextScript } from "next/document";

// Importation des types.
import type { DocumentProps } from "next/document";

export default function Document( { __NEXT_DATA__ }: DocumentProps )
{
	// Déclaration des constantes.
	const recaptchaUrl = new URL( "https://www.google.com/recaptcha/api.js" );
	recaptchaUrl.searchParams.append( "render", process.env.NEXT_PUBLIC_CAPTCHA_PUBLIC_KEY ?? "" );

	// Affichage du rendu HTML de la page.
	return (
		<Html lang={__NEXT_DATA__.locale} dir="auto" prefix="og: https://ogp.me/ns#">
			<Head>
				{/* Pré-connexion des ressources externes */}
				<link rel="preconnect" href="https://www.google.com" />
				<link rel="preconnect" href="https://www.gstatic.com" />

				{/* Scripts JavaScript */}
				<Script src={recaptchaUrl.href} strategy="beforeInteractive" />
			</Head>
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}