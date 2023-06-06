import { getBasePath } from "@/app/utilities/NextRouter";
import { NextResponse, type NextRequest } from "next/server";

export const config = {
	matcher: [ "/((?!_next).*)" ]
};

export function middleware( request: NextRequest )
{
	// On construit d'abord la réponse par défaut.
	const response = NextResponse.next( {
		request: {
			headers: new Headers( request.headers )
		}
	} );

	// On récupère ensuite le chemin de base ainsi que la langue de l'utilisateur.
	const basePath = getBasePath( true );
	const language = request.headers.get( "accept-language" )?.substring( 0, 2 );

	if ( language )
	{
		// Si la langue est définie, on l'ajoute aux cookies.
		response.cookies.set( {
			path: basePath,
			name: "NEXT_LANGUAGE",
			value: language
		} );
	}

	// On retourne enfin la réponse contenant le cookie.
	return response;
}