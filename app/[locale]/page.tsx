//
// Route vers la page principale du site.
//  Source : https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts#pages
//

// Importation de la feuille de style.
import "./page.scss";

// Importation des dépendances.
import { join } from "path";
import { lazy } from "react";
import { readFile } from "fs/promises";
import { setRequestLocale, getTranslations } from "next-intl/server";

// Importation des types.
import type { SkillAttributes } from "@/interfaces/Skill";
import type { ProjectAttributes } from "@/interfaces/Project";

// Importation des fonctions utilitaires.
import { fetchMetadata } from "@/utilities/metadata";

// Importation des composants.
const SkillFilter = lazy( () => import( "./components/skill-filter" ) );
const ProjectList = lazy( () => import( "./components/project-list" ) );
const ContactMailer = lazy( () => import( "./components/contact-mailer" ) );

// Récupération des projets et des compétences.
const directory = join( process.cwd(), "data" );
const getProjects = async () => JSON.parse(
	await readFile( `${ directory }/projects.json`, "utf8" )
) as Record<string, ProjectAttributes>;

const getSkills = async () => JSON.parse(
	await readFile( `${ directory }/skills.json`, "utf8" )
) as SkillAttributes[];

// Affichage de la page.
export default async function Page( {
	params
}: Readonly<{
	params: Promise<{ locale: string }>;
}> )
{
	// Définition de la langue de la page.
	const { locale } = await params;

	setRequestLocale( locale );

	// Déclaration des variables d'état.
	const messages = await getTranslations();

	// Déclaration des constantes.
	const github = ( await fetchMetadata() ).source;
	const date = new Date();

	date.setTime( date.getTime() - Date.parse( "08 Aug 1999 00:00:00 GMT" ) );

	// Affichage du rendu HTML de la page.
	return (
		<main>
			{/* Affichage de l'animation du logo vers le dépôt GitHub */}
			{/* Source : https://tholman.com/github-corners/ */}
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
				{/* Prénom et nom du développeur */}
				<h1>
					{messages( "landing.hello_title" )}
					<span>{messages( "landing.developer_firstname" )}</span>
					<span>{messages( "landing.developer_surname" )}.</span>
				</h1>

				<article id="about">
					{/* Résumé du développeur */}
					<p>
						{messages( "landing.developer_description", {
							age: date.getFullYear() - 1970
						} )}
					</p>

					{/* Bouton de téléchargement du CV */}
					<a
						rel="noopener noreferrer"
						href="https://florianlechat.github.io/Online-Resume/"
						target="_blank"
					>
						<button type="button">
							{messages( "landing.download_resume" )}
						</button>
					</a>
				</article>
			</section>

			{/* Section des projets */}
			<ProjectList projects={await getProjects()} />

			{/* Section des compétences */}
			<SkillFilter skills={await getSkills()} />

			{/* Section de contact */}
			<ContactMailer />
		</main>
	);
}