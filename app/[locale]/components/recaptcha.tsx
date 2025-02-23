//
// Composant des services de vérification via Google reCAPTCHA.
//

"use client";

import Script from "next/script";
import type { CookieValue } from "vanilla-cookieconsent";
import { useState, useEffect, useCallback } from "react";

declare global
{
	// Déclaration du contexte global du navigateur.
	interface Window
	{
		setupRecaptcha: () => void;
	}
}

export default function Recaptcha()
{
	// Déclaration des variables d'état.
	const [ recaptcha, setRecaptcha ] = useState( false );

	// Déclaration des constantes.
	const recaptchaUrl = new URL( "https://www.google.com/recaptcha/api.js" );
	recaptchaUrl.searchParams.append( "render", process.env.NEXT_PUBLIC_RECAPTCHA_PUBLIC_KEY ?? "" );
	recaptchaUrl.searchParams.append( "onload", "setupRecaptcha" );

	// Activation des services Google reCAPTCHA au consentement des cookies.
	const onConsent = useCallback( ( event: CustomEventInit<{ cookie: CookieValue }> ) =>
	{
		const categories = event.detail?.cookie.categories;
		const isSecurity = categories?.some( ( category: string ) => category === "security" );

		setRecaptcha( isSecurity ?? false );
	}, [] );

	// Vérification de la validité de l'utilisateur via Google reCAPTCHA.
	const setupRecaptcha = useCallback( () =>
	{
		// On vérifie d'abord si le navigateur a chargé les scripts nécessaires.
		if ( typeof window.grecaptcha === "undefined" )
		{
			return;
		}

		// On attend ensuite que les services de reCAPTCHA soient prêts.
		window.grecaptcha.ready( async () =>
		{
			// On génère alors un jeton d'authentification...
			const token = await window.grecaptcha.execute(
				process.env.NEXT_PUBLIC_RECAPTCHA_PUBLIC_KEY ?? "",
				{
					action: "create"
				}
			);

			// On envoie enfin le jeton au serveur pour vérification.
			fetch( `${ process.env.__NEXT_ROUTER_BASEPATH }/api/recaptcha`, {
				body: JSON.stringify( { token } ),
				method: "POST"
			} );
		} );
	}, [] );

	// Détection des changements de consentement des cookies.
	useEffect( () =>
	{
		// Ajout de la fonction d'installation des services de reCAPTCHA
		//  dans le contexte global du navigateur.
		window.setupRecaptcha = setupRecaptcha;

		// Ajout et suppression de l'écouteur d'événement pour le consentement des cookies.
		window.addEventListener( "cc:onConsent", onConsent );

		return () => window.removeEventListener( "cc:onConsent", onConsent );
	}, [ onConsent, setupRecaptcha ] );

	// Affichage du rendu HTML du composant.
	return (
		process.env.NEXT_PUBLIC_RECAPTCHA_ENABLED === "true"
		&& recaptcha && <Script src={recaptchaUrl.href} strategy="lazyOnload" />
	);
}