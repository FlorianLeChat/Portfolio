//
// Génération des métadonnées du site Internet à partir de l'API GitHub.
//
import { join } from "path";
import { existsSync } from "fs";
import type { Metadata } from "next";
import { mkdir, readFile, writeFile } from "fs/promises";

const fetchWithCache = async ( url: string ) =>
{
	// Récupération des données avec mise en cache forcée.
	const response = await fetch( url, { cache: "force-cache" } );

	return response.json() as Promise<Record<string, string>>;
};

export async function fetchMetadata(): Promise<Metadata & { source: string }>
{
	// On vérifie d'abord si les métadonnées sont déjà enregistrées
	//  dans le cache du système de fichiers.
	const folderPath = join( process.cwd(), "data" );
	const filePath = join( folderPath, "metadata.json" );

	await mkdir( folderPath, { recursive: true } );

	if ( existsSync( filePath ) )
	{
		return JSON.parse( await readFile( filePath, "utf8" ) ) as Metadata & {
			source: string;
		};
	}

	// On récupère ensuite les informations du dépôt GitHub,
	//  ceux de l'auteur et le dernier commit.
	const repository = await fetchWithCache(
		"https://api.github.com/repos/FlorianLeChat/Portfolio"
	);

	const author = await fetchWithCache(
		"https://api.github.com/users/FlorianLeChat"
	);

	const commits = await fetchWithCache(
		"https://api.github.com/repos/FlorianLeChat/Portfolio/commits/master"
	);

	// On détermine après certaines métadonnées récurrentes.
	const banner = `https://opengraph.githubassets.com/${ commits.sha }/${ repository.full_name }`;
	const title = `${ author.name } - ${ repository.name }`;
	const url = process.env.NODE_ENV === "production"
		? repository.homepage
		: `http://localhost:3000${ process.env.__NEXT_ROUTER_BASEPATH }`;

	// On retourne également les métadonnées récupérées récemment
	//  avant de les enregistrer dans un fichier JSON.
	const metadata = {
		// Métadonnées du document.
		title,
		name: repository.name,
		source: repository.html_url,
		authors: [ { name: author.name, url: author.html_url } ],
		keywords: repository.topics,
		description: repository.description,
		metadataBase: new URL( url ), // https://github.com/vercel/next.js/issues/53455

		// Icônes du document.
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

		// Informations pour les moteurs de recherche.
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

		// Informations pour la plate-forme Twitter.
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

	// On enregistre enfin les métadonnées dans un fichier JSON
	//  avant de les retourner.
	await writeFile( filePath, JSON.stringify( metadata ) );

	return metadata;
}