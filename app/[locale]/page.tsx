//
// Route vers la page principale du site.
//  Source : https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts#pages
//

// Importation de la feuille de style.
import "./page.scss";

// Importation des dépendances.
import Image from "next/image";
import { join } from "path";
import { lazy } from "react";
import { readFile } from "fs/promises";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCode, faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons";
import { unstable_setRequestLocale, getTranslations } from "next-intl/server";

// Importation des types.
import type { SkillAttributes } from "@/interfaces/Skill";
import type { ProjectAttributes } from "@/interfaces/Project";

// Importation des images statiques.
import Genio from "@/images/genio.png";
import Domego from "@/images/domego.png";
import Portfolio from "@/images/portfolio.png";
import GamesOnWeb from "@/images/gamesonweb2023.png";
import Assignment from "@/images/assignment.png";
import FileStorage from "@/images/filestorage.png";
import SourceConsole from "@/images/sourceconsole.png";
import MangaParadise from "@/images/mangaparadise.png";
import RavenFramework from "@/images/ravenframework.png";
import DigitalIdentity from "@/images/digitalidentity.png";
import SteamDownloader from "@/images/steamdownloader.png";
import FacepunchMonitor from "@/images/facepunchmonitor.png";

// Importation des fonctions utilitaires.
import { generateMetadata } from "./layout";

// Importation des composants.
const SkillFilter = lazy( () => import( "./components/skill-filter" ) );
const ContactMailer = lazy( () => import( "./components/contact-mailer" ) );

// Récupération des projets et des compétences.
const directory = join( process.cwd(), "data" );
const getProjects = async () => JSON.parse(
	await readFile( `${ directory }/projects.json`, "utf8" )
) as ProjectAttributes[];

const getSkills = async () => JSON.parse(
	await readFile( `${ directory }/skills.json`, "utf8" )
) as SkillAttributes[];

// Récupération de l'image statique correspondant au nom d'un projet.
//  Note : cette astuce est utilisée pour le chargement progressif des images.
//  Source : https://nextjs.org/docs/app/api-reference/components/image#placeholder
const getImage = ( name: string ) =>
{
	switch ( name )
	{
		// Genio.
		case "genio":
			return Genio;

		// Domego.
		case "domego":
			return Domego;

		// Portfolio.
		case "portfolio":
			return Portfolio;

		// Games On Web 2023.
		case "gamesonweb2023":
			return GamesOnWeb;

		// Assignment Manager.
		case "assignment":
			return Assignment;

		// Simple File Storage.
		case "filestorage":
			return FileStorage;

		// Source Web Console.
		case "sourceconsole":
			return SourceConsole;

		// Manga Paradise.
		case "mangaparadise":
			return MangaParadise;

		// Raven Framework.
		case "ravenframework":
			return RavenFramework;

		// Digital Identity.
		case "digitalidentity":
			return DigitalIdentity;

		// Steam Collection Download Size Calculator
		case "steamdownloader":
			return SteamDownloader;

		// Facepunch Commits Monitor
		case "facepunchmonitor":
			return FacepunchMonitor;

		// Aucune image.
		default:
			return "";
	}
};

// Affichage de la page.
export default async function Page( {
	params: { locale }
}: {
	params: { locale: string };
} )
{
	// Définition de la langue de la page.
	unstable_setRequestLocale( locale );

	// Déclaration des variables d'état.
	const t = await getTranslations();

	// Déclaration des constantes.
	const github = ( await generateMetadata() ).source;
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

			<section>
				{/* Prénom et nom du développeur */}
				<h1>
					{t( "landing.hello_title" )}
					<span>{t( "landing.developer_firstname" )}</span>
					<span>{t( "landing.developer_surname" )}.</span>
				</h1>

				<article id="about">
					{/* Résumé du développeur */}
					<p>
						{t( "landing.developer_description", {
							age: date.getFullYear() - 1970
						} )}
					</p>

					{/* Bouton de téléchargement du CV */}
					<a
						rel="noopener noreferrer"
						href="https://drive.google.com/file/d/1AuJMWr9LJGnZv64cFh-fBrNGj0BgyRNH/view"
						target="_blank"
					>
						<button type="button">
							{t( "landing.download_resume" )}
						</button>
					</a>
				</article>
			</section>

			<section id="projects">
				{/* Section des projets */}
				<h2>{t( "landing.header_projects" )}</h2>

				{/* Génération des projets */}
				<ul>
					{Object.entries( await getProjects() ).map( ( [ key, value ] ) => (
						<li key={key}>
							{/* Image du projet */}
							<Image
								src={getImage( key )}
								alt={value.title}
								width={450}
								height={375}
								placeholder="blur"
							/>

							{/* Contenu du projet */}
							<div>
								{/* Titre du projet */}
								<h3>{value.title}</h3>

								{/* Description du projet */}
								<p>{t( `projects.${ key }` )}</p>

								{/* Compétences utilisées pour le projet */}
								<ul>
									{value.skills.map( ( skill ) => (
										<li key={skill}>{skill}</li>
									) )}
								</ul>

								{/* Liens du projet */}
								<ul>
									{
										// Dépôt Git (facultatif).
										value.repository && (
											<li>
												<a
													rel="noopener noreferrer"
													href={value.repository}
													title={t(
														"landing.project_source"
													)}
													target="_blank"
												>
													<FontAwesomeIcon
														icon={faCode}
													/>
												</a>
											</li>
										)
									}

									{
										// Site de démonstration (facultatif).
										value.demo && (
											<li>
												<a
													rel="noopener noreferrer"
													href={value.demo}
													title={t(
														"landing.project_demo"
													)}
													target="_blank"
												>
													<FontAwesomeIcon
														icon={faExternalLinkAlt}
													/>
												</a>
											</li>
										)
									}
								</ul>
							</div>
						</li>
					) )}
				</ul>
			</section>

			{/* Section des compétences */}
			<SkillFilter skills={await getSkills()} />

			{/* Section de contact */}
			<ContactMailer />
		</main>
	);
}