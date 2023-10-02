//
// Composant des services de suivi via Google Analytics.
//

"use client";

import Script from "next/script";
import type { CookieValue } from "vanilla-cookieconsent";
import { useState, useEffect, useCallback } from "react";

export default function Analytics()
{
	// Déclaration des constantes.
	const analyticsUrl = new URL( "https://www.googletagmanager.com/gtag/js" );

	// Déclaration des variables d'état.
	const [ analytics, setAnalytics ] = useState( false );

	// Activation des services Google Analytics au consentement des cookies.
	const onConsent = useCallback(
		( event: CustomEventInit<{ cookie: CookieValue }> ) =>
		{
			setAnalytics(
				event.detail?.cookie.categories.some(
					( category: string ) => category === "analytics"
				) ?? false
			);
		},
		[]
	);

	// Détection des changements de consentement des cookies.
	useEffect( () =>
	{
		window.addEventListener( "cc:onConsent", onConsent );

		return () => window.removeEventListener( "cc:onConsent", onConsent );
	}, [ onConsent, setAnalytics ] );

	// Vérification de l'activation du service.
	if ( process.env.NEXT_PUBLIC_ANALYTICS_ENABLED === "false" )
	{
		return null;
	}

	// Affichage conditionnel du rendu HTML du composant.
	return analytics ? (
		<>
			<Script src={analyticsUrl.href} strategy="lazyOnload" />
			<Script id="google-analytics" strategy="lazyOnload">
				{`
					window.dataLayer = window.dataLayer || [];

					function gtag( ...args )
					{
						window.dataLayer.push( ...args );
					}

					gtag( "js", new Date() );
					gtag( "config", "${ process.env.NEXT_PUBLIC_ANALYTICS_TAG ?? "" }" );
				`}
			</Script>
		</>
	) : null;
}