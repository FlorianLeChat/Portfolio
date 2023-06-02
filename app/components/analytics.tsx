//
// Composant du consentement des cookies pour Google Analytics.
//

"use client";

import Script from "next/script";
import { useRouter } from "next/router";
import * as CookieConsent from "vanilla-cookieconsent";
import { useState, useEffect } from "react";

export default function Analytics()
{
	// Déclaration des constantes.
	const analyticsUrl = new URL( "https://www.googletagmanager.com/gtag/js" );
	const { basePath, locale } = useRouter();

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

	// Affichage du rendu HTML du composant.
	if ( analytics )
	{
		return (
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
		);
	}

	// Aucun rendu HTML.
	return null;
}