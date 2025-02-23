//
// Composant des effets affichés durant l'anniversaire.
//

"use client";

import confetti from "canvas-confetti";
import { useEffect } from "react";

export default function BirthdayEffect()
{
	// Génération d'un nombre aléatoire dans une plage donnée.
	const randomInRange = ( min: number, max: number ) => Math.random() * ( max - min ) + min;

	// Gestion de l'effet de feux d'artifice.
	useEffect( () =>
	{
		// Vérification de la date de naissance.
		const currentDate = new Date();
		const isBirthday = currentDate.getMonth() === 7 && currentDate.getDate() === 8;

		if ( !isBirthday )
		{
			return () => {};
		}

		// Déclenchement de l'effet de feux d'artifice.
		// https://www.kirilv.com/canvas-confetti/#fireworks
		const duration = 3 * 1000;
		const animationEnd = currentDate.getTime() + duration;

		const interval = setInterval( () =>
		{
			const timeLeft = animationEnd - Date.now();

			if ( timeLeft <= 0 )
			{
				// Si le temps restant est écoulé, on supprime le minuteur.
				return clearInterval( interval );
			}

			return confetti( {
				ticks: 60,
				origin: { x: randomInRange( 0.1, 0.9 ), y: Math.random() - 0.2 },
				zIndex: 0,
				spread: 360,
				startVelocity: 30,
				particleCount: 100
			} );
		}, 250 );

		// L'effet doit être supprimé au démontage du composant.
		return () => clearInterval( interval );
	}, [] );

	return null;
}