//
// Permet de récupérer les traductions côté serveur.
//  Sources : https://locize.com/blog/next-13-app-dir-i18n/ et https://github.com/i18next/next-13-app-dir-i18next-no-locale-path-example
//

import { headers } from "next/headers";
import { createInstance } from "i18next";
import resourcesToBackend from "i18next-resources-to-backend";
import { initReactI18next } from "react-i18next/initReactI18next";

export async function useTranslation()
{
	// On récupère la langue utilisée par l'utilisateur.
	const language = headers().get( "Accept-Language" )?.substring( 0, 2 ) ?? "en";

	// On initialise l'instance de traduction i18next.
	const instance = createInstance();
	await instance
		.use( initReactI18next )
		.use( resourcesToBackend( ( locale: string ) => import( `@/public/locales/${ locale }.json` ) ) )
		.init( {
			lng: language,
			returnNull: false,
			fallbackLng: "en",
			supportedLngs: [ "en", "fr" ],
			returnEmptyString: false
		} );

	// On retourne enfin l'instance contenant les traductions.
	return {
		t: instance.getFixedT( language ),
		i18n: instance
	};
}