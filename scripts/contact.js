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
// Permet de restreindre l'actionneur pour envoyer les données
// 	du formulaire au serveur.
//
const form = document.querySelector( "#form > form" );
const submit = document.querySelector( "input[type=submit]" );

form.addEventListener( "submit", ( event ) =>
{
	for ( const element of elements.values() )
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

//
// Permet de générer un pseudo code aléatoire de 7 caractères pour
// 	éviter le spam par des robots ou des utilisateurs malveillants.
//
const characters = [
	"A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z",
	"a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z",
	"0", "1", "2", "3", "4", "5", "6", "7", "8", "9"
];

let generation = [];

for ( let i = 1; i <= 7; i++ )
{
	// On génère un code aléatoire de 7 caractères.
	generation.push( characters[ Math.floor( Math.random() * characters.length ) ] );
}

form.addEventListener( "submit", ( event ) =>
{
	// Lors de la chaque soumission du formulaire, on demande à l'utilisateur
	//	de renseigner le code indiqué dans la boite de dialogue.
	const entry = prompt( "Veuillez entrer le code de vérification suivant : " + generation.join( "" ), "" );

	if ( entry != generation )
	{
		alert( "Code de vérification incorrect, vous êtes un robot ?!" );

		event.preventDefault();

		return false;
	}
} );