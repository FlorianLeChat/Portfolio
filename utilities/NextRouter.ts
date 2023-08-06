// Importation des types.
import { ReadonlyHeaders } from "next/dist/server/web/spec-extension/adapters/headers";
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";

//
// Récupération de la langue sélectionnée par l'utilisateur.
//  Note : ceci n'est plus implémenté dans le routeur de Next.js.
//
export const getLanguage = ( headers: ReadonlyHeaders, cookies: ReadonlyRequestCookies ) =>
{
	// On récupère d'abord les données des cookies enregistrés.
	const cookie = cookies.get( "NEXT_LANGUAGE" )?.value;

	if ( cookie )
	{
		// Si le cookie existe, on le retourne.
		return cookie;
	}

	// On récupère ensuite la chaîne de requête.
	const queryString = decodeURIComponent( headers.get( "X-Invoke-Query" ) ?? "" );

	// On traite la chaîne de requête pour récupérer les paramètres.
	const parameters = JSON.parse( queryString.length > 0 ? queryString : "{}" ) as { language?: string; };

	// On retourne alors la langue sélectionnée par l'utilisateur
	//  ou la langue par défaut du navigateur.
	return parameters.language ?? headers.get( "Accept-Language" )?.substring( 0, 2 ) ?? "en";
};