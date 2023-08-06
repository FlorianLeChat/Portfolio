//
// Route vers le fichier du plan du site.
//  Source : https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap
//
import { generateMetadata } from "./layout";

export default async function Sitemap()
{
	// Déclaration des constantes.
	const url = ( await generateMetadata() ).metadataBase.href;
	const date = new Date();
	const legacy = new URL( "/legacy", url ).href;

	// Génération du plan du site.
	return [
		{
			// Page d'accueil.
			url,
			lastModified: date
		},
		{
			// Ancienne page d'accueil.
			url: legacy,
			lastModified: date
		},
		{
			// Ancienne page des projets.
			url: `${ legacy }/projects`,
			lastModified: date
		},
		{
			// Ancienne page des compétences.
			url: `${ legacy }/skills`,
			lastModified: date
		},
		{
			// Ancienne page de contact.
			url: `${ legacy }/contact`,
			lastModified: date
		}
	];
}