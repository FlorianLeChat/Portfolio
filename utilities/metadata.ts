import { join } from "node:path";
import { existsSync } from "node:fs";
import type { Metadata } from "next";
import { mkdir, readFile, writeFile } from "node:fs/promises";

const fetchWithCache = async ( url: string ) =>
{
    const response = await fetch( url, { cache: "force-cache" } );

    return await response.json() as Promise<Record<string, string>>;
};

export async function fetchMetadata(): Promise<Metadata & { source: string }>
{
    const folderPath = join( process.cwd(), "data" );
    const filePath = join( folderPath, "metadata.json" );

    await mkdir( folderPath, { recursive: true } );

    if ( existsSync( filePath ) )
    {
        return JSON.parse( await readFile( filePath, "utf8" ) ) as Metadata & {
            source: string;
        };
    }

    const repository = await fetchWithCache(
        "https://api.github.com/repos/FlorianLeChat/Portfolio"
    );

    const author = await fetchWithCache(
        "https://api.github.com/users/FlorianLeChat"
    );

    const commits = await fetchWithCache(
        "https://api.github.com/repos/FlorianLeChat/Portfolio/commits/master"
    );

    const banner = `https://opengraph.githubassets.com/${ commits.sha }/${ repository.full_name }`;
    const title = `${ author.name } - ${ repository.name }`;
    const url = repository.homepage;

    const metadata = {
        title,
        name: repository.name,
        source: repository.html_url,
        authors: [ { name: author.name, url: author.html_url } ],
        keywords: repository.topics,
        description: repository.description,
        icons: {
            icon: [
                {
                    url: `${ url }/assets/favicons/16x16.webp`,
                    type: "image/webp",
                    sizes: "16x16"
                },
                {
                    url: `${ url }/assets/favicons/32x32.webp`,
                    type: "image/webp",
                    sizes: "32x32"
                },
                {
                    url: `${ url }/assets/favicons/48x48.webp`,
                    type: "image/webp",
                    sizes: "48x48"
                },
                {
                    url: `${ url }/assets/favicons/192x192.webp`,
                    type: "image/webp",
                    sizes: "192x192"
                },
                {
                    url: `${ url }/assets/favicons/512x512.webp`,
                    type: "image/webp",
                    sizes: "512x512"
                }
            ],
            apple: [
                {
                    url: `${ url }/assets/favicons/180x180.webp`,
                    type: "image/webp",
                    sizes: "180x180"
                }
            ]
        },
        openGraph: {
            url,
            type: "website",
            title,
            description: repository.description,
            images: [
                {
                    url: banner
                }
            ]
        },
        twitter: {
            title,
            creator: `@${ author.twitter_username }`,
            description: repository.description,
            images: [
                {
                    url: banner
                }
            ]
        }
    };

    await writeFile( filePath, JSON.stringify( metadata ) );

    return metadata;
}
