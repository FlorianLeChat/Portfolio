//
// Composant de l'overlay des contributions de l'ancienne version du site.
//

"use client";

import { useTranslation } from "@/utilities/ClientTranslations";

export default function Contributions( { visible }: { visible: boolean } )
{
	// Déclaration des constantes.
	const { t } = useTranslation();

	// Affichage conditionnel du rendu HTML du composant.
	return visible ? (
		<section id="contributions">
			<h2>{t( "pages.legacy.footer.contributions" )}</h2>

			<ul>
				{/* Description de chaque contribution */}
				<li>
					<h3>Zélie Exposito</h3>

					<p>
						Remerciements pour le soutien moral ainsi que la traduction japonaise de la page d&#39;accueil.
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
	) : null;
}