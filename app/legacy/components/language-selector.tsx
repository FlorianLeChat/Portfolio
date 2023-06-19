//
// Composant du sélecteur de langue de l'ancienne version du site.
//

"use client";

import { useRouter, usePathname } from "next/navigation";
import { useState, lazy, type MouseEvent } from "react";

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

	// Déclaration des variables d'état.
	const [ firstTime, setFirstTime ] = useState( true );

	// Change la langue actuellement sur le site.
	const switchLanguage = ( event: MouseEvent<HTMLButtonElement>, language: string ) =>
	{
		// On empêche le clic sur la liste des langues la première fois
		//  sur mobile pour éviter de changer la langue par erreur.
		const mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test( navigator.userAgent );

		if ( mobile && firstTime )
		{
			event.preventDefault();

			setFirstTime( false );

			return;
		}

		// On enregistre ensuite la langue dans les cookies.
		document.cookie = `NEXT_LANGUAGE=${ language }; path=${ basePath }`;

		// On actualise enfin la page en demandant le changement de langue.
		router.replace( `${ pathname }?language=${ language }` );
		router.refresh();
	};

	// Affichage du rendu HTML du composant.
	return (
		<aside>
			{/* Sélection de la langue */}
			<ul id="flags">
				<li>
					<button type="button" onClick={( event ) => switchLanguage( event, "fr" )}>
						<i className="fi fi-fr" />
						<span>{t( "pages.legacy.language.fr" )}</span>
					</button>
				</li>

				<li>
					<button type="button" onClick={( event ) => switchLanguage( event, "en" )}>
						<i className="fi fi-gb" />
						<span>{t( "pages.legacy.language.en" )}</span>
					</button>
				</li>

				<li>

					<button type="button" onClick={( event ) => switchLanguage( event, "es" )}>
						<i className="fi fi-es" />
						<span>{t( "pages.legacy.language.es" )}</span>
					</button>
				</li>

				<li>
					<button type="button" onClick={( event ) => switchLanguage( event, "jp" )}>
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