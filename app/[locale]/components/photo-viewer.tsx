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
    useEffect( () =>
    {
        const lightbox = new PhotoSwipeLightbox( {
            gallery: "#projects",
            children: "img",
            pswpModule: () => import( "photoswipe" )
        } );

        lightbox.addFilter( "itemData", ( itemData ) =>
        {
            // The library requires predefined dimensions in the
            // "data-pswp-width/height" attributes. To avoid cluttering the DOM,
            // we will use the "width" and "height" attributes, graciously generated
            // on the fly, to handle dynamic image generation.
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
            lightbox.destroy();
        };
    }, [] );

    return (
        <Image
            src={getImage( id )}
            alt={project.title}
            priority
            placeholder="blur"
        />
    );
}
