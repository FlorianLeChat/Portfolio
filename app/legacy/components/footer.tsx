//
// Composant du pied de page de l'ancienne version du site.
//

"use client";

import Link from "next/link";
import { useTranslation } from "@/utilities/ClientTranslations";
import { lazy, useEffect, useCallback } from "react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

const Contributions = lazy( () => import( "./contributions" ) );

export default function Footer()
{
	// Vérification de la version du site.
	if ( usePathname().includes( "/admin" ) )
	{
		return null;
	}

	// Déclaration des constantes.
	const router = useRouter();
	const parameters = useSearchParams();

	// Déclaration des variables d'état.
	const { t } = useTranslation();

	// Affiche ou cache l'overlay des contributions.
	const openOverlay = useCallback( () =>
	{
		// On lance d'abord la musique de fond.
		const audio = new Audio(
			`${ process.env.__NEXT_ROUTER_BASEPATH }/assets/sounds/jazz.mp3`
		);
		audio.volume = 0.1;
		audio.play();

		// On affiche alors l'overlay.
		const url = new URLSearchParams( parameters );
		url.set( "overlay", "1" );

		// On ferme ensuite l'overlay lorsque la musique est terminée.
		audio.onended = () =>
		{
			url.delete( "overlay" );
		};

		// On change enfin l'URL de la page.
		router.push( url ? `?${ url.toString() }` : url, { scroll: false } );
	}, [ parameters, router ] );

	// Ouverture de l'overlay si l'URL contient le paramètre « overlay ».
	const autoPlay = useCallback( () =>
	{
		if ( parameters.get( "overlay" ) === "1" )
		{
			openOverlay();

			window.removeEventListener( "mousedown", autoPlay );
		}
	}, [ parameters, openOverlay ] );

	// Affichage de l'overlay après un clic sur la page.
	//  Note : Google Chrome demande une interaction de l'utilisateur pour
	//   pouvoir jouer automatiquement une musique : https://developer.chrome.com/blog/autoplay/
	useEffect( () =>
	{
		window.addEventListener( "mousedown", autoPlay );

		return () => window.removeEventListener( "mousedown", autoPlay );
	}, [ openOverlay, autoPlay, parameters ] );

	// Affichage du rendu HTML du composant.
	return (
		<>
			{/* Overlay des contributions */}
			<Contributions visible={parameters.get( "overlay" ) === "1"} />

			{/* Pied de page */}
			<footer>
				<ul>
					{/* Overlay des contributions */}
					<li>
						<button type="button" onClick={openOverlay}>
							{t( "pages.legacy.footer.contributions" )}
						</button>
					</li>

					{/* Interface d'administration (back office) */}
					<li>
						<Link href="/legacy/admin">
							{t( "pages.legacy.footer.admin" )}
						</Link>
					</li>

					{/* Dépôt du code source */}
					<li>
						<a
							rel="noopener noreferrer"
							href="https://github.com/FlorianLeChat/Portfolio"
							target="_blank"
						>
							{t( "pages.legacy.footer.github" )}
						</a>
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