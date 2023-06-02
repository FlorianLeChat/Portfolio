//
// Structure HTML générale des pages du site.
//  Source : https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts#root-layout-required
//

// Importation des dépendances.
import Script from "next/script";
import { lazy, ReactNode } from "react";

// Importation des fonctions utilitaires.
import { ThemeProvider } from "@/utils/ThemeContext";

// Importation des composants.
const Header = lazy( () => import( "./components/header" ) );
const Footer = lazy( () => import( "./components/footer" ) );
const Analytics = lazy( () => import( "./components/analytics" ) );
const ScrollTop = lazy( () => import( "./components/scroll-top" ) );

export default function RootLayout( { children }: { children: ReactNode; } )
{
	// Déclaration des constantes.
	const recaptchaUrl = new URL( "https://www.google.com/recaptcha/api.js" );
	recaptchaUrl.searchParams.append( "render", process.env.NEXT_PUBLIC_CAPTCHA_PUBLIC_KEY ?? "" );

	// Affichage du rendu HTML de la page.
	return (
		<html lang="fr">
			{/* Scripts JavaScript */}
			{/* Google Analytics */}
			<Analytics />

			{/* Google reCAPTCHA */}
			<Script src={recaptchaUrl.href} strategy="beforeInteractive" />

			{/* Corps de la page */}
			<body>
				{/* Contexte de basculement des thèmes */}
				<ThemeProvider>
					{/* Affichage de l'en-tête du site */}
					<Header />

					{/* Affichage du composant enfant */}
					<main>{children}</main>

					{/* Affichage du bouton de retour en haut de page */}
					<ScrollTop />

					{/* Affichage du pied de page du site */}
					<Footer />
				</ThemeProvider>
			</body>
		</html>
	);
}