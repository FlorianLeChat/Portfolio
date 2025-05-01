//
// Mécanisme de gestion des langues et traductions.
//  Source : https://next-intl-docs.vercel.app/docs/routing/middleware
//
import { type NextRequest } from "next/server";
import createIntlMiddleware from "next-intl/middleware";

import { getLanguages } from "./utilities/i18n";
import { checkRecaptcha } from "./utilities/recaptcha";

export default async function middleware( request: NextRequest )
{
	// On traite d'abord les requêtes de vérification contenant un jeton reCAPTCHA.
	const isRecaptchaRoute = request.nextUrl.pathname === "/api/recaptcha";
	const isRecaptchaEnabled = process.env.NEXT_PUBLIC_RECAPTCHA_ENABLED === "true";
	const isValidRecaptchaRequest = isRecaptchaEnabled && isRecaptchaRoute;

	if ( isValidRecaptchaRequest )
	{
		return checkRecaptcha( request );
	}

	// On créé enfin le mécanisme de gestion des langues et traductions.
	//  Source : https://next-intl-docs.vercel.app/docs/getting-started/app-router-server-components
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