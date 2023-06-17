//
// Route vers la page de contact de l'ancienne version du site.
//

// Importation de la feuille de style.
import "./page.scss";

// Importation des dépendances.
import { Trans } from "react-i18next/TransWithoutContext";

// Importation des fonctions utilitaires.
import { useTranslation } from "@/utilities/ServerTranslations";

// Affichage de la page.
export default async function Page()
{
	// Déclaration des constantes.
	const { t } = await useTranslation();

	// Affichage du rendu HTML de la page.
	return (
		<section id="form">
			<h3>#contact</h3>

			<h2>{t( "pages.legacy.index.contact.title" )}</h2>

			{/* Description */}
			<p>
				<Trans
					i18nKey="pages.legacy.contact.description"
					components={{
						i: <i />
					}}
				/>
			</p>

			{/* Messages de vérification */}
			<p id="warning" />

			{/* Formulaire  */}
			<form method="POST" noValidate>
				{/* Adresse électronique */}
				<label htmlFor="email">{t( "pages.legacy.contact.form.email" )}</label>

				<input
					type="email" autoComplete="email" spellCheck="false"
					id="email" name="email" placeholder="jeandupont@mail.com"
					minLength={10} maxLength={40} required
				/>

				<span />

				{/* Sujet de la prise de contact */}
				<label htmlFor="subject">{t( "pages.legacy.contact.form.subject" )}</label>
				<select id="subject" name="subject">
					<option disabled>{t( "pages.legacy.contact.form.subject" )}</option>
					<option>{t( "pages.legacy.contact.form.subject_1" )}</option>
					<option>{t( "pages.legacy.contact.form.subject_2" )}</option>
					<option>{t( "pages.legacy.contact.form.subject_3" )}</option>
				</select>

				{/* Contenu du message */}
				<label htmlFor="content">{t( "pages.legacy.contact.form.content" )}</label>

				<textarea
					id="content" name="content" minLength={50} maxLength={4000} required
					placeholder={t( "pages.legacy.index.contact.message" ).replaceAll( "<br>", "\n" )}
				/>

				<span />

				{/* Soumission */}
				<input type="submit" value="Envoyer" />
			</form>
		</section>
	);
}