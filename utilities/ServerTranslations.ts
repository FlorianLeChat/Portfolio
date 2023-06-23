//
// Récupération des traductions i18next côté serveur.
//  Sources : https://locize.com/blog/next-13-app-dir-i18n/ et https://github.com/i18next/next-13-app-dir-i18next-no-locale-path-example
//

import { createInstance } from "i18next";
import resourcesToBackend from "i18next-resources-to-backend";
import { initReactI18next } from "react-i18next/initReactI18next";
import { headers, cookies } from "next/headers";

import { getLanguage } from "@/utilities/NextRouter";

export async function useTranslation()
{
	// On récupère la langue sélectionné par l'utilisateur.
	const language = getLanguage( headers(), cookies() );

	// On initialise l'instance de traduction i18next.
	const instance = createInstance();
	await instance
		.use( initReactI18next )
		.use( resourcesToBackend( ( locale: string ) => import( `@/public/locales/${ locale }.json` ) ) )
		.init( {
			lng: language,
			returnNull: false,
			fallbackLng: "en",
			supportedLngs: [ "en", "fr", "es", "jp" ],
			returnEmptyString: false
		} );

	// On retourne enfin l'instance contenant les traductions.
	return {
		t: instance.getFixedT( language ),
		i18n: instance
	};
}