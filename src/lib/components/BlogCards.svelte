<script lang="ts">
    import * as m from "$lib/locales/messages";
    import { onMount } from "svelte";
    import { LINKS } from "$lib/links";
    import IconRss from "~icons/simple-icons/rss";
    import type { Post } from "$lib/types/Post";
    import { getLocale } from "$lib/locales/runtime";
    import { fetchPosts, MAX_POSTS } from "$lib/feed";
    import IconArrowRight from "~icons/tabler/arrow-right";

    let posts = $state<Post[]>( [] );
    let settled = $state( false );

    const PLACEHOLDERS = Array.from( { length: MAX_POSTS }, ( _value, index ) => index );
    const formatter = new Intl.DateTimeFormat( getLocale(), { dateStyle: "long" } );
    const formatDate = ( value: string ) => ( value ? formatter.format( new Date( value ) ) : "" );

    onMount( () =>
    {
        const load = async () =>
        {
            posts = await fetchPosts();
            settled = true;
        };

        load();
    } );
</script>

<section id="blog" aria-busy={!settled}>
    <h2>{m.landing_blog_title()}</h2>

    <p>{m.landing_blog_intro()}</p>

    {#if posts.length > 0}
        <ul>
            {#each posts as post ( post.link )}
                <li>
                    <a rel="external noopener noreferrer" href={post.link} target="_blank">
                        {#if post.date}
                            <time datetime={post.date}>{formatDate( post.date )}</time>
                        {/if}

                        <h3>{post.title}</h3>

                        <p>{post.excerpt}</p>

                        <span>
                            {m.landing_blog_read()}
                            <IconArrowRight aria-hidden="true" />
                        </span>
                    </a>
                </li>
            {/each}
        </ul>
    {:else if settled}
        <p>{m.landing_blog_unavailable()}</p>
    {:else}
        <ul aria-hidden="true">
            {#each PLACEHOLDERS as index ( index )}
                <li></li>
            {/each}
        </ul>
    {/if}

    <div>
        <a rel="external noopener noreferrer" href={LINKS.blog} target="_blank">
            <IconRss aria-hidden="true" />
            {m.landing_blog_all()}
        </a>
    </div>
</section>

<style lang="scss">
    @use "colors";
    @use "buttons";

    section > p
    {
        color: colors.getThemedColor("muted");
        margin: -1.5rem auto 2.5rem;
        max-width: 60ch;
        text-align: center;
    }

    section > p + p
    {
        margin-top: 0;
    }

    section > ul
    {
        gap: 1.5rem;
        display: grid;
        grid-template-columns: repeat( 3, minmax( 0, 1fr ) );

        @media screen and (max-width: 1024px)
        {
            grid-template-columns: repeat( 2, minmax( 0, 1fr ) );
        }

        @media screen and (max-width: 640px)
        {
            grid-template-columns: minmax( 0, 1fr );
        }
    }

    ul[aria-hidden="true"] > li
    {
        border: 1px solid colors.getThemedColor("border");
        opacity: 0.4;
        min-height: 15rem;
        border-radius: var(--radius-lg);
        background-color: colors.getThemedColor("surface");
    }

    li a
    {
        gap: 0.75rem;
        color: colors.getThemedColor("foreground");
        height: 100%;
        border: 1px solid colors.getThemedColor("border");
        display: flex;
        padding: 1.5rem;
        transition: transform var(--duration) var(--ease), border-color var(--duration) var(--ease);
        border-radius: var(--radius-lg);
        flex-direction: column;
        background-color: colors.getThemedColor("surface");

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

    li p
    {
        flex: 1;
        color: colors.getThemedColor("muted");
        font-size: 0.9rem;
    }

    li span
    {
        gap: 0.5rem;
        color: colors.getThemedColor("primary");
        display: inline-flex;
        font-size: 0.85rem;
        font-weight: 600;
        align-items: center;
    }

    time
    {
        color: colors.getThemedColor("accent");
        font-size: 0.75rem;
        font-weight: 600;
        letter-spacing: 0.05em;
        text-transform: uppercase;
    }

    section > div
    {
        display: flex;
        margin-top: 2rem;
        justify-content: center;

        > a
        {
            @include buttons.pill();
            @include buttons.pillGhost();
        }
    }
</style>
