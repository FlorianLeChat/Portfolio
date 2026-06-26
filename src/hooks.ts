import type { Reroute } from "@sveltejs/kit";
import { deLocalizeUrl } from "$lib/locales/runtime";

export const reroute: Reroute = ( { url } ) =>
{
    return deLocalizeUrl( url ).pathname;
};
