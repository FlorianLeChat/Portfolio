//
// Page utilisée pour générer le contenu dynamique HTML de la page.
// 	Source : https://nextjs.org/docs/advanced-features/custom-document
//

// Importation des dépendances.
import { Html, Head, Main, NextScript } from "next/document";

export default function Document()
{
	return (
			<Head />
			<body>
		<Html className="theme--bright" lang="en" dir="auto" prefix="og: https://ogp.me/ns#">
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}