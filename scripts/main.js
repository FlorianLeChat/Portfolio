//
// Permet d'ajouter une animation pour afficher
// 	mon prénom et mon nom de famille.
//
function typingEffect( element, speed )
{
	// On sauvegarde d'abord le texte original.
	const text = element.innerHTML;

	// On le supprime juste après pour afficher
	// 	notre animation.
	element.innerHTML = "";

	// On créé ensuite un minuteur qui affichera
	// 	chaque lettre avec un délai d'attente.
	let indice = 0;

	const timer = setInterval( function ()
	{
		if ( indice < text.length )
		{
			// Le texte n'est pas encore totalement
			// 	écrit, on poursuit l'animation.
			element.append( text.charAt( indice ) );

			indice++;
		}
		else
		{
			// L'animation est terminée, on supprime le
			// 	minuteur créé précédemment.
			clearInterval( timer );
		}
	}, speed );
}

typingEffect( document.querySelector( "header > h1" ), 150 );

//
// Permet d'ajuster l'agrandissement des éléments par rapport au zoom
// 	du navigateur (fonctionne seulement pour l'amoindrissement).
//
function adjustZoom()
{
	const zoom = 100 / Math.round( window.devicePixelRatio * 100 );

	if ( zoom >= 1 )
	{
		document.body.style.zoom = zoom;
	}
}

adjustZoom();

window.addEventListener( "resize", adjustZoom );

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
		scrollTop.classList.add( "show" );
	}
	else
	{
		scrollTop.classList.remove( "show" );
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

	// On fait également disparaître la barre de défilement du document.
	document.body.style.overflow = "hidden";

	overlay.addEventListener( "click", ( _event ) =>
	{
		// Si on tente de cliquer sur l'élément, alors on rafraîchit la page.
		window.location.href = window.location.href.replace( "?thanks=1", "" );
	} );

	// On ajoute enfin un événement pour empêcher partiellement le défilement.
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

		if ( url == "" )
		{
			// Racine du document (index)
			url = "/";
		}

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