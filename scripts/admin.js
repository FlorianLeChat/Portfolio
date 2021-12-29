//
// Permet d'afficher en clair le mot de passe entré
//	dans le champ de saisie.
//
const clear = document.getElementById( "clear" );
const password = document.getElementById( "password" );

if ( clear != null && password != null )
{
	clear.addEventListener( "click", ( _event ) =>
	{
		if ( password.type === "password" )
		{
			password.type = "text";
		}
		else
		{
			password.type = "password";
		}
	} );
}

//
// Permet de pouvoir envoyer les données du formulaire de
//	connexion en appuyant sur la touche "ENTRÉE".
//
const submit = document.querySelector( "input[type=submit]" );

if ( submit != null )
{
	password.addEventListener( "keyup", function ( event )
	{
		// Source : https://keycode.info/
		if ( event.key === "Enter" )
		{
			submit.click();
		}
	} );
}

//
// Permet d'actualiser en temps réel l'horloge présente
//	dans l'en-tête de l'interface d'administration.
//
const time = document.querySelector( "header p:first-of-type" );

if ( time != null )
{
	function updateTime()
	{
		time.innerHTML = new Date().toLocaleTimeString();
	}

	// Exécution de la fonction toutes les secondes.
	setInterval( updateTime, 1000 );

	// Exécution initiale lors du chargement de la page.
	updateTime();
}