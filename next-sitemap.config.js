// @ts-check

const url = ( process.env[ "NEXT_PUBLIC_URL" ] ?? "" ) + process.env[ "NEXT_PUBLIC_BASE_PATH" ];

/**
 * @type {import("next-sitemap").IConfig}
 */
module.exports = {
	siteUrl: url,
	exclude: [ "/fr*", "/sitemap.xml" ],
	transform: async ( _config, path ) =>
	{
		// Modification de la priorité de la page d'accueil
		// 	pour qu'elle soit prioritaire dans les résultats de recherche.
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
			href: url + "/en",
			hreflang: "en",
		},
		{
			href: url + "/fr",
			hreflang: "fr",
		},
	],
	generateIndexSitemap: false
};