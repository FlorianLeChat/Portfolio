//
// Structure HTML générale des pages de l'ancienne version du site.
//

// Importation des dépendances.
import { lazy, type ReactNode } from "react";
import { unstable_setRequestLocale } from "next-intl/server";

// Importation des composants.
const Header = lazy( () => import( "./components/header" ) );
const Footer = lazy( () => import( "./components/footer" ) );
const Navigation = lazy( () => import( "./components/navigation" ) );
const SectionFade = lazy( () => import( "./components/section-fade" ) );
const AdminAccess = lazy( () => import( "./components/admin-access" ) );
const LanguageSelector = lazy( () => import( "./components/language-selector" ) );

export default function Layout( {
	children,
	params: { locale }
}: {
	children: ReactNode;
	params: { locale: string };
} )
{
	// Définition de la langue de la page.
	unstable_setRequestLocale( locale );

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

			{/* Effets visuels des sections */}
			<SectionFade />

			{/* Accès à l'administration */}
			<AdminAccess />

			{/* Pied de page */}
			<Footer />
		</>
	);
}