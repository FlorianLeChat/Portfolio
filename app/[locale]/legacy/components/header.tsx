//
// Composant de l'en-tête de l'ancienne version du site.
//

"use client";

import Image from "next/image";
import { lazy } from "react";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";

import CV from "@/images/platforms/cv.svg";
import GitHub from "@/images/platforms/github.svg";
import Discord from "@/images/platforms/discord.svg";
import Twitter from "@/images/platforms/twitter.svg";
import LinkedIn from "@/images/platforms/linkedin.svg";

import BlueWaves from "@/images/decorations/header_waves_blue.svg";
import GreenWaves from "@/images/decorations/header_waves_green.svg";
import OrangeWaves from "@/images/decorations/header_waves_orange.svg";
import PurpleWaves from "@/images/decorations/header_waves_purple.svg";

const TypingEffect = lazy( () => import( "./typing-effect" ) );

export default function Header()
{
	// Déclaration des constantes.
	const pathname = usePathname();

	// Désactivation du composant sur les pages d'administration.
	if ( pathname === "/admin/logout" )
	{
		return null;
	}

	// Déclaration des variables d'état.
	const t = useTranslations( "legacy" );

	// Affichage conditionnel du rendu HTML du composant.
	return (
		<header>
			{
				// Page d'accueil.
				pathname.endsWith( "/legacy" ) && (
					<>
						{/* Prénom & Nom */}
						<TypingEffect text="Florian Trayon" />

						{/* Description succincte */}
						<h2>{t( "header.index.subtitle" )}</h2>

						{/* Plate-formes de communication */}
						<a
							rel="noopener noreferrer"
							href="https://discord.com/users/183272411167326209"
							style={{ color: "#5865f2" }}
							target="_blank"
						>
							{/* Discord */}
							<Image
								src={Discord}
								alt="Discord"
								style={{ color: "currentcolor" }}
								width="32"
								height="32"
								priority
							/>
						</a>

						<a
							rel="noopener noreferrer"
							href="https://github.com/FlorianLeChat"
							style={{ color: "#27272a" }}
							target="_blank"
						>
							{/* GitHub */}
							<Image
								src={GitHub}
								alt="GitHub"
								style={{ color: "currentcolor" }}
								width="32"
								height="32"
								priority
							/>
						</a>

						<a
							rel="noopener noreferrer"
							style={{ color: "#1da1f2" }}
							href="https://twitter.com/FlorianTrayon"
							target="_blank"
						>
							{/* Twitter */}
							<Image
								src={Twitter}
								alt="Twitter"
								style={{ color: "currentcolor" }}
								width="32"
								height="32"
								priority
							/>
						</a>

						<a
							rel="noopener noreferrer"
							href="https://www.linkedin.com/in/florian-trayon/"
							style={{ color: "#006699" }}
							target="_blank"
						>
							{/* LinkedIn */}
							<Image
								src={LinkedIn}
								alt="LinkedIn"
								style={{ color: "currentcolor" }}
								width="32"
								height="32"
								priority
							/>
						</a>

						<a
							rel="noopener noreferrer"
							href="https://drive.google.com/file/d/1AuJMWr9LJGnZv64cFh-fBrNGj0BgyRNH/view"
							style={{ color: "white" }}
							target="_blank"
						>
							{/* Curriculum Vitæ */}
							<Image
								src={CV}
								alt="CV"
								style={{ color: "currentcolor" }}
								width="32"
								height="32"
								priority
							/>
						</a>

						{/* Vagues de fin */}
						<Image src={BlueWaves} alt="" priority />
					</>
				)
			}

			{
				// Page des projets.
				pathname.endsWith( "/projects" ) && (
					<>
						{/* Titre de la catégorie */}
						<TypingEffect
							text={t( "header.projects.title" )}
						/>

						{/* Description succincte */}
						<h2>{t( "header.projects.subtitle" )}</h2>

						{/* Vagues de fin */}
						<Image src={OrangeWaves} alt="" priority />
					</>
				)
			}

			{
				// Page des compétences.
				pathname.endsWith( "/skills" ) && (
					<>
						{/* Titre de la catégorie */}
						<TypingEffect
							text={t( "header.skills.title" )}
						/>

						{/* Description succincte */}
						<h2>{t( "header.skills.subtitle" )}</h2>

						{/* Vagues de fin */}
						<Image src={GreenWaves} alt="" priority />
					</>
				)
			}

			{
				// Page de contact.
				pathname.endsWith( "/contact" ) && (
					<>
						{/* Titre de la catégorie */}
						<TypingEffect
							text={t( "header.contact.title" )}
						/>

						{/* Description succincte */}
						<h2>{t( "header.contact.subtitle" )}</h2>

						{/* Vagues de fin */}
						<Image src={PurpleWaves} alt="" priority />
					</>
				)
			}

			{
				// Page de connexion à l'administration.
				pathname.endsWith( "/admin/login" ) && (
					<>
						{/* Titre de la catégorie */}
						<TypingEffect text="Authentification" />

						{/* Description succincte */}
						<h2>
							Pour accéder à cette ressource, vous devez vous
							identifier.
						</h2>

						{/* Heure actuelle */}
						<p>00:00:00</p>
					</>
				)
			}

			{
				// Page principale de l'administration.
				pathname.endsWith( "/admin" ) && (
					<>
						{/* Titre de la catégorie */}
						<TypingEffect text="Administration" />

						{/* Description succincte */}
						<h2>
							Gestion du contenu dynamique de la base de données
						</h2>

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