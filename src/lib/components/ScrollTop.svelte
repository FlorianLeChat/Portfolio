<script lang="ts">
    import * as m from "$lib/locales/messages";
    import { onMount } from "svelte";
    import IconArrowUp from "~icons/tabler/arrow-up";

    let showButton = $state( false );

    const scrollToTop = () => window.scrollTo( { top: 0, behavior: "smooth" } );
    const onScroll = () => ( showButton = window.scrollY > 200 );

    onMount( () =>
    {
        onScroll();

        window.addEventListener( "scroll", onScroll, { passive: true } );

        return () => window.removeEventListener( "scroll", onScroll );
    } );
</script>

{#if showButton}
    <aside>
        <button type="button" title={m.landing_scroll_top()} onclick={scrollToTop} aria-label={m.landing_scroll_top()}>
            <IconArrowUp aria-hidden="true" />
        </button>
    </aside>
{/if}

<style lang="scss">
    @use "colors";

    aside
    {
        inset: auto 2rem 3rem auto;
        z-index: 15;
        position: fixed;

        @media screen and (max-width: 1024px)
        {
            display: none;
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
            border-radius: 50%;
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
    }
</style>
