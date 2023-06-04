//
// Composant de l'écran de chargement des pages.
//  Source : https://nextjs.org/docs/app/api-reference/file-conventions/loading
//

export default function Loading()
{
	// Affichage du rendu HTML du composant.
	return (
		<div className="loading">
			📚 {process.env.NEXT_PUBLIC_TITLE}
		</div>
	);
}