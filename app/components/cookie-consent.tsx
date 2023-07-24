//
// Composant du consentement des cookies.
//

"use client";

import { run } from "vanilla-cookieconsent";
import { useEffect } from "react";
import { getBasePath } from "@/utilities/NextRouter";

export default function CookieConsent()
{
	// Déclaration des constantes.
	const basePath = getBasePath();

	// Affichage du consentement des cookies.
	//  Source : https://cookieconsent.orestbida.com/reference/api-reference.html
	useEffect( () =>
	{
		// Définition de l'environnement de production.
		run(
			{
				// Activation automatique de la fenêtre de consentement.
				autoShow: process.env.NEXT_PUBLIC_ENV === "production",

				// Désactivation de l'interaction avec la page.
				disablePageInteraction: true,

				// Disparition du mécanisme pour les robots.
				hideFromBots: process.env.NEXT_PUBLIC_ENV === "production",

				// Paramètres internes des cookies.
				cookie: {
					path: basePath,
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
						en: `${ basePath }/locales/en.json`,
						fr: `${ basePath }/locales/fr.json`
					}
				}
			}
		);
	}, [ basePath ] );

	// Affichage du rendu HTML du composant.
	return null;
}