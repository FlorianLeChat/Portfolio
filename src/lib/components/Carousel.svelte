<script lang="ts">
    // Horizontal scroller with arrow controls, shared by the projects and the
    // skills sections. The children lay themselves out; this only owns the
    // scrolling list and the state of its two paging arrows.
    import * as m from "$lib/locales/messages";
    import { onMount, type Snippet } from "svelte";
    import IconChevronLeft from "~icons/tabler/chevron-left";
    import IconChevronRight from "~icons/tabler/chevron-right";

    let {
        children,
        label
    }: {
        // The items, as the `<li>` elements of the scrolling list.
        children: Snippet;

        label: string;
    } = $props();

    let scroller = $state<HTMLElement | null>( null );
    let atStart = $state( true );
    let atEnd = $state( true );

    // Both true means the content fits and the arrows would be dead controls.
    const overflows = $derived( !( atStart && atEnd ) );

    /// Recomputes which arrows still have somewhere to go.
    ///
    /// The one pixel tolerance absorbs the fractional scroll positions browsers
    /// produce on fractional device pixel ratios.
    ///
    /// @author Claude
    const update = () =>
    {
        if ( !scroller ) return;

        const travel = scroller.scrollWidth - scroller.clientWidth;

        atStart = scroller.scrollLeft <= 1;
        atEnd = scroller.scrollLeft >= travel - 1;
    };

    /// Advances by one visible page.
    ///
    /// @param {number} direction - `-1` for previous, `1` for next.
    /// @author Claude
    const move = ( direction: number ) =>
    {
        if ( !scroller ) return;

        const reduced = matchMedia( "(prefers-reduced-motion: reduce)" ).matches;

        scroller.scrollBy( {
            left: direction * scroller.clientWidth,
            behavior: reduced ? "auto" : "smooth"
        } );
    };

    onMount( () =>
    {
        update();

        // The arrows also have to settle when the viewport changes the number of
        // items per page, not only when the visitor scrolls.
        const resize = new ResizeObserver( update );

        // Filtering the list changes `scrollWidth` without touching the box the
        // `ResizeObserver` watches, so the arrows would otherwise keep the state
        // they had before the items were narrowed down.
        const mutation = new MutationObserver( update );

        if ( scroller )
        {
            resize.observe( scroller );
            mutation.observe( scroller, { childList: true } );
        }

        return () =>
        {
            resize.disconnect();
            mutation.disconnect();
        };
    } );
</script>

<div>
    <button
        type="button"
        hidden={!overflows}
        disabled={atStart}
        onclick={() => move( -1 )}
        aria-label={m.landing_carousel_previous()}
    >
        <IconChevronLeft aria-hidden="true" />
    </button>

    <ul bind:this={scroller} onscroll={update} aria-label={label}>
        {@render children()}
    </ul>

    <button
        type="button"
        hidden={!overflows}
        disabled={atEnd}
        onclick={() => move( 1 )}
        aria-label={m.landing_carousel_next()}
    >
        <IconChevronRight aria-hidden="true" />
    </button>
</div>

<style lang="scss">
    @use "colors";

    div
    {
        gap: 0.75rem;
        display: flex;
        align-items: center;
    }

    ul
    {
        gap: 1.5rem;
        flex: 1;
        display: flex;
        overflow-x: auto;
        scrollbar-width: none;
        scroll-snap-type: x mandatory;

        &::-webkit-scrollbar
        {
            display: none;
        }

        @media screen and (max-width: 768px)
        {
            padding-bottom: 0.75rem;
            scrollbar-width: thin;

            &::-webkit-scrollbar
            {
                height: 0.5rem;
                display: block;
            }
        }

        > :global(li)
        {
            scroll-snap-align: start;
        }
    }

    button
    {
        width: 2.75rem;
        color: colors.getThemedColor("primary");
        cursor: pointer;
        height: 2.75rem;
        border: 1px solid colors.getThemedColor("border");
        padding: 0;
        display: flex;
        font-size: 1rem;
        transition: color var(--duration) var(--ease), background-color var(--duration) var(--ease);
        flex-shrink: 0;
        align-items: center;
        border-radius: 50%;
        justify-content: center;
        background-color: colors.getThemedColor("background-alt");

        &[hidden]
        {
            display: none;
        }

        &:disabled
        {
            cursor: default;
            opacity: 0.35;
        }

        &:hover:not( :disabled )
        {
            color: colors.getThemedColor("background");
            border-color: colors.getThemedColor("primary");
            background-color: colors.getThemedColor("primary");
        }

        @media screen and (max-width: 768px)
        {
            display: none;
        }
    }
</style>
