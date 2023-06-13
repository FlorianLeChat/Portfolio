//
// Composant du pied de page de l'ancienne version du site.
//

"use client";

import { useTranslation } from "@/utilities/ClientTranslations";

export default function Footer()
{
	// Déclaration des constantes.
	const { t } = useTranslation();

	// Affichage du rendu HTML du composant.
	return (
		<footer>
			<ul>
				{/* Overlay des contributions */}
				<li><a href="<?= $query; ?>">{t( "pages.legacy.footer.contributions" )}</a></li>

				{/* Interface d'administration (back office) */}
				<li><a href="admin/index.php">{t( "pages.legacy.footer.admin" )}</a></li>

				{/* Dépôt du code source */}
				<li><a href="https://github.com/FlorianLeChat/Portfolio">{t( "pages.legacy.footer.github" )}</a></li>
			</ul>
		</footer>
	);
}