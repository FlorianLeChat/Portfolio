import { fetchMetadata } from "@/utilities/metadata";

export default async function Sitemap()
{
    return [
        {
            url: new URL( ( await fetchMetadata() )?.metadataBase ?? "" ),
            lastModified: new Date()
        }
    ];
}
