//
// Mécanisme de routage pour les pages de l'application.
//
import { type NextRequest, NextResponse } from "next/server";
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
			// On vérifie après si le corps de la requête est vide ou non.
			const body = await request.text();

			if ( body.length === 0 )
			{
				return new NextResponse( null, { status: 400 } );
			}

			// On vérifie également si un jeton d'authentification a été
			//  transmis par l'utilisateur.
			const { token } = JSON.parse( body ) as { token?: string };

			if ( !token )
			{
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

	// On créé par la suite un mécanisme de redirection des pages afin de gérer
	//  les langues et traductions en fonction des préférences de l'utilisateur.
	//  Source : https://github.com/amannn/next-intl/issues/243#issuecomment-1818575818
	const locales = [ "en", "fr", "es", "jp" ];
	const cookieLocale = request.cookies.get( "NEXT_LOCALE" )?.value;
	const browserLocale = request.headers.get( "Accept-Language" )?.slice( 0, 2 );
	const defaultLocale = "en";
	const [ , localeUrl ] = request.nextUrl.pathname.split( "/" );

	let resolvedLocale =
		( localeUrl !== "" ? localeUrl : undefined )
		?? cookieLocale
		?? browserLocale
		?? defaultLocale;

	resolvedLocale = locales.includes( resolvedLocale )
		? resolvedLocale
		: defaultLocale;

	if ( !localeUrl || !locales.includes( localeUrl ) )
	{
		// Si la langue n'est pas définie dans l'URL ou si elle n'est pas
		//  valide, on utilise la langue courante pour la page demandée.
		return NextResponse.rewrite(
			( request.nextUrl.href.endsWith( "/" )
				? request.nextUrl.href
				: `${ request.nextUrl.href }/` ) + resolvedLocale,
			{
				request: { headers: request.headers }
			}
		);
	}

	// Dans le cas contraire, on met enfin en mémoire les informations
	//  déduites précédemment et on redirige l'utilisateur vers la même
	//  page mais avec la langue définie dans l'URL.
	const response = NextResponse.redirect(
		request.nextUrl.href.replace( resolvedLocale, "" )
	);

	response.cookies.set( "NEXT_LOCALE", resolvedLocale );
	response.headers.set( "X-NEXT-INTL-LOCALE", resolvedLocale );

	return response;
}

export const config = {
	matcher: [ "/", "/((?!_next|_vercel|.*\\..*).*)" ]
};