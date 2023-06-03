//
// Permet de récupérer les traductions côté serveur.
//  Source : https://locize.com/blog/next-13-app-dir-i18n/
//

import { cookies } from "next/headers";
import resourcesToBackend from "i18next-resources-to-backend";
import { createInstance } from "i18next";
import { initReactI18next } from "react-i18next/initReactI18next";

export async function useTranslation()
{
	// On récupère la langue utilisée par l'utilisateur.
	const language = cookies().get( "NEXT_LANGUAGE" )?.value ?? "en";
	const instance = createInstance();

	// On initialise l'instance de traduction i18next.
	await instance
		.use( initReactI18next )
		.use( resourcesToBackend( ( locale: string ) => import( `@/public/locales/${ locale }.json` ) ) )
		.init( {
			lng: language,
			fallbackLng: "en",
			supportedLngs: [ "en", "fr" ]
		} );

	// On retourne enfin l'instance contenant les traductions.
	return {
		t: instance.getFixedT( language ),
		i18n: instance
	};
}