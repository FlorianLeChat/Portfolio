// Importation des dépendances.
import { lazy, type ReactNode } from "react";

// Importation des composants.
const Header = lazy( () => import( "./components/header" ) );
const Footer = lazy( () => import( "./components/footer" ) );
const Navigation = lazy( () => import( "./components/navigation" ) );
const LanguageSelector = lazy( () => import( "./components/language-selector" ) );

export default function Layout( { children }: { children: ReactNode; } )
{
	// Affichage du rendu HTML de la page.
	return (
		<>
			{/* En-tête */}
			<Header />

			<main>
				{/* Navigation */}
				<Navigation />

				{/* Sélecteur de langue */}
				<LanguageSelector />

				{/* Contenu de la page */}
				{children}
			</main>

			{/* Pied de page */}
			<Footer />
		</>
	);
}