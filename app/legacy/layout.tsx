// Importation des dépendances.
import { Open_Sans } from "next/font/google";
import { lazy, type ReactNode } from "react";

// Importation des composants.
const Header = lazy( () => import( "./components/header" ) );
const Footer = lazy( () => import( "./components/footer" ) );
const Navigation = lazy( () => import( "./components/navigation" ) );
const LanguageSelector = lazy( () => import( "./components/language-selector" ) );

// Création de la police de caractères Open Sans.
const openSans = Open_Sans( {
	weight: [ "400", "700" ],
	subsets: [ "latin" ],
	display: "swap"
} );

export default function LegacyLayout( { children }: { children: ReactNode; } )
{
	// Affichage du rendu HTML de la page.
	return (
		<div className={openSans.className}>
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
		</div>
	);
}