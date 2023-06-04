//
// Route vers la page principale du site.
//  Source : https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts#pages
//

// Importation de la feuille de style.
import "./page.scss";

// Importation du normalisateur TypeScript.
import "@total-typescript/ts-reset";

// Importation des dépendances.
import path from "path";
import Image from "next/image";
import { lazy } from "react";
import { config } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { promises as fileSystem } from "fs";
import { faCode, faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons";

// Importation des types.
import type { Metadata } from "next";
import type { SkillAttributes } from "@/interfaces/Skill";
import type { ProjectAttributes } from "@/interfaces/Project";

// Importation des fonctions utilitaires.
import { getBasePath } from "./utilities/NextRouter";
import { useTranslation } from "./utilities/ServerTranslations";

// Importation des composants.
const SkillFilter = lazy( () => import( "./components/skill-filter" ) );

// Modification de la configuration de Font Awesome.
//  Source : https://fontawesome.com/docs/web/use-with/react/use-with
config.autoAddCss = false;

// Déclaration des propriétés de la page.
export const metadata: Metadata = {
	// Méta-données du document.
	title: process.env.NEXT_PUBLIC_TITLE,
	authors: [ { name: process.env.NEXT_PUBLIC_AUTHOR, url: "https://github.com/FlorianLeChat" } ],
	description: process.env.NEXT_PUBLIC_DESCRIPTION,
	keywords: process.env.NEXT_PUBLIC_TAGS,
	viewport: "width=device-width, initial-scale=1, viewport-fit=cover",
	manifest: "manifest.json",
	themeColor: "#306cc4",
	metadataBase: new URL( process.env.NEXT_PUBLIC_URL ?? "" ),

	// Icônes du document.
	icons: {
		icon: [
			{
				url: "assets/favicons/16x16.webp",
				type: "image/webp",
				sizes: "16x16"
			},
			{
				url: "assets/favicons/32x32.webp",
				type: "image/webp",
				sizes: "32x32"
			},
			{
				url: "assets/favicons/48x48.webp",
				type: "image/webp",
				sizes: "48x48"
			},
			{
				url: "assets/favicons/192x192.webp",
				type: "image/webp",
				sizes: "192x192"
			},
			{
				url: "assets/favicons/512x512.webp",
				type: "image/webp",
				sizes: "512x512"
			}
		],
		apple: [
			{
				url: "assets/favicons/180x180.webp",
				type: "image/webp",
				sizes: "180x180"
			}
		]
	},

	// Informations pour les moteurs de recherche.
	openGraph: {
		url: process.env.NEXT_PUBLIC_URL,
		type: "website",
		title: process.env.NEXT_PUBLIC_TITLE,
		description: process.env.NEXT_PUBLIC_DESCRIPTION,
		images: [
			{
				url: process.env.NEXT_PUBLIC_BANNER ?? ""
			}
		]
	},

	// Informations pour la plate-forme Twitter.
	twitter: {
		card: "summary_large_image",
		title: process.env.NEXT_PUBLIC_TITLE,
		creator: process.env.NEXT_PUBLIC_TWITTER,
		description: process.env.NEXT_PUBLIC_DESCRIPTION,
		images: [
			{
				url: process.env.NEXT_PUBLIC_BANNER ?? ""
			}
		]
	}
};

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
					<path d="M0,0 L115,115 L130,115 L142,142 L250,250 L250,0 Z" />
					<path d="M128.3,109.0 C113.8,99.7 119.0,89.6 119.0,89.6 C122.0,82.7 120.5,78.6 120.5,78.6 C119.2,72.0
						123.4,76.3 123.4,76.3 C127.3,80.9 125.5,87.3 125.5,87.3 C122.9,97.6 130.6,101.9 134.4,103.2"
					/>
					<path d="M115.0,115.0 C114.9,115.1 118.7,116.5 119.8,115.4 L133.7,101.6 C136.9,99.2 139.9,98.4
						142.2,98.6 C133.8,88.0 127.5,74.4 143.8,58.0 C148.5,53.4 154.0,51.2 159.7,51.0 C160.3,49.4
						163.2,43.6 171.4,40.1 C171.4,40.1 176.1,42.5 178.8,56.2 C183.1,58.6 187.2,61.8 190.9,65.4
						C194.5,69.0 197.7,73.2 200.1,77.6 C213.8,80.2 216.3,84.9 216.3,84.9 C212.7,93.1 206.9,96.0
						205.4,96.6 C205.1,102.4 203.0,107.8 198.3,112.5 C181.9,128.9 168.3,122.5 157.7,114.1
						C157.9,116.9 156.7,120.9 152.7,124.9 L141.0,136.5 C139.8,137.7 141.6,141.9 141.8,141.8 Z"
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
		</>
	);
}