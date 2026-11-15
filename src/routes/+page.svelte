<script lang="ts">
    import { LINKS } from "#lib/links.ts";
    import type { PageData } from "./$types";
    import * as m from "#lib/locales/messages.js";
    import IconArrowDown from "~icons/tabler/arrow-down";
    import IconArrowRight from "~icons/tabler/arrow-right";
    import BlogCards from "#lib/components/BlogCards.svelte";
    import IconExternalLink from "~icons/tabler/external-link";
    import ProjectList from "#lib/components/ProjectList.svelte";
    import SkillFilter from "#lib/components/SkillFilter.svelte";
    import LatestCommit from "#lib/components/LatestCommit.svelte";
    import ContactMailer from "#lib/components/ContactMailer.svelte";

    let { data }: { data: PageData } = $props();

    const birthMonth = 7;
    const birthDay = 8;
    const birthYear = 1999;

    const computeAge = ( today: Date ) =>
    {
        const years = today.getFullYear() - birthYear;
        const birthdayThisYear = new Date( today.getFullYear(), birthMonth, birthDay );
        const hadBirthday = today >= birthdayThisYear;

        return hadBirthday ? years : years - 1;
    };

    const age = computeAge( new Date() );
</script>

<main id="content" tabindex="-1">
    <section id="about">
        <div>
            <h1>
                <span>{m.landing_hello_title()}</span>
                {m.landing_developer_firstname()} {m.landing_developer_surname()}
            </h1>

            <p>{m.landing_developer_description( { age } )}</p>

            <div>
                <a href="#contact">
                    {m.landing_hero_contact()}
                    <IconArrowRight aria-hidden="true" />
                </a>

                <a href="#projects">
                    {m.landing_hero_projects()}
                    <IconArrowDown aria-hidden="true" />
                </a>

                <a rel="external noopener noreferrer" href={LINKS.resume} target="_blank">
                    {m.landing_access_resume()}
                    <IconExternalLink aria-hidden="true" />
                </a>
            </div>
        </div>

        <LatestCommit />
    </section>

    <ProjectList
        projects={data.projects}
        heading={m.landing_header_projects()}
        description={m.landing_projects_intro()}
    />

    <SkillFilter skills={data.skills} />
    <BlogCards />
    <ContactMailer />
</main>

<style lang="scss">
    @use "colors";
    @use "buttons";

    section#about
    {
        gap: 4rem;
        border: none;
        display: grid;
        padding: 6rem 0 1rem;
        margin-top: 0;
        align-items: end;
        grid-template-columns: minmax( 0, 1.35fr ) minmax( 0, 0.65fr );

        &:not( :has( > :global(aside) ) )
        {
            grid-template-columns: minmax( 0, 1fr );
        }

        @media screen and (max-width: 1024px)
        {
            gap: 3rem;
            padding-top: 3.5rem;
            grid-template-columns: minmax( 0, 1fr );
        }

        @media screen and (max-width: 768px)
        {
            padding-top: 2.5rem;
        }
    }

    h1
    {
        max-width: 12ch;

        &::after
        {
            width: 0.07em;
            height: 0.82em;
            content: "";
            display: inline-block;
            animation: caret 1.1s steps(1) 5;
            margin-left: 0.1em;
            vertical-align: -0.04em;
            background-color: colors.getThemedColor("primary");

            @media (prefers-reduced-motion: reduce)
            {
                animation: none;
            }
        }
    }

    h1 > span
    {
        color: colors.getThemedColor("muted");
        display: block;
        font-size: 0.4em;
        font-style: italic;
        font-weight: 400;
        margin-bottom: 0.35em;
        letter-spacing: -0.01em;
    }

    h1 + p
    {
        max-width: 54ch;
        font-size: clamp( 1.15rem, 1rem + 0.5vw, 1.35rem );
        margin-top: 2rem;
        line-height: 1.55;
    }

    h1 + p + div
    {
        gap: 0.75rem;
        display: flex;
        flex-wrap: wrap;
        margin-top: 2.5rem;
        align-items: center;

        > a:first-child
        {
            @include buttons.pill();
        }

        > a:nth-child(2)
        {
            @include buttons.pill();
            @include buttons.pillGhost();
        }

        @media screen and (max-width: 640px)
        {
            > a:first-child, > a:nth-child(2)
            {
                flex: 1 1 9rem;
            }
        }

        @media screen and (max-width: 480px)
        {
            > a:first-child, > a:nth-child(2)
            {
                flex-basis: 100%;
            }
        }

        > a:last-child
        {
            gap: 0.5rem;
            display: inline-flex;
            padding: 0.8rem 0.5rem;
            font-size: 0.875rem;
            min-height: 2.75rem;
            align-items: center;
            font-family: var(--font-mono);
            text-decoration: underline;
            text-decoration-color: colors.getThemedAlpha("primary", 0.4);

            &:hover
            {
                text-decoration-color: currentColor;
            }
        }
    }

    @keyframes caret
    {
        50%
        {
            opacity: 0;
        }
    }
</style>
