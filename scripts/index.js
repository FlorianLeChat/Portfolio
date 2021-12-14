//
// Permet d'ajouter la couleur de fond des images des plateformes
//	de communication (par défaut, la couleur du thème est appliqué).
//
const plateforms = document.querySelectorAll( "header a > img" );

for ( const plateform of plateforms.values() )
{
	plateform.style.backgroundColor = plateform.getAttribute( "data-color" );
}