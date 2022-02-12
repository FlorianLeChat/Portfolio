//
// Permet d'ajouter les images d'arrière-plan des lieux où s'est
//	déroulé la formation.
//
const courses = document.querySelectorAll( "#list li" );

for ( const course of courses.values() )
{
	const target = course.getAttribute( "data-image" );					// Image ciblée
	const current = window.getComputedStyle( course ).backgroundImage;	// Image de secours

	course.style.backgroundImage = `url( ${ target } ), ${ current }`;
}

//
// Permet de définir la taille de la description de chaque formation
//	par rapport à son élément "frère" (images à gauche).
//
const sizes = [ ...courses ].map( property => property.clientHeight ); // NodeList -> Array -> Filtrage par propriété
const descriptions = document.querySelectorAll( "#summary li" );

for ( const indice in descriptions )
{
	if ( descriptions.hasOwnProperty( indice ) )
	{
		descriptions[ indice ].style.height = `${ sizes[ indice ] }px`;	// Taille en pixels
	}
}