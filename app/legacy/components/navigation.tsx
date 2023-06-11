//
// Composant de la barre de navigation de l'ancienne version du site.
//
import { useTranslation } from "../../utilities/ServerTranslations";

export default async function Navigation()
{
	// Déclaration des constantes.
	const { t } = await useTranslation();

	// Affichage du rendu HTML du composant.
	return (
		<nav>
			<ul>
				<li><a href="#aboutme">{t( "pages.legacy.index.about_me.title" )}</a></li>
				<li><a href="#projects">{t( "pages.legacy.header.projects.title" )}</a></li>
				<li><a href="#skills">{t( "pages.legacy.header.skills.title" )}</a></li>
				<li><a href="#contact">{t( "pages.legacy.index.contact.title" )}</a></li>
			</ul>
		</nav>
	);
}