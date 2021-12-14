//
// Permet d'effectuer une redirection vers la page d'administration
// 	lorsqu'une suite de mots est alignés.
//
const word = "admin";
let keys = [];

window.addEventListener( "keypress", ( event ) =>
{
	keys.push( event.key );

	if ( keys.length >= word.length )
	{
		if ( keys.join( "" ) == word )
		{
			window.location.href = "admin/index.php";
		}

		keys = [];
	}
} );

//
// Permet d'ajouter le mécanisme de retour en haut de la page
// 	(disparition progressive et actionneur).
//
const scrollTop = document.getElementById( "scrollTop" );
const threshold = 200;

scrollTop.addEventListener( "click", ( _event ) =>
{
	document.body.scrollTop = 0;						// Safari
	document.documentElement.scrollTop = 0;				// Chrome, Firefox, IE, etc.
} );

window.addEventListener( "scroll", ( _event ) =>
{
	if ( document.body.scrollTop > threshold || document.documentElement.scrollTop > threshold )
	{
		scrollTop.style.display = "block";
	}
	else
	{
		scrollTop.style.display = "none";
	}
} );

//
// Permet d'activer les mécanismes liés à l'overlay.
//
const parameters = window.location.search;

function preventScroll()
{
	// Position X/Y : 0/0
	window.scrollTo( 0, 0 );
}

if ( parameters.includes( "thanks" ) )
{
	const overlay = document.getElementById( "contributions" );

	// On fait l'apparition de l'overlay.
	overlay.style.display = "block";

	overlay.addEventListener( "click", ( _event ) =>
	{
		// Si on tente de cliquer sur l'élément, alors on le cache.
		overlay.style.display = "none";
	} );

	// On ajoute un événement pour empêcher partiellement le défilement.
	window.addEventListener( "scroll", preventScroll );
}
else
{
	// Dans le cas contraire, on supprime l'événement.
	window.removeEventListener( "scroll", preventScroll );
}