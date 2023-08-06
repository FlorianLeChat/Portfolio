//
// Structure HTML générale des pages du site.
//  Source : https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts#root-layout-required
//

// Importation du normalisateur TypeScript.
import "@total-typescript/ts-reset";

// Importation des dépendances.
import { config } from "@fortawesome/fontawesome-svg-core";
import { headers, cookies } from "next/headers";
import { Poppins, Open_Sans } from "next/font/google";
import { Suspense, lazy, type ReactNode } from "react";

// Importation des fonctions utilitaires.
import { getLanguage } from "@/utilities/NextRouter";

// Importation des composants.
const Header = lazy( () => import( "./components/header" ) );
const Footer = lazy( () => import( "./components/footer" ) );
const Loading = lazy( () => import( "./components/loading" ) );
const Analytics = lazy( () => import( "./components/analytics" ) );
const Recaptcha = lazy( () => import( "./components/recaptcha" ) );
const ScrollTop = lazy( () => import( "./components/scroll-top" ) );
const CookieConsent = lazy( () => import( "./components/cookie-consent" ) );
const SpeechRecognition = lazy( () => import( "./components/speech-recognition" ) );

// Déclaration des propriétés de la page.
export async function generateMetadata()
{
	// On récupère d'abord les informations du dépôt GitHub.
	const repository = await ( await fetch( "https://api.github.com/repos/FlorianLeChat/Portfolio", {
		cache: "force-cache"
	} ) ).json() as Record<string, string>;

	// On récupère ensuite les informations de l'auteur.
	const author = await ( await fetch( "https://api.github.com/users/FlorianLeChat", {
		cache: "force-cache"
	} ) ).json() as Record<string, string>;

	// On détermine certaines métadonnées récurrentes.
	const banner = `https://opengraph.githubassets.com/master/${ repository.full_name }`;
	const title = `${ author.name } - ${ repository.name }`;
	const url = process.env.NEXT_PUBLIC_ENV === "production" ? repository.homepage : "http://localhost:3000/";

	// On retourne enfin les métadonnées récupérées récemment.
	return {
		// Méta-données du document.
		title,
		authors: [ { name: author.name, url: repository.html_url } ],
		description: repository.description,
		keywords: repository.topics,
		viewport: "width=device-width, initial-scale=1, viewport-fit=cover",
		manifest: new URL( "manifest.json", url ),
		themeColor: "#306cc4",
		metadataBase: new URL( url ),

		// Icônes du document.
		icons: {
			icon: [
				{
					url: new URL( "assets/favicons/16x16.webp", url ),
					type: "image/webp",
					sizes: "16x16"
				},
				{
					url: new URL( "assets/favicons/32x32.webp", url ),
					type: "image/webp",
					sizes: "32x32"
				},
				{
					url: new URL( "assets/favicons/48x48.webp", url ),
					type: "image/webp",
					sizes: "48x48"
				},
				{
					url: new URL( "assets/favicons/192x192.webp", url ),
					type: "image/webp",
					sizes: "192x192"
				},
				{
					url: new URL( "assets/favicons/512x512.webp", url ),
					type: "image/webp",
					sizes: "512x512"
				}
			],
			apple: [
				{
					url: new URL( "assets/favicons/180x180.webp", url ),
					type: "image/webp",
					sizes: "180x180"
				}
			]
		},

		// Informations pour les moteurs de recherche.
		openGraph: {
			url,
			type: "website",
			title,
			description: repository.description,
			images: [
				{
					url: banner
				}
			]
		},

		// Informations pour la plate-forme Twitter.
		twitter: {
			card: "summary_large_image",
			title,
			creator: author.twitter_username,
			description: repository.description,
			images: [
				{
					url: banner
				}
			]
		}
	};
}

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

export default async function RootLayout( { children }: { children: ReactNode; } )
{
	// Déclaration des constantes.
	const headersList = headers();
	const cookiesList = cookies();
	const metadata = await generateMetadata();
	const legacy = headersList.get( "X-Invoke-Path" )?.includes( "legacy" ) ?? false;
	const theme = ( cookiesList.get( "NEXT_THEME" )?.value ?? "light" ) === "dark" ? "dark cc--darkmode" : "light";
	const font = legacy ? openSans : poppins;

	// Affichage du rendu HTML de la page.
	return (
		<html lang={getLanguage( headersList, cookiesList )} className={`${ font.className } theme-${ theme }`}>
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
					<Suspense fallback={<Loading title={metadata.title} />}>
						{/* En-tête */}
						<Header />

						{/* Composant enfant */}
						<main>{children}</main>

						{/* Consentement des cookies */}
						<CookieConsent />

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