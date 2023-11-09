//
// Route vers la page des compétences de l'ancienne version du site.
//

// Importation de la feuille de style.
import "./page.scss";

// Importation des dépendances.
import Image from "next/image";
import { useTranslations } from "next-intl";
import { unstable_setRequestLocale } from "next-intl/server";

// Importation des images statiques.
import Certificate from "@/images/skills/certificate.svg";

// Affichage de la page.
export default function Page( {
	params: { locale }
}: {
	params: { locale: string };
} )
{
	// Définition de la langue de la page.
	unstable_setRequestLocale( locale );

	// Déclaration des constantes.
	const assets = `${ process.env.__NEXT_ROUTER_BASEPATH }/assets/images/skills`;

	// Déclaration des variables d'état.
	const t = useTranslations( "legacy" );

	// Affichage du rendu HTML de la page.
	return (
		<>
			{/* Parcours scolaire */}
			<section id="school">
				<h4>#school</h4>

				<h3>{t( "index.skills.school.title" )}</h3>

				{/* Formations (liste) */}
				<article id="list">
					<h4>{t( "skills.degrees.list_title" )}</h4>

					<ul>
						<li
							style={{
								backgroundImage: `url(${ assets }/carlone.webp)`
							}}
						>
							{/* Intitulé de la formation */}
							<h5>{t( "skills.degrees.carlone.title" )}</h5>

							{/* Lieu de formation */}
							<p>
								<em>
									{t.rich( "skills.degrees.carlone.location", {
										br: () => <br />
									} )}
								</em>
							</p>

							{/* Période de formation */}
							<p>
								<strong>2021 - 2022</strong>
							</p>

							{/* Diplôme obtenu */}
							<Image
								src={Certificate}
								width="48"
								height="48"
								alt="Diplôme obtenu"
							/>
						</li>

						<li
							style={{
								backgroundImage: `url(${ assets }/valrose.webp)`
							}}
						>
							{/* Intitulé de la formation */}
							<h5>{t( "skills.degrees.valrose.title" )}</h5>

							<h6>{t( "skills.degrees.valrose.option" )}</h6>

							{/* Lieu de formation */}
							<p>
								<em>
									{t.rich( "skills.degrees.valrose.location", {
										br: () => <br />
									} )}
								</em>
							</p>

							{/* Diplôme obtenu */}
							<p>
								<strong>2020 - 2021</strong>
							</p>
						</li>

						<li
							style={{
								backgroundImage: `url(${ assets }/jules.webp)`
							}}
						>
							{/* Intitulé de la formation */}
							<h5>{t( "skills.degrees.jules.title" )}</h5>

							<h6>{t( "skills.degrees.jules.option" )}</h6>

							{/* Lieu de formation */}
							<p>
								<em>
									{t.rich( "skills.degrees.jules.location", {
										br: () => <br />
									} )}
								</em>
							</p>

							{/* Période de formation */}
							<p>
								<strong>2018 - 2020</strong>
							</p>

							{/* Diplôme obtenu */}
							<Image
								src={Certificate}
								width="48"
								height="48"
								alt="Diplôme obtenu"
							/>
						</li>

						<li
							style={{
								backgroundImage: `url(${ assets }/hutinel.webp)`
							}}
						>
							{/* Intitulé de la formation */}
							<h5>{t( "skills.degrees.hutinel.title" )}</h5>

							<h6>{t( "skills.degrees.hutinel.option" )}</h6>

							{/* Lieu de formation */}
							<p>
								<em>
									{t.rich( "skills.degrees.hutinel.location", {
										br: () => <br />
									} )}
								</em>
							</p>

							{/* Période de formation */}
							<p>
								<strong>2015 - 2018</strong>
							</p>

							{/* Diplôme obtenu */}
							<Image
								src={Certificate}
								width="48"
								height="48"
								alt="Diplôme obtenu"
							/>
						</li>
					</ul>
				</article>

				{/* Formations (résumé descriptif) */}
				<article id="summary">
					<h4>{t( "skills.degrees.resume_title" )}</h4>

					<ul>
						<li>
							<p>
								{t.rich( "skills.degrees.carlone.description", {
									i: ( chunks ) => <i>{chunks}</i>,
									b: ( chunks ) => <strong>{chunks}</strong>
								} )}
							</p>
						</li>

						<li>
							<p>
								{t.rich( "skills.degrees.valrose.description", {
									i: ( chunks ) => <i>{chunks}</i>,
									b: ( chunks ) => <strong>{chunks}</strong>
								} )}
							</p>
						</li>

						<li>
							<p>
								{t.rich( "skills.degrees.jules.description", {
									i: ( chunks ) => <i>{chunks}</i>,
									b: ( chunks ) => <strong>{chunks}</strong>
								} )}
							</p>
						</li>

						<li>
							<p>{t( "skills.degrees.hutinel.description" )}</p>
						</li>
					</ul>
				</article>
			</section>

			<hr />

			{/* Compétences professionnelles */}
			<section id="work">
				<h4>#work</h4>

				<h3>{t( "index.skills.work.title" )}</h3>

				<article id="experiences">
					<h4>{t( "skills.jobs.title" )}</h4>

					<ul>
						<li>
							{/* Date et descriptif de l'événement */}
							<strong>EAS Ingénierie | 2017 - 2019</strong>

							<p>{t( "skills.jobs.eas" )}</p>

							<em>Cannes-La-Bocca, France</em>
						</li>

						<li>
							{/* Date et descriptif de l'événement */}
							<strong>DOMO Lumidis | 2016</strong>

							<p>{t( "skills.jobs.domo" )}</p>

							<em>Mandelieu-La-Napoule, France</em>
						</li>

						<li>
							{/* Date et descriptif de l'événement */}
							<strong>DIM Technologies | 2015</strong>

							<p>{t( "skills.jobs.dim" )}</p>

							<em>Cannes, France</em>
						</li>
					</ul>
				</article>

				<article id="competences">
					<h4>{t( "skills.title" )}</h4>

					{/* Descriptif des compétences */}
					<p>{t( "skills.description" )}</p>

					<hr />

					{/* Représentations graphiques des compétences */}
					<div>
						<span>HTML</span>
						<div className="circle" data-level="50" />
					</div>

					<div>
						<span>CSS</span>
						<div className="circle" data-level="25" />
					</div>

					<div>
						<span>JavaScript</span>
						<div className="circle" data-level="50" />
					</div>

					<div>
						<span>PHP</span>
						<div className="circle" data-level="75" />
					</div>

					<div>
						<span>C++/C#</span>
						<div className="circle" data-level="25" />
					</div>

					<div>
						<span>Py/Lua</span>
						<div className="circle" data-level="75" />
					</div>

					<div>
						<span>Office</span>
						<div className="circle" data-level="100" />
					</div>

					<div>
						<span>Design</span>
						<div className="circle" data-level="25" />
					</div>

					<div>
						<span>Trello</span>
						<div className="circle" data-level="50" />
					</div>
				</article>
			</section>
		</>
	);
}