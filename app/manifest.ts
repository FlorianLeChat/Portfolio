//
// Route vers le manifeste de l'application.
//  Source : https://nextjs.org/docs/app/api-reference/file-conventions/metadata/manifest
//
import { MetadataRoute } from "next";
import { generateMetadata } from "./[locale]/layout";

export default async function manifest(): Promise<MetadataRoute.Manifest>
{
	// Déclaration des constantes.
	const metadata = await generateMetadata();

	// Génération du manifeste.
	return {
		name: metadata.title as string,
		display: "standalone",
		start_url: "/",
		short_name: metadata.name,
		description: metadata.description as string,
		theme_color: "#306cc4", // Couleur par défaut du thème sombre.
		background_color: "#f5f6f7", // Couleur par défaut de l'arrière-plan en thème sombre.
		icons: [
			{
				src: "assets/favicons/16x16.webp",
				type: "image/webp",
				sizes: "16x16"
			},
			{
				src: "assets/favicons/32x32.webp",
				type: "image/webp",
				sizes: "32x32"
			},
			{
				src: "assets/favicons/48x48.webp",
				type: "image/webp",
				sizes: "48x48"
			},
			{
				src: "assets/favicons/180x180.webp",
				type: "image/webp",
				sizes: "180x180"
			},
			{
				src: "assets/favicons/192x192.webp",
				type: "image/webp",
				sizes: "192x192"
			},
			{
				src: "assets/favicons/512x512.webp",
				type: "image/webp",
				sizes: "512x512"
			}
		]
	};
}