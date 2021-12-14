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
