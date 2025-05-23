//
// Composant de la section de contact avec choix de la messagerie.
//

"use client";

import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import type { MouseEvent } from "react";
import { useTranslations } from "next-intl";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";

export default function Home()
{
	// Déclaration des variables d'état.
	const messages = useTranslations();

	// Envoi d'un courriel après sélection de la messagerie.
	const sendMail = async ( event: MouseEvent<HTMLButtonElement> ) =>
	{
		// On cesse d'abord le comportement par défaut du lien.
		event.preventDefault();

		// On importe ensuite la bibliothèque SweetAlert2.
		const Swal = ( await import( "sweetalert2" ) ).default;

		// On affiche ensuite la boîte de dialogue pour la
		//  sélection de la messagerie.
		const { value: service } = await Swal.fire( {
			icon: "question",
			text: messages( "modals.mailer_description" ),
			title: messages( "modals.mailer_title" ),
			input: "radio",
			inputOptions: {
				google: messages( "modals.mailer_google" ),
				default: messages( "modals.mailer_default" )
			},
			inputValidator: ( value ) => ( !value && messages( "modals.mailer_error" ) ) || null
		} );

		// On ouvre enfin la messagerie sélectionnée.
		switch ( service )
		{
			case "google":
				// On ouvre la messagerie GMail.
				window.open(
					"https://mail.google.com/mail/?view=cm&fs=1&to=contact@florian-dev.fr",
					"_blank"
				);
				break;

			case "default":
				// On ouvre la messagerie par défaut.
				window.open( "mailto:contact@florian-dev.fr", "_blank" );
				break;

			default:
				// On ne fait rien.
				break;
		}
	};

	// Affichage du rendu HTML de la page.
	return (
		<section id="contact">
			{/* Section de contact */}
			<h2>{messages( "landing.header_contact" )}</h2>

			{/* Liens vers les réseaux sociaux */}
			<ul>
				<li>
					<button type="button" onClick={sendMail}>
						<FontAwesomeIcon icon={faEnvelope} />
						{messages( "landing.footer_mail" )}
					</button>
				</li>

				<li>
					<a
						rel="noopener noreferrer"
						href="https://github.com/FlorianLeChat"
						target="_blank"
					>
						<FontAwesomeIcon icon={faGithub} />
						GitHub
					</a>
				</li>

				<li>
					<a
						rel="noopener noreferrer"
						href="https://www.linkedin.com/in/florian-trayon/"
						target="_blank"
					>
						<FontAwesomeIcon icon={faLinkedin} />
						LinkedIn
					</a>
				</li>
			</ul>
		</section>
	);
}