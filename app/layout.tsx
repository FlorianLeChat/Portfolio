//
// Structure HTML principale des pages du site.
//  Source : https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts#root-layout-required
//

import type { ReactNode } from "react";

export default function RootLayout( { children }: { children: ReactNode; } )
{
	// Affichage du rendu HTML de la page.
	return (
		<html lang="fr">
			<body>
				<main>
					{children}
				</main>
			</body>
		</html>
	);
}