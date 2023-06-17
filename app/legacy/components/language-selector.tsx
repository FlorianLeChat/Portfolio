//
// Composant du sélecteur de langue de l'ancienne version du site.
//

"use client";

import { lazy } from "react";
import { useRouter, usePathname } from "next/navigation";

import { getBasePath } from "@/utilities/NextRouter";
import { useTranslation } from "@/utilities/ClientTranslations";

const ScrollTop = lazy( () => import( "./scroll-top" ) );

export default function LanguageSelector()
{
	// Déclaration des constantes.
	const { t } = useTranslation();
	const router = useRouter();
	const pathname = usePathname();
	const basePath = getBasePath( true );

	// Change la langue actuellement sur le site.
	const switchLanguage = ( language: string ) =>
	{
		// On enregistre la langue dans les cookies.
		document.cookie = `NEXT_LANGUAGE=${ language }; path=${ basePath }`;

		// On actualise la page en demandant le changement de langue.
		router.replace( `${ pathname }?language=${ language }` );
		router.refresh();
	};

	// Affichage du rendu HTML du composant.
	return (
		<aside>
			{/* Sélection de la langue */}
			<ul id="flags">
				<li>
					<button type="button" onClick={() => switchLanguage( "fr" )}>
						<i className="fi fi-fr" />
						<span>{t( "pages.legacy.language.fr" )}</span>
					</button>
				</li>

				<li>
					<button type="button" onClick={() => switchLanguage( "en" )}>
						<i className="fi fi-gb" />
						<span>{t( "pages.legacy.language.en" )}</span>
					</button>
				</li>

				<li>

					<button type="button" onClick={() => switchLanguage( "es" )}>
						<i className="fi fi-es" />
						<span>{t( "pages.legacy.language.es" )}</span>
					</button>
				</li>

				<li>
					<button type="button" onClick={() => switchLanguage( "jp" )}>
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