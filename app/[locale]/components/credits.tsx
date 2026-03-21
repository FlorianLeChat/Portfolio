import { useLocale, useTranslations } from "next-intl";

export default function Credits()
{
    const messages = useTranslations( "landing" );

    if ( useLocale() !== "ja" )
    {
        return null;
    }

    return (
        <p>
            {messages.rich( "japanese_credits", {
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
