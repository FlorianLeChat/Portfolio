//
// Permet de contrôler le défilement des photos de la galerie des projets.
//
const arrows = document.querySelectorAll( "article div.images" );

for ( const arrow of arrows )
{
	// Afin de revenir à une image précédente.
	arrow.firstElementChild.addEventListener( "click", ( event ) =>
	{
		// On récupère toutes les images de la section où s'est produit le clic.
		const identifier = event.target.parentNode.parentNode.id;
		const images = document.querySelectorAll( `article#${ identifier } div.images div` );
		const length = images.length - 1;

		let indice = 0;

		for ( const image of images )
		{
			// On détermine si le conteneur est actuellement caché ou non.
			const hidden = window.getComputedStyle( image ).display == "none" || image.style.display == "none";

			if ( !hidden )
			{
				// Si l'image n'est pas caché, on casse la boucle et on fait
				//	en sorte de cacher l'image actuelle pour afficher celle
				//	qui l'a précède dans l'arborescence du document.
				const previous = images[ indice - 1 ] || images[ length ];

				previous.style.display = "inline-block";
				image.style.display = "none";

				return;
			}

			indice++;
		}
	} );

	// Afin de passer à une image suivante.
	arrow.lastElementChild.addEventListener( "click", ( event ) =>
	{
		// On récupère toutes les images de la section où s'est produit le clic.
		const identifier = event.target.parentNode.parentNode.id;
		const images = document.querySelectorAll( `article#${ identifier } div.images div` );

		let indice = 0;

		for ( const image of images )
		{
			// On détermine si le conteneur est actuellement caché ou non.
			const hidden = window.getComputedStyle( image ).display == "none" || image.style.display == "none";

			if ( !hidden )
			{
				// Si l'image n'est pas caché, on casse la boucle et on fait
				//	en sorte de cacher l'image actuelle pour afficher celle
				//	qui l'a suit dans l'arborescence du document.
				const next = images[ indice + 1 ] || images[ 0 ];

				image.style.display = "none";
				next.style.display = "inline-block";

				return;
			}

			indice++;
		}
	} );
}