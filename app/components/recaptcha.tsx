//
// Composant des services de vérification via Google reCAPTCHA.
//

"use client";

import Script from "next/script";
import { useEffect } from "react";
import { getBasePath } from "@/utilities/NextRouter";

export default function SpeechRecognition()
{
	// Déclaration des constantes.
	const basePath = getBasePath();
	const recaptchaUrl = new URL( "https://www.google.com/recaptcha/api.js" );
	recaptchaUrl.searchParams.append( "render", process.env.NEXT_PUBLIC_CAPTCHA_PUBLIC_KEY ?? "" );

	// Vérification de la validité de l'utilisateur via Google reCAPTCHA.
	useEffect( () =>
	{
		// On vérifie d'abord si le navigateur a chargé les scripts nécessaires
		//  et si la clé publique est définie.
		if ( typeof window.grecaptcha === "undefined" || !process.env.NEXT_PUBLIC_CAPTCHA_PUBLIC_KEY )
		{
			return;
		}

		// On attend ensuite que les services de reCAPTCHA soient prêts.
		window.grecaptcha.ready( async () =>
		{
			// On génère alors un jeton d'authentification...
			const token = await window.grecaptcha.execute( process.env.NEXT_PUBLIC_CAPTCHA_PUBLIC_KEY ?? "", {
				action: "create"
			} );

			// On envoie enfin le jeton au serveur pour vérification.
			fetch( `${ basePath }/api/recaptcha`, {
				body: JSON.stringify( { token } ),
				method: "POST",
				headers: {
					"Content-type": "application/json; charset=UTF-8"
				}
			} );
		} );
	}, [ basePath ] );

	// Affichage du rendu HTML du composant.
	return (
		<Script src={recaptchaUrl.href} strategy="beforeInteractive" />
	);
}