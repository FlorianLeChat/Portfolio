//
// Composant de l'en-tête de l'ancienne version du site.
//
import Image from "next/image";
import { headers } from "next/headers";

import CV from "@/images/platforms/cv.svg";
import GitHub from "@/images/platforms/github.svg";
import Discord from "@/images/platforms/discord.svg";
import Twitter from "@/images/platforms/twitter.svg";
import LinkedIn from "@/images/platforms/linkedin.svg";

import LowerBlueWaves from "@/images/decorations/header_waves_blue.svg";
import LowerGreenWaves from "@/images/decorations/header_waves_green.svg";
import LowerOrangeWaves from "@/images/decorations/header_waves_orange.svg";
import LowerPurpleWaves from "@/images/decorations/header_waves_purple.svg";

import { useTranslation } from "@/utilities/ServerTranslations";

export default async function Header()
{
	// Déclaration des constantes.
	const { t } = await useTranslation();
	const route = headers().get( "X-Invoke-Path" ) ?? "";

	// Affichage du rendu HTML du composant.
	return (
		<header>
			{
				// Page d'accueil.
				route.endsWith( "/legacy" ) && (
					<>
						{/* Prénom & Nom */}
						<h1>Florian Trayon</h1>

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
						<Image src={LowerBlueWaves} alt="" priority />
					</>
				)
			}

			{
				// Page des projets.
				route.endsWith( "/projects" ) && (
					<>
						{/* Titre de la catégorie */}
						<h1>{t( "pages.legacy.header.projects.title" )}</h1>

						{/* Description succincte */}
						<h2>{t( "pages.legacy.header.projects.subtitle" )}</h2>

						{/* Vagues de fin */}
						<Image src={LowerOrangeWaves} alt="" priority />
					</>
				)
			}

			{
				// Page des compétences.
				route.endsWith( "/skills" ) && (
					<>
						{/* Titre de la catégorie */}
						<h1>{t( "pages.legacy.header.skills.title" )}</h1>

						{/* Description succincte */}
						<h2>{t( "pages.legacy.header.skills.subtitle" )}</h2>

						{/* Vagues de fin */}
						<Image src={LowerGreenWaves} alt="" priority />
					</>
				)
			}

			{
				// Page de contact.
				route.endsWith( "/contact" ) && (
					<>
						{/* Titre de la catégorie */}
						<h1>{t( "pages.legacy.header.contact.title" )}</h1>

						{/* Description succincte */}
						<h2>{t( "pages.legacy.header.contact.subtitle" )}</h2>

						{/* Vagues de fin */}
						<Image src={LowerPurpleWaves} alt="" priority />
					</>
				)
			}
		</header>
	);
}