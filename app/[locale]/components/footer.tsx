import { faPhp } from "@fortawesome/free-brands-svg-icons";
import { getTranslations } from "next-intl/server";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default async function Footer()
{
    const messages = await getTranslations();

    return (
        <footer>
            <span>
                {messages.rich( "landing.footer_madeby", {
                    a: ( chunks ) => (
                        <a
                            rel="noopener noreferrer"
                            href="https://github.com/FlorianLeChat"
                            target="_blank"
                        >
                            {chunks}
                        </a>
                    )
                } )}

                <small>&copy; {new Date().getFullYear()}</small>
            </span>

            <small>
                <FontAwesomeIcon icon={faPhp} />

                {messages.rich( "landing.footer_legacy", {
                    a: ( chunks ) => (
                        <a href="https://legacy.florian-dev.fr/portfolio/">
                            {chunks}
                        </a>
                    )
                } )}
            </small>

            <code>
                {messages( "landing.footer_version", {
                    version: process.env.NEXT_PUBLIC_VERSION ?? "0.0.1"
                } )}
            </code>
        </footer>
    );
}
