import { fetchMetadata } from "@/utilities/metadata";
import { type MetadataRoute } from "next";

export default async function manifest(): Promise<MetadataRoute.Manifest>
{
    const metadata = await fetchMetadata();

    return {
        name: metadata.title as string,
        display: "standalone",
        start_url: "/",
        short_name: metadata.title as string,
        description: metadata.description as string,
        theme_color: "#306cc4",
        background_color: "#f5f6f7",
        icons: [
            {
                src: "/assets/favicons/16x16.webp",
                type: "image/webp",
                sizes: "16x16"
            },
            {
                src: "/assets/favicons/32x32.webp",
                type: "image/webp",
                sizes: "32x32"
            },
            {
                src: "/assets/favicons/48x48.webp",
                type: "image/webp",
                sizes: "48x48"
            },
            {
                src: "/assets/favicons/180x180.webp",
                type: "image/webp",
                sizes: "180x180"
            },
            {
                src: "/assets/favicons/192x192.webp",
                type: "image/webp",
                sizes: "192x192"
            },
            {
                src: "/assets/favicons/512x512.webp",
                type: "image/webp",
                sizes: "512x512"
            }
        ]
    };
}
