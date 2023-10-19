//
// Composant des effets visuels des sections de l'ancienne version du site.
//

"use client";

import { usePathname } from "next/navigation";
import { useEffect, useCallback } from "react";

export default function SectionFade()
{
	// Vérification de la version du site.
	if ( usePathname().includes( "/admin" ) )
	{
		return null;
	}

	// Effet visuel de fondu d'apparition et disparition des sections.
	const fadeIn = useCallback( () =>
	{
		document.querySelectorAll( "section" ).forEach( ( section ) =>
		{
			const offset =
				section.getBoundingClientRect().top - window.innerHeight + 20;
			const element: HTMLElement | null = document.querySelector(
				`#${ section.id }`
			);

			if ( element )
			{
				element.style.opacity = offset < 0 ? "1" : "0";
			}
		} );
	}, [] );

	// Détection du défilement de la page.
	useEffect( () =>
	{
		// On ajoute tout d'abord un écouteur d'évènement sur le défilement
		//  de la page au montage du composant.
		window.addEventListener( "scroll", fadeIn );

		// On supprime enfin l'écouteur d'événement au démontage du composant.
		return () => window.removeEventListener( "scroll", fadeIn );
	}, [ fadeIn ] );

	// Affichage du rendu HTML du composant.
	return null;
}