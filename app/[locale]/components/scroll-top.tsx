//
// Composant de retour en haut de page du site.
//

"use client";

import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { useTranslations } from "next-intl";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";

export default function ScrollTop()
{
	// Déclaration des variables d'état.
	const t = useTranslations( "landing" );
	const [ showButton, setShowButton ] = useState( false );

	// Remontée en haut de la page.
	const scrollToTop = () => window.scrollTo( { top: 0, behavior: "smooth" } );

	// Affichage ou disparition du bouton de remontée en haut de page.
	const onScroll = () => setShowButton( window.scrollY > 200 );

	// Détection du défilement de la page.
	//  Source : https://github.com/vercel/next.js/issues/6132#issuecomment-790623507
	useEffect( () =>
	{
		onScroll();

		window.addEventListener( "scroll", onScroll );

		return () => window.removeEventListener( "scroll", onScroll );
	}, [] );

	// Affichage conditionnel du rendu HTML du composant.
	return (
		showButton && (
			<aside>
				<button
					type="button"
					onClick={scrollToTop}
					aria-label={t( "scroll_top" )}
				>
					<FontAwesomeIcon icon={faArrowUp} />
				</button>
			</aside>
		)
	);
}