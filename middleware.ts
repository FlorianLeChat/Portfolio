//
// Middleware de configuration de la bibliothèque « next-intl ».
//  Source : https://next-intl-docs.vercel.app/docs/getting-started/app-router-server-components
//

import createMiddleware from "next-intl/middleware";

export default createMiddleware( {
	locales: [ "en", "fr", "es", "jp" ],
	localePrefix: "never",
	defaultLocale: "en"
} );

export const config = {
	matcher: [ "/((?!api|_next|_vercel|.*\\..*).*)" ]
};