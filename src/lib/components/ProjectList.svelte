<script lang="ts">
    import * as m from "$lib/locales/messages";
    import { onMount } from "svelte";
    import { getImage } from "$lib/images";
    import type { Project } from "$lib/types/Project";
    import { getDescription } from "$lib/descriptions";
    import type PhotoSwipeLightbox from "photoswipe/lightbox";

    let { projects }: { projects: Record<string, Project> } = $props();

    onMount( () =>
    {
        let lightbox: InstanceType<typeof PhotoSwipeLightbox>;

        const init = async () =>
        {
            const [ PhotoSwipeLightbox, { default: PhotoSwipe } ] = await Promise.all( [
                import( "photoswipe/lightbox" ).then( ( mod ) => mod.default ),
                import( "photoswipe" )
            ] );

            lightbox = new PhotoSwipeLightbox( {
                gallery: "#projects",
                children: "img",
                pswpModule: PhotoSwipe
            } );

            lightbox.addFilter( "itemData", ( itemData ) =>
            {
                const element = itemData.element as HTMLImageElement;

                return {
                    src: element?.src,
                    width: element?.naturalWidth,
                    height: element?.naturalHeight
                };
            } );

            lightbox.init();
        };

        init();

        return () =>
        {
            lightbox?.destroy();
        };
    } );
</script>

<section id="projects">
    <h2>{m.landing_header_projects()}</h2>

    <ul>
        {#each Object.entries( projects ) as [ key, value ] ( key )}
            <li>
                <img src={getImage( key )} alt={value.title} loading="lazy" />

                <div>
                    <h3>{value.title}</h3>

                    <p>{getDescription( key )}</p>

                    <ul>
                        {#each value.skills as skill ( skill )}
                            <li>{skill}</li>
                        {/each}
                    </ul>

                    <ul>
                        {#if value.repository}
                            <li>
                                <a
                                    rel="external noopener noreferrer"
                                    href={value.repository}
                                    title={m.landing_project_source()}
                                    target="_blank"
                                    aria-label={m.landing_project_source()}
                                >
                                    <i class="fa-solid fa-code"></i>
                                </a>
                            </li>
                        {/if}

                        {#if value.demo}
                            <li>
                                <a
                                    rel="external noopener noreferrer"
                                    href={value.demo}
                                    title={m.landing_project_demo()}
                                    target="_blank"
                                    aria-label={m.landing_project_demo()}
                                >
                                    <i class="fa-solid fa-external-link-alt"></i>
                                </a>
                            </li>
                        {/if}
                    </ul>
                </div>
            </li>
        {/each}
    </ul>
</section>
