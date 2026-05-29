import type { Reroute } from "@sveltejs/kit";

export const reroute: Reroute = ( { url } ) => url.pathname;
