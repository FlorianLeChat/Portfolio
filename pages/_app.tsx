//
// Page utilisée pour générer le contenu statique HTML de la page.
//  Source : https://nextjs.org/docs/advanced-features/custom-app
//

// Importation de la feuille de style CSS globale.
import "./_global.scss";

// Importation du normalisateur TypeScript.
import "@total-typescript/ts-reset";

// Importation des dépendances.
import Head from "next/head";
import Script from "next/script";
import dynamic from "next/dynamic";
import { config } from "@fortawesome/fontawesome-svg-core";
import { Poppins } from "next/font/google";
import { useRouter } from "next/router";
import * as CookieConsent from "vanilla-cookieconsent";
import { appWithTranslation } from "next-i18next";
import { useEffect, useState } from "react";

// Importation des types.
import type { AppProps } from "next/app";

// Importation des composants.
const Layout = dynamic( () => import( "@/components/Layout" ) );

// Modification de la configuration de Font Awesome.
//  Source : https://fontawesome.com/docs/web/use-with/react/use-with
config.autoAddCss = false;

// Création de la police de caractères Roboto.
const poppins = Poppins( {
	weight: [ "400", "500", "600", "700" ],
	subsets: [ "latin" ],
	display: "swap"
} );

function Portfolio( { Component, pageProps }: AppProps )
{
	// Création des constantes.
	const router = useRouter();
	const favicons = `${ router.basePath }/assets/favicons`;
	const analyticsUrl = new URL( "https://www.googletagmanager.com/gtag/js" );
	analyticsUrl.searchParams.append( "id", process.env.NEXT_PUBLIC_ANALYTICS_IDENTIFIER ?? "" );

	// Déclaration des variables d'état.
	const [ analytics, setAnalytics ] = useState( false );

	// Affichage du consentement des cookies.
	//  Source : https://cookieconsent.orestbida.com/reference/api-reference.html
	useEffect( () =>
	{
		CookieConsent.run(
			{
				// Activation automatique de la fenêtre de consentement.
				autoShow: process.env.NODE_ENV === "production",

				// Désactivation de l'interaction avec la page.
				disablePageInteraction: true,

				// Disparition du mécanisme pour les robots.
				hideFromBots: process.env.NODE_ENV === "production",

				// Paramètres internes des cookies.
				cookie: {
					path: router.basePath
				},

				// Paramètres de l'interface utilisateur.
				guiOptions: {
					consentModal: {
						layout: "bar",
						position: "bottom center"
					}
				},

				// Configuration des catégories de cookies.
				categories: {
					necessary: {
						enabled: true,
						readOnly: true
					},
					analytics: {
						autoClear: {
							cookies: [
								{
									name: /^(_ga|_gid)/
								}
							]
						}
					}
				},

				// Configuration des traductions.
				language: {
					default: router.locale ?? "en",
					translations: {
						en: "./locales/en/common.json",
						fr: "./locales/fr/common.json"
					}
				},

				// Exécution des actions de consentement.
				onConsent: ( { cookie } ) => (
					cookie.categories.find( ( category: string ) => category === "analytics" ) && setAnalytics( true )
				),

				// Exécution des actions de changement.
				onChange: ( { cookie } ) => (
					cookie.categories.find( ( category: string ) => category === "analytics" ) && setAnalytics( true )
				)
			}
		);
	}, [ router.basePath, router.locale ] );

	// Génération de la structure de la page.
	return (
		<>
			<Head>
				{/* Méta-données du document */}
				<meta charSet="utf-8" />
				<meta name="author" content={process.env.NEXT_PUBLIC_AUTHOR} />
				<meta name="description" content={process.env.NEXT_PUBLIC_DESCRIPTION} />
				<meta name="keywords" content={process.env.NEXT_PUBLIC_TAGS} />
				<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
				<meta name="theme-color" content="#306cc4" />

				{/* Titre du document */}
				<title>{`${ process.env.NEXT_PUBLIC_TITLE }`}</title>

				{/* Icônes et manifeste du document */}
				<link rel="icon" type="image/webp" sizes="16x16" href={`${ favicons }/16x16.webp`} />
				<link rel="icon" type="image/webp" sizes="32x32" href={`${ favicons }/32x32.webp`} />
				<link rel="icon" type="image/webp" sizes="48x48" href={`${ favicons }/48x48.webp`} />
				<link rel="icon" type="image/webp" sizes="192x192" href={`${ favicons }/192x192.webp`} />
				<link rel="icon" type="image/webp" sizes="512x512" href={`${ favicons }/512x512.webp`} />

				<link rel="apple-touch-icon" href={`${ favicons }/180x180.webp`} />
				<link rel="manifest" href={`${ router.basePath }/manifest.json`} />
			</Head>

			{/* Google Analytics */}
			{analytics && (
				<>
					<Script src={analyticsUrl.href} strategy="lazyOnload" />
					<Script id="google-analytics" strategy="lazyOnload">
						{`
							window.dataLayer = window.dataLayer || [];

							function gtag()
							{
								dataLayer.push( arguments );
							}

							gtag( "js", new Date() );
							gtag( "config", "${ process.env.NEXT_PUBLIC_ANALYTICS_IDENTIFIER ?? "" }" );
						`}
					</Script>
				</>
			)}

			{/* Avertissement page sans JavaScript */}
			<noscript>
				<h1>This website created with <a href="https://nextjs.org/">NextJS</a> requires JavaScript to run.</h1>
				<h2>
					Click <a href="https://www.whatismybrowser.com/detect/is-javascript-enabled">here</a>
					to be redirected to an external site to help you solve this issue.
				</h2>
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

			{/* Affichage du composant demandé */}
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</>
	);
}

export default appWithTranslation( Portfolio );