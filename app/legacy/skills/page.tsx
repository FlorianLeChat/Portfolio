//
// Route vers la page des compétences de l'ancienne version du site.
//

// Importation de la feuille de style.
import "./page.scss";

// Importation des dépendances.
import Image from "next/image";
import { Trans } from "react-i18next/TransWithoutContext";

// Importation des images statiques.
import Certificate from "@/images/skills/certificate.svg";

// Importation des fonctions utilitaires.
import { getBasePath } from "@/utilities/NextRouter";
import { useTranslation } from "@/utilities/ServerTranslations";

// Affichage de la page.
export default async function Page()
{
	// Déclaration des constantes.
	const basePath = getBasePath();
	const assets = `${ basePath }/assets/images/skills`;
	const { t } = await useTranslation();

	// Affichage du rendu HTML de la page.
	return (
		<>
			{/* Parcours scolaire */}
			<section id="school">
				<h3>#school</h3>

				<h2>{t( "pages.legacy.index.skills.school.title" )}</h2>

				{/* Formations (liste) */}
				<article id="list">
					<h3>{t( "pages.legacy.skills.degrees.list_title" )}</h3>

					<ul>
						<li style={{ backgroundImage: `url(${ assets }/carlone.webp)` }}>
							{/* Intitulé de la formation */}
							<h4>{t( "pages.legacy.skills.degrees.carlone.title" )}</h4>

							{/* Lieu de formation */}
							<p>
								<em>
									<Trans
										i18nKey="pages.legacy.skills.degrees.carlone.location"
										components={{
											br: <br />
										}}
									/>
								</em>
							</p>

							{/* Période de formation */}
							<p><strong>2021 - 2022</strong></p>

							{/* Diplôme obtenu */}
							<Image src={Certificate} width="48" height="48" alt="Diplôme obtenu" />
						</li>

						<li style={{ backgroundImage: `url(${ assets }/valrose.webp)` }}>
							{/* Intitulé de la formation */}
							<h4>{t( "pages.legacy.skills.degrees.valrose.title" )}</h4>

							<h5>{t( "pages.legacy.skills.degrees.valrose.option" )}</h5>

							{/* Lieu de formation */}
							<p>
								<em>
									<Trans
										i18nKey="pages.legacy.skills.degrees.valrose.location"
										components={{
											br: <br />
										}}
									/>
								</em>
							</p>

							{/* Diplôme obtenu */}
							<p><strong>2020 - 2021</strong></p>
						</li>

						<li style={{ backgroundImage: `url(${ assets }/jules.webp)` }}>
							{/* Intitulé de la formation */}
							<h4>{t( "pages.legacy.skills.degrees.jules.title" )}</h4>

							<h5>{t( "pages.legacy.skills.degrees.jules.option" )}</h5>

							{/* Lieu de formation */}
							<p>
								<em>
									<Trans
										i18nKey="pages.legacy.skills.degrees.jules.location"
										components={{
											br: <br />
										}}
									/>
								</em>
							</p>

							{/* Période de formation */}
							<p><strong>2018 - 2020</strong></p>

							{/* Diplôme obtenu */}
							<Image src={Certificate} width="48" height="48" alt="Diplôme obtenu" />
						</li>

						<li style={{ backgroundImage: `url(${ assets }/hutinel.webp)` }}>
							{/* Intitulé de la formation */}
							<h4>{t( "pages.legacy.skills.degrees.hutinel.title" )}</h4>

							<h5>{t( "pages.legacy.skills.degrees.hutinel.option" )}</h5>

							{/* Lieu de formation */}
							<p>
								<em>
									<Trans
										i18nKey="pages.legacy.skills.degrees.hutinel.location"
										components={{
											br: <br />
										}}
									/>
								</em>
							</p>

							{/* Période de formation */}
							<p><strong>2015 - 2018</strong></p>

							{/* Diplôme obtenu */}
							<Image src={Certificate} width="48" height="48" alt="Diplôme obtenu" />
						</li>
					</ul>
				</article>

				{/* Formations (résumé descriptif) */}
				<article id="summary">
					<h3>{t( "pages.legacy.skills.degrees.resume_title" )}</h3>

					<ul>
						<li>
							<p>
								<Trans
									i18nKey="pages.legacy.skills.degrees.carlone.description"
									components={{
										i: <i />,
										b: <strong />
									}}
								/>
							</p>
						</li>

						<li>
							<p>
								<Trans
									i18nKey="pages.legacy.skills.degrees.valrose.description"
									components={{
										i: <i />,
										b: <strong />
									}}
								/>
							</p>
						</li>

						<li>
							<p>
								<Trans
									i18nKey="pages.legacy.skills.degrees.jules.description"
									components={{
										i: <i />,
										b: <strong />
									}}
								/>
							</p>
						</li>

						<li><p>{t( "pages.legacy.skills.degrees.hutinel.description" )}</p></li>
					</ul>
				</article>
			</section>

			<hr />

			{/* Compétences professionnelles */}
			<section id="work">
				<h3>#work</h3>

				<h2>{t( "pages.legacy.index.skills.work.title" )}</h2>

				<article id="experiences">
					<h3>{t( "pages.legacy.skills.jobs.title" )}</h3>

					<ul>
						<li>
							{/* Date et descriptif de l'événement */}
							<strong>EAS Ingénierie | 2017 - 2019</strong>

							<p>{t( "pages.legacy.skills.jobs.eas" )}</p>

							<em>Cannes-La-Bocca, France</em>
						</li>

						<li>
							{/* Date et descriptif de l'événement */}
							<strong>DOMO Lumidis | 2016</strong>

							<p>{t( "pages.legacy.skills.jobs.domo" )}</p>

							<em>Mandelieu-La-Napoule, France</em>
						</li>

						<li>
							{/* Date et descriptif de l'événement */}
							<strong>DIM Technologies | 2015</strong>

							<p>{t( "pages.legacy.skills.jobs.dim" )}</p>

							<em>Cannes, France</em>
						</li>
					</ul>
				</article>

				<article id="competences">
					<h3>{t( "pages.legacy.skills.title" )}</h3>

					{/* Descriptif des compétences */}
					<p>{t( "pages.legacy.skills.description" )}</p>

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