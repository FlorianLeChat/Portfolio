//
// Route vers la page principale du site.
//  Source : https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts#pages
//

import type { Metadata } from "next";
import { Suspense, lazy } from "react";

export const metadata: Metadata = {
	// Méta-données du document.
	title: process.env.NEXT_PUBLIC_TITLE,
	authors: [ { name: process.env.NEXT_PUBLIC_AUTHOR, url: "https://github.com/FlorianLeChat" } ],
	description: process.env.NEXT_PUBLIC_DESCRIPTION,
	keywords: process.env.NEXT_PUBLIC_TAGS,
	viewport: "width=device-width, initial-scale=1, viewport-fit=cover",
	manifest: "manifest.json",
	themeColor: "#306cc4",
	icons: [
		{
			url: "assets/favicons/16x16.webp",
			type: "image/webp",
			sizes: "16x16"
		},
		{
			url: "assets/favicons/32x32.webp",
			type: "image/webp",
			sizes: "32x32"
		},
		{
			url: "assets/favicons/48x48.webp",
			type: "image/webp",
			sizes: "48x48"
		},
		{
			url: "assets/favicons/180x180.webp",
			type: "image/webp",
			sizes: "180x180"
		},
		{
			url: "assets/favicons/192x192.webp",
			type: "image/webp",
			sizes: "192x192"
		},
		{
			url: "assets/favicons/512x512.webp",
			type: "image/webp",
			sizes: "512x512"
		}
	],

	// Balises OpenGraph.
	openGraph: {
		type: "website",
		title: process.env.NEXT_PUBLIC_TITLE,
		description: process.env.NEXT_PUBLIC_DESCRIPTION,
		images: [
			{
				url: process.env.NEXT_PUBLIC_BANNER ?? "",
				width: 1200,
				height: 600,
				alt: process.env.NEXT_PUBLIC_TITLE
			}
		]
	},

	// Balises Twitter.
	twitter: {
		card: "summary_large_image",
		title: process.env.NEXT_PUBLIC_TITLE,
		creator: process.env.NEXT_PUBLIC_TWITTER,
		description: process.env.NEXT_PUBLIC_DESCRIPTION,
		images: [
			{
				url: process.env.NEXT_PUBLIC_BANNER ?? "",
				width: 1200,
				height: 600,
				alt: process.env.NEXT_PUBLIC_TITLE
			}
		]
	}
};

export default function Page()
{
	// Affichage du rendu HTML de la page.
	return (
		<Suspense fallback={<p>Chargement en cours...</p>}>
			<HomePage />
		</Suspense>
	);
}