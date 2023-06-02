//
// Page utilisée pour générer le contenu statique HTML de la page.
//  Source : https://nextjs.org/docs/advanced-features/custom-app
//

// Importation de la feuille de style CSS globale.
import "./_global.scss";

// Importation du normalisateur TypeScript.
import "@total-typescript/ts-reset";

// Importation des dépendances.
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
	const { basePath, locale } = useRouter();
	const analyticsUrl = new URL( "https://www.googletagmanager.com/gtag/js" );

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
					path: basePath
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
					default: locale ?? "en",
					translations: {
						en: `${ basePath }/locales/en/common.json`,
						fr: `${ basePath }/locales/fr/common.json`
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
	}, [ basePath, locale ] );

	// Génération de la structure de la page.
	return (
		<>
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