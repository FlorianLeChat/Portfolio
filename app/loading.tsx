//
// Page de chargement des composants asynchrones.
//  Source : https://nextjs.org/docs/app/api-reference/file-conventions/loading
//
export default function Loading( { title }: { title: string } )
{
	// Affichage du rendu HTML du composant.
	return <div className="loading">📚 {title}</div>;
}