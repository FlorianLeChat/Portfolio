//
// Route vers la page des projets de l'ancienne version du site.
//

// Importation de la feuille de style.
import "./page.scss";

// Importation des dépendances.
import Image from "next/image";
import { lazy } from "react";
import { useTranslations } from "next-intl";
import { unstable_setRequestLocale } from "next-intl/server";

// Importation des composants.
const PhotoGallery = lazy( () => import( "../components/photo-gallery" ) );

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
	const assets = `${ process.env.__NEXT_ROUTER_BASEPATH }/assets/images`;

	// Déclaration des variables d'état.
	const t = useTranslations( "legacy" );

	// Affichage du rendu HTML de la page.
	return (
		<>
			{/* Projet : Florian's Discord */}
			<article id="discordbot">
				<div className="properties">
					{/* Icône */}
					<Image
						src={`${ assets }/projects/logo_discordbot.svg`}
						alt="Logo Florian's Bot"
						width="64"
						height="64"
					/>

					{/* Nom */}
					<h3>Florian&#39;s Bot</h3>

					{/* Date */}
					<h4>
						<em>2016</em>
					</h4>

					{/* Description */}
					<p>
						{t.rich( "projects.discordbot", {
							i: ( chunks ) => <i>{chunks}</i>,
							b: ( chunks ) => <strong>{chunks}</strong>,
							a: ( chunks ) => (
								<a
									rel="noopener noreferrer"
									href="https://discord.js.org/"
									target="_blank"
								>
									{chunks}
								</a>
							)
						} )}
					</p>
				</div>

				<hr />

				{/* Galerie photos */}
				<PhotoGallery
					project="discordbot"
					photos={[
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
					]}
				/>

				<hr />

				{/* Icônes des langages utilisés */}
				<div className="languages">
					<Image
						alt="Logo MySQL"
						src={`${ assets }/languages/mysql.svg`}
						title="MySQL"
						width="60"
						height="40"
					/>

					<Image
						alt="Logo JavaScript"
						src={`${ assets }/languages/javascript.svg`}
						title="JavaScript"
						width="40"
						height="40"
					/>

					<Image
						alt="Logo NodeJS"
						src={`${ assets }/languages/nodejs.svg`}
						title="NodeJS"
						width="40"
						height="40"
					/>
				</div>
			</article>

			{/* Projet : Raven Framework */}
			<article id="raven">
				<div className="properties">
					{/* Icône */}
					<Image
						alt="Logo Framework Raven"
						src={`${ assets }/projects/logo_raven.svg`}
						width="64"
						height="64"
					/>

					{/* Nom */}
					<h3>Raven Framework</h3>

					{/* Date */}
					<h4>
						<em>2017</em>
					</h4>

					{/* Description */}
					<p>
						{t.rich( "projects.raven", {
							i: ( chunks ) => <i>{chunks}</i>,
							b: ( chunks ) => <strong>{chunks}</strong>,
							a1: ( chunks ) => (
								<a
									rel="noopener noreferrer"
									href="https://store.steampowered.com/app/4000/Garrys_Mod/"
									target="_blank"
								>
									{chunks}
								</a>
							),
							a2: ( chunks ) => (
								<a
									rel="noopener noreferrer"
									href="https://steamcommunity.com/app/4000/workshop/"
									target="_blank"
								>
									{chunks}
								</a>
							)
						} )}
					</p>
				</div>

				<hr />

				{/* Galerie photos */}
				<PhotoGallery
					project="raven"
					photos={[
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
							caption:
								"Éléments interactifs avec l'environnement"
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
					]}
				/>

				<hr />

				{/* Icônes des langages utilisés */}
				<div className="languages">
					<Image
						alt="Logo MySQL"
						src={`${ assets }/languages/mysql.svg`}
						title="MySQL"
						width="60"
						height="40"
					/>

					<Image
						alt="Logo C++"
						src={`${ assets }/languages/cplusplus.svg`}
						title="C++"
						width="40"
						height="40"
					/>

					<Image
						alt="Logo Lua"
						src={`${ assets }/languages/lua.svg`}
						title="Lua"
						width="40"
						height="40"
					/>
				</div>
			</article>

			{/* Projet : Facepunch Commits Monitor */}
			<article id="facepunch">
				<div className="properties">
					{/* Icône */}
					<Image
						alt="Logo Facepunch Commits Monitor"
						src={`${ assets }/projects/logo_facepunch.svg`}
						width="64"
						height="64"
					/>

					{/* Nom */}
					<h3>
						<a
							rel="noopener noreferrer"
							href="https://github.com/FlorianLeChat/Facepunch-Commits-Monitor"
							target="_blank"
						>
							Facepunch Commits Monitor
						</a>
					</h3>

					{/* Date */}
					<h4>
						<em>2021</em>
					</h4>

					{/* Description */}
					<p>
						{t.rich( "projects.facepunch", {
							i: ( chunks ) => <i>{chunks}</i>,
							b: ( chunks ) => <strong>{chunks}</strong>,
							a1: ( chunks ) => (
								<a
									rel="noopener noreferrer"
									href="https://facepunch.com/"
									target="_blank"
								>
									{chunks}
								</a>
							),
							a2: ( chunks ) => (
								<a
									rel="noopener noreferrer"
									href="https://commits.facepunch.com/"
									target="_blank"
								>
									{chunks}
								</a>
							)
						} )}
					</p>
				</div>

				<hr />

				{/* Galerie photos */}
				<PhotoGallery
					project="facepunch"
					photos={[
						{
							width: 396,
							height: 360,
							caption:
								"Choix du répertoire et définition de l'interval de vérification"
						},
						{
							width: 391,
							height: 553,
							caption:
								"Affichage des actualités dans la barre de navigation Windows"
						}
					]}
				/>

				<hr />

				{/* Icônes des langages utilisés */}
				<div className="languages">
					<Image
						alt="Logo C#"
						src={`${ assets }/languages/csharp.svg`}
						title="C#"
						width="40"
						height="40"
					/>

					<Image
						alt="Logo .NET"
						src={`${ assets }/languages/dotnet.svg`}
						title=".NET"
						width="40"
						height="40"
					/>
				</div>
			</article>

			{/* Projet : Steam Collection Download Size Calculator */}
			<article id="steam">
				<div className="properties">
					{/* Icône */}
					<Image
						alt="Logo Steam Collection Download Size Calculator"
						src={`${ assets }/projects/logo_steam.svg`}
						width="64"
						height="64"
					/>

					{/* Nom */}
					<h3>
						<a
							rel="noopener noreferrer"
							href="https://github.com/FlorianLeChat/Steam-Collection-Download-Size-Calculator"
							target="_blank"
						>
							Steam Collection Download Size Calculator
						</a>
					</h3>

					{/* Date */}
					<h4>
						<em>2021</em>
					</h4>

					{/* Description */}
					<p>
						{t.rich( "projects.steam", {
							i: ( chunks ) => <i>{chunks}</i>,
							b: ( chunks ) => <strong>{chunks}</strong>,
							a: ( chunks ) => (
								<a
									rel="noopener noreferrer"
									href="https://steamcommunity.com/"
									target="_blank"
								>
									{chunks}
								</a>
							)
						} )}
					</p>
				</div>

				<hr />

				{/* Galerie photos */}
				<PhotoGallery
					project="steam"
					photos={[
						{
							width: 881,
							height: 363,
							caption: "Informations détaillées de l'objet"
						}
					]}
				/>

				<hr />

				{/* Icônes des langages utilisés */}
				<div className="languages">
					<Image
						alt="Logo .NET"
						src={`${ assets }/languages/dotnet.svg`}
						title=".NET"
						width="40"
						height="40"
					/>

					<Image
						alt="Logo C#"
						src={`${ assets }/languages/csharp.svg`}
						title="C#"
						width="40"
						height="40"
					/>
				</div>
			</article>

			{/* Projet : Python RPG */}
			<article id="pythonrpg">
				<div className="properties">
					{/* Icône */}
					<Image
						alt="Logo Python RPG"
						src={`${ assets }/projects/logo_pythonrpg.svg`}
						width="64"
						height="64"
					/>

					{/* Nom */}
					<h3>
						<a
							rel="noopener noreferrer"
							href="https://github.com/FlorianLeChat/Python-RPG"
							target="_blank"
						>
							Python RPG
						</a>
					</h3>

					{/* Date */}
					<h4>
						<em>2021</em>
					</h4>

					{/* Description */}
					<p>
						{t.rich( "projects.pythonrpg", {
							i: ( chunks ) => <i>{chunks}</i>,
							b: ( chunks ) => <strong>{chunks}</strong>
						} )}
					</p>
				</div>

				<hr />

				{/* Galerie photos */}
				<PhotoGallery
					project="pythonrpg"
					photos={[
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
					]}
				/>

				<hr />

				{/* Icônes des langages utilisés */}
				<div className="languages">
					<Image
						alt="Logo Python"
						src={`${ assets }/languages/python.svg`}
						width="40"
						height="40"
						title="Python"
					/>
				</div>
			</article>

			{/* Projet : Simple File Storage */}
			<article id="phpstorage">
				<div className="properties">
					{/* Icône */}
					<Image
						alt="Logo Simple File Storage"
						src={`${ assets }/projects/logo_phpstorage.svg`}
						width="64"
						height="64"
					/>

					{/* Nom */}
					<h3>
						<a
							rel="noopener noreferrer"
							href="https://github.com/FlorianLeChat/Simple-File-Storage"
							target="_blank"
						>
							Simple File Storage
						</a>
					</h3>

					{/* Date */}
					<h4>
						<em>2021</em>
					</h4>

					{/* Description */}
					<p>
						{t.rich( "projects.phpstorage", {
							i: ( chunks ) => <i>{chunks}</i>,
							b: ( chunks ) => <strong>{chunks}</strong>,
							a1: ( chunks ) => (
								<a
									rel="noopener noreferrer"
									href="https://www.microsoft.com/en-us/microsoft-365/onedrive/online-cloud-storage"
									target="_blank"
								>
									{chunks}
								</a>
							),
							a2: ( chunks ) => (
								<a
									rel="noopener noreferrer"
									href="https://www.google.com/intl/en/drive/"
									target="_blank"
								>
									{chunks}
								</a>
							)
						} )}
					</p>
				</div>

				<hr />

				{/* Galerie photos */}
				<PhotoGallery
					project="phpstorage"
					photos={[
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
							caption:
								"Création d'une nouvelle version avec Bootstrap"
						}
					]}
				/>

				<hr />

				{/* Icônes des langages utilisés */}
				<div className="languages">
					<Image
						alt="Logo Nginx"
						src={`${ assets }/languages/nginx.svg`}
						title="Nginx"
						width="80"
						height="40"
					/>

					<Image
						alt="Logo PHP"
						src={`${ assets }/languages/php.svg`}
						title="PHP"
						width="40"
						height="40"
					/>

					<Image
						alt="Logo JavaScript"
						src={`${ assets }/languages/javascript.svg`}
						title="JavaScript"
						width="40"
						height="40"
					/>

					<Image
						alt="Logo CSS"
						src={`${ assets }/languages/css3.svg`}
						title="CSS"
						width="40"
						height="40"
					/>

					<Image
						alt="Logo Bootstrap"
						src={`${ assets }/languages/bootstrap.svg`}
						title="Bootstrap"
						width="40"
						height="40"
					/>

					<Image
						alt="Logo HTML"
						src={`${ assets }/languages/html5.svg`}
						title="HTML"
						width="40"
						height="40"
					/>
				</div>
			</article>

			{/* Projet : Source Web Console */}
			<article id="sourceconsole">
				<div className="properties">
					{/* Icône */}
					<Image
						alt="Logo Source Web Console"
						src={`${ assets }/projects/logo_sourceconsole.svg`}
						width="64"
						height="64"
					/>

					{/* Nom */}
					<h3>
						<a
							rel="noopener noreferrer"
							href="https://github.com/FlorianLeChat/Source-Web-Console"
							target="_blank"
						>
							Source Web Console
						</a>
					</h3>

					{/* Date */}
					<h4>
						<em>2022</em>
					</h4>

					{/* Description */}
					<p>
						{t.rich( "projects.sourceconsole", {
							i: ( chunks ) => <i>{chunks}</i>,
							b: ( chunks ) => <strong>{chunks}</strong>,
							a: ( chunks ) => (
								<a
									rel="noopener noreferrer"
									href="https://developer.valvesoftware.com/wiki/Source"
									target="_blank"
								>
									{chunks}
								</a>
							)
						} )}
					</p>
				</div>

				<hr />

				{/* Galerie photos */}
				<PhotoGallery
					project="sourceconsole"
					photos={[
						{
							width: 1338,
							height: 850,
							caption:
								"Page d'accueil avec présentation des fonctionnalités"
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
							caption:
								"Compte utilisateur pour modifier les paramètres"
						}
					]}
				/>

				<hr />

				{/* Icônes des langages utilisés */}
				<div className="languages">
					<Image
						alt="Logo Nginx"
						src={`${ assets }/languages/nginx.svg`}
						title="Nginx"
						width="80"
						height="40"
					/>

					<Image
						alt="Logo MySQL"
						src={`${ assets }/languages/mysql.svg`}
						title="MySQL"
						width="60"
						height="40"
					/>

					<Image
						alt="Logo PHP"
						src={`${ assets }/languages/php.svg`}
						title="PHP"
						width="40"
						height="40"
					/>

					<Image
						alt="Logo jQuery"
						src={`${ assets }/languages/jquery.svg`}
						title="jQuery"
						width="40"
						height="40"
					/>

					<Image
						alt="Logo JavaScript"
						src={`${ assets }/languages/javascript.svg`}
						width="40"
						height="40"
						title="JavaScript"
					/>

					<Image
						alt="Logo SASS"
						src={`${ assets }/languages/sass.svg`}
						title="SASS"
						width="40"
						height="40"
					/>

					<Image
						alt="Logo HTML"
						src={`${ assets }/languages/html5.svg`}
						title="HTML"
						width="40"
						height="40"
					/>
				</div>
			</article>

			{/* Projet : Domego */}
			<article id="domego">
				<div className="properties">
					{/* Icône */}
					<Image
						alt="Logo Domego"
						src={`${ assets }/projects/logo_domego.svg`}
						width="64"
						height="64"
					/>

					{/* Nom */}
					<h3>
						<a
							rel="noopener noreferrer"
							href="https://github.com/FlorianLeChat/Domego"
							target="_blank"
						>
							Domego
						</a>
					</h3>

					{/* Date */}
					<h4>
						<em>2022</em>
					</h4>

					{/* Description */}
					<p>
						{t.rich( "projects.domego", {
							b: ( chunks ) => <strong>{chunks}</strong>,
							a: ( chunks ) => (
								<a
									rel="noopener noreferrer"
									href="https://www.i2m.u-bordeaux.fr/Projets/Autres-projets2/Domego"
									target="_blank"
								>
									{chunks}
								</a>
							)
						} )}
					</p>
				</div>

				<hr />

				{/* Galerie photos */}
				<PhotoGallery
					project="domego"
					photos={[
						{
							width: 1362,
							height: 937,
							caption: "Page d'accueil avec la liste des parties"
						},
						{
							width: 1362,
							height: 937,
							caption:
								"Sélection des rôles avec communications textuelles"
						},
						{
							width: 1362,
							height: 880,
							caption:
								"Choix du mode de jeu : joueur ou spectateur"
						}
					]}
				/>

				<hr />

				{/* Icônes des langages utilisés */}
				<div className="languages">
					<Image
						alt="Logo Nginx"
						src={`${ assets }/languages/nginx.svg`}
						title="Nginx"
						width="80"
						height="40"
					/>

					<Image
						alt="Logo MongoDB"
						src={`${ assets }/languages/mongodb.svg`}
						title="MongoDB"
						width="40"
						height="40"
					/>

					<Image
						alt="Logo Express"
						src={`${ assets }/languages/express.svg`}
						title="Express"
						width="40"
						height="40"
					/>

					<Image
						alt="Logo TypeScript"
						src={`${ assets }/languages/typescript.svg`}
						title="TypeScript"
						width="40"
						height="40"
					/>

					<Image
						alt="Logo React"
						src={`${ assets }/languages/react.svg`}
						title="React"
						width="40"
						height="40"
					/>

					<Image
						alt="Logo NodeJS"
						src={`${ assets }/languages/nodejs.svg`}
						title="NodeJS"
						width="40"
						height="40"
					/>

					<Image
						alt="Logo SASS"
						src={`${ assets }/languages/sass.svg`}
						title="SASS"
						width="40"
						height="40"
					/>

					<Image
						alt="Logo HTML"
						src={`${ assets }/languages/html5.svg`}
						title="HTML"
						width="40"
						height="40"
					/>
				</div>
			</article>
		</>
	);
}