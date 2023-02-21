//
// Route permettant de valider les jetons d'authentification de Google reCAPTCHA.
//
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler( request: NextApiRequest, response: NextApiResponse )
{
	// On vérifie d'abord si on se trouve actuellement dans un environnement
	// 	de développement ou de production et si la clé secrète de l'API
	// 	de Google reCAPTCHA a été définie ou non.
	if ( !process.env[ "CAPTCHA_SECRET_KEY" ] )
	{
		return;
	}

	// On vérifie ensuite si le jeton d'authentification qui a été transmis
	//	semble valide ou non.
	if ( !request.body.token )
	{
		return;
	}

	// On effectue alors une requête à l'API de Google reCAPTCHA à des fins
	//	de statistiques et de vérification de la validité du jeton d'authentification.
	await fetch( `https://www.google.com/recaptcha/api/siteverify?secret=${ process.env[ "CAPTCHA_SECRET_KEY" ] }&response=${ request.body.token }` );

	// On signale enfin que la réponse a été traitée.
	response.end();
}