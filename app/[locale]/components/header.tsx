"use client";

import { faSun,
    faMoon,
    faBars,
    faTimes } from "@fortawesome/free-solid-svg-icons";
import { useTranslations } from "next-intl";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from "react";
import { useTheme } from "./theme-provider";

export default function Header()
{
    const messages = useTranslations( "landing" );
    const { theme, setTheme } = useTheme();
    const [ mounted, setMounted ] = useState( false );
    const [ showMenu, setShowMenu ] = useState( false );

    const isLightTheme = mounted ? theme === "light" : true;
    const toggleMenu = () => setShowMenu( !showMenu );

    useEffect( () =>
    {
        setMounted( true );
    }, [] );

    return (
        <header>
            <a
                rel="noopener noreferrer"
                href="https://github.com/FlorianLeChat"
                target="_blank"
            >
                {messages( "developer_firstname" )[ 0 ] + messages( "developer_surname" )[ 0 ]}
            </a>

            <nav>
                <ul className={showMenu ? "show" : ""}>
                    <li>
                        <a href="#projects">{messages( "header_projects" )}</a>
                    </li>

                    <li>
                        <a href="#skills">{messages( "header_skills" )}</a>
                    </li>

                    <li>
                        <a href="#contact">{messages( "header_contact" )}</a>
                    </li>

                    <li>
                        <a
                            rel="noopener noreferrer"
                            href="https://blog.florian-dev.fr/"
                            target="_blank"
                        >
                            {messages( "header_blog" )}
                        </a>
                    </li>
                </ul>

                <button
                    type="button"
                    title={messages( "header_theme" )}
                    onClick={() => setTheme( isLightTheme ? "dark" : "light" )}
                    aria-label={messages( "header_theme" )}
                >
                    <FontAwesomeIcon icon={isLightTheme ? faMoon : faSun} />
                </button>

                <button
                    type="button"
                    title={messages( "header_navigation" )}
                    onClick={toggleMenu}
                    aria-label={messages( "header_navigation" )}
                >
                    <FontAwesomeIcon icon={showMenu ? faTimes : faBars} />
                </button>
            </nav>
        </header>
    );
}
