//
// Composant d'affichage de la section des projets.
//

"use client";

import Image from "next/image";
import { getImage } from "@/utilities/images";
import { useEffect } from "react";
import PhotoSwipeLightbox from "photoswipe/lightbox";
import type { ProjectAttributes } from "@/interfaces/Project";

export default function PhotoViewer( {
	id,
	project
}: Readonly<{ id: string; project: ProjectAttributes }> )
{
	// Création de la galerie photos.
	useEffect( () =>
	{
		const lightbox = new PhotoSwipeLightbox( {
			gallery: "#projects", // À défaut d'avoir une galerie pré-définie, on utilise le conteneur de la page.
			children: "img", // Seules les images peuvent être sélectionnées (sont exclus les icônes et images d'arrière-plan).
			pswpModule: () => import( "photoswipe" )
		} );

		lightbox.addFilter( "itemData", ( itemData ) =>
		{
			// La bibliothèque nécessite des dimensions pré-définies sur les attributs
			//  « data-pswp-width/height », pour éviter de polluer le DOM, on va utiliser
			//  les attributs « width » et « height » gracieusement générés à la volée pour
			//  faire la génération dynamique des images.
			const { element } = itemData as { element: HTMLImageElement };

			return {
				src: element?.src,
				width: element?.naturalWidth,
				height: element?.naturalHeight
			};
		} );

		lightbox.init();

		return () =>
		{
			// Suppression de la galerie photos au démontage
			//  du composant.
			lightbox.destroy();
		};
	}, [] );

	// Affichage du rendu HTML du composant.
	return <Image src={getImage( id )} alt={project.title} placeholder="blur" />;
}