import type { Handle } from "@sveltejs/kit/hooks";
import { getTextDirection } from "#lib/locales/runtime.js";
import { paraglideMiddleware } from "#lib/locales/server.js";

const handleParaglide: Handle = ( { event, resolve } ) =>
    paraglideMiddleware( event.request, ( { locale } ) =>
    {
        return resolve( event, {
            transformPageChunk: ( { html } ) =>
                html.replace( "%paraglide.lang%", locale ).replace( "%paraglide.dir%", getTextDirection( locale ) )
        } );
    } );

export const handle: Handle = handleParaglide;
