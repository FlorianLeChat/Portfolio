//
// Composant de l'en-tête du site.
//

"use client";

import { faSun,
	faMoon,
	faBars,
	faTimes,
	faCookieBite } from "@fortawesome/free-solid-svg-icons";
import { useTranslations } from "next-intl";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from "react";
import { useTheme } from "./theme-provider";

export default function Header()
{
	// Déclaration des variables d'état.
	const t = useTranslations( "landing" );
	const { theme, setTheme } = useTheme();
	const [ mounted, setMounted ] = useState( false );
	const [ showMenu, setShowMenu ] = useState( false );

	// Déclaration des constantes.
	const isLightTheme = mounted ? theme === "light" : true;

	// Affichage ou disparition du menu de navigation.
	//  Note : ce menu est seulement visible sur les écrans de petite taille.
	const toggleMenu = () => setShowMenu( !showMenu );

	// Mise à jour de l'état de montage du composant.
	//  Source : https://www.npmjs.com/package/next-themes#avoid-hydration-mismatch
	useEffect( () =>
	{
		setMounted( true );
	}, [] );

	// Affichage du rendu HTML du composant.
	return (
		<header>
			{/* En-tête de la page */}
			<a
				rel="noopener noreferrer"
				href="https://github.com/FlorianLeChat"
				target="_blank"
			>
				{t( "developer_firstname" )[ 0 ] + t( "developer_surname" )[ 0 ]}
			</a>

			<nav>
				{/* Liens de navigation */}
				<ul className={showMenu ? "show" : ""}>
					<li>
						<a href="#projects">{t( "header_projects" )}</a>
					</li>

					<li>
						<a href="#skills">{t( "header_skills" )}</a>
					</li>

					<li>
						<a href="#contact">{t( "header_contact" )}</a>
					</li>
				</ul>

				{/* Bouton de basculement en thème sombre/clair */}
				<button
					type="button"
					title={t( "header_theme" )}
					onClick={() => setTheme( isLightTheme ? "dark" : "light" )}
				>
					<FontAwesomeIcon icon={isLightTheme ? faMoon : faSun} />
				</button>

				{/* Préférences des cookies */}
				<button
					type="button"
					title={t( "header_cookies" )}
					data-cc="show-preferencesModal"
				>
					<FontAwesomeIcon icon={faCookieBite} />
				</button>

				{/* Bouton pour ouvrir le menu de navigation */}
				<button
					type="button"
					title={t( "header_navigation" )}
					onClick={toggleMenu}
				>
					<FontAwesomeIcon icon={showMenu ? faTimes : faBars} />
				</button>
			</nav>
		</header>
	);
}