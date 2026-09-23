<script lang="ts">
    import IconMail from "~icons/tabler/mail-filled";
    import * as m from "$lib/locales/messages";
    import { LINKS, CONTACT_MAIL } from "$lib/links";
    import IconGitlab from "~icons/simple-icons/gitlab";
    import IconGithub from "~icons/simple-icons/github";
    import IconLinkedin from "~icons/tabler/brand-linkedin-filled";
</script>

<section id="contact">
    <h2>{m.landing_header_contact()}</h2>

    <ul>
        <li>
            <a href="mailto:{CONTACT_MAIL}">
                <IconMail aria-hidden="true" />
                {m.landing_footer_mail()}
            </a>
        </li>

        <li>
            <a rel="external noopener noreferrer" href={LINKS.gitlab} target="_blank">
                <IconGitlab aria-hidden="true" />
                GitLab
            </a>
        </li>

        <li>
            <a rel="external noopener noreferrer" href={LINKS.github} target="_blank">
                <IconGithub aria-hidden="true" />
                GitHub
            </a>
        </li>

        <li>
            <a rel="external noopener noreferrer" href={LINKS.linkedin} target="_blank">
                <IconLinkedin aria-hidden="true" />
                LinkedIn
            </a>
        </li>
    </ul>
</section>

<style lang="scss">
    @use "buttons";

    ul
    {
        gap: 0.75rem;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
    }

    a
    {
        @include buttons.pill();
    }

    li + li a
    {
        @include buttons.pillGhost();
    }
</style>
