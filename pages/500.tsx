//
// Route vers la page des erreurs internes (erreur HTTP 500).
//
import Error from "next/error";

export default function HTTP500()
{
	// Affichage du rendu HTML de la page.
	return <Error statusCode={500} />;
}