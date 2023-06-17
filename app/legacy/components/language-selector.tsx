//
// Composant du sélecteur de langue de l'ancienne version du site.
//

"use client";

import { lazy } from "react";
import { useTranslation } from "@/utilities/ClientTranslations";
import { useRouter, usePathname } from "next/navigation";

const ScrollTop = lazy( () => import( "./scroll-top" ) );

export default function LanguageSelector()
{
	// Déclaration des constantes.
	const { t } = useTranslation();
	const router = useRouter();
	const pathname = usePathname();

	// Change la langue actuellement sur le site.
	const switchLanguage = ( language: string ) =>
	{
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