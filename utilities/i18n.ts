//
// Fichier de configuration de la bibliothèque « next-intl ».
//  Source : https://next-intl-docs.vercel.app/docs/getting-started/app-router-server-components
//
import deepmerge from "deepmerge";
import { getRequestConfig } from "next-intl/server";
import type { AbstractIntlMessages } from "next-intl";

export default getRequestConfig( async ( { locale } ) => ( {
	timeZone: process.env.NEXT_PUBLIC_TIMEZONE,
	messages: deepmerge(
		( await import( "../public/locales/en.json" ) ).default,
		( await import( `../public/locales/${ locale }.json` ) ).default
	) as unknown as AbstractIntlMessages
} ) );