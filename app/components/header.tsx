//
// Composant de l'en-tête du site.
//

"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect, useCallback } from "react";
import { faMoon, faSun, faBars, faTimes, faCookieBite } from "@fortawesome/free-solid-svg-icons";

import { getBasePath } from "../utilities/NextRouter";
import { useTranslation } from "../utilities/ClientTranslations";

export default function Header()
{
	// Déclaration des constantes.
	const { t } = useTranslation();
	const basePath = getBasePath( true );

	// Déclaration des variables d'état.
	const [ theme, setTheme ] = useState( "light" );
	const [ checked, setChecked ] = useState( false );
	const [ showMenu, setShowMenu ] = useState( false );

	// Basculement entre les thèmes sombre et clair.
	const switchTheme = useCallback( ( forceDark?: boolean ) =>
	{
		const html = document.querySelector( "html" );

		if ( html )
		{
			// On récupère d'abord le thème préféré de l'utilisateur.
			const target = ( forceDark || theme === "light" ) ? "dark" : "light";

			// On supprime alors l'ensemble des classes de thème
			//  avant d'ajouter celle correspondant au thème cible.
			html.classList.remove( "theme-light", "theme-dark", "c_darkmode" );
			html.classList.add( `theme-${ target }` );

			setTheme( target );

			// On ajoute ensuite une classe spécifique pour le thème sombre
			//  de la fenêtre du consentement des cookies.
			if ( target === "dark" )
			{
				html.classList.add( "c_darkmode" );
			}

			// On enregistre enfin le thème cible dans les cookies du navigateur.
			document.cookie = `NEXT_THEME=${ target }; path=${ basePath }`;
		}
	}, [ theme, basePath ] );

	// Affichage ou disparition du menu de navigation.
	//  Note : ce menu est seulement visible sur les écrans de petite taille.
	const toggleMenu = () =>
	{
		setShowMenu( !showMenu );
	};

	// Détection du thème par défaut de l'utilisateur.
	useEffect( () =>
	{
		// On vérifie si le navigateur demande un thème sombre préférentiel.
		const scheme = window.matchMedia( "(prefers-color-scheme: dark)" );

		// On applique alors le thème sombre si nécessaire au montage du composant.
		if ( !checked )
		{
			setChecked( true );
			switchTheme( scheme.matches );
		}

		// On ajoute enfin des écouteurs d'événements pour détecter les changements
		//  du thème préférentiel de l'utilisateur.
		scheme.addEventListener( "change", ( event ) => switchTheme( event.matches ) );

		return () => scheme.removeEventListener( "change", ( event ) => switchTheme( event.matches ) );
	}, [ switchTheme, checked ] );

	// Affichage du rendu HTML du composant.
	return (
		<header>
			{/* En-tête de la page */}
			<a href="https://github.com/FlorianLeChat">
				{t( "pages.index.developer_firstname" )[ 0 ] + t( "pages.index.developer_surname" )[ 0 ]}
			</a>

			<nav>
				{/* Liens de navigation */}
				<ul className={showMenu ? "show" : ""}>
					<li>
						<a href="#projects">{t( "pages.index.header_projects" )}</a>
					</li>

					<li>
						<a href="#skills">{t( "pages.index.header_skills" )}</a>
					</li>

					<li>
						<a href="#contact">{t( "pages.index.header_contact" )}</a>
					</li>
				</ul>

				{/* Bouton de basculement en thème sombre/clair */}
				<button type="button" onClick={() => switchTheme()}>
					<FontAwesomeIcon icon={theme === "light" ? faMoon : faSun} />
				</button>

				{/* Préférences des cookies */}
				<button type="button" data-cc="show-preferencesModal">
					<FontAwesomeIcon icon={faCookieBite} />
				</button>

				{/* Bouton pour ouvrir le menu de navigation */}
				<button type="button" onClick={toggleMenu}>
					<FontAwesomeIcon icon={showMenu ? faTimes : faBars} />
				</button>
			</nav>
		</header>
	);
}