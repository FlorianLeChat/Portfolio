// https://next-intl-docs.vercel.app/docs/getting-started/app-router-server-components
import deepmerge from "deepmerge";
import { getRequestConfig } from "next-intl/server";
import type { AbstractIntlMessages } from "next-intl";

export function getLanguages()
{
    return [ "en", "fr" ];
}

export default getRequestConfig( async ( { requestLocale } ) =>
{
    let locale = await requestLocale;

    if ( !locale || !getLanguages().includes( locale ) )
    {
        locale = "en";
    }

    return {
        locale,
        timeZone: process.env.TZ,
        messages: deepmerge(
            ( await import( "../locales/en.json" ) ).default,
            ( await import( `../locales/${ locale }.json` ) ).default
        ) as unknown as AbstractIntlMessages
    };
} );
