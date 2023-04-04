//
// Composant de l'en-tête générique du site.
//
import { useTranslation } from "next-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useContext } from "react";
import { faMoon, faSun, faBars, faTimes } from "@fortawesome/free-solid-svg-icons";

import { ThemeContext } from "@/utils/ThemeContext";

export default function Header()
{
	// Déclaration des constantes.
	const { t } = useTranslation();
	const { theme, setTheme } = useContext( ThemeContext );

	// Déclaration des variables d'état.
	const [ showMenu, setShowMenu ] = useState( false );

	// Basculement entre les thèmes sombre et clair.
	const switchTheme = () =>
	{
		const html = document.querySelector( "html" );
		const target = theme === "light" ? "dark" : "light";

		if ( html )
		{
			// On signale à React que le changement de thème doit être
			//  effectué de manière asynchrone.
			html.className = `theme-${ target }`;
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

	// Affichage du rendu HTML du composant.
	return (
		<header>
			{/* En-tête de la page */}
			<a href="https://github.com/FlorianLeChat">{t( "pages.index.developer_firstname" )[ 0 ] + t( "pages.index.developer_surname" )[ 0 ]}</a>

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
				<button onClick={switchTheme}>
					<FontAwesomeIcon icon={theme === "light" ? faMoon : faSun} />
				</button>

				{/* Bouton pour ouvrir le menu de navigation */}
				<button onClick={toggleMenu}>
					<FontAwesomeIcon icon={showMenu ? faTimes : faBars} />
				</button>
			</nav>
		</header>
	);
}