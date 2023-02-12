//
// Composant de l'en-tête générique du site.
//
import { faMoon, faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Header()
{
	// Affichage du rendu HTML du composant.
	return (
		<header>
			{/* En-tête de la page */}
			<a className="icon-border" href="https://github.com/FlorianLeChat">FT</a>

			<nav>
				{/* Liens de navigation */}
				<ul>
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
				<button>
					<FontAwesomeIcon icon={faMoon} />
				</button>

				{/* Bouton pour ouvrir le menu de navigation */}
				<button>
					<FontAwesomeIcon icon={faBars} />
				</button>
			</nav>
		</header>
	);
}