//
// Composant d'affichage de la section des projets.
//
import { lazy } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getTranslations } from "next-intl/server";
import type { ProjectAttributes } from "@/interfaces/Project";
import { faCode, faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons";

const PhotoViewer = lazy( () => import( "./photo-viewer" ) );

export default async function ProjectViewer( {
	projects
}: Readonly<{ projects: Record<string, ProjectAttributes> }> )
{
	// Déclaration des variables d'état.
	const messages = await getTranslations();

	// Affichage du rendu HTML du composant.
	return (
		<section id="projects">
			{/* Section des projets */}
			<h2>{messages( "landing.header_projects" )}</h2>

			{/* Génération des projets */}
			<ul>
				{Object.entries( projects ).map( ( [ key, value ] ) => (
					<li key={key}>
						{/* Image du projet */}
						<PhotoViewer id={key} project={value} />

						{/* Contenu du projet */}
						<div>
							{/* Titre du projet */}
							<h3>{value.title}</h3>

							{/* Description du projet */}
							<p>{messages( `projects.${ key }` )}</p>

							{/* Compétences utilisées pour le projet */}
							<ul>
								{value.skills.map( ( skill ) => (
									<li key={skill}>{skill}</li>
								) )}
							</ul>

							{/* Liens du projet */}
							<ul>
								{/* Dépôt Git (facultatif) */}
								{value.repository && (
									<li>
										<a
											rel="noopener noreferrer"
											href={value.repository}
											title={messages( "landing.project_source" )}
											target="_blank"
											aria-label={messages( "landing.project_source" )}
										>
											<FontAwesomeIcon icon={faCode} />
										</a>
									</li>
								)}

								{/* Site de démonstration (facultatif) */}
								{value.demo && (
									<li>
										<a
											rel="noopener noreferrer"
											href={value.demo}
											title={messages( "landing.project_demo" )}
											target="_blank"
											aria-label={messages( "landing.project_demo" )}
										>
											<FontAwesomeIcon
												icon={faExternalLinkAlt}
											/>
										</a>
									</li>
								)}
							</ul>
						</div>
					</li>
				) )}
			</ul>
		</section>
	);
}