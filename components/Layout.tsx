//
// Composant d'architecture générale du site.
//

// Importation des dépendances.
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import * as CookieConsent from "vanilla-cookieconsent";
import { useEffect, ReactNode } from "react";

// Importation des fonctions utilitaires.
import { ThemeProvider } from "@/utils/ThemeContext";

// Importation des composants.
const Header = dynamic( () => import( "@/components/Header" ) );
const Footer = dynamic( () => import( "@/components/Footer" ) );
const ScrollTop = dynamic( () => import( "@/components/ScrollTop" ) );

export default function Layout( { children }: { children: ReactNode; } )
{
	// Déclaration des constantes.
	const router = useRouter();
	const shouldHide = router.pathname === "/404" || router.pathname === "/500" || router.pathname === "/_offline";

	// Affichage du consentement des cookies.
	useEffect( () =>
	{
		CookieConsent.run(
			{
				// Désactivation de l'interaction avec la page.
				disablePageInteraction: true,

				// Paramètres internes des cookies.
				cookie: {
					path: router.basePath
				},

				// Paramètres de l'interface utilisateur.
				guiOptions: {
					consentModal: {
						layout: "bar",
						position: "bottom center"
					}
				},

				// Configuration des catégories de cookies.
				categories: {
					necessary: {
						enabled: true,
						readOnly: true
					},
					analytics: {
						autoClear: {
							cookies: [
								{
									name: /^(_ga|_gid)/
								}
							]
						}
					}
				},

				// Configuration des traductions.
				language: {
					default: router.locale ?? "en",
					translations: {
						en: "./locales/en/common.json",
						fr: "./locales/fr/common.json"
					}
				},
			}
		);
	}, [ router.basePath, router.locale ] );

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