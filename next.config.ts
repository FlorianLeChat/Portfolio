import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin( "./utilities/i18n.ts" );
const nextConfig: NextConfig = withNextIntl( {
	serverExternalPackages: [ "pino", "pino-pretty" ], // https://github.com/vercel/next.js/discussions/46987#discussioncomment-8464812
	poweredByHeader: false,
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

export default nextConfig;