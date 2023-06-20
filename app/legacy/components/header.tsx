//
// Composant de l'en-tête de l'ancienne version du site.
//
import Image from "next/image";
import { lazy } from "react";
import { headers } from "next/headers";

import CV from "@/images/platforms/cv.svg";
import GitHub from "@/images/platforms/github.svg";
import Discord from "@/images/platforms/discord.svg";
import Twitter from "@/images/platforms/twitter.svg";
import LinkedIn from "@/images/platforms/linkedin.svg";

import BlueWaves from "@/images/decorations/header_waves_blue.svg";
import GreenWaves from "@/images/decorations/header_waves_green.svg";
import OrangeWaves from "@/images/decorations/header_waves_orange.svg";
import PurpleWaves from "@/images/decorations/header_waves_purple.svg";

import { useTranslation } from "@/utilities/ServerTranslations";

const TypingEffect = lazy( () => import( "./typing-effect" ) );

export default async function Header()
{
	// Déclaration des constantes.
	const { t } = await useTranslation();
	const route = headers().get( "X-Invoke-Path" ) ?? "";

	// Suppression de l'affichage sur la page de déconnexion de l'administration.
	if ( route.endsWith( "/admin/logout" ) )
	{
		return null;
	}

	// Affichage conditionnel du rendu HTML du composant.
	return (
		<header>
			{
				// Page d'accueil.
				route.endsWith( "/legacy" ) && (
					<>
						{/* Prénom & Nom */}
						<TypingEffect text="Florian Trayon" />

						{/* Description succincte */}
						<h2>{t( "pages.legacy.header.index.subtitle" )}</h2>

						{/* Plate-formes de communication */}
						<a
							style={{ color: "#5865f2" }} rel="noopener noreferrer" target="_blank"
							href="https://discord.com/users/183272411167326209"
						>
							{/* Discord */}
							<Image
								src={Discord} style={{ color: "currentcolor" }}
								alt="Discord" width="32" height="32" priority
							/>
						</a>

						<a
							style={{ color: "#27272a" }} rel="noopener noreferrer" target="_blank"
							href="https://github.com/FlorianLeChat"
						>
							{/* GitHub */}
							<Image
								src={GitHub} style={{ color: "currentcolor" }}
								alt="GitHub" width="32" height="32" priority
							/>
						</a>

						<a
							style={{ color: "#1da1f2" }} rel="noopener noreferrer" target="_blank"
							href="https://twitter.com/FlorianTrayon"
						>
							{/* Twitter */}
							<Image
								src={Twitter} style={{ color: "currentcolor" }}
								alt="Twitter" width="32" height="32" priority
							/>
						</a>

						<a
							style={{ color: "#006699" }} rel="noopener noreferrer" target="_blank"
							href="https://www.linkedin.com/in/florian-trayon/"
						>
							{/* LinkedIn */}
							<Image
								src={LinkedIn} style={{ color: "currentcolor" }}
								alt="LinkedIn" width="32" height="32" priority
							/>
						</a>

						<a
							style={{ color: "white" }} rel="noopener noreferrer" target="_blank"
							href="https://drive.google.com/file/d/1AuJMWr9LJGnZv64cFh-fBrNGj0BgyRNH/view"
						>
							{/* Curriculum Vitæ */}
							<Image
								src={CV} style={{ color: "currentcolor" }}
								alt="CV" width="32" height="32" priority
							/>
						</a>

						{/* Vagues de fin */}
						<Image src={BlueWaves} alt="" priority />
					</>
				)
			}

			{
				// Page des projets.
				route.endsWith( "/projects" ) && (
					<>
						{/* Titre de la catégorie */}
						<TypingEffect text={t( "pages.legacy.header.projects.title" )} />

						{/* Description succincte */}
						<h2>{t( "pages.legacy.header.projects.subtitle" )}</h2>

						{/* Vagues de fin */}
						<Image src={OrangeWaves} alt="" priority />
					</>
				)
			}

			{
				// Page des compétences.
				route.endsWith( "/skills" ) && (
					<>
						{/* Titre de la catégorie */}
						<TypingEffect text={t( "pages.legacy.header.skills.title" )} />

						{/* Description succincte */}
						<h2>{t( "pages.legacy.header.skills.subtitle" )}</h2>

						{/* Vagues de fin */}
						<Image src={GreenWaves} alt="" priority />
					</>
				)
			}

			{
				// Page de contact.
				route.endsWith( "/contact" ) && (
					<>
						{/* Titre de la catégorie */}
						<TypingEffect text={t( "pages.legacy.header.contact.title" )} />

						{/* Description succincte */}
						<h2>{t( "pages.legacy.header.contact.subtitle" )}</h2>

						{/* Vagues de fin */}
						<Image src={PurpleWaves} alt="" priority />
					</>
				)
			}

			{
				// Page de connexion à l'administration.
				route.endsWith( "/admin/login" ) && (
					<>
						{/* Titre de la catégorie */}
						<TypingEffect text="Authentification" />

						{/* Description succincte */}
						<h2>Pour accéder à cette ressource, vous devez vous identifier.</h2>

						{/* Heure actuelle */}
						<p>00:00:00</p>
					</>
				)
			}

			{
				// Page principale de l'administration.
				route.endsWith( "/admin" ) && (
					<>
						{/* Titre de la catégorie */}
						<TypingEffect text="Administration" />

						{/* Description succincte */}
						<h2>Gestion du contenu dynamique de la base de données</h2>

						{/* Heure actuelle */}
						<p>00:00:00</p>

						{/* Information de connexion */}
						<p>Connecté en tant que « getUsername(); »</p>
					</>
				)
			}
		</header>
	);
}