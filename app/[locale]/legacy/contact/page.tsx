//
// Route vers la page de contact de l'ancienne version du site.
//

"use client";

// Importation de la feuille de style.
import "./page.scss";

// Importation des dépendances.
import { useTranslations } from "next-intl";
import { useState, type FormEvent } from "react";

// Affichage de la page.
export default function Page()
{
	// Déclaration des variables d'état.
	const t = useTranslations( "legacy" );
	const [ showWarning, setShowWarning ] = useState( "" );
	const [ warningMessage, setWarningMessage ] = useState( "" );

	// Vérification de l'état de validité du champ de saisie.
	const checkField = (
		event: FormEvent<
			HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
		>
	) =>
	{
		// On récupère d'abord l'élément qui a déclenché l'événement.
		const element = event.currentTarget;

		// On vérifie ensuite si le champ est valide.
		if ( !element.validity.valid )
		{
			// Si le champ est invalide, on affiche le message d'erreur
			//  généré par le navigateur.
			setShowWarning( "show" );
			setWarningMessage( element.validationMessage );
		}
		else
		{
			// Dans le cas contraire, on masque le message d'erreur.
			setShowWarning( "hide" );
		}
	};

	// Vérification de l'état de validité du formulaire avant envoi.
	const checkForm = ( event: FormEvent<HTMLFormElement> ) =>
	{
		// On cesse d'abord le comportement par défaut du formulaire.
		event.preventDefault();

		// On récupère ensuite les champs du formulaire.
		const address = event.currentTarget[ 0 ] as HTMLInputElement;
		const subject = event.currentTarget[ 1 ] as HTMLSelectElement;
		const message = event.currentTarget[ 2 ] as HTMLTextAreaElement;

		// On vérifie alors si les champs sont valides ou non.
		if (
			!address.validity.valid
			|| !subject.validity.valid
			|| !message.validity.valid
		)
		{
			return;
		}

		// On ouvre alors une nouvelle fenêtre pour envoyer le courriel
		//  via la messagerie GMail.
		const element = event.currentTarget;
		const destination = `admin@${ window.location.hostname }`.replace(
			"www.",
			""
		);

		window.open(
			`https://mail.google.com/mail/?view=cm&fs=1
			&to=${ destination }
			&cc=${ address.value }
			&su=${ subject.value }
			&body=${ encodeURIComponent( message.value ) }`,
			"_blank",
			"noopener noreferrer"
		);

		// On réinitialise enfin tous les champs du formulaire.
		element.reset();
	};

	// Affichage du rendu HTML de la page.
	return (
		<section id="form">
			<h4>#contact</h4>

			<h3>{t( "index.contact.title" )}</h3>

			{/* Description */}
			<p>
				{t.rich( "contact.description", {
					i: ( chunks ) => <i>{chunks}</i>
				} )}
			</p>

			{/* Messages de vérification */}
			<p id="warning" className={showWarning}>
				{warningMessage}
			</p>

			{/* Formulaire  */}
			<form method="POST" noValidate onSubmit={checkForm}>
				{/* Adresse électronique */}
				<label htmlFor="email">{t( "contact.form.email" )}</label>

				<input
					id="email"
					type="email"
					onInput={checkField}
					minLength={10}
					maxLength={40}
					spellCheck="false"
					placeholder="jeandupont@mail.com"
					autoComplete="email"
					required
				/>

				<span />

				{/* Sujet de la prise de contact */}
				<label htmlFor="subject">{t( "contact.form.subject" )}</label>

				<select id="subject" onInput={checkField}>
					<option disabled>{t( "contact.form.subject" )}</option>
					<option>{t( "contact.form.subject_1" )}</option>
					<option>{t( "contact.form.subject_2" )}</option>
					<option>{t( "contact.form.subject_3" )}</option>
				</select>

				{/* Contenu du message */}
				<label htmlFor="content">{t( "contact.form.content" )}</label>

				<textarea
					id="content"
					onInput={checkField}
					minLength={50}
					maxLength={4000}
					placeholder={
						t.rich( "index.contact.message", {
							br: () => "\n"
						} ) as string
					}
					required
				/>

				<span />

				{/* Soumission */}
				<input type="submit" value="Envoyer" />
			</form>
		</section>
	);
}