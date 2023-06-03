//
// Permet de récupérer les traductions côté client.
//  Source : https://locize.com/blog/next-13-app-dir-i18n/
//

"use client";

import i18next from "i18next";
import resourcesToBackend from "i18next-resources-to-backend";
import { initReactI18next, useTranslation as defaultUseTranslation } from "react-i18next";

i18next
	.use( initReactI18next )
	.use( resourcesToBackend( ( locale: string ) => import( `@/public/locales/${ locale }.json` ) ) )
	.init( {
		lng: typeof window !== "undefined" ? navigator.language : "en",
		fallbackLng: "en",
		supportedLngs: [ "en", "fr" ]
	} );

export function useTranslation()
{
	// Cette fonction est déclarée afin de pouvoir initialiser i18next
	//  avant d'utiliser la fonction useTranslation de react-i18next.
	return defaultUseTranslation();
}