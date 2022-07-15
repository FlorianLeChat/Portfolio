//
// Permet de définir la taille de la description de chaque formation
//	par rapport à son élément "frère" (images à gauche).
//
const sizes = [ ...document.querySelectorAll( "#list li" ) ].map( property => property.clientHeight ); // NodeList -> Array -> Filtrage par propriété
const descriptions = document.querySelectorAll( "#summary li" );

for ( const indice in descriptions )
{
	if ( descriptions.hasOwnProperty( indice ) )
	{
		descriptions[ indice ].style.height = `${ sizes[ indice ] }px`;	// Taille en pixels
	}
}