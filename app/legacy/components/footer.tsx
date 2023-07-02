//
// Composant du pied de page de l'ancienne version du site.
//

"use client";

import Link from "next/link";
import { lazy, useState } from "react";

import { getBasePath } from "@/utilities/NextRouter";
import { useTranslation } from "@/utilities/ClientTranslations";

const Contributions = lazy( () => import( "./contributions" ) );

export default function Footer()
{
	// Déclaration des constantes.
	const basePath = getBasePath();
	const { t } = useTranslation();

	// Déclaration des variables d'état.
	const [ showOverlay, setShowOverlay ] = useState( false );

	// Affiche ou cache l'overlay des contributions.
	const openOverlay = () =>
	{
		// On lance d'abord la musique de fond.
		const audio = new Audio( `${ basePath }/assets/sounds/jazz.mp3` );
		audio.volume = 0.1;
		audio.play();

		// On affiche alors l'overlay.
		setShowOverlay( true );

		// On ferme enfin l'overlay lorsque la musique est terminée.
		audio.onended = () =>
		{
			setShowOverlay( false );
		};
	};

	// Affichage du rendu HTML du composant.
	return (
		<>
			{/* Overlay des contributions */}
			<Contributions visible={showOverlay} />

			{/* Pied de page */}
			<footer>
				<ul>
					{/* Overlay des contributions */}
					<li>
						<button type="button" onClick={openOverlay}>{t( "pages.legacy.footer.contributions" )}</button>
					</li>

					{/* Interface d'administration (back office) */}
					<li>
						<Link href="/legacy/admin">{t( "pages.legacy.footer.admin" )}</Link>
					</li>

					{/* Dépôt du code source */}
					<li>
						<a href="https://github.com/FlorianLeChat/Portfolio">{t( "pages.legacy.footer.github" )}</a>
					</li>
				</ul>
			</footer>

			{/* Bannière de dépréciation */}
			<section id="deprecated">
				<p>{t( "pages.legacy.deprecated" )}</p>
			</section>
		</>
	);
}