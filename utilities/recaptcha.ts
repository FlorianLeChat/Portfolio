//
// Mécanisme de vérification de la validité du jeton reCAPTCHA.
//
import type { RecaptchaResponse } from "@/interfaces/Recaptcha";
import { NextResponse, type NextRequest } from "next/server";

export async function checkRecaptcha( request: NextRequest ): Promise<NextResponse>
{
	// On traite d'abord le corps de la requête sous format JSON
	//  pour obtenir le jeton reCAPTCHA transmis par l'utilisateur.
	let token;

	try
	{
		const json = await request.json();
		token = ( json as { token: string } ).token;
	}
	catch
	{
		// Une erreur s'est produite lors de la transformation du corps de
		//  la requête sous format JSON.
		return new NextResponse( null, { status: 400 } );
	}

	if ( !token )
	{
		// Le jeton reCAPTCHA est manquant ou invalide.
		return new NextResponse( null, { status: 400 } );
	}

	// On effectue ensuite une requête à l'API de Google reCAPTCHA
	//  afin de vérifier la validité du jeton auprès de leurs services.
	const data = await fetch(
		`https://www.google.com/recaptcha/api/siteverify?secret=${ process.env.RECAPTCHA_SECRET_KEY }&response=${ token }`,
		{ method: "POST" }
	);

	if ( data.ok )
	{
		// Si la requête a été traitée avec succès, on vérifie alors le
		//  résultat obtenu de l'API de Google reCAPTCHA sous format JSON.
		const json = ( await data.json() ) as RecaptchaResponse;
		const isInvalidResponse = !json.success || json.score < 0.7;

		if ( isInvalidResponse )
		{
			// En cas de score insuffisant ou si la réponse est invalide,
			//  on bloque la requête courante.
			return new NextResponse( null, { status: 400 } );
		}

		// Dans le cas contraire, on valide la requête courante.
		return new NextResponse( null, { status: 200 } );
	}

	// On retourne enfin une erreur si un problème est survenu lors de la
	//  vérification de la validité du jeton auprès des services de Google.
	return new NextResponse( null, { status: 500 } );
}