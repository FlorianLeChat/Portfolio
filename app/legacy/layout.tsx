// Importation des dépendances.
import { headers } from "next/headers";
import { lazy, type ReactNode } from "react";

// Importation des composants.
const Header = lazy( () => import( "./components/header" ) );
const Footer = lazy( () => import( "./components/footer" ) );
const Navigation = lazy( () => import( "./components/navigation" ) );
const SectionFade = lazy( () => import( "./components/section-fade" ) );
const AdminAccess = lazy( () => import( "./components/admin-access" ) );
const LanguageSelector = lazy( () => import( "./components/language-selector" ) );

export default function Layout( { children }: { children: ReactNode } )
{
	// Déclaration des constantes.
	const admin = headers().get( "X-Invoke-Path" )?.includes( "admin" ) ?? false;

	// Affichage du rendu HTML de la page.
	return (
		<>
			{/* En-tête */}
			<Header />

			<main>
				{
					// Éléments à afficher uniquement sur les pages publiques.
					( !admin ) && (
						<>
							{/* Navigation */}
							<Navigation />

							{/* Sélecteur de langue */}
							<LanguageSelector />
						</>
					)
				}

				{/* Contenu de la page */}
				{children}
			</main>

			{
				// Éléments à afficher uniquement sur les pages publiques.
				( !admin ) && (
					<>
						{/* Effets visuels des sections */}
						<SectionFade />

						{/* Accès à l'administration */}
						<AdminAccess />

						{/* Pied de page */}
						<Footer />
					</>
				)
			}
		</>
	);
}