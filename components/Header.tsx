//
// Composant de l'en-tête générique du site.
//
import { useTranslation } from "next-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun, faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect, useContext, useTransition } from "react";

import { ThemeContext } from "@/utils/ThemeContext";

export default function Header()
{
	// Déclaration des constantes.
	const { t } = useTranslation();
	const { theme, setTheme } = useContext( ThemeContext );

	// Déclaration des variables d'état.
	const [ , startTransition ] = useTransition();
	const [ showMenu, setShowMenu ] = useState( false );

	// Basculement entre les thèmes sombre et clair.
	const switchTheme = () =>
	{
		const html = document.querySelector( "html" );
		const target = theme === "light" ? "dark" : "light";

		if ( html )
		{
			html.className = `theme-${ target } ${ target === "dark" ? "c_darkmode" : "" }`;
		}

		setTheme( target );

		localStorage.setItem( "current-theme", target );
	};

	// Affichage ou disparition du menu de navigation.
	//  Note : ce menu est seulement visible sur les écrans de petite taille.
	const toggleMenu = () =>
	{
		setShowMenu( !showMenu );
	};

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
				html.className = `theme-${ target } ${ target === "dark" ? "c_darkmode" : "" }`;
			}

			startTransition( () =>
			{
				// On réalise ce changement de manière asynchrone pour éviter
				//  un blocage du thread principal.
				setTheme( target );
			} );

			localStorage.setItem( "current-theme", target );
		};

		// On déclenche après la vérification au montage du composant.
		checkUserTheme();

		// On ajoute enfin deux écouteurs d'événements pour détecter les changements
		//  du thème par défaut de l'utilisateur.
		scheme.addEventListener( "change", checkUserTheme );

		return () => scheme.removeEventListener( "change", checkUserTheme );
	}, [ setTheme ] );

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
				<button type="button" onClick={switchTheme}>
					<FontAwesomeIcon icon={theme === "light" ? faMoon : faSun} />
				</button>

				{/* Bouton pour ouvrir le menu de navigation */}
				<button type="button" onClick={toggleMenu}>
					<FontAwesomeIcon icon={showMenu ? faTimes : faBars} />
				</button>
			</nav>
		</header>
	);
}