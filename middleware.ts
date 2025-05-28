//
// Mécanisme de gestion des langues et traductions.
//  Source : https://next-intl-docs.vercel.app/docs/routing/middleware
//
import { type NextRequest } from "next/server";
import createIntlMiddleware from "next-intl/middleware";
import { getLanguages } from "./utilities/i18n";

export default async function middleware( request: NextRequest )
{
	const i18nRouting = createIntlMiddleware( {
		locales: getLanguages(),
		localePrefix: "never",
		defaultLocale: "en"
	} );

	return i18nRouting( request );
}

export const config = {
	matcher: [ "/", "/((?!_next|_vercel|.*\\..*).*)" ]
};

if ( process.env.__NEXT_ROUTER_BASEPATH )
{
	// Ajout du support du chemin de base de NextJS pour le routage
	//  effectué par le mécanisme de gestion des langues et traductions.
	//  Source : https://next-intl-docs.vercel.app/docs/routing/middleware#base-path
	config.matcher.push( process.env.__NEXT_ROUTER_BASEPATH );
}