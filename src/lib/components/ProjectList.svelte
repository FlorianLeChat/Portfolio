<script lang="ts">
    import { onMount, tick } from "svelte";
    import type { Project } from "#lib";
    import IconArrowDown from "~icons/tabler/arrow-down";
    import * as m from "#lib/locales/messages.js";
    import type PhotoSwipeLightbox from "photoswipe/lightbox";
    import SkillChips from "#lib/components/SkillChips.svelte";
    import { getImage, getDescription } from "#lib/projects.ts";
    import ProjectShot from "#lib/components/ProjectShot.svelte";
    import ProjectLinks from "#lib/components/ProjectLinks.svelte";

    let {
        projects,
        heading,
        description
    }: {
        projects: [ string, Project ][];
        heading?: string;
        description?: string;
    } = $props();

    const featured = $derived( projects.filter( ( [ , project ] ) => project.featured ) );
    const others = $derived( projects.filter( ( [ , project ] ) => !project.featured ) );

    const PREVIEWED = 3;
    const FALLBACK_WIDTH = 1600;
    const FALLBACK_HEIGHT = 1000;

    let expanded = $state( false );

    const shown = $derived( expanded ? others : others.slice( 0, PREVIEWED ) );
    const hidden = $derived( others.length - PREVIEWED );

    let section = $state<HTMLElement | null>( null );

    /// Reveals the rest of the grid and moves the focus to its first card.
    ///
    /// The button that was pressed disappears with the click, which would drop
    /// a keyboard or screen reader visitor back at the top of the page.
    ///
    /// @author Claude
    const expand = async () =>
    {
        expanded = true;

        await tick();

        const first = section?.querySelectorAll( "section > ul:last-of-type > li" )[ PREVIEWED ];

        first?.querySelector<HTMLElement>( "button, a" )?.focus();
    };

    onMount( () =>
    {
        let lightbox: InstanceType<typeof PhotoSwipeLightbox>;

        const init = async () =>
        {
            const [ PhotoSwipeLightbox, { default: PhotoSwipe } ] = await Promise.all( [
                import( "photoswipe/lightbox" ).then( ( mod ) => mod.default ),
                import( "photoswipe" ),
                import( "photoswipe/photoswipe.css" )
            ] );

            lightbox = new PhotoSwipeLightbox( {
                gallery: "#projects",
                children: "li > button",
                pswpModule: PhotoSwipe
            } );

            lightbox.addFilter( "itemData", ( itemData ) =>
            {
                const image = ( itemData.element as HTMLElement | undefined )?.querySelector( "img" );

                // A lazy image that has not loaded yet reports 0x0, which opened
                // the lightbox on nothing. The fallback matches the thumbnail's
                // 16:10 ratio and PhotoSwipe corrects it once the image arrives.
                return {
                    src: image?.currentSrc || image?.src,
                    width: image?.naturalWidth || FALLBACK_WIDTH,
                    height: image?.naturalHeight || FALLBACK_HEIGHT
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

<section id="projects" bind:this={section}>
    {#if heading}
        <h2>{heading}</h2>
    {/if}

    {#if description}
        <p>{description}</p>
    {/if}

    <ul>
        {#each featured as [ key, value ] ( key )}
            <li>
                <ProjectShot src={getImage( key )} title={value.title} />

                <div>
                    <h3>{value.title}</h3>
                    <p>{getDescription( key )}</p>
                    <SkillChips keys={value.skills} />
                    <ProjectLinks title={value.title} demo={value.demo} repository={value.repository} />
                </div>
            </li>
        {/each}
    </ul>

    {#if others.length > 0}
        <h3>{m.landing_projects_others()}</h3>

        <ul>
            {#each shown as [ key, value ] ( key )}
                <li>
                    <ProjectShot src={getImage( key )} title={value.title} />
                    <h4>{value.title}</h4>
                    <p>{getDescription( key )}</p>
                    <ProjectLinks title={value.title} demo={value.demo} repository={value.repository} />
                </li>
            {/each}
        </ul>

        {#if hidden > 0 && !expanded}
            <button type="button" onclick={expand}>
                {m.landing_projects_more( { count: hidden } )}
                <IconArrowDown aria-hidden="true" />
            </button>
        {/if}
    {/if}
</section>

<style lang="scss">
    @use "colors";
    @use "buttons";

    p + ul
    {
        gap: 6rem;
        display: flex;
        flex-direction: column;

        @media screen and (max-width: 768px)
        {
            gap: 3rem;
        }

        > li
        {
            gap: 3.5rem;
            display: grid;
            align-items: center;
            grid-template-columns: minmax( 0, 1.2fr ) minmax( 0, 1fr );

            @media screen and (max-width: 900px)
            {
                gap: 1.75rem;
                grid-template-columns: minmax( 0, 1fr );
            }
        }

        > li:nth-child(even)
        {
            grid-template-columns: minmax( 0, 1fr ) minmax( 0, 1.2fr );

            @media screen and (max-width: 900px)
            {
                grid-template-columns: minmax( 0, 1fr );
            }

            > div
            {
                order: -1;

                @media screen and (max-width: 900px)
                {
                    order: 0;
                }
            }
        }

        div
        {
            gap: 1.25rem;
            display: flex;
            align-items: flex-start;
            flex-direction: column;

            @media screen and (max-width: 768px)
            {
                gap: 1rem;

                > p + :global(ul)
                {
                    display: none;
                }
            }
        }

        h3
        {
            font-size: clamp( 1.75rem, 1.3rem + 1.5vw, 2.25rem );
        }

        p
        {
            max-width: 52ch;
        }
    }

    section > h3
    {
        margin: 7rem 0 2.5rem;
        font-size: 1.75rem;

        @media screen and (max-width: 768px)
        {
            margin-top: 5rem;
        }
    }

    h3 + ul
    {
        gap: 3.5rem 2.5rem;
        display: grid;
        grid-template-columns: repeat( auto-fill, minmax( min( 100%, 19rem ), 1fr ) );

        > li
        {
            gap: 0.75rem;
            display: flex;
            flex-direction: column;
        }

        h4
        {
            margin-top: 0.75rem;
        }

        p
        {
            flex: 1;
            color: colors.getThemedColor("muted");
            font-size: 1rem;
        }
    }

    section > button
    {
        @include buttons.pill();
        @include buttons.pillGhost();

        margin-top: 3rem;
    }
</style>
