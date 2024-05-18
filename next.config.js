// @ts-check

/**
 * @type {import("next").NextConfig}
 */
const { withSentryConfig } = require( "@sentry/nextjs" );
const withNextIntl = require( "next-intl/plugin" )( "./utilities/i18n.ts" );

const nextConfig = withNextIntl( {
	poweredByHeader: false,
	experimental: {
		// https://github.com/vercel/next.js/discussions/46987#discussioncomment-8464812
		serverComponentsExternalPackages: ["pino", "pino-pretty"]
	},
	basePath: "",
	sentry: {
		tunnelRoute: "/monitoring",
		disableLogger: true,
		hideSourceMaps: true,
		widenClientFileUpload: true
	},
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

const sentryConfig = {
	org: process.env.SENTRY_ORG,
	silent: true,
	project: process.env.SENTRY_PROJECT,
	authToken: process.env.SENTRY_AUTH_TOKEN
};

module.exports = process.env.SENTRY_ENABLED === "true"
	? withSentryConfig( nextConfig, sentryConfig )
	: nextConfig;