//
// Composant de l'en-tête de l'ancienne version du site.
//
import Image from "next/image";
import { getBasePath } from "../../utilities/NextRouter";
import { useTranslation } from "../../utilities/ServerTranslations";

export default async function Header()
{
	// Déclaration des constantes.
	const basePath = getBasePath();
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
					src={`${ basePath }/assets/images/platforms/discord.svg`}
					alt="Discord" width="32" height="32"
					style={{ color: "currentcolor" }}
				/>
			</a>

			<a
				style={{ color: "#27272a" }} rel="noopener noreferrer" target="_blank"
				href="https://github.com/FlorianLeChat"
			>
				{/* GitHub */}
				<Image
					src={`${ basePath }/assets/images/platforms/github.svg`}
					alt="GitHub" width="32" height="32"
					style={{ color: "currentcolor" }}
				/>
			</a>

			<a
				style={{ color: "#1da1f2" }} rel="noopener noreferrer" target="_blank"
				href="https://twitter.com/FlorianTrayon"
			>
				{/* Twitter */}
				<Image
					src={`${ basePath }/assets/images/platforms/twitter.svg`}
					alt="Twitter" width="32" height="32"
					style={{ color: "currentcolor" }}
				/>
			</a>

			<a
				style={{ color: "#006699" }} rel="noopener noreferrer" target="_blank"
				href="https://www.linkedin.com/in/florian-trayon/"
			>
				{/* LinkedIn */}
				<Image
					src={`${ basePath }/assets/images/platforms/linkedin.svg`}
					alt="LinkedIn" width="32" height="32"
					style={{ color: "currentcolor" }}
				/>
			</a>

			<a
				style={{ color: "white" }} title="CV" target="_blank"
				href="assets/docs/cv.pdf"
			>
				{/* Curriculum Vitæ */}
				<Image
					src={`${ basePath }/assets/images/platforms/cv.svg`}
					alt="CV" width="32" height="32"
					style={{ color: "currentcolor" }}

				/>
			</a>

			{/* Vagues de fin */}
			<img src="assets/images/decorations/header_waves_blue.svg" alt="" />
		</header>
	);
}