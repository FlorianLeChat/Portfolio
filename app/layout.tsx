//
// Structure HTML générale des pages du site.
//  Source : https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts#root-layout-required
//

// Importation du normalisateur TypeScript.
import "@total-typescript/ts-reset";

// Importation des dépendances.
import { dir } from "i18next";
import { config } from "@fortawesome/fontawesome-svg-core";
import { headers, cookies } from "next/headers";
import { Poppins, Open_Sans } from "next/font/google";
import { Suspense, lazy, type ReactNode } from "react";

// Importation des types.
import type { Metadata } from "next";

// Importation des fonctions utilitaires.
import { getLanguage } from "@/utilities/NextRouter";

// Importation des composants.
const Header = lazy( () => import( "./components/header" ) );
const Footer = lazy( () => import( "./components/footer" ) );
const Loading = lazy( () => import( "./components/loading" ) );
const Analytics = lazy( () => import( "./components/analytics" ) );
const Recaptcha = lazy( () => import( "./components/recaptcha" ) );
const ScrollTop = lazy( () => import( "./components/scroll-top" ) );
const SpeechRecognition = lazy( () => import( "./components/speech-recognition" ) );

// Déclaration des propriétés de la page.
export const metadata: Metadata = {
	// Méta-données du document.
	title: process.env.NEXT_PUBLIC_TITLE,
	authors: [ { name: process.env.NEXT_PUBLIC_AUTHOR, url: "https://github.com/FlorianLeChat" } ],
	description: process.env.NEXT_PUBLIC_DESCRIPTION,
	keywords: process.env.NEXT_PUBLIC_TAGS,
	viewport: "width=device-width, initial-scale=1, viewport-fit=cover",
	manifest: new URL( "manifest.json", process.env.NEXT_PUBLIC_URL ),
	themeColor: "#306cc4",
	metadataBase: new URL( process.env.NEXT_PUBLIC_URL ?? "" ),

	// Icônes du document.
	icons: {
		icon: [
			{
				url: new URL( "assets/favicons/16x16.webp", process.env.NEXT_PUBLIC_URL ),
				type: "image/webp",
				sizes: "16x16"
			},
			{
				url: new URL( "assets/favicons/32x32.webp", process.env.NEXT_PUBLIC_URL ),
				type: "image/webp",
				sizes: "32x32"
			},
			{
				url: new URL( "assets/favicons/48x48.webp", process.env.NEXT_PUBLIC_URL ),
				type: "image/webp",
				sizes: "48x48"
			},
			{
				url: new URL( "assets/favicons/192x192.webp", process.env.NEXT_PUBLIC_URL ),
				type: "image/webp",
				sizes: "192x192"
			},
			{
				url: new URL( "assets/favicons/512x512.webp", process.env.NEXT_PUBLIC_URL ),
				type: "image/webp",
				sizes: "512x512"
			}
		],
		apple: [
			{
				url: new URL( "assets/favicons/180x180.webp", process.env.NEXT_PUBLIC_URL ),
				type: "image/webp",
				sizes: "180x180"
			}
		]
	},

	// Informations pour les moteurs de recherche.
	openGraph: {
		url: process.env.NEXT_PUBLIC_URL,
		type: "website",
		title: process.env.NEXT_PUBLIC_TITLE,
		description: process.env.NEXT_PUBLIC_DESCRIPTION,
		images: [
			{
				url: process.env.NEXT_PUBLIC_BANNER ?? ""
			}
		]
	},

	// Informations pour la plate-forme Twitter.
	twitter: {
		card: "summary_large_image",
		title: process.env.NEXT_PUBLIC_TITLE,
		creator: process.env.NEXT_PUBLIC_TWITTER,
		description: process.env.NEXT_PUBLIC_DESCRIPTION,
		images: [
			{
				url: process.env.NEXT_PUBLIC_BANNER ?? ""
			}
		]
	}
};

// Modification de la configuration de Font Awesome.
//  Source : https://fontawesome.com/docs/web/use-with/react/use-with
config.autoAddCss = false;

// Création des polices de caractères Poppins et Open Sans.
const poppins = Poppins( {
	weight: [ "400", "500", "600", "700" ],
	subsets: [ "latin" ],
	display: "swap"
} );

const openSans = Open_Sans( {
	weight: [ "400", "700" ],
	subsets: [ "latin" ],
	display: "swap"
} );

export default function RootLayout( { children }: { children: ReactNode; } ): JSX.Element
{
	// Déclaration des constantes.
	const headersList = headers();
	const cookiesList = cookies();
	const language = getLanguage( headersList, cookiesList );
	const legacy = headersList.get( "X-Invoke-Path" )?.includes( "legacy" ) ?? false;
	const theme = ( cookiesList.get( "NEXT_THEME" )?.value ?? "light" ) === "dark" ? "dark c_darkmode" : "light";
	const font = legacy ? openSans : poppins;

	// Affichage du rendu HTML de la page.
	return (
		<html lang={language} dir={dir( language )} className={`${ font.className } theme-${ theme }`}>
			{/* Corps de la page */}
			<body>
				{/* Avertissement page sans JavaScript */}
				<noscript>
					<h1>Your browser does not support or refuses to load JavaScript.</h1>

					<h2>
						Click <a href="https://www.whatismybrowser.com/detect/is-javascript-enabled">here</a> to
						be redirected to an external site to help you solve this issue.
					</h2>
				</noscript>

				{/* Écran de chargement de la page */}
				{legacy ? children : (
					<Suspense fallback={<Loading />}>
						{/* En-tête */}
						<Header />

						{/* Composant enfant */}
						<main>{children}</main>

						{/* Google Analytics */}
						<Analytics />

						{/* Google reCAPTCHA */}
						<Recaptcha />

						{/* Reconnaissance vocale */}
						<SpeechRecognition />

						{/* Bouton de retour en haut de page */}
						<ScrollTop />

						{/* Pied de page */}
						<Footer />
					</Suspense>
				)}
			</body>
		</html>
	);
}