//
// Route vers la page des pages non trouvées (erreur HTTP 404).
//
import Error from "next/error";

export default function HTTP404()
{
	// Affichage du rendu HTML de la page.
	return <Error statusCode={404} />;
}