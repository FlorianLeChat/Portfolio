//
// Route vers la page principale de l'ancienne version du site.
//

// Importation de la feuille de style.
import "./page.scss";

// Importation des dépendances.
import Image from "next/image";
import { Trans } from "react-i18next/TransWithoutContext";

// Importation des fonctions utilitaires.
import { getBasePath } from "../utilities/NextRouter";
import { useTranslation } from "../utilities/ServerTranslations";

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
			{/* À propos de moi */}
			<section id="aboutme">
				<h3>#aboutme</h3>

				<h2>{t( "pages.legacy.index.about_me.title" )}</h2>

				<p>{t( "pages.legacy.index.about_me.description", { age: date.getFullYear() - 1970 } )}</p>
			</section>

			{/* Projets */}
			<section id="projects">
				{/* Vagues du début */}
				<img src={`${ basePath }/assets/images/decorations/projects_waves_top_blue.svg`} alt="" />

				{/* Listes des projets */}
				<h3>#projects</h3>

				<h2>
					&#8250; <a href="?target=projects">{t( "pages.legacy.header.projects.title" )}</a> &#8249;
				</h2>

				<div className="container">
					<div className="row">
						<article data-bg={`${ basePath }/assets/images/projects/bg_discordbot.webp`}>
							<h3><a href="?target=projects#discordbot">Florian&#39;s Bot</a></h3>
						</article>

						<article data-bg={`${ basePath }/assets/images/projects/bg_raven.webp`}>
							<h3><a href="?target=projects#raven">Framework Raven</a></h3>
						</article>

						<article data-bg={`${ basePath }/assets/images/projects/bg_facepunch.webp`}>
							<h3><a href="?target=projects#facepunch">Facepunch Commits Monitor</a></h3>
						</article>
					</div>
					<div className="row">
						<article data-bg={`${ basePath }/assets/images/projects/bg_steam.webp`}>
							<h3><a href="?target=projects#steam">Steam Collection Download Size Calculator</a></h3>
						</article>

						<article data-bg={`${ basePath }/assets/images/projects/bg_pythonrpg.webp`}>
							<h3><a href="?target=projects#pythonrpg">Python RPG</a></h3>
						</article>

						<article data-bg={`${ basePath }/assets/images/projects/bg_phpstorage.webp`}>
							<h3><a href="?target=projects#phpstorage">Simple File Storage</a></h3>
						</article>
					</div>
					<div className="row">
						<article data-bg={`${ basePath }/assets/images/projects/bg_sourceconsole.webp`}>
							<h3><a href="?target=projects#sourceconsole">Source Web Console</a></h3>
						</article>

						<article data-bg={`${ basePath }/assets/images/projects/bg_domego.webp`}>
							<h3><a href="?target=projects#domego">Domego</a></h3>
						</article>
					</div>
				</div>

				{/* Vagues de fin */}
				<img src={`${ basePath }/assets/images/decorations/projects_waves_bottom_blue.svg`} alt="" />
			</section>

			{/* Compétences */}
			<section id="skills">
				<h3>#skills</h3>

				<h2>
					&#8250; <a href="?target=skills">{t( "pages.legacy.header.skills.title" )}</a> &#8249;
				</h2>

				<div>
					<article>
						<Image
							src={`${ basePath }/assets/images/skills/school.svg`}
							alt={t( "pages.legacy.index.skills.school.image" )} width="64" height="64"
						/>

						<h2>{t( "pages.legacy.index.skills.school.title" )}</h2>

						<p>
							<Trans
								i18nKey="pages.legacy.index.skills.school.description"
								components={{
									a: <strong><a href="?target=skills&name=school">...</a></strong>
								}}
							/>
						</p>
					</article>

					<article>
						<Image
							src={`${ basePath }/assets/images/skills/work.svg`}
							alt={t( "pages.legacy.index.skills.work.image" )} width="64" height="64"
						/>

						<h2>{t( "pages.legacy.index.skills.work.title" )}</h2>

						<p>
							<Trans
								i18nKey="pages.legacy.index.skills.work.description"
								components={{
									a: <strong><a href="?target=skills&name=work">...</a></strong>
								}}
							/>
						</p>
					</article>
				</div>
			</section>

			{/* Contact */}
			<section id="contact">
				<h3>#contact</h3>

				<h2>
					&#8250; <a href="?target=contact">{t( "pages.legacy.index.contact.title" )}</a> &#8249;
				</h2>

				<h2>{t( "pages.legacy.index.contact.message" )}</h2>

				<a href="?target=contact">{t( "pages.legacy.index.contact.button" )}</a>
			</section>
		</>
	);
}