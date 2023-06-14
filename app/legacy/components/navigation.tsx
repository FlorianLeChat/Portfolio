//
// Composant de la barre de navigation de l'ancienne version du site.
//
import Link from "next/link";
import { useTranslation } from "@/utilities/ServerTranslations";

export default async function Navigation()
{
	// Déclaration des constantes.
	const { t } = await useTranslation();

	// Affichage du rendu HTML du composant.
	return (
		<nav>
			<ul>
				<li>
					<Link href="/legacy">{t( "pages.legacy.index.about_me.title" )}</Link>
				</li>

				<li>
					<Link href="/legacy/projects">{t( "pages.legacy.header.projects.title" )}</Link>
				</li>

				<li>
					<Link href="/legacy/skills">{t( "pages.legacy.header.skills.title" )}</Link>
				</li>

				<li>
					<Link href="/legacy/contact">{t( "pages.legacy.index.contact.title" )}</Link>
				</li>
			</ul>
		</nav>
	);
}