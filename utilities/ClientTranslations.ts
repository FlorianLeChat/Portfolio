//
// Permet de récupérer les traductions côté client.
//  Sources : https://locize.com/blog/next-13-app-dir-i18n/ et https://github.com/i18next/next-13-app-dir-i18next-no-locale-path-example
//

"use client";

import i18next from "i18next";
import { useEffect } from "react";
import resourcesToBackend from "i18next-resources-to-backend";
import { initReactI18next, useTranslation as defaultUseTranslation } from "react-i18next";

// Paramètres de i18next.
i18next
	.use( initReactI18next )
	.use( resourcesToBackend( ( locale: string ) => import( `@/public/locales/${ locale }.json` ) ) )
	.init( {
		returnNull: false,
		fallbackLng: "en",
		supportedLngs: [ "en", "fr", "es", "jp" ],
		returnEmptyString: false
	} );

// Fonction de récupération des traductions.
export function useTranslation()
{
	// On détermine d'abord si on est côté client ou côté serveur.
	const ret = defaultUseTranslation();
	const client = typeof window !== "undefined";
	const { i18n } = ret;

	// On définit ensuite la langue par défaut.
	let language = "en";

	if ( client )
	{
		// On analyse après l'ensemble des cookies enregistrés côté client.
		const cookies = document.cookie.split( "; " ).reduce( ( accumulator: Record<string, string>, cookie: string ) =>
		{
			const [ key, value ] = cookie.split( "=" );

			accumulator[ key ] = value;

			return accumulator;
		}, {} );

		// On récupère alors la langue du navigateur ou des cookies.
		language = cookies.NEXT_LANGUAGE && navigator.language.slice( 0, 2 );
	}

	// Si la langue du navigateur est différente de celle de i18next, on la change.
	useEffect( () =>
	{
		if ( i18n.resolvedLanguage !== language )
		{
			i18n.changeLanguage( language );
		}
	}, [ i18n, language ] );

	// On retourne enfin les traductions.
	return ret;
}