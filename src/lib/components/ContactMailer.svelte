<script lang="ts">
    import { onMount } from "svelte";
    import IconCopy from "~icons/tabler/copy";
    import IconCheck from "~icons/tabler/check";
    import * as m from "#lib/locales/messages.js";
    import IconFileCv from "~icons/tabler/file-cv";
    import IconMail from "~icons/tabler/mail-filled";
    import IconGithub from "~icons/simple-icons/github";
    import IconGitlab from "~icons/simple-icons/gitlab";
    import { LINKS, CONTACT_MAIL } from "#lib/links.ts";
    import IconLinkedin from "~icons/tabler/brand-linkedin-filled";

    let canCopy = $state( false );
    let copied = $state( false );

    let resetTimer: ReturnType<typeof setTimeout> | undefined;

    /// Copies the address, for visitors whose browser has no mail client to
    /// hand a `mailto:` link to.
    ///
    /// @author Claude
    const copyAddress = async () =>
    {
        try
        {
            await navigator.clipboard.writeText( CONTACT_MAIL );

            copied = true;

            clearTimeout( resetTimer );
            resetTimer = setTimeout( () => ( copied = false ), 2500 );
        }
        catch
        {
            // Permission refused: the address stays readable and selectable.
        }
    };

    onMount( () =>
    {
        // The clipboard API only exists in secure contexts, and a button that
        // cannot do anything is worse than no button.
        canCopy = typeof navigator.clipboard?.writeText === "function";

        return () => clearTimeout( resetTimer );
    } );
</script>

<section id="contact">
    <h2>{m.landing_header_contact()}</h2>

    <p>{m.landing_contact_intro()}</p>

    <div>
        <a href="mailto:{CONTACT_MAIL}">
            <IconMail aria-hidden="true" />
            {CONTACT_MAIL}
        </a>

        {#if canCopy}
            <button type="button" onclick={copyAddress}>
                {#if copied}
                    <IconCheck aria-hidden="true" />
                {:else}
                    <IconCopy aria-hidden="true" />
                {/if}

                {m.landing_contact_copy()}
            </button>
        {/if}

        <p role="status">{copied ? m.landing_contact_copied() : ""}</p>
    </div>

    <h3>{m.landing_contact_elsewhere()}</h3>

    <ul>
        <li>
            <a rel="external noopener noreferrer" href={LINKS.resume} target="_blank">
                <IconFileCv aria-hidden="true" />
                {m.landing_access_resume()}
            </a>
        </li>

        <li>
            <a rel="external noopener noreferrer" href={LINKS.linkedin} target="_blank">
                <IconLinkedin aria-hidden="true" />
                LinkedIn
            </a>
        </li>

        <li>
            <a rel="external noopener noreferrer" href={LINKS.github} target="_blank">
                <IconGithub aria-hidden="true" />
                GitHub
            </a>
        </li>

        <li>
            <a rel="external noopener noreferrer" href={LINKS.gitlab} target="_blank">
                <IconGitlab aria-hidden="true" />
                GitLab
            </a>
        </li>
    </ul>
</section>

<style lang="scss">
    @use "colors";
    @use "buttons";

    h2 + p
    {
        max-width: 40ch;
        font-size: clamp( 1.35rem, 1.1rem + 1vw, 1.75rem );
        margin-bottom: 1.5rem;
    }

    h2 + p + div
    {
        gap: 1rem 1.5rem;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
    }

    div > a
    {
        gap: 0.75rem;
        color: colors.getThemedColor("foreground-alt");
        display: inline-flex;
        font-size: clamp( 1.35rem, 0.9rem + 2.4vw, 2.5rem );
        min-height: 2.75rem;
        font-weight: 500;
        align-items: center;
        font-family: var(--font-mono);
        overflow-wrap: anywhere;
        letter-spacing: -0.03em;
        text-decoration: underline;
        text-decoration-color: colors.getThemedColor("primary");
        text-decoration-thickness: 0.06em;

        &:hover
        {
            color: colors.getThemedColor("primary");
        }

        > :global(svg)
        {
            color: colors.getThemedColor("primary");
            font-size: 0.8em;
            flex-shrink: 0;
        }
    }

    button
    {
        @include buttons.pill();
        @include buttons.pillGhost();
    }

    p[role="status"]
    {
        width: 100%;
        color: colors.getThemedColor("primary");
        font-size: 0.85rem;
        min-height: 1.5em;
        font-family: var(--font-mono);
    }

    h3
    {
        color: colors.getThemedColor("muted");
        font-size: 1.25rem;
        margin-top: 3rem;
        font-style: italic;
        font-weight: 400;
        margin-bottom: 1rem;
    }

    ul
    {
        gap: 0.5rem 2rem;
        display: flex;
        flex-wrap: wrap;
    }

    li a
    {
        gap: 0.6rem;
        display: inline-flex;
        font-size: 0.9rem;
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
