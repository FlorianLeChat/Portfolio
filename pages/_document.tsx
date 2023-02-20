//
// Page utilisée pour générer le contenu dynamique HTML de la page.
// 	Source : https://nextjs.org/docs/advanced-features/custom-document
//

// Importation des fichiers de configuration.
import i18nextConfig from "@/next-i18next.config";

// Importation des dépendances.
import Script from "next/script";
import { Html, Main, Head, NextScript } from "next/document";

// Importation des types.
import type { DocumentProps } from "next/document";

export default function Document( props: DocumentProps )
{
	// Affichage du rendu HTML de la page.
	return (
		<Html lang={props.__NEXT_DATA__.locale ?? i18nextConfig.i18n.defaultLocale} dir="auto" prefix="og: https://ogp.me/ns#">
			<Head>
				{/* Scripts JavaScript */}
				<Script src={`https://www.googletagmanager.com/gtag/js?id=${ process.env[ "NEXT_PUBLIC_ANALYTICS_IDENTIFIER" ] }`} strategy="afterInteractive" />

				{/* Google Analytics */}
				<Script id="google-analytics" strategy="afterInteractive">
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