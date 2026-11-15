<script lang="ts">
    import { LINKS } from "#lib/links.ts";
    import IconCode from "~icons/tabler/code";
    import * as m from "#lib/locales/messages.js";
    import IconPhp from "~icons/simple-icons/php";
    import { PUBLIC_VERSION } from "$app/env/public";
</script>

<footer>
    <p>
        {m.landing_footer_madeby()}
        <a rel="external noopener noreferrer" href={LINKS.github} target="_blank">Florian Trayon <span aria-hidden="true">🐈</span></a>
        <small>&copy; {new Date().getFullYear()}</small>
    </p>

    <ul>
        <li>
            <a rel="external noopener noreferrer" href={LINKS.repository} target="_blank">
                <IconCode aria-hidden="true" />
                {m.landing_project_source()}
            </a>
        </li>

        <li>
            <a rel="external noopener noreferrer" href={LINKS.legacy} target="_blank">
                <IconPhp aria-hidden="true" />
                {m.landing_footer_legacy()}
            </a>
        </li>

        {#if PUBLIC_VERSION}
            <li>
                <code>{m.landing_footer_version( { version: PUBLIC_VERSION } )}</code>
            </li>
        {/if}
    </ul>
</footer>

<style lang="scss">
    @use "colors";

    footer
    {
        gap: 1rem 2rem;
        width: 92%;
        color: colors.getThemedColor("muted");
        margin: 7rem auto 0;
        display: flex;
        padding: 2rem 0 2.5rem;
        flex-wrap: wrap;
        font-size: 0.8rem;
        max-width: 1120px;
        border-top: 1px solid colors.getThemedColor("border");
        align-items: center;
        font-family: var(--font-mono);
        justify-content: space-between;

        @media screen and (max-width: 768px)
        {
            margin-top: 4.5rem;
            padding-bottom: calc( 5rem + env(safe-area-inset-bottom) );
        }
    }

    ul
    {
        gap: 0.25rem 1.5rem;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
    }

    a
    {
        gap: 0.5rem;
        color: colors.getThemedColor("foreground");
        display: inline-flex;
        min-height: 2.75rem;
        align-items: center;

        &:hover
        {
            color: colors.getThemedColor("primary");
            text-decoration: underline;
        }
    }

    li > a > :global(svg)
    {
        font-size: 1rem;
    }

    code
    {
        font-family: inherit;
    }
</style>
