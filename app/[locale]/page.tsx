import "photoswipe/photoswipe.css";
import "./page.scss";

import { join } from "node:path";
import { lazy } from "react";
import { readFile } from "node:fs/promises";
import { setRequestLocale, getTranslations } from "next-intl/server";

import type { SkillAttributes } from "@/interfaces/Skill";
import type { ProjectAttributes } from "@/interfaces/Project";

import { fetchMetadata } from "@/utilities/metadata";

const SkillFilter = lazy( () => import( "./components/skill-filter" ) );
const ProjectList = lazy( () => import( "./components/project-list" ) );
const ContactMailer = lazy( () => import( "./components/contact-mailer" ) );

const directory = join( process.cwd(), "data" );
const getProjects = async () => JSON.parse(
    await readFile( `${ directory }/projects.json`, "utf8" )
) as Record<string, ProjectAttributes>;

const getSkills = async () => JSON.parse(
    await readFile( `${ directory }/skills.json`, "utf8" )
) as SkillAttributes[];

export default async function Page( {
    params
}: Readonly<{
    params: Promise<{ locale: string }>;
}> )
{
    const { locale } = await params;

    setRequestLocale( locale );

    const messages = await getTranslations();
    const github = ( await fetchMetadata() ).source;
    const date = new Date();

    date.setTime( date.getTime() - Date.parse( "08 Aug 1999 00:00:00 GMT" ) );

    return (
        <main>
            {/* https://tholman.com/github-corners/ */}
            <a
                rel="noopener noreferrer"
                href={github}
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
                    {messages( "landing.hello_title" )}
                    <span>{messages( "landing.developer_firstname" )}</span>
                    <span>{messages( "landing.developer_surname" )}.</span>
                </h1>

                <article id="about">
                    <p>
                        {messages( "landing.developer_description", {
                            age: date.getFullYear() - 1970
                        } )}
                    </p>

                    <a
                        rel="noopener noreferrer"
                        href="https://pages.florian-dev.fr/floriantrayon/Online-Resume/"
                        target="_blank"
                    >
                        <button type="button">
                            {messages( "landing.access_resume" )}
                        </button>
                    </a>
                </article>
            </section>

            <ProjectList projects={await getProjects()} />
            <SkillFilter skills={await getSkills()} />
            <ContactMailer />
        </main>
    );
}
