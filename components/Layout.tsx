//
// Composant d'architecture générale du site.
//

// Importation des dépendances.
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useState, useEffect, useTransition } from "react";

// Importation des fonctions utilitaires.
import ThemeContext from "@/utils/ThemeContext";

// Importation des composants.
const Header = dynamic( () => import( "@/components/Header" ) );
const Footer = dynamic( () => import( "@/components/Footer" ) );
const ScrollTop = dynamic( () => import( "@/components/ScrollTop" ) );

export default function Layout( { children }: { children: React.ReactNode; } )
{
	// Déclaration des constantes.
	const router = useRouter();
	const shouldHide = router.pathname === "/404" || router.pathname === "/500" || router.pathname === "/_offline";
	const [ , startTransition ] = useTransition();

	// Déclaration des variables d'état.
	const [ theme, setTheme ] = useState( "light" );
	const switcher = useMemo( () => ( { theme, setTheme } ), [ theme ] );

	// Détection du thème par défaut de l'utilisateur.
	useEffect( () =>
	{
		// On vérifie si le navigateur de l'utilisateur supporte la fonctionnalité.
		const scheme = window.matchMedia( "(prefers-color-scheme: dark)" );

		// On vérifie ensuite le thème par défaut ou celui enregistré dans le
		//  stockage local du navigateur de l'utilisateur.
		const checkUserTheme = () =>
		{
			const html = document.querySelector( "html" );
			const target = localStorage.getItem( "current-theme" ) ?? ( scheme.matches ? "dark" : "light" );

			if ( html )
			{
				// On signale à React que le changement de thème doit être
				//  effectué de manière asynchrone.
				startTransition( () =>
				{
					html.className = `theme-${ target }`;
				} );
			}

			setTheme( target );

			localStorage.setItem( "current-theme", target );
		};

		// On déclenche après la vérification au montage du composant.
		checkUserTheme();

		// On ajoute enfin deux écouteurs d'événements pour détecter les changements
		//  du thème par défaut de l'utilisateur.
		scheme.addEventListener( "change", checkUserTheme );

		return () => scheme.removeEventListener( "change", checkUserTheme );
	}, [] );

	// Affichage du rendu HTML du composant.
	return (
		<>
			{/* Utilisation du contexte de thème. */}
			<ThemeContext.Provider value={switcher}>
				{/* Affichage de l'en-tête du site */}
				{!shouldHide && <Header />}

				{/* Affichage du composant enfant */}
				<main>{children}</main>

				{/* Affichage du bouton de retour en haut de page */}
				{!shouldHide && <ScrollTop />}

				{/* Affichage du pied de page du site */}
				{!shouldHide && <Footer />}
			</ThemeContext.Provider>
		</>
	);
}