//
// Composant de l'accès à l'administration de l'ancienne version du site.
//

"use client";

import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState, useCallback } from "react";

export default function AdminAccess()
{
	// Désactivation du composant sur les pages d'administration.
	if ( usePathname().includes( "/admin" ) )
	{
		return null;
	}

	// Déclaration des constantes.
	const word = "admin";
	const router = useRouter();

	// Déclaration des variables d'état.
	const [ keys, setKeys ] = useState( "" );

	// Enregistrement des touches pressées.
	const addKeys = useCallback(
		( event: KeyboardEvent ) =>
		{
			// On vérifie d'abord si la touche pressée est une lettre.
			const key = event.key.toLowerCase();

			if ( key.match( /[a-z]/i ) )
			{
				// Si c'est le cas, on ajoute la lettre à la suite de mots alignés.
				setKeys( keys + key );
			}
		},
		[ keys ]
	);

	// Récupération des touches pressées.
	useEffect( () =>
	{
		// On ajoute un écouteur d'événement pour chaque touche pressée
		//  au montage du composant.
		window.addEventListener( "keypress", addKeys );

		// On précharge ensuite la page d'administration pour éviter
		//  un temps de chargement trop long.
		router.prefetch( "/legacy/admin" );

		// On supprime enfin l'écouteur d'événement au démontage du composant.
		return () => window.removeEventListener( "keypress", addKeys );
	}, [ router, addKeys ] );

	// Vérification des touches pressées.
	useEffect( () =>
	{
		// On vérifie d'abord si la suite de mots possède la même longueur
		//  que le mot secret.
		if ( keys.length >= word.length )
		{
			// On vérifie alors si la suite de mots correspond au mot secret.
			if ( keys === word )
			{
				// Si c'est le cas, on redirige l'utilisateur vers l'administration.
				router.push( "/legacy/admin" );
			}

			// Dans le cas contraire, on réinitialise enfin la suite de mots.
			setKeys( "" );
		}
	}, [ router, keys ] );

	// Affichage du rendu HTML du composant.
	return null;
}