//
// Permet de vérifier les informations renseignés dans le formulaire de contact.
// 	Note : on utilise les fonctions de vérification du HTML pour plus de simplicité.
//
const warning = document.getElementById( "warning" );
const elements = document.querySelectorAll( "#form input[type *= e], #form select, #form textarea" );

for ( const element of elements )
{
	// On ajoute un événement pour actualiser l'état de validité
	// 	du champ de saisie à chaque nouveau caractère.
	element.addEventListener( "input", () =>
	{
		if ( !element.validity.valid )
		{
			// Si le champ est invalide, on affiche un message d'erreur
			// 	avec les éléments qui doivent être modifiées.
			//	Note : le message d'erreur provient d'un script PHP.
			let message = check_phrase;

			message = message.replace( "$1", document.querySelector( `label[for = ${ element.id }]` ).innerHTML );	// Nom du champ
			message = message.replace( "$2", element.getAttribute( "minLength" ) );									// Taille minimale
			message = message.replace( "$3", element.getAttribute( "maxLength" ) );									// Taille maximale

			warning.innerHTML = message;

			// Lancement d'une animation d'apparition du message.
			warning.classList.remove( "hide" );
			warning.classList.add( "show" );
		}
		else
		{
			// Lancement d'une animation de disparition du message.
			warning.classList.remove( "show" );
			warning.classList.add( "hide" );
		}
	} );
}

//
// Permet de supprimer (après un délai) le message résultant de
//	l'envoi des données du formulaire au serveur.
//
const result = document.getElementById( "result" );
const delay = result.innerHTML == "" ? 0 : 10000;

setTimeout( () =>
{
	result.style.display = "none";
}, delay );

//
// Permet de restreindre l'actionneur pour envoyer les données
// 	du formulaire au serveur.
//
const form = document.querySelector( "#form > form" );
const submit = document.querySelector( "input[type=submit]" );

form.addEventListener( "submit", ( event ) =>
{
	for ( const element of elements )
	{
		// Si un champ est invalide aux yeux du HTML, alors
		//	on bloque le comportement par défaut de l'envoi.
		if ( !element.validity.valid )
		{
			event.preventDefault();
			event.stopImmediatePropagation();	// Bloque l'exécution des autres événements du même nom.

			return false;
		}
	}
} );