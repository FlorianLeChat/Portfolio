//
// Route vers le fichier du plan du site.
//  Source : https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap
//
import { generateMetadata } from "./[locale]/layout";

export default async function Sitemap()
{
	// Déclaration des constantes.
	const metadata = await generateMetadata();
	const date = new Date();
	const base = metadata?.metadataBase ?? "";
	const legacy = new URL( "/legacy", base ).href;

	// Génération du plan du site.
	return [
		{
			// Page d'accueil.
			url: base,
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