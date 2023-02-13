//
// Page utilisée pour générer le contenu statique HTML de la page.
// 	Source : https://nextjs.org/docs/advanced-features/custom-app
//

// Importation de la feuille de style CSS globale.
import "./_global.scss";

// Importation des dépendances.
import Head from "next/head";
import dynamic from "next/dynamic";
import { config } from "@fortawesome/fontawesome-svg-core";
import { Poppins } from "@next/font/google";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

// Importation des types.
import type { AppProps } from "next/app";

// Importation des fonctions utilitaires.
import { ThemeContext } from "@/utils/ThemeContext";

// Importation des composants.
const Header = dynamic( () => import( "@/components/Header" ) );
const Footer = dynamic( () => import( "@/components/Footer" ) );
const ScrollTop = dynamic( () => import( "@/components/ScrollTop" ) );

// Modification de la configuration de Font Awesome.
// 	Source : https://fontawesome.com/docs/web/use-with/react/use-with
config.autoAddCss = false;

// Création de la police de caractères Roboto.
const poppins = Poppins( {
	weight: [ "400", "500", "600", "700" ],
	subsets: [ "latin" ],
	display: "swap"
} );

export default function App( { Component, pageProps }: AppProps )
{
	// Création des constantes.
	const { basePath } = useRouter();

	// Déclaration des variables d'état.
	const [ theme, setTheme ] = useState( "light" );

	// Détection du thème par défaut de l'utilisateur.
	useEffect( () =>
	{
		// On vérifie si le navigateur de l'utilisateur supporte la fonctionnalité.
		const theme = window.matchMedia( "(prefers-color-scheme: dark)" );

		// On vérifie ensuite le thème par défaut ou celui enregistré dans le
		// 	 stockage local du navigateur de l'utilisateur.
		const checkUserTheme = () =>
		{
			setTheme( localStorage.getItem( "default-theme" ) || ( theme.matches ? "dark" : "light" ) );
		};

		// On déclenche après la vérification au montage du composant.
		checkUserTheme();

		// On ajoute enfin deux écouteurs d'événements pour détecter les changements
		//	du thème par défaut de l'utilisateur.
		theme.addEventListener( "change", checkUserTheme );

		return () => theme.removeEventListener( "change", checkUserTheme );
	}, [] );

	// Génération de la structure de la page.
	return (
		<>
			<Head>
				{/* Méta-données du document */}
				<meta charSet="utf-8" />
				<meta name="author" content={process.env[ "NEXT_PUBLIC_AUTHOR" ]} />
				<meta name="description" content={process.env[ "NEXT_PUBLIC_DESCRIPTION" ]} />
				<meta name="keywords" content={process.env[ "NEXT_PUBLIC_TAGS" ]} />
				<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
				<meta name="theme-color" content="#306cc4" />

				<meta property="og:type" content="website" />
				<meta property="og:url" content={process.env[ "NEXT_PUBLIC_URL" ]} />
				<meta property="og:title" content={process.env[ "NEXT_PUBLIC_TITLE" ]} />
				<meta property="og:description" content={process.env[ "NEXT_PUBLIC_DESCRIPTION" ]} />
				<meta property="og:image" content={process.env[ "NEXT_PUBLIC_BANNER" ]} />

				<meta property="twitter:card" content="summary_large_image" />
				<meta property="twitter:url" content={process.env[ "NEXT_PUBLIC_URL" ]} />
				<meta property="twitter:title" content={process.env[ "NEXT_PUBLIC_TITLE" ]} />
				<meta property="twitter:description" content={process.env[ "NEXT_PUBLIC_DESCRIPTION" ]} />
				<meta property="twitter:image" content={process.env[ "NEXT_PUBLIC_BANNER" ]} />

				{/* Titre du document */}
				<title>{`${ process.env[ "NEXT_PUBLIC_TITLE" ] }`}</title>

				{/* Icônes et manifeste du document */}
				<link rel="icon" type="image/webp" sizes="16x16" href={basePath + "/assets/favicons/16x16.webp"} />
				<link rel="icon" type="image/webp" sizes="32x32" href={basePath + "/assets/favicons/32x32.webp"} />
				<link rel="icon" type="image/webp" sizes="48x48" href={basePath + "/assets/favicons/48x48.webp"} />
				<link rel="icon" type="image/webp" sizes="192x192" href={basePath + "/assets/favicons/192x192.webp"} />
				<link rel="icon" type="image/webp" sizes="512x512" href={basePath + "/assets/favicons/512x512.webp"} />

				<link rel="apple-touch-icon" href={basePath + "/assets/favicons/180x180.webp"} />
				<link rel="manifest" href={basePath + "/manifest.json"} />
			</Head>

			{/* Avertissement page sans JavaScript */}
			<noscript>
				<h1>This website created with <a href="https://nextjs.org/">NextJS</a> requires JavaScript to run.</h1>
				<h2>Click <a href="https://www.whatismybrowser.com/detect/is-javascript-enabled">here</a> to be redirected to an external site to help you solve this issue.</h2>
			</noscript>

			{/* Injection de règles de style CSS */}
			<style jsx global>
				{`
					html
					{
						font-family: ${ poppins.style.fontFamily };
					}
				`}
			</style>

			{/* Utilisation du contexte de thème. */}
			<ThemeContext.Provider value={{ theme, setTheme }}>
				<div className={"theme-" + theme}>
					{/* Affichage de l'animation du logo vers le dépôt GitHub */}
					{/* Source : https://tholman.com/github-corners/ */}
					<a href="https://github.com/FlorianLeChat/Portfolio" target="_blank">
						<svg width="80" height="80" viewBox="0 0 250 250" style={{ fill: "#151513", color: "#fff", position: "absolute", top: 0, border: 0, right: 0 }}>
							<path d="M0,0 L115,115 L130,115 L142,142 L250,250 L250,0 Z"></path>
							<path d="M128.3,109.0 C113.8,99.7 119.0,89.6 119.0,89.6 C122.0,82.7 120.5,78.6 120.5,78.6 C119.2,72.0 123.4,76.3 123.4,76.3 C127.3,80.9 125.5,87.3 125.5,87.3 C122.9,97.6 130.6,101.9 134.4,103.2" fill="currentColor" style={{ transformOrigin: "130px 106px" }}></path>
							<path d="M115.0,115.0 C114.9,115.1 118.7,116.5 119.8,115.4 L133.7,101.6 C136.9,99.2 139.9,98.4 142.2,98.6 C133.8,88.0 127.5,74.4 143.8,58.0 C148.5,53.4 154.0,51.2 159.7,51.0 C160.3,49.4 163.2,43.6 171.4,40.1 C171.4,40.1 176.1,42.5 178.8,56.2 C183.1,58.6 187.2,61.8 190.9,65.4 C194.5,69.0 197.7,73.2 200.1,77.6 C213.8,80.2 216.3,84.9 216.3,84.9 C212.7,93.1 206.9,96.0 205.4,96.6 C205.1,102.4 203.0,107.8 198.3,112.5 C181.9,128.9 168.3,122.5 157.7,114.1 C157.9,116.9 156.7,120.9 152.7,124.9 L141.0,136.5 C139.8,137.7 141.6,141.9 141.8,141.8 Z" fill="currentColor"></path>
						</svg>
					</a>

					{/* Affichage de l'en-tête du site */}
					<Header />

					{/* Affichage du composant demandé */}
					<Component {...pageProps} />

					{/* Affichage du bouton de retour en haut de page */}
					<ScrollTop />

					{/* Affichage du pied de page du site */}
					<Footer />
				</div>
			</ThemeContext.Provider>
		</>
	);
}