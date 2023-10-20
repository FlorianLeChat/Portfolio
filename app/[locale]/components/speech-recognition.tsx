//
// Composant de la reconnaissance vocale du navigateur.
//

"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function SpeechRecognition()
{
	// Désactivation du composant sur les anciennes pages.
	if ( usePathname().startsWith( "/legacy" ) )
	{
		return null;
	}

	// Défilement automatique des sections via commandes vocales.
	//  Note : cette fonctionnalité n'est pas disponible sur Firefox.
	//  Source : https://github.com/mdn/dom-examples/blob/44856cc22f47b0203cbcb48127af50744e89aa7e/web-speech-api/speech-color-changer/script.js
	useEffect( () =>
	{
		if ( typeof window.webkitSpeechRecognition === "undefined" )
		{
			return;
		}

		const recognition = new window.webkitSpeechRecognition();
		recognition.start();
		recognition.onresult = ( event ) =>
		{
			// On récupère d'abord la transcription de la commande
			//  ainsi que tous les titres des sections.
			const name = event.results[ 0 ][ 0 ].transcript;
			const elements = document.querySelectorAll( "section > h2" );

			elements.forEach( ( element ) =>
			{
				// On vérifie ensuite si le titre de la section
				//  correspond à la commande vocale.
				if ( element.textContent?.toLocaleLowerCase().includes( name ) )
				{
					// On défile alors vers la section (si elle existe).
					element.scrollIntoView( { behavior: "smooth" } );
				}
			} );

			// On relance enfin la reconnaissance vocale après avoir
			//  attendu la fin de l'ancienne séquence de reconnaissance.
			setTimeout( () =>
			{
				recognition.start();
			}, 50 );
		};

		recognition.onerror = ( event ) =>
		{
			// On vérifie d'abord si la reconnaissance vocale a échoué
			//  à cause d'un manque de reconnaissance.
			if ( event.error === "no-speech" )
			{
				// Si c'est le cas, on attend quelques instants avant
				//  de la relancer.
				setTimeout( () =>
				{
					recognition.start();
				}, 50 );
			}
		};
	}, [] );

	// Affichage du rendu HTML du composant.
	return null;
}