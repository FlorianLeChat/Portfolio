//
// Options de configuration de Next Intl.
//  Source : https://next-intl-docs.vercel.app/docs/getting-started/app-router-server-components
//
import deepmerge from "deepmerge";
import { getRequestConfig } from "next-intl/server";
import type { AbstractIntlMessages } from "next-intl";

export function getLanguages()
{
	// Liste des langues disponibles.
	return [ "en", "fr" ];
}

export default getRequestConfig( async ( { requestLocale } ) =>
{
	// Vérification de la langue demandée par l'utilisateur.
	let locale = await requestLocale;

	if ( !locale || !getLanguages().includes( locale ) )
	{
		locale = "en";
	}

	// Récupération des traductions dans le système de fichiers.
	//  Note : les traductions manquantes sont fusionnées avec celles de
	//   la langue par défaut.
	return {
		locale,
		timeZone: process.env.TZ,
		messages: deepmerge(
			( await import( "../locales/en.json" ) ).default,
			( await import( `../locales/${ locale }.json` ) ).default,
			{
				// Désactivation de la fusion des traductions manquantes
				//  relatives aux sections du consentement des cookies.
				//  Note : les traductions manquantes sont fusionnées avec
				//   celles de la langue par défaut et provoquent des duplications.
				customMerge: ( key ) =>
				{
					if ( key === "sections" )
					{
						return ( _, y ) => y;
					}

					return undefined;
				}
			}
		) as unknown as AbstractIntlMessages
	};
} );