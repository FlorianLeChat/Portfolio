import type { Reroute } from "@sveltejs/kit/hooks";
import { deLocalizeUrl } from "#lib/locales/runtime.js";

export const reroute: Reroute = ( { url } ) =>
{
    return deLocalizeUrl( url ).pathname;
};
