//
// Permet de récupérer les traductions côté client.
//  Source : https://locize.com/blog/next-13-app-dir-i18n/
//

"use client";

import i18next from "i18next";
import { useEffect } from "react";
import resourcesToBackend from "i18next-resources-to-backend";
import { initReactI18next, useTranslation as serverUseTranslation } from "react-i18next";

// Paramètres de i18next.
i18next
	.use( initReactI18next )
	.use( resourcesToBackend( ( locale: string ) => import( `@/public/locales/${ locale }.json` ) ) )
	.init( {
		fallbackLng: "en",
		supportedLngs: [ "en", "fr" ]
	} );

// Fonction de récupération des traductions.
const serverSide = typeof window === "undefined";

export function useTranslation( language: string )
{
	// On vérifie d'abord si on est du côté client ou serveur.
	const ret = serverUseTranslation();
	const { i18n } = ret;

	if ( serverSide && i18n.resolvedLanguage !== language )
	{
		// Du côté serveur, on change la langue directement
		//  si ce n'est pas celle choisie par l'utilisateur.
		i18n.changeLanguage( language );
	}
	else
	{
		// Dans le cas contraire, on attend le chargement de la page
		//  pour changer la langue.
		useEffect( () =>
		{
			if ( i18n.resolvedLanguage !== language )
			{
				i18n.changeLanguage( language );
			}
		}, [ language, i18n ] );
	}

	// On retourne enfin les traductions.
	return ret;
}