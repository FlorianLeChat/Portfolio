//
// Permet de contrôler le mécanisme d'affichage/disparition de l'image
//	en arrière plan au survol de la souris.
//
const courses = document.querySelectorAll( "#list li" );

for ( const course of courses.values() )
{
	// On ajoute un événement qui se déclenchera lorsque la souris
	//	est en train de survoler l'élément.
	course.addEventListener( "mouseover", function ( _event )
	{
		const target = course.getAttribute( "data-image" );							// Image ciblée
		const current = window.getComputedStyle( course, null ).backgroundImage;	// Image de secours

		course.style.backgroundImage = `url( ${ target } ), ${ current }`;
	} );

	// On cache l'image lorsque la souris n'est plus dans la zone de
	// 	sélection de l'élément.
	course.addEventListener( "mouseleave", function ( _event )
	{
		course.style.backgroundImage = "";
	} );
}

//
// Permet de définir la taille de la description de chaque formation
//	par rapport à son élément "frère" (images à gauche).
//
const descriptions = document.querySelectorAll( "#summary li" );
let sizes = [];

for ( const course of courses.values() )
{
	sizes.push( course.clientHeight );
}

for ( let indice in descriptions )
{
	if ( descriptions.hasOwnProperty( indice ) )
	{
		descriptions[ indice ].style.height = `${ sizes[ indice ] }px`;	// Taille en pixels
	}
}