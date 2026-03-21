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
    const messages = await getTranslations();

    return (
        <section id="projects">
            <h2>{messages( "landing.header_projects" )}</h2>

            <ul>
                {Object.entries( projects ).map( ( [ key, value ] ) => (
                    <li key={key}>
                        <PhotoViewer id={key} project={value} />

                        <div>
                            <h3>{value.title}</h3>

                            <p>{messages( `projects.${ key }` )}</p>

                            <ul>
                                {value.skills.map( ( skill ) => (
                                    <li key={skill}>{skill}</li>
                                ) )}
                            </ul>

                            <ul>
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
