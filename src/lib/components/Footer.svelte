<script lang="ts">
    import * as m from "$lib/locales/messages";
    import { LINKS } from "$lib/links";
    import { env } from "$env/dynamic/public";
    import IconCode from "~icons/tabler/code";
    import IconPhp from "~icons/simple-icons/php";
</script>

<footer>
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
    </ul>

    <div>
        <span>
            {m.landing_footer_madeby()}

            <a rel="external noopener noreferrer" href={LINKS.github} target="_blank">Florian Trayon 🐈</a>

            <small>&copy; {new Date().getFullYear()}</small>
        </span>

        <code>
            {m.landing_footer_version( { version: env.PUBLIC_VERSION ?? "0.0.1" } )}
        </code>
    </div>
</footer>

<style lang="scss">
    @use "colors";

    footer
    {
        gap: 1rem;
        display: flex;
        padding: 1.5rem 1.5rem 1.25rem;
        margin-top: 4rem;
        text-align: center;
        border-top: 1px solid colors.getThemedColor("border");
        align-items: center;
        flex-direction: column;
        background-color: colors.getThemedColor("background-alt");

        > ul
        {
            gap: 1.5rem;
            display: flex;
            flex-wrap: wrap;
            font-size: 0.8rem;
            justify-content: center;

            @media screen and (max-width: 640px)
            {
                gap: 0.75rem;
            }

            a
            {
                gap: 0.5rem;
                color: colors.getThemedColor("muted");
                display: inline-flex;
                align-items: center;

                &:hover
                {
                    color: colors.getThemedColor("primary");
                }

                > :global(svg)
                {
                    font-size: 1rem;
                }
            }
        }

        > div
        {
            gap: 0.25rem;
            width: 100%;
            display: flex;
            max-width: 32rem;
            font-size: 0.85rem;
            border-top: 1px solid colors.getThemedColor("border");
            align-items: center;
            padding-top: 1rem;
            flex-direction: column;
        }

        code
        {
            color: colors.getThemedColor("muted");
            font-size: 0.75rem;
        }
    }
</style>
