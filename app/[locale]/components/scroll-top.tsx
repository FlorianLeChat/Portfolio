"use client";

import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { useTranslations } from "next-intl";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";

export default function ScrollTop()
{
    const messages = useTranslations( "landing" );
    const [ showButton, setShowButton ] = useState( false );

    const scrollToTop = () => window.scrollTo( { top: 0, behavior: "smooth" } );
    const onScroll = () => setShowButton( window.scrollY > 200 );

    // https://github.com/vercel/next.js/issues/6132#issuecomment-790623507
    useEffect( () =>
    {
        onScroll();

        window.addEventListener( "scroll", onScroll );

        return () => window.removeEventListener( "scroll", onScroll );
    }, [] );

    return (
        showButton && (
            <aside>
                <button
                    type="button"
                    title={messages( "scroll_top" )}
                    onClick={scrollToTop}
                    aria-label={messages( "scroll_top" )}
                >
                    <FontAwesomeIcon icon={faArrowUp} />
                </button>
            </aside>
        )
    );
}
