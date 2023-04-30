//
// Composant d'architecture générale du site.
//

// Importation des dépendances.
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import type { ReactNode } from "react";

// Importation des fonctions utilitaires.
import { ThemeProvider } from "@/utils/ThemeContext";

// Importation des composants.
const Header = dynamic( () => import( "@/components/Header" ) );
const Footer = dynamic( () => import( "@/components/Footer" ) );
const ScrollTop = dynamic( () => import( "@/components/ScrollTop" ) );

export default function Layout( { children }: { children: ReactNode; } )
{
	// Déclaration des constantes.
	const { pathname } = useRouter();
	const shouldHide = pathname === "/404" || pathname === "/500" || pathname === "/_offline";

	// Affichage du rendu HTML du composant.
	return (
		<>
			{/* Contexte de basculement des thèmes */}
			<ThemeProvider>
				{/* Affichage de l'en-tête du site */}
				{!shouldHide && <Header />}

				{/* Affichage du composant enfant */}
				<main>{children}</main>

				{/* Affichage du bouton de retour en haut de page */}
				{!shouldHide && <ScrollTop />}

				{/* Affichage du pied de page du site */}
				{!shouldHide && <Footer />}
			</ThemeProvider>
		</>
	);
}