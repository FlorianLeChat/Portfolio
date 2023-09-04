//
// Composant de la galerie photos de l'ancienne version du site.
//

"use client";

import Image from "next/image";
import { useState } from "react";
import type { PhotoAttributes } from "@/interfaces/Photo";

import ArrowLeft from "@/images/decorations/arrow_left.svg";
import ArrowRight from "@/images/decorations/arrow_right.svg";

export default function PhotoGallery( { project, photos }: { project: string; photos: PhotoAttributes[] } )
{
	// Déclaration des constantes.
	const assets = `${ process.env.__NEXT_ROUTER_BASEPATH }/assets/images/projects`;
	const length = photos.length - 1;

	// Déclaration des variables d'état.
	const [ photoIndex, setPhotoIndex ] = useState( 0 );

	// Limite la valeur entre deux limites.
	const clamp = ( value: number, min: number, max: number ) => Math.min( Math.max( value, min ), max );

	// Affichage de la photo précédente dans la galerie.
	const previous = () => setPhotoIndex( clamp( photoIndex - 1, 0, length ) );

	// Affichage de la photo suivante dans la galerie.
	const next = () => setPhotoIndex( clamp( photoIndex + 1, 0, length ) );

	// Affichage du rendu HTML du composant.
	return (
		<div className="images">
			{/* Bouton précédent */}
			<Image src={ArrowLeft} alt="" onClick={previous} />

			{/* Photos */}
			{
				photos.map( ( photo: PhotoAttributes, index: number ) => (
					<div key={index} style={{ display: photoIndex === index ? "inline-block" : "none" }}>
						<a
							rel="noopener noreferrer" target="_blank"
							href={`${ assets }/${ project }_gallery_${ index + 1 }.jpg`}
						>
							<Image
								src={`${ assets }/${ project }_gallery_${ index + 1 }.jpg`}
								alt={photo.caption} width={photo.width} height={photo.height}
							/>
						</a>

						<figcaption>{photo.caption}</figcaption>
					</div>
				) )
			}

			{/* Bouton suivant */}
			<Image src={ArrowRight} alt="" onClick={next} />
		</div>
	);
}