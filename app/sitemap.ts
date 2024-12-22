//
// Route vers le fichier du plan du site.
//  Source : https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap
//
import { fetchMetadata } from "@/utilities/metadata";

export default async function Sitemap()
{
	// Génération du plan du site.
	return [
		{
			// Page d'accueil.
			url: new URL( ( await fetchMetadata() )?.metadataBase ?? "" ),
			lastModified: new Date()
		}
	];
}