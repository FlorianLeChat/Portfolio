//
// Route vers le fichier du plan du site.
//  Source : https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap
//
import { generateMetadata } from "./[locale]/layout";

export default async function Sitemap()
{
	// Déclaration des constantes.
	const date = new Date();
	const baseUrl = new URL( ( await generateMetadata() )?.metadataBase ?? "" );
	const pathname = baseUrl.pathname.endsWith( "/" )
		? baseUrl.pathname
		: `${ baseUrl.pathname }/`;
	const legacyUrl = new URL( `${ pathname }legacy`, baseUrl );

	// Génération du plan du site.
	return [
		{
			// Page d'accueil.
			url: baseUrl,
			lastModified: date
		},
		{
			// Ancienne page d'accueil.
			url: legacyUrl,
			lastModified: date
		},
		{
			// Ancienne page des projets.
			url: `${ legacyUrl }/projects`,
			lastModified: date
		},
		{
			// Ancienne page des compétences.
			url: `${ legacyUrl }/skills`,
			lastModified: date
		},
		{
			// Ancienne page de contact.
			url: `${ legacyUrl }/contact`,
			lastModified: date
		}
	];
}