//
// Composant de la barre de navigation de l'ancienne version du site.
//
import Link from "next/link";
import { headers } from "next/headers";
import { useTranslation } from "@/utilities/ServerTranslations";

export default async function Navigation()
{
	// Déclaration des constantes.
	const { t } = await useTranslation();
	const route = headers().get( "X-Invoke-Path" ) ?? "";
	const home = route.endsWith( "/legacy" );

	// Affichage du rendu HTML du composant.
	return (
		<nav>
			<ul>
				{
					// Page d'accueil.
					home ? (
						<li>
							<a href="#aboutme">{t( "pages.legacy.index.about_me.title" )}</a>
						</li>
					) : (
						<li>
							<Link href="/legacy">{t( "pages.legacy.index.about_me.title" )}</Link>
						</li>
					)
				}

				{
					// Page des projets.
					home ? (
						<li>
							<a href="#projects">{t( "pages.legacy.header.projects.title" )}</a>
						</li>
					) : !route.endsWith( "/projects" ) && (
						<li>
							<Link href="/legacy/projects">{t( "pages.legacy.header.projects.title" )}</Link>
						</li>
					)
				}

				{
					// Page des compétences.
					home ? (
						<li>
							<a href="#skills">{t( "pages.legacy.header.skills.title" )}</a>
						</li>
					) : !route.endsWith( "/skills" ) && (
						<li>
							<Link href="/legacy/skills">{t( "pages.legacy.header.skills.title" )}</Link>
						</li>
					)
				}

				{
					// Page de contact.
					home ? (
						<li>
							<a href="#contact">{t( "pages.legacy.index.contact.title" )}</a>
						</li>
					) : !route.endsWith( "/contact" ) && (
						<li>
							<Link href="/legacy/contact">{t( "pages.legacy.index.contact.title" )}</Link>
						</li>
					)
				}
			</ul>
		</nav>
	);
}