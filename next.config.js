// @ts-check
const createNextIntlPlugin = require( "next-intl/plugin" );
const withNextIntl = createNextIntlPlugin( "./utilities/i18n.ts" );

/**
 * @type {import("next").NextConfig}
 */
module.exports = withNextIntl( {
	poweredByHeader: false,
	experimental: {
		// https://github.com/vercel/next.js/discussions/46987#discussioncomment-8464812
		serverComponentsExternalPackages: ["pino", "pino-pretty"]
	},
	basePath: "",
	async redirects()
	{
		return [
			{
				// Redirection vers l'ancienne version.
				source: "/legacy",
				permanent: true,
				destination: "https://legacy.florian-dev.fr/portfolio/"
			}
		];
	}
} );