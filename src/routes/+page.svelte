<script lang="ts">
    import "$lib/styles/page.scss";
    import "photoswipe/photoswipe.css";

    import * as m from "$lib/locales/messages";
    import ProjectList from "$lib/components/ProjectList.svelte";
    import SkillFilter from "$lib/components/SkillFilter.svelte";
    import ContactMailer from "$lib/components/ContactMailer.svelte";
    import type { PageData } from "./$types";

    let { data }: { data: PageData } = $props();

    const birthDate = Date.parse( "08 Aug 1999 00:00:00 GMT" );
    const elapsed = new Date( Date.now() - birthDate );
    const age = elapsed.getFullYear() - 1970;
</script>

<svelte:head>
    <title>Florian Trayon - Portfolio</title>
    <meta name="description" content="Portfolio of Florian Trayon, a french full-stack developer." />
</svelte:head>

<main>
    <!-- https://tholman.com/github-corners/ -->
    <a
        rel="noopener noreferrer"
        href="https://github.com/FlorianLeChat/Portfolio"
        title="GitHub"
        target="_blank"
        aria-label="GitHub"
    >
        <svg width="80" height="80" viewBox="0 0 250 250">
            <path d="M0 0l115 115h15l12 27 108 108V0z" />
            <path d="M128 109c-15-9-9-19-9-19 3-7 2-11 2-11-1-7 3-2 3-2 4 5 2 11 2 11-3 10 5 15 9 16" />
            <path
                d="M115 115s4 2 5 0l14-14c3-2 6-3 8-3-8-11-15-24 2-41 5-5 10-7 16-7 1-2 3-7 12-11 0 0
                5 3 7 16 4 2 8 5 12 9s7 8 9 12c14 3 17 7 17 7-4 8-9 11-11 11 0 6-2 11-7 16-16 16-30 10-41
                2 0 3-1 7-5 11l-12 11c-1 1 1 5 1 5z"
            />
        </svg>
    </a>

    <section id="about">
        <h1>
            {m.landing_hello_title()}
            <span>{m.landing_developer_firstname()}</span>
            <span>{m.landing_developer_surname()}.</span>
        </h1>

        <article>
            <p>
                {m.landing_developer_description( { age } )}
            </p>

            <a
                rel="noopener noreferrer"
                href="https://pages.florian-dev.fr/floriantrayon/Online-Resume/"
                target="_blank"
            >
                <button type="button">
                    {m.landing_access_resume()}
                </button>
            </a>
        </article>
    </section>

    <ProjectList projects={data.projects} />
    <SkillFilter skills={data.skills} />
    <ContactMailer />
</main>
