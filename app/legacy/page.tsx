//
// Route vers la page principale de l'ancienne version du site.
//

// Importation de la feuille de style.
import "./page.scss";

// Importation des dépendances.
import Link from "next/link";
import Image from "next/image";
import { Trans } from "react-i18next/TransWithoutContext";

// Importation des images statiques.
import UpperWaves from "@/images/decorations/projects_waves_top_blue.svg";
import LowerWaves from "@/images/decorations/projects_waves_bottom_blue.svg";

// Importation des fonctions utilitaires.
import { getBasePath } from "@/utilities/NextRouter";
import { useTranslation } from "@/utilities/ServerTranslations";

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
				<Image src={UpperWaves} alt="" priority />

				{/* Listes des projets */}
				<h3>#projects</h3>

				<h2>
					&#8250; <Link href="/legacy/projects">{t( "pages.legacy.header.projects.title" )}</Link> &#8249;
				</h2>

				<div className="container">
					<div className="row">
						<article data-bg={`${ basePath }/assets/images/projects/bg_discordbot.webp`}>
							<h3>
								<Link href="/legacy/projects#discordbot">Florian&#39;s Bot</Link>
							</h3>
						</article>

						<article data-bg={`${ basePath }/assets/images/projects/bg_raven.webp`}>
							<h3>
								<Link href="/legacy/projects#raven">Raven Framework</Link>
							</h3>
						</article>

						<article data-bg={`${ basePath }/assets/images/projects/bg_facepunch.webp`}>
							<h3>
								<Link href="/legacy/projects#facepunch">Facepunch Commits Monitor</Link>
							</h3>
						</article>
					</div>

					<div className="row">
						<article data-bg={`${ basePath }/assets/images/projects/bg_steam.webp`}>
							<h3>
								<Link href="/legacy/projects#steam">Steam Collection Download Size Calculator</Link>
							</h3>
						</article>

						<article data-bg={`${ basePath }/assets/images/projects/bg_pythonrpg.webp`}>
							<h3>
								<Link href="/legacy/projects#pythonrpg">Python RPG</Link>
							</h3>
						</article>

						<article data-bg={`${ basePath }/assets/images/projects/bg_phpstorage.webp`}>
							<h3>
								<Link href="/legacy/projects#phpstorage">Simple File Storage</Link>
							</h3>
						</article>
					</div>

					<div className="row">
						<article data-bg={`${ basePath }/assets/images/projects/bg_sourceconsole.webp`}>
							<h3>
								<Link href="/legacy/projects#sourceconsole">Source Web Console</Link>
							</h3>
						</article>

						<article data-bg={`${ basePath }/assets/images/projects/bg_domego.webp`}>
							<h3>
								<Link href="/legacy/projects#domego">Domego</Link>
							</h3>
						</article>
					</div>
				</div>

				{/* Vagues de fin */}
				<Image src={LowerWaves} alt="" priority />
			</section>

			{/* Compétences */}
			<section id="skills">
				<h3>#skills</h3>

				<h2>
					&#8250; <Link href="/legacy/skills">{t( "pages.legacy.header.skills.title" )}</Link> &#8249;
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
									a: <strong><Link href="/legacy/skills#school">...</Link></strong>
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
									a: <strong><Link href="/legacy/skills#work">...</Link></strong>
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
					&#8250; <Link href="/legacy/contact">{t( "pages.legacy.index.contact.title" )}</Link> &#8249;
				</h2>

				<h2>{t( "pages.legacy.index.contact.message" )}</h2>

				<Link href="/legacy/contact">{t( "pages.legacy.index.contact.button" )}</Link>
			</section>
		</>
	);
}