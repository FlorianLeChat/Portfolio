<script lang="ts">
    import * as m from "$lib/locales/messages";
    import { onMount } from "svelte";

    let showButton = $state( false );

    const scrollToTop = () => window.scrollTo( { top: 0, behavior: "smooth" } );
    const onScroll = () => ( showButton = window.scrollY > 200 );

    onMount( () =>
    {
        onScroll();

        window.addEventListener( "scroll", onScroll );

        return () => window.removeEventListener( "scroll", onScroll );
    } );
</script>

{#if showButton}
    <aside>
        <button type="button" title={m.landing_scroll_top()} onclick={scrollToTop} aria-label={m.landing_scroll_top()}>
            <i class="fa-solid fa-arrow-up"></i>
        </button>
    </aside>
{/if}
