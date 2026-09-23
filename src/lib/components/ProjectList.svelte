<script lang="ts">
    import * as m from "$lib/locales/messages";
    import { onMount } from "svelte";
    import type { Project } from "$lib";
    import IconCode from "~icons/tabler/code";
    import Carousel from "$lib/components/Carousel.svelte";
    import SkillChips from "$lib/components/SkillChips.svelte";
    import { getImage, getDescription } from "$lib/projects";
    import type PhotoSwipeLightbox from "photoswipe/lightbox";
    import IconExternalLink from "~icons/tabler/external-link";

    let {
        projects,
        heading,
        description
    }: {
        projects: [ string, Project ][];
        heading?: string;
        description?: string;
    } = $props();

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
    {#if heading}
        <h2>{heading}</h2>
    {/if}

    {#if description}
        <p>{description}</p>
    {/if}

    <Carousel label={m.landing_carousel_projects()}>
        {#each projects as [ key, value ] ( key )}
            <li>
                <img src={getImage( key )} alt={value.title} loading="lazy" decoding="async" />

                <div>
                    <h3>{value.title}</h3>

                    <p>{getDescription( key )}</p>

                    <SkillChips keys={value.skills} />

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
                                    <IconCode aria-hidden="true" />
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
                                    <IconExternalLink aria-hidden="true" />
                                </a>
                            </li>
                        {/if}
                    </ul>
                </div>
            </li>
        {/each}
    </Carousel>
</section>

<style lang="scss">
    @use "colors";

    section > p
    {
        color: colors.getThemedColor("muted");
        margin: -1.5rem auto 2.5rem;
        max-width: 60ch;
        text-align: center;
    }

    :global(section#projects > div > ul > li)
    {
        flex: 0 0 calc( 50% - 0.75rem );
        border: 1px solid colors.getThemedColor("border");
        display: flex;
        overflow: hidden;
        transition: transform var(--duration) var(--ease), border-color var(--duration) var(--ease);
        border-radius: var(--radius-lg);
        flex-direction: column;
        background-color: colors.getThemedColor("surface");

        @media screen and (max-width: 768px)
        {
            flex-basis: 100%;
        }

        @media (hover: hover) and (pointer: fine)
        {
            &:hover
            {
                transform: translateY(-0.25rem);
                box-shadow: colors.getThemedColor("container-shadow");
                border-color: colors.getThemedColor("primary");
            }
        }
    }

    li > img
    {
        width: 100%;
        cursor: zoom-in;
        object-fit: cover;
        aspect-ratio: 16 / 10;
        border-bottom: 1px solid colors.getThemedColor("border");
    }

    li > div
    {
        gap: 1rem;
        flex: 1;
        display: flex;
        padding: 1.5rem;
        text-align: center;
        align-items: center;
        flex-direction: column;

        > p
        {
            flex: 1;
            color: colors.getThemedColor("muted");
            font-size: 0.95rem;
        }

        > ul:last-of-type
        {
            gap: 0.75rem;
            display: flex;

            a
            {
                width: 2.75rem;
                color: colors.getThemedColor("primary");
                height: 2.75rem;
                border: 2px solid colors.getThemedColor("primary");
                display: flex;
                font-size: 1.1rem;
                transition: color var(--duration) var(--ease), background-color var(--duration) var(--ease);
                align-items: center;
                border-radius: 50%;
                justify-content: center;

                @media (hover: hover) and (pointer: fine)
                {
                    &:hover
                    {
                        color: colors.getThemedColor("background");
                        background-color: colors.getThemedColor("primary");
                    }
                }
            }
        }
    }
</style>
