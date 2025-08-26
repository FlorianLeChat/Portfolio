//
// Structure HTML générale des pages du site.
//  Source : https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts#root-layout-required
//

// Importation des dépendances.
import pick from "lodash/pick";
import { Poppins } from "next/font/google";
import { lazy, type ReactNode } from "react";
import { NextIntlClientProvider } from "next-intl";
import { setRequestLocale, getMessages } from "next-intl/server";

// Importation des types.
import type { Viewport } from "next";

// Importation des fonctions utilitaires.
import { getLanguages } from "@/utilities/i18n";
import { fetchMetadata } from "@/utilities/metadata";

// Importation des composants.
import Footer from "./components/footer";
import Credits from "./components/credits";
import { ThemeSwitcher } from "./components/theme-provider";

const Header = lazy( () => import( "./components/header" ) );
const ScrollTop = lazy( () => import( "./components/scroll-top" ) );
const ThemeProvider = lazy( () => import( "./components/theme-provider" ) );
const CookieConsent = lazy( () => import( "./components/cookie-consent" ) );
const BirthdayEffect = lazy( () => import( "./components/birthday-effect" ) );
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
export async function generateMetadata()
{
	return fetchMetadata();
}

// Génération des paramètres pour les pages statiques.
const languages = getLanguages();

export function generateStaticParams()
{
	return languages.map( ( locale ) => ( { locale } ) );
}

// Création de la police de caractères Poppins.
const poppins = Poppins( {
	weight: [ "400", "500", "600", "700" ],
	subsets: [ "latin" ],
	display: "swap"
} );

export default async function Layout( {
	children,
	params
}: Readonly<{
	children: ReactNode;
	params: Promise<{ locale: string }>;
}> )
{
	// Définition de la langue de la page.
	const { locale } = await params;

	setRequestLocale( locale );

	// Vérification du support de la langue.
	if ( !languages.includes( locale ) )
	{
		return null;
	}

	// Déclaration des constantes.
	const messages = await getMessages();

	// Affichage du rendu HTML de la page.
	return (
		<html lang={locale} style={poppins.style} className="antialiased" suppressHydrationWarning>
			{/* En-tête de la page */}
			<head>
				{/* Basculement entre les thèmes */}
				<ThemeSwitcher />
			</head>

			{/* Corps de la page */}
			<body>
				{/* Basculement entre les thèmes */}
				<ThemeProvider>
					{/* Utilisation des traductions */}
					<NextIntlClientProvider
						locale={locale}
						messages={pick(
							messages,
							"modals",
							"landing",
							"consentModal",
							"preferencesModal"
						)}
						timeZone={process.env.TZ}
					>
						{/* Remerciements */}
						<Credits />

						{/* En-tête */}
						<Header />

						{/* Composant enfant */}
						{children}

						{/* Effet pour l'anniversaire */}
						<BirthdayEffect />

						{/* Consentement des cookies */}
						<CookieConsent />

						{/* Reconnaissance vocale */}
						<SpeechRecognition />

						{/* Bouton de retour en haut de page */}
						<ScrollTop />

						{/* Pied de page */}
						<Footer />
					</NextIntlClientProvider>
				</ThemeProvider>
			</body>
		</html>
	);
}