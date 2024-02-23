//
// Composant du consentement des cookies.
//

"use client";

import { run } from "vanilla-cookieconsent";
import { GoogleTagManager } from "@next/third-parties/google";
import { useEffect, useState } from "react";

export default function CookieConsent()
{
	// Déclaration des variables d'état.
	const [ analytics, setAnalytics ] = useState( false );

	// Affichage du consentement des cookies.
	//  Source : https://cookieconsent.orestbida.com/reference/api-reference.html
	useEffect( () =>
	{
		// Définition de l'environnement de production.
		run( {
			// Désactivation de l'interaction avec la page.
			disablePageInteraction: true,

			// Disparition du mécanisme pour les robots.
			hideFromBots: process.env.NEXT_PUBLIC_ENV === "production",

			// Activation automatique de la fenêtre de consentement.
			autoShow: process.env.NEXT_PUBLIC_ENV === "production",

			// Paramètres internes des cookies.
			cookie: {
				name: "NEXT_COOKIE",
				path:
					process.env.__NEXT_ROUTER_BASEPATH === ""
						? "/"
						: process.env.__NEXT_ROUTER_BASEPATH
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
				},
				security: {
					autoClear: {
						cookies: [
							{
								name: /^(OTZ|__Secure-ENID|SOCS|CONSENT|AEC)/
							}
						]
					}
				}
			},

			// Configuration des traductions.
			language: {
				default: "en",
				autoDetect: "document",
				translations: {
					en: `${ process.env.__NEXT_ROUTER_BASEPATH }/locales/en.json`,
					fr: `${ process.env.__NEXT_ROUTER_BASEPATH }/locales/fr.json`
				}
			},

			// Exécution des actions de consentement.
			onConsent: ( { cookie } ) =>
			{
				// Google Analytics.
				if ( cookie.categories.includes( "analytics" ) )
				{
					setAnalytics(
						process.env.NEXT_PUBLIC_ANALYTICS_ENABLED === "true"
					);
				}
			}
		} );
	}, [] );

	// Affichage conditionnel du rendu HTML du composant.
	return (
		analytics && (
			<GoogleTagManager
				gtmId={process.env.NEXT_PUBLIC_ANALYTICS_TAG ?? ""}
			/>
		)
	);
}