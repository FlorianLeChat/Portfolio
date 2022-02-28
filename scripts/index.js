//
// Permet d'ajouter les images de fond pour représenter les projets.
//
const projects = document.querySelectorAll( "#projects .row article" );

for ( const project of projects.values() )
{
	const target = project.getAttribute( "data-image" );				// Image ciblée
	const current = window.getComputedStyle( project ).backgroundImage;	// Image de secours

	project.style.backgroundImage = `url( ${ target } ), ${ current }`;
}

//
// Permet de mettre à jour dynamiquement l'âge indiqué dans la
// 	section "à propos de moi" (si ça ce n'est pas du dynamisme !).
//
const now = new Date().getTime();								// Horodatage de l'heure actuelle
const born = Date.parse( "08 Aug 1999 00:00:00 GMT" );			// Horodatage de ma date de naissance
const relative = new Date( now - born ).getFullYear() - 1970;	// Nombre d'années séparant les deux dates

const aboutme = document.querySelector( "#aboutme > p" );

if ( aboutme != null )
{
	aboutme.innerHTML = aboutme.innerHTML.replace( /[0-9]+/g, relative );
}