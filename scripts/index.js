//
// Permet d'ajouter la couleur de fond des images des plateformes
//	de communication (par défaut, la couleur du thème est appliqué).
//
const plateforms = document.querySelectorAll( "header a > img" );

for ( const plateform of plateforms.values() )
{
	plateform.style.backgroundColor = plateform.getAttribute( "data-color" );
}

//
// Permet d'ajouter les images de fond pour représenter les projets.
//
const projects = document.querySelectorAll( "#projects .row article" );

for ( const project of projects.values() )
{
	const url = project.getAttribute( "data-image" );

	imageExists( url, ( state ) =>
	{
		// On vérifie si la fonction de retour indique que l'image
		// 	existe bien ou non.
		if ( state )
		{
			project.style.backgroundImage = `url( "${ url }" )`;
		}
	} );
}