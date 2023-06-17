//
// Permet de récupérer le répertoire de base de l'application.
//  Note : ceci n'est pas encore implémenté dans le routeur de Next.js.
//  Source : https://nextjs.org/docs/app/building-your-application/upgrading/app-router-migration#step-5-migrating-routing-hooks
//
export const getBasePath = ( trailingSlash?: boolean ) =>
{
	const basePath = new URL( process.env.NEXT_PUBLIC_URL ?? "" ).pathname;

	if ( trailingSlash )
	{
		return basePath.endsWith( "/" ) ? basePath : `${ basePath }/`;
	}

	return basePath.endsWith( "/" ) ? basePath.slice( 0, -1 ) : basePath;
};

//
// Permet de récupérer la langue sélectionné par l'utilisateur.
//  Note : ceci n'est plus implémenté dans le routeur de Next.js.
//
export const getLanguage = ( headers: Headers ) =>
{
	// On récupère d'abord la chaîne de requête.
	const queryString = decodeURIComponent( headers.get( "X-Invoke-Query" ) ?? "" );

	// On traite la chaîne de requête pour récupérer les paramètres.
	const parameters = JSON.parse( queryString.length > 0 ? queryString : "{}" ) as { language?: string; };

	// On retourne alors la langue sélectionnée par l'utilisateur
	//  ou la langue par défaut du navigateur.
	return parameters.language ?? headers.get( "Accept-Language" )?.substring( 0, 2 ) ?? "en";
};