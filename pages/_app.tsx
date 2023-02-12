//
// Page utilisée pour générer le contenu statique HTML de la page.
// 	Source : https://nextjs.org/docs/advanced-features/custom-app
//

// Importation des feuilles de style CSS.
import "./_global.scss";
import "./index.scss";
import "@/components/Header.scss";
import "@/components/Footer.scss";
import "@/components/ScrollTop.scss";
import "@fortawesome/fontawesome-svg-core/styles.css";

// Importation des dépendances.
import Head from "next/head";
import dynamic from "next/dynamic";
import { config } from "@fortawesome/fontawesome-svg-core";
import { Poppins } from "@next/font/google";
import { useRouter } from "next/router";

// Importation des types.
import type { AppProps } from "next/app";

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
	// Déclaration des constantes.
	const { basePath } = useRouter();

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
				<link rel="icon" type="image/webp" sizes="16x16" href={`${ basePath }/assets/favicons/16x16.webp`} />
				<link rel="icon" type="image/webp" sizes="32x32" href={`${ basePath }/assets/favicons/32x32.webp`} />
				<link rel="icon" type="image/webp" sizes="48x48" href={`${ basePath }/assets/favicons/48x48.webp`} />
				<link rel="icon" type="image/webp" sizes="192x192" href={`${ basePath }/assets/favicons/192x192.webp`} />
				<link rel="icon" type="image/webp" sizes="512x512" href={`${ basePath }/assets/favicons/512x512.webp`} />

				<link rel="apple-touch-icon" href={`${ basePath }/assets/favicons/180x180.webp`} />
				<link rel="manifest" href={`${ basePath }/manifest.json`} />
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

			{/* Affichage de l'en-tête du site */}
			<Header />

			{/* Affichage du composant demandé */}
			<Component {...pageProps} />

			{/* Affichage du bouton de retour en haut de page */}
			<ScrollTop />

			{/* Affichage du pied de page du site */}
			<Footer />
		</>
	);
}