//
// Permet de récupérer le répertoire de base de l'application.
//  Note : ceci n'est pas encore implémenté dans le routeur de Next.js.
//  Source : https://nextjs.org/docs/app/building-your-application/upgrading/app-router-migration#step-5-migrating-routing-hooks
//
export const getBasePath = () =>
{
	const basePath = new URL( process.env.NEXT_PUBLIC_URL ?? "" ).pathname;

	if ( basePath === "/" )
	{
		return "";
	}

	return basePath.endsWith( "/" ) ? basePath.slice( 0, -1 ) : basePath;
};