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

//
// Permet de mettre à jour dynamiquement l'âge indiqué dans la
// 	section "à propos de moi" (si ça ce n'est pas du dynamisme !).
//
const now = new Date().getTime();								// Horodatage de l'heure actuelle
const born = Date.parse( "08 Aug 1999 00:00:00 GMT" );			// Horodatage de ma date de naissance
const relative = new Date( now - born ).getFullYear() - 1970;	// Nombre d'années séparant les deux dates

const aboutme = document.querySelector( "#aboutme > p" );

aboutme.innerHTML = aboutme.innerHTML.replace( /[0-9]+/g, relative );