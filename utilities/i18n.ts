//
// Fichier de configuration de la bibliothèque « next-intl ».
//  Source : https://next-intl-docs.vercel.app/docs/getting-started/app-router-server-components
//
import { getRequestConfig } from "next-intl/server";

export default getRequestConfig( async ( { locale } ) => ( {
	timeZone: "Europe/Paris",
	messages: ( await import( `../public/locales/${ locale }.json` ) ).default
} ) );