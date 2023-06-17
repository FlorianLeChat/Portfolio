//
// Route vers la page des projets de l'ancienne version du site.
//

// Importation de la feuille de style.
import "./page.scss";

// Importation des dépendances.
import Image from "next/image";
import { Trans } from "react-i18next/TransWithoutContext";

// Importation des images statiques.
import ArrowLeft from "@/images/decorations/arrow_left.svg";
import ArrowRight from "@/images/decorations/arrow_right.svg";

// Importation des fonctions utilitaires.
import { getBasePath } from "@/utilities/NextRouter";

// Affichage de la page.
export default async function Page()
{
	// Déclaration des constantes.
	const basePath = getBasePath();
	const assets = `${ basePath }/assets/images`;

	// Affichage du rendu HTML de la page.
	return (
		<>
			{/* Projet : Florian's Discord */}
			<article id="discordbot">
				<div className="properties">
					{/* Icône */}
					<Image
						src={`${ assets }/projects/logo_discordbot.svg`}
						alt="Logo Florian's Bot" width="64" height="64"
					/>

					{/* Nom */}
					<h2>Florian&#39;s Bot</h2>

					{/* Date */}
					<h3><em>2016</em></h3>

					{/* Description */}
					<p>
						<Trans
							i18nKey="pages.legacy.projects.discordbot"
							components={{
								i: <i />,
								b: <strong />,
								a: <a href="https://discord.com/" target="_blank" rel="noopener noreferrer">...</a>
							}}
						/>
					</p>
				</div>

				<hr />

				{/* Galerie photos */}
				<div className="images">
					<Image src={ArrowLeft} alt="" />

					<div>
						<a
							rel="noopener noreferrer" target="_blank"
							href={`${ assets }/projects/discordbot_gallery_1.jpg`}
						>
							<Image
								src={`${ assets }/projects/discordbot_gallery_1.jpg`}
								alt="Image 1" width="502" height="855"
							/>
						</a>

						<figcaption>Suivi des actualités</figcaption>
					</div>

					<div>
						<a
							rel="noopener noreferrer" target="_blank"
							href={`${ assets }/projects/discordbot_gallery_2.jpg`}
						>
							<Image
								src={`${ assets }/projects/discordbot_gallery_2.jpg`}
								alt="Image 2" width="314" height="160"
							/>
						</a>

						<figcaption>Réponses automatiques</figcaption>
					</div>

					<div>
						<a
							rel="noopener noreferrer" target="_blank"
							href={`${ assets }/projects/discordbot_gallery_3.jpg`}
						>
							<Image
								src={`${ assets }/projects/discordbot_gallery_3.jpg`}
								alt="Image 3" width="365" height="581"
							/>
						</a>

						<figcaption>Journalisation interne</figcaption>
					</div>

					<div>
						<a
							rel="noopener noreferrer" target="_blank"
							href={`${ assets }/projects/discordbot_gallery_4.jpg`}
						>
							<Image
								src={`${ assets }/projects/discordbot_gallery_4.jpg`}
								alt="Image 4" width="64" height="64"
							/>
						</a>

						<figcaption>Commandes personnalisées</figcaption>
					</div>

					<div>
						<a
							rel="noopener noreferrer" target="_blank"
							href={`${ assets }/projects/discordbot_gallery_5.jpg`}
						>
							<Image
								src={`${ assets }/projects/discordbot_gallery_5.jpg`}
								alt="Image 5" width="64" height="64"
							/>
						</a>

						<figcaption>Messages de statut aléatoires</figcaption>
					</div>

					<Image src={ArrowRight} alt="" />
				</div>

				<hr />

				{/* Icônes des langages utilisés */}
				<div className="languages">
					<Image
						src={`${ assets }/languages/mysql.svg`}
						width="60" height="40" title="MySQL" alt="Logo MySQL"
					/>

					<Image
						src={`${ assets }/languages/javascript.svg`}
						width="40" height="40" title="JavaScript" alt="Logo JavaScript"
					/>

					<Image
						src={`${ assets }/languages/nodejs.svg`}
						width="40" height="40" title="NodeJS" alt="Logo NodeJS"
					/>
				</div>
			</article>

			{/* Projet : Raven Framework */}
			<article id="raven">
				<div className="properties">
					{/* Icône */}
					<Image
						src={`${ assets }/projects/logo_raven.svg`}
						width="64" height="64" alt="Logo Framework Raven"
					/>

					{/* Nom */}
					<h2>Raven Framework</h2>

					{/* Date */}
					<h3><em>2017</em></h3>

					{/* Description */}
					<p>
						<Trans
							i18nKey="pages.legacy.projects.raven"
							components={{
								i: <i />,
								b: <strong />,
								a1: <a
									target="_blank" rel="noopener noreferrer"
									href="https://store.steampowered.com/app/4000/Garrys_Mod/"
								>...</a>,
								a2: <a
									target="_blank" rel="noopener noreferrer"
									href="https://steamcommunity.com/app/4000/workshop/"
								>...</a>
							}}
						/>
					</p>
				</div>

				<hr />

				{/* Galerie photos */}
				<div className="images">
					<Image src={ArrowLeft} alt="" />

					<div>
						<a
							rel="noopener noreferrer" target="_blank"
							href={`${ assets }/projects/raven_gallery_1.jpg`}
						>
							<Image
								src={`${ assets }/projects/raven_gallery_1.jpg`}
								alt="Image 1" width="64" height="64"
							/>
						</a>

						<figcaption>Communications écrites entre joueurs</figcaption>
					</div>

					<div>
						<a
							rel="noopener noreferrer" target="_blank"
							href={`${ assets }/projects/raven_gallery_2.jpg`}
						>
							<Image
								src={`${ assets }/projects/raven_gallery_2.jpg`}
								alt="Image 2" width="64" height="64"
							/>
						</a>

						<figcaption>Liste des joueurs connectés</figcaption>
					</div>

					<div>
						<a
							rel="noopener noreferrer" target="_blank"
							href={`${ assets }/projects/raven_gallery_3.jpg`}
						>
							<Image
								src={`${ assets }/projects/raven_gallery_3.jpg`}
								alt="Image 3" width="64" height="64"
							/>
						</a>

						<figcaption>Éléments interactifs avec l&#39;environnement</figcaption>
					</div>

					<div>
						<a
							rel="noopener noreferrer" target="_blank"
							href={`${ assets }/projects/raven_gallery_4.jpg`}
						>
							<Image
								src={`${ assets }/projects/raven_gallery_4.jpg`}
								alt="Image 4" width="64" height="64"
							/>
						</a>

						<figcaption>Choix d&#39;un rôle</figcaption>
					</div>

					<div>
						<a
							rel="noopener noreferrer" target="_blank"
							href={`${ assets }/projects/raven_gallery_5.jpg`}
						>
							<Image
								src={`${ assets }/projects/raven_gallery_5.jpg`}
								alt="Image 5" width="64" height="64"
							/>
						</a>

						<figcaption>Système d&#39;armements</figcaption>
					</div>

					<div>
						<a
							rel="noopener noreferrer" target="_blank"
							href={`${ assets }/projects/raven_gallery_6.jpg`}
						>
							<Image
								src={`${ assets }/projects/raven_gallery_6.jpg`}
								alt="Image 6" width="64" height="64"
							/>
						</a>

						<figcaption>Entités et PNJs dynamiques</figcaption>
					</div>

					<Image src={ArrowRight} alt="" />
				</div>

				<hr />

				{/* Icônes des langages utilisés */}
				<div className="languages">
					<Image
						src={`${ assets }/languages/mysql.svg`}
						width="60" height="40" title="MySQL" alt="Logo MySQL"
					/>

					<Image
						src={`${ assets }/languages/cplusplus.svg`}
						width="40" height="40" title="C++" alt="Logo C++"
					/>

					<Image
						src={`${ assets }/languages/lua.svg`}
						width="40" height="40" title="Lua" alt="Logo Lua"
					/>
				</div>
			</article>

			{/* Projet : Facepunch Commits Monitor */}
			<article id="facepunch">
				<div className="properties">
					{/* Icône */}
					<Image
						src={`${ assets }/projects/logo_facepunch.svg`}
						width="64" height="64" alt="Logo Facepunch Commits Monitor"
					/>

					{/* Nom */}
					<h2>
						<a
							rel="noopener noreferrer" target="_blank"
							href="https://github.com/FlorianLeChat/Facepunch-Commits-Monitor"
						>
							Facepunch Commits Monitor
						</a>
					</h2>

					{/* Date */}
					<h3><em>2021</em></h3>

					{/* Description */}
					<p>
						<Trans
							i18nKey="pages.legacy.projects.facepunch"
							components={{
								i: <i />,
								b: <strong />,
								a1: <a
									target="_blank" rel="noopener noreferrer"
									href="https://facepunch.com/"
								>...</a>,
								a2: <a
									target="_blank" rel="noopener noreferrer"
									href="https://commits.facepunch.com/"
								>...</a>
							}}
						/>
					</p>
				</div>

				<hr />

				{/* Galerie photos */}
				<div className="images">
					<Image src={ArrowLeft} alt="" />

					<div>
						<a
							rel="noopener noreferrer" target="_blank"
							href={`${ assets }/projects/facepunch_gallery_1.jpg`}
						>
							<Image
								src={`${ assets }/projects/facepunch_gallery_1.jpg`}
								alt="Image 1" width="64" height="64"
							/>
						</a>

						<figcaption>Choix du répertoire et définition de l&#39;interval de vérification</figcaption>
					</div>

					<div>
						<a
							rel="noopener noreferrer" target="_blank"
							href={`${ assets }/projects/facepunch_gallery_2.jpg`}
						>
							<Image
								src={`${ assets }/projects/facepunch_gallery_2.jpg`}
								alt="Image 2" width="64" height="64"
							/>
						</a>

						<figcaption>Affichage des actualités dans la barre de navigation Windows</figcaption>
					</div>

					<Image src={ArrowRight} alt="" />
				</div>

				<hr />

				{/* Icônes des langages utilisés */}
				<div className="languages">
					<Image
						src={`${ assets }/languages/csharp.svg`}
						width="40" height="40" title="C#" alt="Logo C#"
					/>

					<Image
						src={`${ assets }/languages/dotnet.svg`}
						width="40" height="40" title=".NET" alt="Logo .NET"
					/>
				</div>
			</article>

			{/* Projet : Steam Collection Download Size Calculator */}
			<article id="steam">
				<div className="properties">
					{/* Icône */}
					<Image
						src={`${ assets }/projects/logo_steam.svg`}
						width="64" height="64" alt="Logo Steam Collection Download Size Calculator"
					/>

					{/* Nom */}
					<h2>
						<a
							rel="noopener noreferrer" target="_blank"
							href="https://github.com/FlorianLeChat/Steam-Collection-Download-Size-Calculator"
						>
							Steam Collection Download Size Calculator
						</a>
					</h2>

					{/* Date */}
					<h3><em>2021</em></h3>

					{/* Description */}
					<p>
						<Trans
							i18nKey="pages.legacy.projects.steam"
							components={{
								i: <i />,
								b: <strong />,
								a: <a target="_blank" rel="noopener noreferrer" href="https://steamcommunity.com/">...</a>
							}}
						/>
					</p>
				</div>

				<hr />

				{/* Galerie photos */}
				<div className="images">
					<Image src={ArrowLeft} alt="" />

					<div>
						<a
							rel="noopener noreferrer" target="_blank"
							href={`${ assets }/projects/steam_gallery_1.jpg`}
						>
							<Image
								src={`${ assets }/projects/steam_gallery_1.jpg`}
								alt="Image 1" width="64" height="64"
							/>
						</a>

						<figcaption>Informations détaillées de l&#39;objet</figcaption>
					</div>

					<Image src={ArrowRight} alt="" />
				</div>

				<hr />

				{/* Icônes des langages utilisés */}
				<div className="languages">
					<Image
						src={`${ assets }/languages/dotnet.svg`}
						width="40" height="40" title=".NET" alt="Logo .NET"
					/>

					<Image
						src={`${ assets }/languages/csharp.svg`}
						width="40" height="40" title="C#" alt="Logo C#"
					/>
				</div>
			</article>

			{/* Projet : Python RPG */}
			<article id="pythonrpg">
				<div className="properties">
					{/* Icône */}
					<Image
						src={`${ assets }/projects/logo_pythonrpg.svg`}
						width="64" height="64" alt="Logo Python RPG"
					/>

					{/* Nom */}
					<h2>
						<a
							rel="noopener noreferrer" target="_blank"
							href="https://github.com/FlorianLeChat/Python-RPG"
						>
							Python RPG
						</a>
					</h2>

					{/* Date */}
					<h3><em>2021</em></h3>

					{/* Description */}
					<p>
						<Trans
							i18nKey="pages.legacy.projects.pythonrpg"
							components={{
								i: <i />,
								b: <strong />
							}}
						/>
					</p>
				</div>

				<hr />

				{/* Galerie photos */}
				<div className="images">
					<Image src={ArrowLeft} alt="" />

					<div>
						<a
							rel="noopener noreferrer" target="_blank"
							href={`${ assets }/projects/pythonrpg_gallery_1.jpg`}
						>
							<Image
								src={`${ assets }/projects/pythonrpg_gallery_1.jpg`}
								alt="Image 1" width="64" height="64"
							/>
						</a>

						<figcaption>Plusieurs modes de lecture</figcaption>
					</div>

					<div>
						<a
							rel="noopener noreferrer" target="_blank"
							href={`${ assets }/projects/pythonrpg_gallery_2.jpg`}
						>
							<Image
								src={`${ assets }/projects/pythonrpg_gallery_2.jpg`}
								alt="Image 2" width="64" height="64"
							/>
						</a>

						<figcaption>Histoires riches et détaillées</figcaption>
					</div>

					<Image src={ArrowRight} alt="" />
				</div>

				<hr />

				{/* Icônes des langages utilisés */}
				<div className="languages">
					<Image
						src={`${ assets }/languages/python.svg`}
						width="40" height="40" title="Python" alt="Logo Python"
					/>
				</div>
			</article>

			{/* Projet : Simple File Storage */}
			<article id="phpstorage">
				<div className="properties">
					{/* Icône */}
					<Image
						src={`${ assets }/projects/logo_phpstorage.svg`}
						width="64" height="64" alt="Logo Simple File Storage"
					/>

					{/* Nom */}
					<h2>
						<a
							rel="noopener noreferrer" target="_blank"
							href="https://github.com/FlorianLeChat/Simple-File-Storage"
						>
							Simple File Storage
						</a>
					</h2>

					{/* Date */}
					<h3><em>2021</em></h3>

					{/* Description */}
					<p>
						<Trans
							i18nKey="pages.legacy.projects.phpstorage"
							components={{
								i: <i />,
								b: <strong />,
								a1: <a
									target="_blank" rel="noopener noreferrer"
									href="https://www.microsoft.com/en-us/microsoft-365/onedrive/online-cloud-storage"
								>...</a>,
								a2: <a
									target="_blank" rel="noopener noreferrer"
									href="https://www.google.com/intl/en/drive/"
								>...</a>
							}}
						/>
					</p>
				</div>

				<hr />

				{/* Galerie photos */}
				<div className="images">
					<Image src={ArrowLeft} alt="" />

					<div>
						<a
							rel="noopener noreferrer" target="_blank"
							href={`${ assets }/projects/phpstorage_gallery_1.jpg`}
						>
							<Image
								src={`${ assets }/projects/phpstorage_gallery_1.jpg`}
								alt="Image 1" width="64" height="64"
							/>
						</a>

						<figcaption>Interface de téléversement simplifiée</figcaption>
					</div>

					<div>
						<a
							rel="noopener noreferrer" target="_blank"
							href={`${ assets }/projects/phpstorage_gallery_2.jpg`}
						>
							<Image
								src={`${ assets }/projects/phpstorage_gallery_2.jpg`}
								alt="Image 2" width="64" height="64"
							/>
						</a>

						<figcaption>Système d&#39;administration des fichiers</figcaption>
					</div>

					<div>
						<a
							rel="noopener noreferrer" target="_blank"
							href={`${ assets }/projects/phpstorage_gallery_3.jpg`}
						>
							<Image
								src={`${ assets }/projects/phpstorage_gallery_3.jpg`}
								alt="Image 3" width="64" height="64"
							/>
						</a>

						<figcaption>Création d&#39;une nouvelle version avec Bootstrap</figcaption>
					</div>

					<Image src={ArrowRight} alt="" />
				</div>

				<hr />

				{/* Icônes des langages utilisés */}
				<div className="languages">
					<Image
						src={`${ assets }/languages/nginx.svg`}
						width="80" height="40" title="Nginx" alt="Logo Nginx"
					/>

					<Image
						src={`${ assets }/languages/php.svg`}
						width="40" height="40" title="PHP" alt="Logo PHP"
					/>

					<Image
						src={`${ assets }/languages/javascript.svg`}
						width="40" height="40" title="JavaScript" alt="Logo JavaScript"
					/>

					<Image
						src={`${ assets }/languages/css3.svg`}
						width="40" height="40" title="CSS" alt="Logo CSS"
					/>

					<Image
						src={`${ assets }/languages/bootstrap.svg`}
						width="40" height="40" title="Bootstrap" alt="Logo Bootstrap"
					/>

					<Image
						src={`${ assets }/languages/html5.svg`}
						width="40" height="40" title="HTML" alt="Logo HTML"
					/>
				</div>
			</article>

			{/* Projet : Source Web Console */}
			<article id="sourceconsole">
				<div className="properties">
					{/* Icône */}
					<Image
						src={`${ assets }/projects/logo_sourceconsole.svg`}
						width="64" height="64" alt="Logo Source Web Console"
					/>

					{/* Nom */}
					<h2>
						<a
							rel="noopener noreferrer" target="_blank"
							href="https://github.com/FlorianLeChat/Source-Web-Console"
						>
							Source Web Console
						</a>
					</h2>

					{/* Date */}
					<h3><em>2022</em></h3>

					{/* Description */}
					<p>
						<Trans
							i18nKey="pages.legacy.projects.sourceconsole"
							components={{
								i: <i />,
								b: <strong />,
								a: <a
									target="_blank" rel="noopener noreferrer"
									href="https://developer.valvesoftware.com/wiki/Source"
								>..</a>
							}}
						/>
					</p>
				</div>

				<hr />

				{/* Galerie photos */}
				<div className="images">
					<Image src={ArrowLeft} alt="" />

					<div>
						<a
							rel="noopener noreferrer" target="_blank"
							href={`${ assets }/projects/sourceconsole_gallery_1.jpg`}
						>
							<Image
								src={`${ assets }/projects/sourceconsole_gallery_1.jpg`}
								alt="Image 1" width="64" height="64"
							/>
						</a>

						<figcaption>Page d&#39;accueil avec présentation des fonctionnalités</figcaption>
					</div>

					<div>
						<a
							rel="noopener noreferrer" target="_blank"
							href={`${ assets }/projects/sourceconsole_gallery_2.jpg`}
						>
							<Image
								src={`${ assets }/projects/sourceconsole_gallery_2.jpg`}
								alt="Image 2" width="64" height="64"
							/>
						</a>

						<figcaption>Tableau de bord de visualisation</figcaption>
					</div>

					<div>
						<a
							rel="noopener noreferrer" target="_blank"
							href={`${ assets }/projects/sourceconsole_gallery_3.jpg`}
						>
							<Image
								src={`${ assets }/projects/sourceconsole_gallery_3.jpg`}
								alt="Image 3" width="64" height="64"
							/>
						</a>

						<figcaption>Statistiques d&#39;utilisation des serveurs</figcaption>
					</div>

					<div>
						<a
							rel="noopener noreferrer" target="_blank"
							href={`${ assets }/projects/sourceconsole_gallery_4.jpg`}
						>
							<Image
								src={`${ assets }/projects/sourceconsole_gallery_4.jpg`}
								alt="Image 4" width="64" height="64"
							/>
						</a>

						<figcaption>Compte utilisateur pour modifier les paramètres</figcaption>
					</div>

					<Image src={ArrowRight} alt="" />
				</div>

				<hr />

				{/* Icônes des langages utilisés */}
				<div className="languages">
					<Image
						src={`${ assets }/languages/nginx.svg`}
						width="80" height="40" title="Nginx" alt="Logo Nginx"
					/>

					<Image
						src={`${ assets }/languages/mysql.svg`}
						width="60" height="40" title="MySQL" alt="Logo MySQL"
					/>

					<Image
						src={`${ assets }/languages/php.svg`}
						width="40" height="40" title="PHP" alt="Logo PHP"
					/>

					<Image
						src={`${ assets }/languages/jquery.svg`}
						width="40" height="40" title="jQuery" alt="Logo jQuery"
					/>

					<Image
						src={`${ assets }/languages/javascript.svg`}
						width="40" height="40" title="JavaScript" alt="Logo JavaScript"
					/>

					<Image
						src={`${ assets }/languages/sass.svg`}
						width="40" height="40" title="SASS" alt="Logo SASS"
					/>

					<Image
						src={`${ assets }/languages/html5.svg`}
						width="40" height="40" title="HTML" alt="Logo HTML"
					/>
				</div>
			</article>

			{/* Projet : Domego */}
			<article id="domego">
				<div className="properties">
					{/* Icône */}
					<Image src={`${ assets }/projects/logo_domego.svg`} width="64" height="64" alt="Logo Domego" />

					{/* Nom */}
					<h2>
						<a
							rel="noopener noreferrer" target="_blank"
							href="https://github.com/FlorianLeChat/Domego"
						>
							Domego
						</a>
					</h2>

					{/* Date */}
					<h3><em>2022</em></h3>

					{/* Description */}
					<p>
						<Trans
							i18nKey="pages.legacy.projects.domego"
							components={{
								b: <strong />,
								a: <a
									target="_blank" rel="noopener noreferrer"
									href="https://www.i2m.u-bordeaux.fr/Projets/Autres-projets2/Domego"
								>..</a>
							}}
						/>
					</p>
				</div>

				<hr />

				{/* Galerie photos */}
				<div className="images">
					<Image src={ArrowLeft} alt="" />

					<div>
						<a
							rel="noopener noreferrer" target="_blank"
							href={`${ assets }/projects/domego_gallery_1.jpg`}
						>
							<Image
								src={`${ assets }/projects/domego_gallery_1.jpg`}
								alt="Image 1" width="64" height="64"
							/>
						</a>

						<figcaption>Page d&#39;accueil avec la liste des parties</figcaption>
					</div>

					<div>
						<a
							rel="noopener noreferrer" target="_blank"
							href={`${ assets }/projects/domego_gallery_2.jpg`}
						>
							<Image
								src={`${ assets }/projects/domego_gallery_2.jpg`}
								alt="Image 2" width="64" height="64"
							/>
						</a>

						<figcaption>Sélection des r&ocirc;les avec communications textuelles</figcaption>
					</div>

					<div>
						<a
							rel="noopener noreferrer" target="_blank"
							href={`${ assets }/projects/domego_gallery_3.jpg`}
						>
							<Image
								src={`${ assets }/projects/domego_gallery_3.jpg`}
								alt="Image 3" width="64" height="64"
							/>
						</a>

						<figcaption>Choix du mode de jeu : joueur ou spectateur</figcaption>
					</div>

					<Image src={ArrowRight} alt="" />
				</div>

				<hr />

				{/* Icônes des langages utilisés */}
				<div className="languages">
					<Image
						src={`${ assets }/languages/nginx.svg`}
						width="80" height="40" title="Nginx" alt="Logo Nginx"
					/>

					<Image
						src={`${ assets }/languages/mongodb.svg`}
						width="40" height="40" title="MongoDB" alt="Logo MongoDB"
					/>

					<Image
						src={`${ assets }/languages/express.svg`}
						width="40" height="40" title="Express" alt="Logo Express"
					/>

					<Image
						src={`${ assets }/languages/typescript.svg`}
						width="40" height="40" title="TypeScript" alt="Logo TypeScript"
					/>

					<Image
						src={`${ assets }/languages/react.svg`}
						width="40" height="40" title="React" alt="Logo React"
					/>

					<Image
						src={`${ assets }/languages/nodejs.svg`}
						width="40" height="40" title="NodeJS" alt="Logo NodeJS"
					/>

					<Image
						src={`${ assets }/languages/sass.svg`}
						width="40" height="40" title="SASS" alt="Logo SASS"
					/>

					<Image
						src={`${ assets }/languages/html5.svg`}
						width="40" height="40" title="HTML" alt="Logo HTML"
					/>
				</div>
			</article>
		</>
	);
}