<script lang="ts">
    import * as m from "$lib/locales/messages";
    import { onMount } from "svelte";
    import type { Project } from "$lib/types/Project";

    let { projects }: { projects: Record<string, Project> } = $props();

    // Maps each project key to its Paraglide message function
    const projectDescriptions: Record<string, () => string> = {
        portfolio: m.projects_portfolio,
        filestorage: m.projects_filestorage,
        sourceconsole: m.projects_sourceconsole,
        mangaparadise: m.projects_mangaparadise,
        homepage: m.projects_homepage,
        ravenshortener: m.projects_ravenshortener,
        onlineresume: m.projects_onlineresume,
        timeloop: m.projects_timeloop,
        blog: m.projects_blog,
        magicanswers: m.projects_magicanswers
    };

    onMount( async () =>
    {
        const [ PhotoSwipeLightbox, { default: PhotoSwipe } ] = await Promise.all( [
            import( "photoswipe/lightbox" ).then( ( mod ) => mod.default ),
            import( "photoswipe" )
        ] );

        const lightbox = new PhotoSwipeLightbox( {
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

        return () => lightbox.destroy();
    } );
</script>

<section id="projects">
    <h2>{m.landing_header_projects()}</h2>

    <ul>
        {#each Object.entries( projects ) as [ key, value ] ( key )}
            <li>
                <img src="/assets/images/{key}.png" alt={value.title} loading="eager" />

                <div>
                    <h3>{value.title}</h3>

                    <p>{projectDescriptions[ key ]?.()}</p>

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
                                    <i class="fas fa-code"></i>
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
                                    <i class="fas fa-external-link-alt"></i>
                                </a>
                            </li>
                        {/if}
                    </ul>
                </div>
            </li>
        {/each}
    </ul>
</section>
