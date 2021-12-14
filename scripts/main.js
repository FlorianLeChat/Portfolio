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