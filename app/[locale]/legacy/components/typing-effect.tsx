//
// Composant de l'effet de frappe des titres de l'ancienne version du site.
//

"use client";

import { useEffect, useState } from "react";

export default function TypingEffect( { text }: { text: string } )
{
	// Déclaration des variables d'état.
	const [ indice, setIndice ] = useState( 0 );
	const [ content, setContent ] = useState( "" );

	// Effet de frappe du texte.
	useEffect( () =>
	{
		// On créé d'abord un minuteur au montage du composant
		//  qui affichera chaque lettre avec un délai d'attente.
		const timer = setInterval( () =>
		{
			if ( indice < text.length )
			{
				// Si le texte n'est pas encore totalement écrit,
				//  on poursuit alors l'animation.
				setIndice( ( element ) => element + 1 );
				setContent( ( element ) => element + text.charAt( indice ) );
			}
			else
			{
				// Dans le cas contraire, l'animation est terminée,
				/// on supprime ensuite le minuteur créé précédemment.
				clearInterval( timer );
			}
		}, 150 );

		// On supprime enfin le minuteur au démontage du composant.
		return () => clearInterval( timer );
	}, [ indice, text ] );

	// Affichage du rendu HTML du composant.
	return <h1>{content}</h1>;
}