<script lang="ts">
    import { onMount } from "svelte";
    import * as m from "#lib/locales/messages.js";
    import IconArrowUp from "~icons/tabler/arrow-up";

    let showButton = $state( false );

    // An explicit `behavior` overrides the stylesheet, so the reduced motion
    // preference has to be read here as well.
    const scrollToTop = () =>
    {
        const reduced = matchMedia( "(prefers-reduced-motion: reduce)" ).matches;

        window.scrollTo( { top: 0, behavior: reduced ? "auto" : "smooth" } );
    };

    let overFooter = $state( false );

    const onScroll = () => ( showButton = window.scrollY > 600 );

    onMount( () =>
    {
        onScroll();

        window.addEventListener( "scroll", onScroll, { passive: true } );

        const footer = document.querySelector( "footer" );
        const observer = new IntersectionObserver( ( [ entry ] ) => ( overFooter = entry.isIntersecting ) );

        if ( footer ) observer.observe( footer );

        return () =>
        {
            observer.disconnect();

            window.removeEventListener( "scroll", onScroll );
        };
    } );
</script>

{#if showButton && !overFooter}
    <div>
        <button type="button" title={m.landing_scroll_top()} onclick={scrollToTop} aria-label={m.landing_scroll_top()}>
            <IconArrowUp aria-hidden="true" />
        </button>
    </div>
{/if}

<style lang="scss">
    @use "colors";

    div
    {
        inset: auto 2rem 2rem auto;
        z-index: 15;
        position: fixed;

        @media screen and (max-width: 768px)
        {
            inset: auto 1rem calc( 1rem + env(safe-area-inset-bottom) ) auto;
        }
    }

    button
    {
        width: 3rem;
        color: colors.getThemedColor("background");
        border: none;
        height: 3rem;
        cursor: pointer;
        padding: 0;
        display: flex;
        font-size: 1.1rem;
        box-shadow: colors.getThemedColor("container-shadow");
        transition: transform var(--duration) var(--ease), background-color var(--duration) var(--ease);
        align-items: center;
        border-radius: var(--radius-md);
        justify-content: center;
        background-color: colors.getThemedColor("primary");

        &:hover
        {
            background-color: colors.getThemedColor("primary-alt");
        }

        &:active
        {
            transform: translateY(0.125rem);
        }
    }
</style>
