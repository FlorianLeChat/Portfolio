//
// Composant des remerciements pour les traductions du site.
//

import { useLocale, useTranslations } from "next-intl";

export default function Credits()
{
	// Déclaration des variables d'état.
	const t = useTranslations( "landing" );

	if ( useLocale() !== "ja" )
	{
		return null;
	}

	// Affichage du rendu HTML du composant.
	return (
		<p>
			{t.rich( "japanese_credits", {
				a: ( chunks ) => (
					<a
						rel="noreferrer noopener"
						href="https://www.linkedin.com/in/z%C3%A9lie-exposito-a61b53230/"
						target="_blank"
					>
						{chunks}
					</a>
				)
			} )}
		</p>
	);
}