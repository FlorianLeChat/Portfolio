//
// Composant de l'en-tête de l'ancienne version du site.
//
import Image from "next/image";

import CV from "@/images/platforms/cv.svg";
import GitHub from "@/images/platforms/github.svg";
import Discord from "@/images/platforms/discord.svg";
import Twitter from "@/images/platforms/twitter.svg";
import LinkedIn from "@/images/platforms/linkedin.svg";
import LowerWaves from "@/images/decorations/header_waves_blue.svg";

import { useTranslation } from "@/utilities/ServerTranslations";

export default async function Header()
{
	// Déclaration des constantes.
	const { t } = await useTranslation();

	// Affichage du rendu HTML du composant.
	return (
		<header>
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
				style={{ color: "white" }} title="CV" target="_blank"
				href="assets/docs/cv.pdf"
			>
				{/* Curriculum Vitæ */}
				<Image
					src={CV} style={{ color: "currentcolor" }}
					alt="CV" width="32" height="32" priority
				/>
			</a>

			{/* Vagues de fin */}
			<Image
				src={LowerWaves} style={{ color: "currentcolor" }}
				alt="" priority
			/>
		</header>
	);
}