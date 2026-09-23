<script lang="ts">
    import * as m from "$lib/locales/messages";
    import { LINKS, CONTACT_MAIL } from "$lib/links";
</script>

<section id="contact">
    <h2>{m.landing_header_contact()}</h2>

    <ul>
        <li>
            <a href="mailto:{CONTACT_MAIL}">
                <i class="fa-solid fa-envelope" aria-hidden="true"></i>
                {m.landing_footer_mail()}
            </a>
        </li>

        <li>
            <a rel="external noopener noreferrer" href={LINKS.gitlab} target="_blank">
                <i class="fa-brands fa-gitlab" aria-hidden="true"></i>
                GitLab
            </a>
        </li>

        <li>
            <a rel="external noopener noreferrer" href={LINKS.github} target="_blank">
                <i class="fa-brands fa-github" aria-hidden="true"></i>
                GitHub
            </a>
        </li>

        <li>
            <a rel="external noopener noreferrer" href={LINKS.linkedin} target="_blank">
                <i class="fa-brands fa-linkedin-in" aria-hidden="true"></i>
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
