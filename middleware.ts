//
// Mécanisme de gestion des langues et traductions.
//  Source : https://next-intl-docs.vercel.app/docs/routing/middleware
//
import createIntlMiddleware from "next-intl/middleware";
import { type NextRequest } from "next/server";
import { getLanguages } from "./utilities/i18n";

export default async function middleware( request: NextRequest )
{
	const handleI18nRouting = createIntlMiddleware( {
		locales: getLanguages(),
		localePrefix: "never",
		defaultLocale: "en"
	} );

	return handleI18nRouting( request );
}

export const config = {
	matcher: [ "/", "/((?!_next|_vercel|.*\\..*).*)" ]
};

if ( process.env.__NEXT_ROUTER_BASEPATH )
{
	// Ajout du support du chemin de base de NextJS.
	//  Source : https://next-intl-docs.vercel.app/docs/routing/middleware#base-path
	config.matcher.push( process.env.__NEXT_ROUTER_BASEPATH );
}