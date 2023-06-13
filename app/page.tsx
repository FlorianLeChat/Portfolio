//
// Route vers la page principale du site.
//  Source : https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts#pages
//

// Importation de la feuille de style.
import "./page.scss";

// Importation des dépendances.
import path from "path";
import Image from "next/image";
import { lazy } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { promises as fileSystem } from "fs";
import { faCode, faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons";

// Importation des types.
import type { SkillAttributes } from "@/interfaces/Skill";
import type { ProjectAttributes } from "@/interfaces/Project";

// Importation des fonctions utilitaires.
import { getBasePath } from "./utilities/NextRouter";
import { useTranslation } from "./utilities/ServerTranslations";

// Importation des composants.
const SkillFilter = lazy( () => import( "./components/skill-filter" ) );
const ContactMailer = lazy( () => import( "./components/contact-mailer" ) );

// Récupération des projets et des compétences.
const directory = path.join( process.cwd(), "public/data" );
const getProjects = async () =>
{
	const projects = await fileSystem.readFile( `${ directory }/projects.json`, "utf8" );
	return JSON.parse( projects ) as ProjectAttributes[];
};

const getSkills = async () =>
{
	const skills = await fileSystem.readFile( `${ directory }/skills.json`, "utf8" );
	return JSON.parse( skills ) as SkillAttributes[];
};

// Affichage de la page.
export default async function Page()
{
	// Déclaration des constantes.
	const basePath = getBasePath();
	const { t } = await useTranslation();
	const date = new Date();

	date.setTime( date.getTime() - Date.parse( "08 Aug 1999 00:00:00 GMT" ) );

	// Affichage du rendu HTML de la page.
	return (
		<>
			{/* Affichage de l'animation du logo vers le dépôt GitHub */}
			{/* Source : https://tholman.com/github-corners/ */}
			<a href="https://github.com/FlorianLeChat/Portfolio" target="_blank" rel="noopener noreferrer">
				<svg width="80" height="80" viewBox="0 0 250 250">
					<path d="M0 0l115 115h15l12 27 108 108V0z" />
					<path d="M128 109c-15-9-9-19-9-19 3-7 2-11 2-11-1-7 3-2 3-2 4 5 2 11 2 11-3 10 5 15 9 16" />
					<path d="M115 115s4 2 5 0l14-14c3-2 6-3 8-3-8-11-15-24 2-41 5-5 10-7 16-7 1-2 3-7 12-11 0 0
						5 3 7 16 4 2 8 5 12 9s7 8 9 12c14 3 17 7 17 7-4 8-9 11-11 11 0 6-2 11-7 16-16 16-30 10-41
						2 0 3-1 7-5 11l-12 11c-1 1 1 5 1 5z"
					/>
				</svg>
			</a>

			<section>
				{/* Prénom et nom du développeur */}
				<h1>
					{t( "pages.index.hello_title" )}
					<span>{t( "pages.index.developer_firstname" )}</span>
					<span>{t( "pages.index.developer_surname" )}.</span>
				</h1>

				<article id="about">
					{/* Résumé du développeur. */}
					<p>{t( "pages.index.developer_description", { age: date.getFullYear() - 1970 } )}</p>

					{/* Bouton de téléchargement du CV */}
					<a
						rel="noopener noreferrer" target="_blank"
						href="https://drive.google.com/file/d/1AuJMWr9LJGnZv64cFh-fBrNGj0BgyRNH/view"
					>
						<button type="button">{t( "pages.index.download_resume" )}</button>
					</a>
				</article>
			</section>

			<section id="projects">
				{/* Section des projets */}
				<h2>{t( "pages.index.header_projects" )}</h2>

				{/* Génération des projets */}
				{
					Object.entries( await getProjects() ).map( ( [ key, value ] ) => (
						<article key={key}>
							{/* Image du projet */}
							<Image
								src={`${ basePath }/assets/images/${ key }.png`}
								alt={value.title} width={450} height={250}
							/>

							{/* Contenu du projet */}
							<div>
								{/* Titre du projet */}
								<h3>{value.title}</h3>

								{/* Description du projet */}
								<p>{t( `projects.${ key }` )}</p>

								{/* Compétences utilisées pour le projet */}
								<ul>
									{
										value.skills.map( ( skill, index ) => <li key={index}>{skill}</li> )
									}
								</ul>

								{/* Liens du projet */}
								<ul>
									{
										// Dépôt Git (facultatif).
										value.repository && (
											<li>
												<a href={value.repository} target="_blank" rel="noopener noreferrer">
													<FontAwesomeIcon icon={faCode} />
												</a>
											</li>
										)
									}

									{
										// Site de démonstration (facultatif).
										value.demo && (
											<li>
												<a href={value.demo} target="_blank" rel="noopener noreferrer">
													<FontAwesomeIcon icon={faExternalLinkAlt} />
												</a>
											</li>
										)
									}
								</ul>
							</div>
						</article>
					) )
				}
			</section>

			{/* Section des compétences */}
			<SkillFilter skills={await getSkills()} />

			{/* Section de contact */}
			<ContactMailer />
		</>
	);
}