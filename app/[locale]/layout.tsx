//
// Structure HTML générale des pages du site.
//  Source : https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts#root-layout-required
//

// Importation du normalisateur TypeScript.
import "@total-typescript/ts-reset";

// Importation des dépendances.
import { join } from "path";
import { Poppins } from "next/font/google";
import { unstable_setRequestLocale } from "next-intl/server";
import { Suspense, lazy, type ReactNode } from "react";
import { promises as fileSystem, existsSync } from "fs";
import { NextIntlClientProvider, useMessages } from "next-intl";

// Importation des types.
import type { Metadata, Viewport } from "next";

// Importation des composants.
import Footer from "./components/footer";
import { ThemeProvider } from "./components/theme-provider";

const Header = lazy( () => import( "./components/header" ) );
const Recaptcha = lazy( () => import( "./components/recaptcha" ) );
const ScrollTop = lazy( () => import( "./components/scroll-top" ) );
const CookieConsent = lazy( () => import( "./components/cookie-consent" ) );
const SpeechRecognition = lazy( () => import( "./components/speech-recognition" ) );

// Déclaration des paramètres d'affichage.
export const viewport: Viewport = {
	viewportFit: "cover",
	themeColor: [
		{ media: "(prefers-color-scheme: light)", color: "#306cc4" },
		{ media: "(prefers-color-scheme: dark)", color: "#807ae8" }
	]
};

// Déclaration des propriétés de la page.
export async function generateMetadata(): Promise<
	Metadata & { name: string; source: string }
	>
{
	// On vérifie d'abord si les métadonnées sont déjà enregistrées
	//  dans le cache du système de fichiers.
	const path = `${ join( process.cwd(), "public/data" ) }/metadata.json`;

	if ( existsSync( path ) )
	{
		return JSON.parse(
			await fileSystem.readFile( path, "utf8" )
		) as Metadata & { name: string; source: string };
	}

	// On récupère ensuite les informations du dépôt GitHub,
	//  ceux de l'auteur et le dernier commit.
	const repository = ( await (
		await fetch( "https://api.github.com/repos/FlorianLeChat/Portfolio", {
			cache: "force-cache"
		} )
	).json() ) as Record<string, string>;

	const author = ( await (
		await fetch( "https://api.github.com/users/FlorianLeChat", {
			cache: "force-cache"
		} )
	).json() ) as Record<string, string>;

	const commits = ( await (
		await fetch(
			"https://api.github.com/repos/FlorianLeChat/Portfolio/commits/master",
			{
				cache: "force-cache"
			}
		)
	).json() ) as Record<string, string>;

	// On détermine après certaines métadonnées récurrentes.
	const banner = `https://opengraph.githubassets.com/${ commits.sha }/${ repository.full_name }`;
	const title = `${ author.name } - ${ repository.name }`;
	const url =
		process.env.NEXT_PUBLIC_ENV === "production"
			? repository.homepage
			: `http://localhost:3000${ process.env.__NEXT_ROUTER_BASEPATH }`;

	// On retourne enfin les métadonnées récupérées récemment
	//  avant de les enregistrer dans un fichier JSON.
	const metadata = {
		// Métadonnées du document.
		title,
		name: repository.name,
		source: repository.html_url,
		authors: [ { name: author.name, url: author.html_url } ],
		keywords: repository.topics,
		manifest: "manifest.json", // https://github.com/vercel/next.js/issues/56687
		description: repository.description,
		metadataBase: new URL( url ), // https://github.com/vercel/next.js/issues/53455

		// Icônes du document.
		icons: {
			icon: [
				{
					url: `${ url }/assets/favicons/16x16.webp`,
					type: "image/webp",
					sizes: "16x16"
				},
				{
					url: `${ url }/assets/favicons/32x32.webp`,
					type: "image/webp",
					sizes: "32x32"
				},
				{
					url: `${ url }/assets/favicons/48x48.webp`,
					type: "image/webp",
					sizes: "48x48"
				},
				{
					url: `${ url }/assets/favicons/192x192.webp`,
					type: "image/webp",
					sizes: "192x192"
				},
				{
					url: `${ url }/assets/favicons/512x512.webp`,
					type: "image/webp",
					sizes: "512x512"
				}
			],
			apple: [
				{
					url: `${ url }/assets/favicons/180x180.webp`,
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
			title,
			creator: `@${ author.twitter_username }`,
			description: repository.description,
			images: [
				{
					url: banner
				}
			]
		}
	};

	await fileSystem.writeFile( path, JSON.stringify( metadata ) );

	return metadata;
}

// Génération des paramètres pour les pages statiques.
export function generateStaticParams()
{
	return [ "en", "fr" ].map( ( locale ) => ( { locale } ) );
}

// Création de la police de caractères Poppins.
const poppins = Poppins( {
	weight: [ "400", "500", "600", "700" ],
	subsets: [ "latin" ],
	display: "swap"
} );

export default function Layout( {
	children,
	params: { locale }
}: {
	children: ReactNode;
	params: { locale: string };
} )
{
	// Définition de la langue de la page.
	unstable_setRequestLocale( locale );

	// Déclaration des constantes.
	const messages = useMessages();

	// Affichage du rendu HTML de la page.
	return (
		<html lang={locale} style={poppins.style}>
			{/* Corps de la page */}
			<body>
				{/* Écran de chargement de la page */}
				<Suspense>
					{/* Utilisation des traductions */}
					<NextIntlClientProvider
						locale={locale}
						messages={messages}
						timeZone={process.env.NEXT_PUBLIC_TIMEZONE}
					>
						{/* Basculement entre les thèmes */}
						<ThemeProvider>
							{/* En-tête */}
							<Header />

							{/* Composant enfant */}
							{children}

							{/* Consentement des cookies */}
							<CookieConsent />

							{/* Google reCAPTCHA */}
							<Recaptcha />

							{/* Reconnaissance vocale */}
							<SpeechRecognition />

							{/* Bouton de retour en haut de page */}
							<ScrollTop />

							{/* Pied de page */}
							<Footer />
						</ThemeProvider>
					</NextIntlClientProvider>
				</Suspense>
			</body>
		</html>
	);
}