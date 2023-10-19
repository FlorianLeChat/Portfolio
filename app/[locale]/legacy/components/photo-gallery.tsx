//
// Composant de la galerie photos de l'ancienne version du site.
//

"use client";

import Image from "next/image";
import { useState } from "react";
import type { PhotoAttributes } from "@/interfaces/Photo";

import ArrowLeft from "@/images/decorations/arrow_left.svg";
import ArrowRight from "@/images/decorations/arrow_right.svg";

export default function PhotoGallery( {
	project,
	photos
}: {
	project: string;
	photos: PhotoAttributes[];
} )
{
	// Déclaration des constantes.
	const assets = `${ process.env.__NEXT_ROUTER_BASEPATH }/assets/images/projects`;
	const length = photos.length - 1;

	// Déclaration des variables d'état.
	const [ photoIndex, setPhotoIndex ] = useState( 0 );

	// Affichage de la photo précédente dans la galerie.
	const previous = () => setPhotoIndex( Math.min( Math.max( photoIndex - 1, 0 ), length ) );

	// Affichage de la photo suivante dans la galerie.
	const next = () => setPhotoIndex( Math.min( Math.max( photoIndex + 1, 0 ), length ) );

	// Affichage du rendu HTML du composant.
	return (
		<div className="images">
			{/* Bouton précédent */}
			<Image src={ArrowLeft} alt="" onClick={previous} />

			{/* Photos */}
			{photos.map( ( photo: PhotoAttributes, index: number ) => (
				<figure
					key={photo.caption}
					style={{
						display: photoIndex === index ? "inline-block" : "none"
					}}
				>
					<a
						rel="noopener noreferrer"
						href={`${ assets }/${ project }_gallery_${ index + 1 }.jpg`}
						target="_blank"
					>
						<Image
							src={`${ assets }/${ project }_gallery_${
								index + 1
							}.jpg`}
							alt={photo.caption}
							width={photo.width}
							height={photo.height}
						/>
					</a>

					<figcaption>{photo.caption}</figcaption>
				</figure>
			) )}

			{/* Bouton suivant */}
			<Image src={ArrowRight} alt="" onClick={next} />
		</div>
	);
}