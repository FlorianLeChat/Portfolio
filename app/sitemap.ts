//
// Route vers le fichier sitemap du site.
//  Source : https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap
//
import type { MetadataRoute } from "next";

export default function Sitemap(): MetadataRoute.Sitemap
{
	return [
		{
			url: process.env.NEXT_PUBLIC_URL ?? "",
			lastModified: new Date()
		}
	];
}