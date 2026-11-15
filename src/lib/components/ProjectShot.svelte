<script lang="ts">
    import * as m from "#lib/locales/messages.js";

    let { src, title }: { src?: string; title: string } = $props();
</script>

{#if src}
    <button type="button" aria-label={m.landing_project_zoom( { title } )}>
        <img {src} alt="" loading="lazy" decoding="async" />
    </button>
{/if}

<style lang="scss">
    @use "colors";

    button
    {
        width: 100%;
        cursor: zoom-in;
        border: 1px solid colors.getThemedColor("border");
        padding: 0;
        display: block;
        overflow: hidden;
        box-shadow: colors.getThemedColor("container-shadow");
        border-radius: var(--radius-md);
        background-color: colors.getThemedColor("surface");
    }

    img
    {
        width: 100%;
        display: block;
        object-fit: contain;
        transition: transform calc( var(--duration) * 3 ) var(--ease);
        aspect-ratio: 16 / 10;
    }

    @media (hover: hover) and (pointer: fine)
    {
        button:hover > img
        {
            transform: scale(1.025);
        }
    }

    button:focus-visible > img
    {
        transform: scale(1.025);
    }
</style>
