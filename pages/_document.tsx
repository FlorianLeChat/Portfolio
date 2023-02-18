//
// Page utilisée pour générer le contenu dynamique HTML de la page.
// 	Source : https://nextjs.org/docs/advanced-features/custom-document
//

// Importation des dépendances.
import Script from "next/script";
import { Html, Main, Head, NextScript } from "next/document";

export default function Document()
{
	// Affichage du rendu HTML de la page.
	return (
		<Html lang="fr" dir="auto" prefix="og: https://ogp.me/ns#">
			<Head>
				{/* Scripts JavaScript */}
				<Script src={`https://www.googletagmanager.com/gtag/js?id=${ process.env[ "NEXT_PUBLIC_ANALYTICS_IDENTIFIER" ] }`} strategy="afterInteractive" />

				{/* Google Analytics */}
				<Script strategy="afterInteractive">
					{`
						window.dataLayer = window.dataLayer || [];

						function gtag()
						{
							dataLayer.push( arguments );
						}

						gtag( "js", new Date() );
						gtag( "config", "${ process.env[ "NEXT_PUBLIC_ANALYTICS_IDENTIFIER" ] ?? "" }" );
					`}
				</Script>
			</Head>
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}