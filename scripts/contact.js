//
// Permet de vérifier les informations renseignés dans le formulaire de contact.
//
const result = document.getElementById( "result" );
const elements = document.querySelectorAll( "input[type *= e], select, textarea" );

for ( const element of elements.values() )
{
	const label = document.querySelector( `label[for = ${ element.id }]` ).innerHTML;

	element.addEventListener( "input", function ( _event )
	{
		if ( !element.validity.valid )
		{
			const minLength = element.getAttribute( "minLength" );
			const maxLength = element.getAttribute( "maxLength" );

			result.innerHTML = `Le champ <q> ${ label } </q> doit avoir une taille comprise entre ${ minLength } et ${ maxLength } caractères.`;
			// result.style.display = "inline-block";
		}
		else
		{
			result.style.animation = "250ms hide 0s forwards";
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