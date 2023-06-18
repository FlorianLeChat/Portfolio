//
// Route vers la page des projets de l'ancienne version du site.
//

// Importation de la feuille de style.
import "./page.scss";

// Importation des dépendances.
import Image from "next/image";
import { lazy } from "react";
import { Trans } from "react-i18next/TransWithoutContext";

// Importation des fonctions utilitaires.
import { getBasePath } from "@/utilities/NextRouter";

// Importation des composants.
const PhotoGallery = lazy( () => import( "../components/photo-gallery" ) );

// Affichage de la page.
export default function Page()
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
				<PhotoGallery
					project="discordbot"
					photos={
						[
							{
								width: 502,
								height: 855,
								caption: "Suivi des actualités"
							},
							{
								width: 314,
								height: 160,
								caption: "Réponses automatiques"
							},
							{
								width: 365,
								height: 581,
								caption: "Journalisation interne"
							},
							{
								width: 603,
								height: 378,
								caption: "Commandes personnalisées"
							},
							{
								width: 289,
								height: 405,
								caption: "Messages de statut aléatoires"
							}
						]
					}
				/>

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
				<PhotoGallery
					project="raven"
					photos={
						[
							{
								width: 528,
								height: 399,
								caption: "Communications écrites entre joueurs"
							},
							{
								width: 1920,
								height: 1080,
								caption: "Liste des joueurs connectés"
							},
							{
								width: 617,
								height: 1079,
								caption: "Éléments interactifs avec l'environnement"
							},
							{
								width: 981,
								height: 829,
								caption: "Choix d'un rôle"
							},
							{
								width: 196,
								height: 150,
								caption: "Système d'armements"
							},
							{
								width: 1920,
								height: 1080,
								caption: "Entités et PNJs dynamiques"
							}
						]
					}
				/>

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
				<PhotoGallery
					project="facepunch"
					photos={
						[
							{
								width: 396,
								height: 360,
								caption: "Choix du répertoire et définition de l'interval de vérification"
							},
							{
								width: 391,
								height: 553,
								caption: "Affichage des actualités dans la barre de navigation Windows"
							}
						]
					}
				/>

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
				<PhotoGallery
					project="steam"
					photos={
						[
							{
								width: 881,
								height: 363,
								caption: "Informations détaillées de l'objet"
							}
						]
					}
				/>

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
				<PhotoGallery
					project="pythonrpg"
					photos={
						[
							{
								width: 665,
								height: 502,
								caption: "Plusieurs modes de lecture"
							},
							{
								width: 964,
								height: 498,
								caption: "Histoires riches et détaillées"
							}
						]
					}
				/>

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
				<PhotoGallery
					project="phpstorage"
					photos={
						[
							{
								width: 791,
								height: 529,
								caption: "Interface de téléversement simplifiée"
							},
							{
								width: 785,
								height: 562,
								caption: "Système d'administration des fichiers"
							},
							{
								width: 659,
								height: 723,
								caption: "Création d'une nouvelle version avec Bootstrap"
							}
						]
					}
				/>

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
				<PhotoGallery
					project="sourceconsole"
					photos={
						[
							{
								width: 1338,
								height: 850,
								caption: "Page d'accueil avec présentation des fonctionnalités"
							},
							{
								width: 1338,
								height: 850,
								caption: "Tableau de bord de visualisation"
							},
							{
								width: 1338,
								height: 850,
								caption: "Statistiques d'utilisation des serveurs"
							},
							{
								width: 1338,
								height: 850,
								caption: "Compte utilisateur pour modifier les paramètres"
							}
						]
					}
				/>

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
				<PhotoGallery
					project="domego"
					photos={
						[
							{
								width: 1362,
								height: 937,
								caption: "Page d'accueil avec la liste des parties"
							},
							{
								width: 1362,
								height: 937,
								caption: "Sélection des rôles avec communications textuelles"
							},
							{
								width: 1362,
								height: 880,
								caption: "Choix du mode de jeu : joueur ou spectateur"
							}
						]
					}
				/>

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