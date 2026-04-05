import { fetchMetadata } from "@/utilities/metadata";

export default async function Sitemap()
{
    const baseUrl = new URL( ( await fetchMetadata() )?.metadataBase ?? "" );

    return [
        {
            url: baseUrl,
            lastModified: new Date()
        }
    ];
}
