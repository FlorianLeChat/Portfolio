<script lang="ts">
    import { onMount } from "svelte";
    import { LINKS } from "#lib/links.ts";
    import * as m from "#lib/locales/messages.js";
    import IconRss from "~icons/simple-icons/rss";
    import type { Post } from "#lib/types/Post.ts";
    import { getLocale } from "#lib/locales/runtime.js";
    import { fetchPosts, FEED_LANGUAGE, MAX_POSTS } from "#lib/feed.ts";
    import IconArrowRight from "~icons/tabler/arrow-right";

    let posts = $state<Post[]>( [] );
    let settled = $state( false );

    let broken = $state<string[]>( [] );

    const PLACEHOLDERS = Array.from( { length: MAX_POSTS }, ( _value, index ) => index );
    const formatter = new Intl.DateTimeFormat( getLocale(), { dateStyle: "long" } );
    const languages = new Intl.DisplayNames( getLocale(), { type: "language" } );
    const formatDate = ( value: string ) => ( value ? formatter.format( new Date( value ) ) : "" );

    /// Names the language of a post written in another language than the page.
    ///
    /// @param {string} lang - BCP 47 tag of the post.
    /// @return {string} Something like "In French", or an empty string when the
    ///         post matches the page and needs no warning.
    /// @author Claude
    const foreignLanguage = ( lang: string ) =>
    {
        const base = lang.split( "-" )[ 0 ];

        if ( !base || base === getLocale() ) return "";

        return m.landing_blog_language( { language: languages.of( base ) ?? base } );
    };

    const foreign = $derived( posts.some( ( post ) => post.lang && foreignLanguage( post.lang ) ) );
    const foreignName = $derived( languages.of( FEED_LANGUAGE ) ?? FEED_LANGUAGE );

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

    {#if foreign}
        <p>{m.landing_blog_notice( { language: foreignName } )}</p>
    {/if}

    {#if posts.length > 0}
        <ul>
            {#each posts as post ( post.link )}
                {@const language = post.lang ? foreignLanguage( post.lang ) : ""}

                <li lang={language ? post.lang : undefined}>
                    {#if post.image && !broken.includes( post.image )}
                        <img
                            src={post.image}
                            alt=""
                            onerror={() => ( broken = [ ...broken, post.image ] )}
                            loading="lazy"
                            decoding="async"
                        />
                    {/if}

                    <span>
                        {#if post.date}
                            <time datetime={post.date}>{formatDate( post.date )}</time>
                        {/if}

                        {#if language}
                            <small lang={getLocale()}>{language}</small>
                        {/if}
                    </span>

                    <h3>
                        <a rel="external noopener noreferrer" href={post.link} target="_blank">{post.title}</a>
                    </h3>

                    <p>{post.excerpt}</p>

                    <span aria-hidden="true" lang={getLocale()}>
                        {m.landing_blog_read()}
                        <IconArrowRight />
                    </span>
                </li>
            {/each}
        </ul>
    {:else if !settled}
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

    section > ul
    {
        gap: 2.5rem;
        display: grid;
        grid-template-columns: repeat( 3, minmax( 0, 1fr ) );

        @media screen and (max-width: 1024px)
        {
            grid-template-columns: repeat( 2, minmax( 0, 1fr ) );
        }

        @media screen and (max-width: 640px)
        {
            gap: 2rem;
            grid-template-columns: minmax( 0, 1fr );
        }
    }

    ul[aria-hidden="true"] > li
    {
        opacity: 0.4;
        min-height: 10rem;
        border-top: 2px solid colors.getThemedColor("border");
    }

    section > ul > li
    {
        gap: 0.85rem;
        color: colors.getThemedColor("foreground");
        height: 100%;
        display: flex;
        position: relative;
        border-top: 2px solid colors.getThemedColor("foreground-alt");
        padding-top: 1.25rem;
        flex-direction: column;

        &:hover h3 a
        {
            text-decoration: underline;
            text-decoration-color: colors.getThemedColor("primary");
            text-decoration-thickness: 2px;
        }
    }

    h3 a
    {
        text-underline-offset: 0.15em;

        &::after
        {
            inset: 0;
            content: "";
            position: absolute;
        }
    }

    li > img
    {
        width: 100%;
        height: auto;
        display: block;
        object-fit: cover;
        aspect-ratio: 16 / 9;
        border-radius: var(--radius-md);
        background-color: colors.getThemedColor("border");
    }

    li > span:first-of-type
    {
        gap: 0.75rem;
        display: flex;
        flex-wrap: wrap;
        align-items: baseline;
    }

    time
    {
        color: colors.getThemedColor("accent");
        font-size: 0.8rem;
    }

    small
    {
        color: colors.getThemedColor("muted");
        border: 1px solid colors.getThemedColor("border");
        padding: 0 0.4rem;
        font-size: 0.7rem;
        font-family: var(--font-mono);
        border-radius: var(--radius-sm);
    }

    h3
    {
        font-size: 1.5rem;
        text-underline-offset: 0.15em;
    }

    li p
    {
        flex: 1;
        color: colors.getThemedColor("muted");
        font-size: 1rem;
    }

    li > span:last-of-type
    {
        gap: 0.5rem;
        color: colors.getThemedColor("primary");
        display: inline-flex;
        font-size: 0.85rem;
        align-items: center;
        font-family: var(--font-mono);
    }

    section > div
    {
        display: flex;
        margin-top: 3rem;

        > a
        {
            @include buttons.pill();
            @include buttons.pillGhost();
        }
    }

    section > p + div
    {
        margin-top: 0;
    }
</style>
