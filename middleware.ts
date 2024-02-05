//
// Mécanisme de routage pour les pages de l'application.
//
import createIntlMiddleware from "next-intl/middleware";
import { type NextRequest, NextResponse } from "next/server";

import { getLanguages } from "./utilities/i18n";
import type { RecaptchaResponse } from "./interfaces/Recaptcha";

export default async function middleware( request: NextRequest )
{
	// On vérifie d'abord si le service reCAPTCHA est activé ou non.
	if ( process.env.NEXT_PUBLIC_RECAPTCHA_ENABLED === "true" )
	{
		// On vérifie ensuite s'il s'agit d'une requête de type GET ou POST.
		//  Note : les requêtes de type GET sont utilisées pour les diverses
		//   statistiques, tant disque que les requêtes de type POST sont
		//   utilisées pour la vérification de la validité des formulaires.
		if (
			( request.method === "GET"
				&& request.nextUrl.pathname === "/api/recaptcha" )
			|| request.method === "POST"
		)
		{
			// On traite le corps de la requête sous format JSON pour récupérer
			//  le jeton d'authentification reCAPTCHA transmis par l'utilisateur.
			let token;

			try
			{
				token = ( ( await request.json() ) as { token: string } ).token;
			}
			catch
			{
				// Une erreur s'est produite lors de la transformation du corps de
				//  la requête sous format JSON.
				return new NextResponse( null, { status: 400 } );
			}

			if ( !token )
			{
				// Le jeton d'authentification reCAPTCHA est manquant ou invalide.
				return new NextResponse( null, { status: 400 } );
			}

			// On effectue une requête à l'API de Google reCAPTCHA afin de vérifier
			//  la validité du jeton d'authentification auprès de leurs services.
			const data = await fetch(
				`https://www.google.com/recaptcha/api/siteverify?secret=${ process.env.RECAPTCHA_SECRET_KEY }&response=${ token }`,
				{ method: "POST" }
			);

			if ( data.ok )
			{
				// Si la requête a été traitée avec succès, on vérifie alors le
				//  résultat obtenu de l'API de Google reCAPTCHA sous format JSON.
				const json = ( await data.json() ) as RecaptchaResponse;

				if ( !json.success || json.score < 0.7 )
				{
					// En cas de score insuffisant ou si la réponse est invalide,
					//  on bloque la requête courante.
					return new NextResponse( null, { status: 400 } );
				}

				// Dans le cas contraire, on continue le traitement de la requête.
				return new NextResponse( null, { status: 200 } );
			}
		}
	}

	// On créé enfin le mécanisme de gestion des langues et traductions.
	//  Source : https://next-intl-docs.vercel.app/docs/getting-started/app-router-server-components
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
	// Ajout du support du chemin de base de NextJS pour le routage
	//  effectué par le mécanisme de gestion des langues et traductions.
	//  Source : https://next-intl-docs.vercel.app/docs/routing/middleware#base-path
	config.matcher.push( process.env.__NEXT_ROUTER_BASEPATH );
}