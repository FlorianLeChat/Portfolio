// @ts-check

const join = require( "path" ).join;

/**
 * @type {import("next-sitemap").IConfig}
 */
module.exports = {
	siteUrl: process.env.NEXT_PUBLIC_URL,
	exclude: [ "/fr*", "/sitemap.xml" ],
	transform: async ( _config, path ) =>
	{
		// Modification de la priorité de la page d'accueil
		//  pour qu'elle soit prioritaire dans les résultats de recherche.
		if ( path === "/" )
		{
			return {
				loc: path,
				priority: "1.0"
			};
		}

		return {
			loc: path,
			priority: "0.5"
		};
	},
	autoLastmod: false,
	alternateRefs: [
		{
			href: join( process.env.NEXT_PUBLIC_URL ?? "", "/en" ),
			hreflang: "en"
		},
		{
			href: join( process.env.NEXT_PUBLIC_URL ?? "", "/fr" ),
			hreflang: "fr"
		}
	],
	generateIndexSitemap: false
};