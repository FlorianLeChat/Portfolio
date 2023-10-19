//
// Structure HTML générale des pages du site.
//  Source : https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts#root-layout-required
//

// Importation du normalisateur TypeScript.
import "@total-typescript/ts-reset";

// Importation des dépendances.
import { notFound } from "next/navigation";
import { Poppins, Open_Sans } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { unstable_setRequestLocale } from "next-intl/server";
import { Suspense, lazy, type ReactNode } from "react";

// Importation des composants.
import Loading from "./loading";
import { ThemeProvider } from "./components/theme-provider";

const Header = lazy( () => import( "./components/header" ) );
const Footer = lazy( () => import( "./components/footer" ) );
const Analytics = lazy( () => import( "./components/analytics" ) );
const Recaptcha = lazy( () => import( "./components/recaptcha" ) );
const ScrollTop = lazy( () => import( "./components/scroll-top" ) );
const CookieConsent = lazy( () => import( "./components/cookie-consent" ) );
const SpeechRecognition = lazy( () => import( "./components/speech-recognition" ) );

// Déclaration des propriétés de la page.
export async function generateMetadata()
{
	// On récupère d'abord les informations du dépôt GitHub.
	const repository = ( await (
		await fetch( "https://api.github.com/repos/FlorianLeChat/Portfolio", {
			cache: "force-cache"
		} )
	).json() ) as Record<string, string>;

	// On récupère ensuite les informations de l'auteur.
	const author = ( await (
		await fetch( "https://api.github.com/users/FlorianLeChat", {
			cache: "force-cache"
		} )
	).json() ) as Record<string, string>;

	// On récupère après les informations du dernier commit GitHub.
	const commits = ( await (
		await fetch(
			"https://api.github.com/repos/FlorianLeChat/Portfolio/commits/master",
			{
				cache: "force-cache"
			}
		)
	).json() ) as Record<string, string>;

	// On détermine certaines méta-données récurrentes.
	const banner = `https://opengraph.githubassets.com/${ commits.sha }/${ repository.full_name }`;
	const title = `${ author.name } - ${ repository.name }`;
	const url =
		process.env.NEXT_PUBLIC_APP_ENV === "production"
			? repository.homepage
			: "http://localhost:3000/";

	// On retourne enfin les méta-données récupérées récemment.
	return {
		// Méta-données du document.
		title,
		source: repository.html_url,
		authors: [ { name: author.name, url: author.html_url } ],
		description: repository.description,
		keywords: repository.topics,
		viewport: "width=device-width, initial-scale=1, viewport-fit=cover",
		manifest: new URL( "manifest.json", url ),
		themeColor: [
			{ media: "(prefers-color-scheme: light)", color: "#306cc4" },
			{ media: "(prefers-color-scheme: dark)", color: "#807ae8" }
		],
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
}

// Déclaration des paramètres statiques de la page.
export function generateStaticParams()
{
	return [ "en", "fr" ].map( ( locale ) => ( { locale } ) );
}

// Récupération des traductions de la page.
async function getMessages( locale: string )
{
	try
	{
		return ( await import( `../../public/locales/${ locale }.json` ) ).default;
	}
	catch ( error )
	{
		return notFound();
	}
}

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

export default async function Layout( {
	children,
	params: { locale }
}: {
	children: ReactNode;
	params: { locale: string };
} )
{
	// Déclaration des constantes.
	const messages = await getMessages( locale );
	const metadata = await generateMetadata();

	// Définition de la langue de la page.
	unstable_setRequestLocale( locale );

	// Affichage du rendu HTML de la page.
	return (
		<html
			lang={locale}
			className={poppins.className}
			data-modern-font={poppins.className}
			data-legacy-font={openSans.className}
		>
			{/* Corps de la page */}
			<body>
				{/* Écran de chargement de la page */}
				<Suspense fallback={<Loading title={metadata.title} />}>
					{/* Utilisation des traductions */}
					<NextIntlClientProvider
						locale={locale}
						messages={messages}
						timeZone="Europe/Paris"
					>
						{/* Basculement entre les thèmes */}
						<ThemeProvider>
							{/* En-tête */}
							<Header />

							{/* Composant enfant */}
							{children}

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
						</ThemeProvider>
					</NextIntlClientProvider>
				</Suspense>
			</body>
		</html>
	);
}