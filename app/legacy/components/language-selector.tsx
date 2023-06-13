//
// Composant du sélecteur de langue de l'ancienne version du site.
//

import { lazy } from "react";
import { useTranslation } from "@/utilities/ServerTranslations";

const ScrollTop = lazy( () => import( "./scroll-top" ) );

export default async function LanguageSelector()
{
	// Déclaration des constantes.
	const { t } = await useTranslation();

	// Affichage du rendu HTML du composant.
	return (
		<aside>
			{/* Sélection de la langue */}
			<ul id="flags">
				<li>
					<button type="button">
						<i className="fi fi-fr" />
						<span>{t( "pages.legacy.language.fr" )}</span>
					</button>
				</li>
				<li>
					<button type="button">
						<i className="fi fi-gb" />
						<span>{t( "pages.legacy.language.en" )}</span>
					</button>
				</li>
				<li>

					<button type="button">
						<i className="fi fi-es" />
						<span>{t( "pages.legacy.language.es" )}</span>
					</button>
				</li>
				<li>
					<button type="button">
						<i className="fi fi-jp" />
						<span>{t( "pages.legacy.language.jp" )}</span>
					</button>
				</li>
			</ul>

			{/* Retour au début de la page */}
			<ScrollTop />
		</aside>
	);
}