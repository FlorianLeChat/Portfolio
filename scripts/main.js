//
// Permet d'ajouter une animation pour afficher
// 	mon prénom et mon nom de famille.
//
function typingEffect( element, speed )
{
	// On vérifie tout d'abord si l'élément
	//	existe au niveau du document HTML.
	if ( element === null )
		return;

	// On sauvegarde après le texte original.
	const text = element.innerHTML;

	// On le supprime ensuite pour afficher
	// 	notre animation.
	element.innerHTML = "";

	// On créé enfin un minuteur qui affichera
	// 	chaque lettre avec un délai d'attente.
	let indice = 0;

	const timer = setInterval( () =>
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
			window.location.href = "admin/";
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

if ( scrollTop !== null )
{
	window.addEventListener( "scroll", () =>
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
}

//
// Permet d'activer les mécanismes liés à l'overlay.
//
const audio = document.getElementById( "jazz" );

if ( audio !== null )
{
	function preventScroll()
	{
		// Position X/Y : 0/0
		window.scrollTo( 0, 0 );
	}

	if ( window.location.search.includes( "thanks" ) )
	{
		const overlay = document.getElementById( "contributions" );

		// On lance une musique d'ambiance.
		audio.volume = 0.1;
		audio.play();

		// On fait ensuite l'apparition de l'overlay.
		overlay.style.display = "block";

		// On fait également disparaître la barre de défilement du document.
		document.body.style.overflow = "hidden";

		overlay.addEventListener( "click", () =>
		{
			// Si on tente de cliquer sur l'élément, alors on rafraîchit la page
			// 	en supprimant les paramètres GET ajoutés précédemment.
			let url = window.location.href;
			url = url.replace( "?thanks=1", "" );	// Premier paramètre (possible).
			url = url.replace( "&thanks=1", "" );	// Deuxième paramètre (possible).

			window.location.href = url;
		} );

		// On ajoute enfin un événement pour empêcher partiellement le défilement.
		window.addEventListener( "scroll", preventScroll );
	}
	else
	{
		// Dans le cas contraire, on supprime l'événement.
		window.removeEventListener( "scroll", preventScroll );
	}
}

//
// Permet de créer un effet d'apparition des sections.
//
const sections = document.querySelectorAll( "section" );

function fadeIn()
{
	for ( const section of sections )
	{
		const offset = section.getBoundingClientRect().top - window.innerHeight + 20;

		section.style.opacity = offset < 0 ? 1 : 0;
	}
}

fadeIn(); // Note : doit s'exécuter au moins une fois au chargement.

window.addEventListener( "scroll", fadeIn );

//
// Permet de désactiver le mécanisme de glissement d'un lien.
//
const links = document.querySelectorAll( "a" );

for ( const link of links )
{
	link.addEventListener( "mousedown", ( event ) =>
	{
		event.preventDefault();
	} );
}

//
// Permet aux utilisateurs sur un téléphone mobile de pouvoir
//	sélectionner correctement la langue voulue en bloquant
//	l'action du bouton actif au premier appui.
//
const flag = document.querySelector( "#flags button" );
const mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test( navigator.userAgent );

if ( mobile )
{
	function preventFirstClick( event )
	{
		flag.removeEventListener( "click", preventFirstClick );
		event.preventDefault();
	}

	flag?.addEventListener( "click", preventFirstClick );
}

//
// Permet de bloquer le renvoie des formulaires lors du rafraîchissement
//	de la page par l'utilisateur.
// 	Source : https://stackoverflow.com/a/45656609
//
if ( window.history.replaceState && window.location.hostname != "localhost" )
{
	window.history.replaceState( null, null, window.location.href );
}

//
// Permet d'ajouter le mécanisme de fonctionnement de Google Analytics.
// 	Source : https://analytics.google.com/analytics/web/#/
//
window.dataLayer = window.dataLayer || [];

function gtag()
{
	dataLayer.push( arguments );
}

gtag( "js", new Date() );
gtag( "config", analytics_identifier );

//
// Permet de vérifier l'authenticité de l'utilisateur via reCAPTCHA
//	avant de soumettre un formulaire quelconque au serveur.
// 	Source : https://developers.google.com/recaptcha/docs/v3#programmatically_invoke_the_challenge
//
const inputs = document.querySelectorAll( "input[type=submit]" );

for ( const input of inputs )
{
	// On récupère et on itère à travers tous les boutons de soumission.
	input.addEventListener( "click", ( event ) =>
	{
		// On vérifie tout d'abord si le formulaire possède déjà un
		//	jeton d'authentification de reCAPTCHA.
		if ( document.querySelector( "input[name=recaptcha]" ) )
		{
			return;
		}

		// On cesse alors le comportement par défaut.
		event.preventDefault();

		// On attend ensuite que les services de reCAPTCHA soient chargés.
		grecaptcha.ready( async () =>
		{
			// Une fois terminé, on exécute une requête de vérification
			// 	afin d'obtenir un jeton de vérification auprès de Google.
			const token = await grecaptcha.execute( captcha_public_key );

			// On insère enfin dynamiquement le jeton dans le formulaire
			//	avant de cliquer une nouvelle fois sur le bouton de soumission.
			const element = document.createElement( "input" );
			element.type = "hidden";
			element.name = "recaptcha";
			element.value = token;

			input.form.appendChild( element );

			event.target.click();
		} );
	} );
}

//
// Permet d'implémenter le chargement différé de certaines ressources (images, vidéos, ...).
// 	Source : https://github.com/verlok/vanilla-lazyload#-getting-started---script
//
const lazyLoad = new LazyLoad();
const resources = document.querySelectorAll( "img, video, [data-bg]" );

for ( const resource of resources )
{
	resource.classList.add( "lazy" );
}

lazyLoad.update();