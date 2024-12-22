//
// Page de chargement des composants client.
//  Source : https://nextjs.org/docs/app/api-reference/file-conventions/loading
//
import { fetchMetadata } from "@/utilities/metadata";

export default async function Loading()
{
	// Déclaration des constantes.
	const { title } = ( await fetchMetadata() ) as { title: string };

	// Affichage du rendu HTML du composant.
	return <div className="loading">📚 {title}</div>;
}