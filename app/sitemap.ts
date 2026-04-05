import { fetchMetadata } from "@/utilities/metadata";

export default async function Sitemap()
{
    const baseUrl = new URL( ( await fetchMetadata() )?.metadataBase ?? "" );
    const pathname = baseUrl.pathname.endsWith( "/" )
        ? baseUrl.pathname
        : `${ baseUrl.pathname }/`;

    return [
        {
            url: baseUrl + pathname,
            lastModified: new Date()
        }
    ];
}
