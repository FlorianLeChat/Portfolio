//
// Permet de vérifier les informations renseignés dans le formulaire de contact.
// 	Note : on utilise les fonctions de vérification du HTML pour plus de simplicité.
//
const result = document.getElementById( "result" );
const elements = document.querySelectorAll( "#form input[type *= e], #form select, #form textarea" );

for ( const element of elements.values() )
{
	// On ajoute un événement pour actualiser l'état de validité
	// 	du champ de saisie à chaque nouveau caractère.
	element.addEventListener( "input", ( _event ) =>
	{
		if ( !element.validity.valid )
		{
			// Si le champ est invalide, on affiche un message d'erreur
			// 	avec les éléments qui doivent être modifiées.
			const label = document.querySelector( `label[for = ${ element.id }]` ).innerHTML;	// Nom du champ
			const minLength = element.getAttribute( "minLength" );								// Taille minimale
			const maxLength = element.getAttribute( "maxLength" );								// Taille maximale

			result.innerHTML = `Le champ <q> ${ label } </q> doit avoir une taille comprise entre ${ minLength } et ${ maxLength } caractères.`;

			// Lancement d'une animation d'apparition du message.
			result.classList.remove( "hide" );
			result.classList.add( "show" );
		}
		else
		{
			// Lancement d'une animation de disparition du message.
			result.classList.remove( "show" );
			result.classList.add( "hide" );
		}
	} );
}

//
// const submit = document.querySelector( "input[type=submit]" );

// console.log( submit );

// submit.addEventListener( "submit", function ( event )
// {
// 	event.preventDefault();
// } );