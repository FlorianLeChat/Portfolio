//
// Composant de l'overlay des contributions de l'ancienne version du site.
//
import { useTranslation } from "../../utilities/ServerTranslations";

export default async function Contributions()
{
	// Déclaration des constantes.
	const { t } = await useTranslation();

	// Affichage du rendu HTML du composant.
	return (
		<section id="contributions">
			<h2>{t( "pages.legacy.footer.contributions" )}</h2>

			<audio id="jazz" loop>
				{/* Musique d'ambiance spéciale à la section */}
				<source src="assets/sounds/jazz.mp3" type="audio/mp3" />
			</audio>

			<ul>
				{/* Description de chaque contribution */}
				<li>
					<h3>Zélie Exposito</h3>
					<p>
						Remerciements pour le soutien moral ainsi que la traduction japonaise de la page principale.
					</p>
				</li>
				<li>
					<h3>Esteban Ramirez</h3>
					<p>
						Remerciements pour l&#39;aide à la création du design du site, aux tests utilisateurs
						à la fin de la réalisation mais également à la traduction espagnol de la page d&#39;accueil.
					</p>
				</li>
			</ul>
		</section>
	);
}