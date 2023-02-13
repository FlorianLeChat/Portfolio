//
// Composant de l'en-tête générique du site.
//
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun, faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import { useState, useContext, useEffect } from "react";

import { ThemeContext } from "@/utils/ThemeContext";

export default function Header()
{
	// Déclaration des variables d'état.
	const { theme, setTheme } = useContext( ThemeContext );
	const [ showMenu, setShowMenu ] = useState( false );

	// Basculement entre les thèmes sombre et clair.
	function switchTheme()
	{
		const html = document.querySelector( "html" );
		const target = theme === "light" ? "dark" : "light";

		if ( html )
		{
			// On signale à React que le changement de thème doit être
			//	effectué de manière asynchrone.
			html.className = "theme-" + target;
		}

		setTheme( target );
	}

	// Affichage ou disparition du menu de navigation.
	//	Note : ce menu est seulement visible sur les écrans de petite taille.
	function toggleMenu()
	{
		setShowMenu( !showMenu );
	}

	// Sauvegarde du thème par défaut dans le stockage local.
	useEffect( () =>
	{
		localStorage.setItem( "default-theme", theme );
	}, [ theme ] );

	// Affichage du rendu HTML du composant.
	return (
		<header>
			{/* En-tête de la page */}
			<a href="https://github.com/FlorianLeChat">FT</a>

			<nav>
				{/* Liens de navigation */}
				<ul className={showMenu ? "show" : ""}>
					<li>
						<a href="#projects">Projets</a>
					</li>

					<li>
						<a href="#skills">Compétences</a>
					</li>

					<li>
						<a href="#contact">Contact</a>
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