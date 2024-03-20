//
// Options de configuration de Next Intl.
//  Source : https://next-intl-docs.vercel.app/docs/getting-started/app-router-server-components
//
import deepmerge from "deepmerge";
import { notFound } from "next/navigation";
import { getRequestConfig } from "next-intl/server";
import type { AbstractIntlMessages } from "next-intl";

export function getLanguages()
{
	// Liste des langues disponibles.
	return [ "en", "fr" ];
}

export default getRequestConfig( async ( { locale } ) =>
{
	// Vérification de la langue demandée par l'utilisateur.
	if ( !getLanguages().includes( locale ) )
	{
		notFound();
	}

	// Récupération des traductions dans le système de fichiers.
	//  Note : les traductions manquantes sont fusionnées avec celles de
	//   la langue par défaut.
	return {
		timeZone: process.env.NEXT_PUBLIC_TIMEZONE,
		messages: deepmerge(
			( await import( "../locales/en.json" ) ).default,
			( await import( `../locales/${ locale }.json` ) ).default
		) as unknown as AbstractIntlMessages
	};
} );