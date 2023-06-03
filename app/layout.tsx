//
// Structure HTML générale des pages du site.
//  Source : https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts#root-layout-required
//

// Importation des dépendances.
import Script from "next/script";
import { dir } from "i18next";
import { cookies } from "next/headers";
import { Poppins } from "next/font/google";
import { lazy, ReactNode } from "react";

// Importation des fonctions utilitaires.
import { ThemeProvider } from "@/utils/ThemeContext";

// Importation des composants.
const Header = lazy( () => import( "./components/header" ) );
const Footer = lazy( () => import( "./components/footer" ) );
const Analytics = lazy( () => import( "./components/analytics" ) );
const ScrollTop = lazy( () => import( "./components/scroll-top" ) );

// Création de la police de caractères Poppins.
const poppins = Poppins( {
	weight: [ "400", "500", "600", "700" ],
	subsets: [ "latin" ],
	display: "swap"
} );

export default function RootLayout( { children }: { children: ReactNode; } )
{
	// Déclaration des constantes.
	const language = cookies().get( "NEXT_LANGUAGE" )?.value ?? "en";
	const recaptchaUrl = new URL( "https://www.google.com/recaptcha/api.js" );
	recaptchaUrl.searchParams.append( "render", process.env.NEXT_PUBLIC_CAPTCHA_PUBLIC_KEY ?? "" );

	// Affichage du rendu HTML de la page.
	return (
		<html lang="fr" dir={dir( language )} className={poppins.className}>
			{/* Google Analytics */}
			<Analytics />

			{/* Google reCAPTCHA */}
			<Script src={recaptchaUrl.href} strategy="beforeInteractive" />

			{/* Corps de la page */}
			<body>
				{/* Avertissement page sans JavaScript */}
				<noscript>
					<h1>This website created with <a href="https://nextjs.org/">NextJS</a> requires JavaScript to run.</h1>
					<h2>
						Click <a href="https://www.whatismybrowser.com/detect/is-javascript-enabled">here</a>
						to be redirected to an external site to help you solve this issue.
					</h2>
				</noscript>

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