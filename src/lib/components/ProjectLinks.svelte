<script lang="ts">
    import IconCode from "~icons/tabler/code";
    import * as m from "#lib/locales/messages.js";
    import IconExternalLink from "~icons/tabler/external-link";

    let {
        title,
        demo,
        repository
    }: {
        title: string;
        demo?: string;
        repository?: string;
    } = $props();
</script>

{#if demo || repository}
    <ul>
        {#if demo}
            <li>
                <a
                    rel="external noopener noreferrer"
                    href={demo}
                    target="_blank"
                    aria-label={m.landing_project_visit_named( { title } )}
                >
                    <IconExternalLink aria-hidden="true" />
                    {m.landing_project_visit()}
                </a>
            </li>
        {/if}

        {#if repository}
            <li>
                <a
                    rel="external noopener noreferrer"
                    href={repository}
                    target="_blank"
                    aria-label={m.landing_project_source_named( { title } )}
                >
                    <IconCode aria-hidden="true" />
                    {m.landing_project_source()}
                </a>
            </li>
        {/if}
    </ul>
{/if}

<style lang="scss">
    @use "colors";

    ul
    {
        gap: 0.25rem 1.5rem;
        display: flex;
        flex-wrap: wrap;
    }

    a
    {
        gap: 0.5rem;
        display: inline-flex;
        font-size: 0.85rem;
        min-height: 2.75rem;
        align-items: center;
        font-family: var(--font-mono);
        text-decoration: underline;
        text-decoration-color: colors.getThemedAlpha("primary", 0.35);

        &:hover
        {
            text-decoration-color: currentColor;
        }
    }
</style>
