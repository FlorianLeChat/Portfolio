//
// Route vers la page principale du site.
//  Source : https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts#pages
//

import type { Metadata } from "next";
import { Suspense, lazy } from "react";

export default function Page()
{
	// Affichage du rendu HTML de la page.
	return (
		<Suspense fallback={<p>Chargement en cours...</p>}>
			<HomePage />
		</Suspense>
	);
}