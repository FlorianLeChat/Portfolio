//
// Composant du consentement des cookies.
//

"use client";

import { useMessages } from "next-intl";
import { GoogleTagManager } from "@next/third-parties/google";
import { useEffect, useState } from "react";
import { run,
	type ConsentModalOptions,
	type PreferencesModalOptions } from "vanilla-cookieconsent";

export default function CookieConsent()
{
	// Déclaration des variables d'état.
	const messages = useMessages() as unknown as {
		consentModal: ConsentModalOptions;
		preferencesModal: PreferencesModalOptions;
	};
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
				translations: {
					en: {
						consentModal: messages.consentModal,
						preferencesModal: messages.preferencesModal
					}
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
	}, [ messages.consentModal, messages.preferencesModal ] );

	// Affichage conditionnel du rendu HTML du composant.
	return (
		analytics && (
			<GoogleTagManager
				gtmId={process.env.NEXT_PUBLIC_ANALYTICS_TAG ?? ""}
			/>
		)
	);
}