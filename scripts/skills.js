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
		const url = course.getAttribute( "data-image" );

		imageExists( url, ( state ) =>
		{
			// On vérifie si la fonction de retour indique que l'image
			// 	existe bien ou non.
			if ( state )
			{
				course.style.backgroundImage = `url( "${ url }" )`;
			}
		} );
	} );

	// On cache l'image lorsque la souris n'est plus dans la zone de
	// 	sélection de l'élément.
	course.addEventListener( "mouseleave", function ( _event )
	{
		course.style.backgroundImage = "";
	} );
}