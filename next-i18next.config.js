// @ts-check

/**
 * @type {import("next-i18next").UserConfig}
 */
module.exports = {
	debug: process.env.NODE_ENV === "development",
	reloadOnPrerender: process.env.NODE_ENV === "development",
	localePath: typeof window === "undefined" ? require( "path" ).resolve( "./public/locales" ) : "/locales",
	i18n: {
		defaultLocale: "en",
		locales: [ "en", "fr" ]
	}
};