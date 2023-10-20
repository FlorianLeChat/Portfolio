//
// Composant du consentement des cookies.
//

"use client";

import { run } from "vanilla-cookieconsent";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function CookieConsent()
{
	// Désactivation du composant sur les anciennes pages.
	if ( usePathname().startsWith( "/legacy" ) )
	{
		return null;
	}

	// Affichage du consentement des cookies.
	//  Source : https://cookieconsent.orestbida.com/reference/api-reference.html
	useEffect( () =>
	{
		// Définition de l'environnement de production.
		run( {
			// Activation automatique de la fenêtre de consentement.
			autoShow: process.env.NEXT_PUBLIC_ENV === "production",

			// Désactivation de l'interaction avec la page.
			disablePageInteraction: true,

			// Disparition du mécanisme pour les robots.
			hideFromBots: process.env.NEXT_PUBLIC_ENV === "production",

			// Paramètres internes des cookies.
			cookie: {
				path: process.env.__NEXT_ROUTER_BASEPATH,
				name: "NEXT_ANALYTICS"
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
			}
		} );
	}, [] );

	// Affichage du rendu HTML du composant.
	return null;
}