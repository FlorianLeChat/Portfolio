//
// Récupération de la langue sélectionnée par l'utilisateur.
//  Note : ceci n'est plus implémenté dans le routeur de Next.js.
//
import { headers, cookies } from "next/headers";

export const getLanguage = () =>
{
	// On récupère d'abord les données des cookies enregistrés.
	const headersList = headers();
	const cookie = cookies().get( "NEXT_LANGUAGE" )?.value;

	if ( cookie )
	{
		// Si le cookie existe, on le retourne.
		return cookie;
	}

	// On récupère ensuite la chaîne de requête.
	const queryString = decodeURIComponent(
		headersList.get( "X-Invoke-Query" ) ?? ""
	);

	// On traite la chaîne de requête pour récupérer les paramètres.
	const parameters = JSON.parse(
		queryString.length > 0 ? queryString : "{}"
	) as { language?: string };

	// On retourne alors la langue sélectionnée par l'utilisateur
	//  ou la langue par défaut du navigateur.
	return (
		parameters.language
		?? headersList.get( "Accept-Language" )?.substring( 0, 2 )
		?? "en"
	);
};