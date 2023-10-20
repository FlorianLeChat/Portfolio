//
// Composant de la barre de navigation de l'ancienne version du site.
//

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";

export default function Navigation()
{
	// Déclaration des constantes.
	const pathname = usePathname();
	const landing = pathname.endsWith( "/legacy" );

	// Déclaration des variables d'état.
	const t = useTranslations( "legacy" );

	// Désactivation du composant sur les pages d'administration.
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
								{t( "index.about_me.title" )}
							</a>
						</li>
					) : (
						<li>
							<Link href="/legacy">
								{t( "index.about_me.title" )}
							</Link>
						</li>
					)
				}

				{
					// Page des projets.
					landing ? (
						<li>
							<a href="#projects">
								{t( "header.projects.title" )}
							</a>
						</li>
					) : (
						!pathname.endsWith( "/projects" ) && (
							<li>
								<Link href="/legacy/projects">
									{t( "header.projects.title" )}
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
								{t( "header.skills.title" )}
							</a>
						</li>
					) : (
						!pathname.endsWith( "/skills" ) && (
							<li>
								<Link href="/legacy/skills">
									{t( "header.skills.title" )}
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
								{t( "index.contact.title" )}
							</a>
						</li>
					) : (
						!pathname.endsWith( "/contact" ) && (
							<li>
								<Link href="/legacy/contact">
									{t( "index.contact.title" )}
								</Link>
							</li>
						)
					)
				}
			</ul>
		</nav>
	);
}