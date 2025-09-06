//
// Composant du consentement des cookies.
//

"use client";

import { useEffect } from "react";
import { useMessages } from "next-intl";
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
			}
		} );
	}, [ messages.consentModal, messages.preferencesModal ] );
}