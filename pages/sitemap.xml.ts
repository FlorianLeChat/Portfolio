//
// Route vers le fichier sitemap.xml généré par le serveur.
// 	Source : https://nextjs.org/learn/seo/crawling-and-indexing/xml-sitemaps
//
import type { GetServerSidePropsContext } from "next";

export async function getServerSideProps( { req, res }: GetServerSidePropsContext )
{
	// On récupère d'abord l'URL de la page.
	const url = req.headers.referer?.split( "/" );

	if ( !url || url.length < 3 )
	{
		// On retourne une erreur 404 si l'URL ne peut pas
		//	être récupérée auprès du serveur.
		res.statusCode = 404;
		res.end();

		return {
			props: {},
		};
	}

	// On génère ensuite le fichier sitemap.xml avec les
	//	informations récupérées.
	res.setHeader( "Content-Type", "text/xml" );
	res.write(
		`<?xml version="1.0" encoding="UTF-8"?>

		<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
			<url>
				<loc>${ url[ 0 ] }//${ url[ 2 ] }/</loc>
			</url>
		</urlset>
	`);
	res.end();

	// On retourne enfin un objet vide pour signifier
	//	que le fichier sitemap.xml a été généré.
	return {
		props: {},
	};
}

export default function SiteMap()
{
	// Généré par le serveur.
	return null;
}