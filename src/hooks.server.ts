import type { Handle } from "@sveltejs/kit";
import { getTextDirection } from "$lib/locales/runtime";
import { paraglideMiddleware } from "$lib/locales/server";

const handleParaglide: Handle = ( { event, resolve } ) =>
    paraglideMiddleware( event.request, ( { request, locale } ) =>
    {
        event.request = request;

        return resolve( event, {
            transformPageChunk: ( { html } ) =>
                html.replace( "%paraglide.lang%", locale ).replace( "%paraglide.dir%", getTextDirection( locale ) )
        } );
    } );

export const handle: Handle = handleParaglide;
