//
// Route vers la page principale de l'ancienne version du site.
//

// Importation de la feuille de style.
import "./page.scss";

// Importation des dépendances.
import Link from "next/link";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { unstable_setRequestLocale } from "next-intl/server";

// Importation des images statiques.
import Work from "@/images/skills/work.svg";
import School from "@/images/skills/school.svg";
import TopWaves from "@/images/decorations/projects_waves_top_blue.svg";
import BottomWaves from "@/images/decorations/projects_waves_bottom_blue.svg";

// Affichage de la page.
export default function Page( {
	params: { locale }
}: {
	params: { locale: string };
} )
{
	// Déclaration des constantes.
	const assets = `${ process.env.__NEXT_ROUTER_BASEPATH }/assets/images/projects`;
	const date = new Date();

	date.setTime( date.getTime() - Date.parse( "08 Aug 1999 00:00:00 GMT" ) );

	// Déclaration des variables d'état.
	const t = useTranslations( "legacy" );

	// Définition de la langue de la page.
	unstable_setRequestLocale( locale );

	// Affichage du rendu HTML de la page.
	return (
		<>
			{/* À propos de moi */}
			<section id="aboutme">
				<h3>#aboutme</h3>

				<h2>{t( "index.about_me.title" )}</h2>

				<p>
					{t.rich( "index.about_me.description", {
						age: date.getFullYear() - 1970,
						i: ( chunks ) => <i>{chunks}</i>,
						br: () => <br />
					} )}
				</p>
			</section>

			{/* Projets */}
			<section id="projects">
				{/* Vagues du début */}
				<Image src={TopWaves} alt="" priority />

				{/* Listes des projets */}
				<h3>#projects</h3>

				<h2>
					&#8250;{" "}
					<Link href="/legacy/projects">
						{t( "header.projects.title" )}
					</Link>{" "}
					&#8249;
				</h2>

				<div className="container">
					<div className="row">
						<article
							style={{
								backgroundImage: `url(${ assets }/bg_discordbot.webp)`
							}}
						>
							<h3>
								<Link href="/legacy/projects#discordbot">
									Florian&#39;s Bot
								</Link>
							</h3>
						</article>

						<article
							style={{
								backgroundImage: `url(${ assets }/bg_raven.webp)`
							}}
						>
							<h3>
								<Link href="/legacy/projects#raven">
									Raven Framework
								</Link>
							</h3>
						</article>

						<article
							style={{
								backgroundImage: `url(${ assets }/bg_facepunch.webp)`
							}}
						>
							<h3>
								<Link href="/legacy/projects#facepunch">
									Facepunch Commits Monitor
								</Link>
							</h3>
						</article>
					</div>

					<div className="row">
						<article
							style={{
								backgroundImage: `url(${ assets }/bg_steam.webp)`
							}}
						>
							<h3>
								<Link href="/legacy/projects#steam">
									Steam Collection Download Size Calculator
								</Link>
							</h3>
						</article>

						<article
							style={{
								backgroundImage: `url(${ assets }/bg_pythonrpg.webp)`
							}}
						>
							<h3>
								<Link href="/legacy/projects#pythonrpg">
									Python RPG
								</Link>
							</h3>
						</article>

						<article
							style={{
								backgroundImage: `url(${ assets }/bg_phpstorage.webp)`
							}}
						>
							<h3>
								<Link href="/legacy/projects#phpstorage">
									Simple File Storage
								</Link>
							</h3>
						</article>
					</div>

					<div className="row">
						<article
							style={{
								backgroundImage: `url(${ assets }/bg_sourceconsole.webp)`
							}}
						>
							<h3>
								<Link href="/legacy/projects#sourceconsole">
									Source Web Console
								</Link>
							</h3>
						</article>

						<article
							style={{
								backgroundImage: `url(${ assets }/bg_domego.webp)`
							}}
						>
							<h3>
								<Link href="/legacy/projects#domego">
									Domego
								</Link>
							</h3>
						</article>
					</div>
				</div>

				{/* Vagues de fin */}
				<Image src={BottomWaves} alt="" priority />
			</section>

			{/* Compétences */}
			<section id="skills">
				<h3>#skills</h3>

				<h2>
					&#8250;{" "}
					<Link href="/legacy/skills">
						{t( "header.skills.title" )}
					</Link>{" "}
					&#8249;
				</h2>

				<div>
					<article>
						<Image
							src={School}
							alt={t( "index.skills.school.image" )}
							width="64"
							height="64"
						/>

						<h2>{t( "index.skills.school.title" )}</h2>

						<p>
							{t.rich( "index.skills.school.description", {
								b: ( chunks ) => <strong>{chunks}</strong>,
								a: ( chunks ) => (
									<Link href="/legacy/skills#school">
										{chunks}
									</Link>
								)
							} )}
						</p>
					</article>

					<article>
						<Image
							src={Work}
							alt={t( "index.skills.work.image" )}
							width="64"
							height="64"
						/>

						<h2>{t( "index.skills.work.title" )}</h2>

						<p>
							{t.rich( "index.skills.work.description", {
								b: ( chunks ) => <strong>{chunks}</strong>,
								a: ( chunks ) => (
									<Link href="/legacy/skills#work">
										{chunks}
									</Link>
								)
							} )}
						</p>
					</article>
				</div>
			</section>

			{/* Contact */}
			<section id="contact">
				<h3>#contact</h3>

				<h2>
					&#8250;{" "}
					<Link href="/legacy/contact">
						{t( "index.contact.title" )}
					</Link>{" "}
					&#8249;
				</h2>

				<h2>
					{t.rich( "index.contact.message", {
						br: () => <br />
					} )}
				</h2>

				<Link href="/legacy/contact">{t( "index.contact.button" )}</Link>
			</section>
		</>
	);
}