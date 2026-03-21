"use client";

import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import type { MouseEvent } from "react";
import { useTranslations } from "next-intl";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";

export default function Home()
{
    const messages = useTranslations();

    const sendMail = async ( event: MouseEvent<HTMLButtonElement> ) =>
    {
        event.preventDefault();

        const Swal = ( await import( "sweetalert2" ) ).default;
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

        switch ( service )
        {
            case "google":
                window.open(
                    "https://mail.google.com/mail/?view=cm&fs=1&to=contact@florian-dev.fr",
                    "_blank"
                );
                break;

            case "default":
                window.open( "mailto:contact@florian-dev.fr", "_blank" );
                break;

            default:
                break;
        }
    };

    return (
        <section id="contact">
            <h2>{messages( "landing.header_contact" )}</h2>

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
