//
// Route permettant de valider les jetons d'authentification de Google reCAPTCHA.
//
import { NextRequest, NextResponse } from "next/server";

export async function POST( request: NextRequest )
{
	// On vérifie d'abord si on se trouve actuellement dans un environnement
	//  de développement ou de production et si la clé secrète de l'API
	//  de Google reCAPTCHA a été définie ou non.
	const secret = process.env.CAPTCHA_SECRET_KEY;

	if ( !secret )
	{
		return new NextResponse( null, { status: 401 } );
	}

	// On vérifie ensuite si le corps de la requête est vide ou non.
	const { length } = await request.text();

	if ( length === 0 )
	{
		return new NextResponse( null, { status: 400 } );
	}

	// On vérifie également si le jeton d'authentification est valide ou non.
	const { token } = await request.json() as { token: string; };

	if ( token.length === 0 )
	{
		return new NextResponse( null, { status: 400 } );
	}

	// On effectue alors une requête à l'API de Google reCAPTCHA à des fins de
	//  statistiques et de vérification de la validité du jeton d'authentification.
	await fetch(
		`https://www.google.com/recaptcha/api/siteverify?secret=${ secret }&response=${ token }`,
		{ method: "POST" }
	);

	// On signale enfin que la réponse a été traitée avec succès.
	return new NextResponse( null, { status: 200 } );
}