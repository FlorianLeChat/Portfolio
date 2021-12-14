//
// Permet de vérifier si une image existe sur le serveur.
//
function imageExists( url, callback )
{
	const img = new Image();

	img.src = url;

	if ( img.complete )
	{
		// Image déjà en cache dans le navigateur.
		callback( true );
	}
	else
	{
		img.onload = () =>
		{
			// Chargement effectué sans erreur.
			callback( true );
		};

		img.onerror = () =>
		{
			// Chargement échoué (erreur).
			callback( false );
		};
	}
}

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
	document.body.scrollTop = 0;				// Safari uniquement.
	document.documentElement.scrollTop = 0;		// Chrome, Firefox, IE, etc.
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

//
// Permet de supprimer les extensions de certains liens lorsque le site
//	est déployé sous un environnement de production.
//	Note : le serveur hebergé possède également un mécanisme de réécriture d'URLs.
//
const links = document.querySelectorAll( "a" );

if ( window.location.hostname == "www.florian-dev.fr" )
{
	for ( const link of links.values() )
	{
		// On fait le remplacement de certaines extensions.
		let url = link.getAttribute( "href" );

		url = url.replace( ".html", "" );	// Extension HTML
		url = url.replace( ".php", "" );	// Extension PHP
		url = url.replace( "index", "" );	// Fichier "/index" vers "/"

		link.setAttribute( "href", url );
	}
}

//
// Permet de désactiver le mécanisme de glissement d'un lien.
//
for ( const link of links.values() )
{
	link.addEventListener( "mousedown", function ( event )
	{
		event.preventDefault();
	} );
}