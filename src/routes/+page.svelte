<script lang="ts">
    import "photoswipe/photoswipe.css";

    import * as m from "$lib/locales/messages";
    import { LINKS } from "$lib/links";
    import BlogCards from "$lib/components/BlogCards.svelte";
    import ProjectList from "$lib/components/ProjectList.svelte";
    import SkillFilter from "$lib/components/SkillFilter.svelte";
    import LatestCommit from "$lib/components/LatestCommit.svelte";
    import ContactMailer from "$lib/components/ContactMailer.svelte";
    import type { PageData } from "./$types";

    let { data }: { data: PageData } = $props();

    const birthDate = Date.parse( "08 Aug 1999 00:00:00 GMT" );
    const elapsed = new Date( Date.now() - birthDate );
    const age = elapsed.getFullYear() - 1970;
</script>

<main id="content" tabindex="-1">
    <section id="about">
        <div>
            <h1>
                {m.landing_hello_title()}
                <span>{m.landing_developer_firstname()} {m.landing_developer_surname()}.</span>
            </h1>

            <p>
                {m.landing_developer_description( { age } )}
            </p>

            <div>
                <a href="#projects">
                    {m.landing_header_projects()}
                    <i class="fa-solid fa-arrow-right" aria-hidden="true"></i>
                </a>

                <a rel="external noopener noreferrer" href={LINKS.resume} target="_blank">
                    <i class="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i>
                    {m.landing_access_resume()}
                </a>
            </div>
        </div>

        <LatestCommit />
    </section>

    <BlogCards />

    <ProjectList
        projects={data.projects}
        heading={m.landing_header_projects()}
        description={m.landing_projects_intro()}
    />

    <SkillFilter skills={data.skills} />
    <ContactMailer />
</main>

<style lang="scss">
    @use "colors";
    @use "buttons";

    section#about
    {
        gap: 3rem;
        display: grid;
        padding: 4rem 0 2rem;
        align-items: center;
        grid-template-columns: minmax( 0, 1.1fr ) minmax( 0, 0.9fr );

        @media screen and (max-width: 1024px)
        {
            gap: 2.5rem;
            text-align: center;
            padding-top: 2.5rem;
            justify-items: center;
            grid-template-columns: minmax( 0, 1fr );
        }

        @media screen and (max-width: 768px)
        {
            margin-top: 2.5rem;
            padding-top: 0;
        }

        h1 span
        {
            color: colors.getThemedColor("primary");
            display: block;
        }

        > div > p
        {
            color: colors.getThemedColor("muted");
            max-width: 52ch;
            font-size: 1.05rem;
            margin-top: 1.5rem;
        }

        > div > div
        {
            gap: 0.75rem;
            display: flex;
            flex-wrap: wrap;
            margin-top: 2rem;

            @media screen and (max-width: 1024px)
            {
                justify-content: center;
            }

            > a
            {
                @include buttons.pill();
            }

            > a + a
            {
                @include buttons.pillGhost();
            }
        }
    }
</style>
