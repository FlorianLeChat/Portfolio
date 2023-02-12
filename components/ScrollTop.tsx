//
// Composant permettant de remonter en haut de page.
//
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function ScrollTop()
{
	// Affichage du rendu HTML du composant.
	return (
		<aside>
			<a href="#">
				<FontAwesomeIcon icon={faArrowUp} />
			</a>
		</aside>
	);
}