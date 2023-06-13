//
// Composant de retour en haut de page de l'ancienne version du site.
//

"use client";

import { useState, useEffect } from "react";

export default function ScrollTop()
{
	// Déclaration des variables d'état.
	const [ buttonClass, setButtonClass ] = useState( "" );

	// Remontée en haut de la page.
	const scrollToTop = () =>
	{
		window.scrollTo( { top: 0, behavior: "smooth" } );
	};

	// Affichage ou disparition du bouton de remontée en haut de page.
	const onScroll = () =>
	{
		setButtonClass( window.scrollY > 200 ? "show" : "" );
	};

	// Détection du défilement de la page.
	//  Source : https://github.com/vercel/next.js/issues/6132#issuecomment-790623507
	useEffect( () =>
	{
		onScroll();

		window.addEventListener( "scroll", onScroll );

		return () => window.removeEventListener( "scroll", onScroll );
	}, [] );

	// Affichage du rendu HTML du composant.
	return (
		<button type="button" onClick={scrollToTop} id="scrollTop" className={buttonClass}>↑</button>
	);
}