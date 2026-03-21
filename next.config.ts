import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin( "./utilities/i18n.ts" );
const nextConfig: NextConfig = withNextIntl( {
    poweredByHeader: false,
    sassOptions: {
        implementation: "sass-embedded"
    },
    async redirects()
    {
        return [
            {
                source: "/legacy",
                permanent: true,
                destination: "https://legacy.florian-dev.fr/portfolio/"
            }
        ];
    }
} );

export default nextConfig;
