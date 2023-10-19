//
// Composant de la barre de navigation de l'ancienne version du site.
//

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslation } from "@/utilities/ClientTranslations";

export default function Navigation()
{
	// Déclaration des constantes.
	const pathname = usePathname();
	const landing = pathname.endsWith( "/legacy" );

	// Déclaration des variables d'état.
	const { t } = useTranslation();

	// Vérification de la version du site.
	if ( pathname.includes( "/admin" ) )
	{
		return null;
	}

	// Affichage du rendu HTML du composant.
	return (
		<nav>
			<ul>
				{
					// Page d'accueil.
					landing ? (
						<li>
							<a href="#aboutme">
								{t( "pages.legacy.index.about_me.title" )}
							</a>
						</li>
					) : (
						<li>
							<Link href="/legacy">
								{t( "pages.legacy.index.about_me.title" )}
							</Link>
						</li>
					)
				}

				{
					// Page des projets.
					landing ? (
						<li>
							<a href="#projects">
								{t( "pages.legacy.header.projects.title" )}
							</a>
						</li>
					) : (
						!pathname.endsWith( "/projects" ) && (
							<li>
								<Link href="/legacy/projects">
									{t( "pages.legacy.header.projects.title" )}
								</Link>
							</li>
						)
					)
				}

				{
					// Page des compétences.
					landing ? (
						<li>
							<a href="#skills">
								{t( "pages.legacy.header.skills.title" )}
							</a>
						</li>
					) : (
						!pathname.endsWith( "/skills" ) && (
							<li>
								<Link href="/legacy/skills">
									{t( "pages.legacy.header.skills.title" )}
								</Link>
							</li>
						)
					)
				}

				{
					// Page de contact.
					landing ? (
						<li>
							<a href="#contact">
								{t( "pages.legacy.index.contact.title" )}
							</a>
						</li>
					) : (
						!pathname.endsWith( "/contact" ) && (
							<li>
								<Link href="/legacy/contact">
									{t( "pages.legacy.index.contact.title" )}
								</Link>
							</li>
						)
					)
				}
			</ul>
		</nav>
	);
}