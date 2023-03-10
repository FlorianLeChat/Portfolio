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
	// Déclaration des constantes.
	const url = new URL( process.env[ "NEXT_PUBLIC_BASE_PATH" ] + props.__NEXT_DATA__.page, process.env[ "NEXT_PUBLIC_URL" ] );
	const locale = props.__NEXT_DATA__.locale ?? i18nextConfig.i18n.defaultLocale;

	// Affichage du rendu HTML de la page.
	return (
		<Html lang={locale} dir="auto" prefix="og: https://ogp.me/ns#">
			<Head>
				{/* Informations pour les moteurs de recherche */}
				<meta property="og:type" content="website" />
				<meta property="og:url" content={url.href} />
				<meta property="og:locale" content={locale} />
				<meta property="og:title" content={process.env[ "NEXT_PUBLIC_TITLE" ]} />
				<meta property="og:description" content={process.env[ "NEXT_PUBLIC_DESCRIPTION" ]} />
				<meta property="og:image" content={process.env[ "NEXT_PUBLIC_BANNER" ]} />

				<meta property="twitter:card" content="summary_large_image" />
				<meta property="twitter:url" content={url.href} />
				<meta property="twitter:title" content={process.env[ "NEXT_PUBLIC_TITLE" ]} />
				<meta property="twitter:description" content={process.env[ "NEXT_PUBLIC_DESCRIPTION" ]} />
				<meta property="twitter:image" content={process.env[ "NEXT_PUBLIC_BANNER" ]} />
				<meta property="twitter:creator" content={process.env[ "NEXT_PUBLIC_TWITTER" ]} />

				{/* Pré-connexion des ressources externes */}
				<link rel="preconnect" href="https://www.google.com" />
				<link rel="preconnect" href="https://www.gstatic.com" />

				{/* Scripts JavaScript */}
				<Script src={`https://www.googletagmanager.com/gtag/js?id=${ process.env[ "NEXT_PUBLIC_ANALYTICS_IDENTIFIER" ] }`} strategy="afterInteractive" />
				<Script src={`https://www.google.com/recaptcha/api.js?render=${ process.env[ "NEXT_PUBLIC_CAPTCHA_PUBLIC_KEY" ] }`} strategy="afterInteractive" />

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