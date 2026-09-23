<script lang="ts">
    import { getSkills } from "$lib/skills";

    let { keys }: { keys: string[] } = $props();

    const resolved = $derived( getSkills( keys ) );
</script>

<ul>
    {#each resolved as skill ( skill.name )}
        <li>
            <skill.icon color={skill.color} aria-hidden="true" />
            {skill.name}
        </li>
    {/each}
</ul>

<style lang="scss">
    @use "colors";

    ul
    {
        gap: 0.5rem;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: center;

        li
        {
            gap: 0.5rem;
            color: colors.getThemedColor("foreground-alt");
            border: 1px solid colors.getThemedColor("border");
            display: inline-flex;
            padding: 0.25rem 0.75rem;
            font-size: 0.8rem;
            font-weight: 600;
            align-items: center;
            border-radius: var(--radius-pill);
            background-color: colors.getThemedColor("background-alt");
        }
    }

    li > :global(svg)
    {
        width: 1rem;
        height: 1rem;
    }
</style>
