<script lang="ts">
    import { getSkills, brandStyle } from "#lib/skills.ts";

    let { keys }: { keys: string[] } = $props();

    const resolved = $derived( getSkills( keys ) );
</script>

<ul>
    {#each resolved as skill ( skill.name )}
        <li>
            <skill.icon style={brandStyle( skill )} aria-hidden="true" />
            {skill.name}
        </li>
    {/each}
</ul>

<style lang="scss">
    @use "colors";

    ul
    {
        gap: 0.4rem;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
    }

    li
    {
        gap: 0.4rem;
        color: colors.getThemedColor("foreground");
        border: 1px solid colors.getThemedColor("border");
        display: inline-flex;
        padding: 0.2rem 0.55rem;
        font-size: 0.75rem;
        align-items: center;
        font-family: var(--font-mono);
        border-radius: var(--radius-sm);
    }

    li > :global(svg)
    {
        width: 0.95rem;
        color: color-mix(in oklab, var(--brand, currentColor) 50%, colors.getThemedColor("foreground-alt"));
        height: 0.95rem;
    }
</style>
