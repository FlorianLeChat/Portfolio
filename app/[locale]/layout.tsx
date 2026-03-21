import pick from "lodash/pick";
import { Poppins } from "next/font/google";
import { lazy, type ReactNode } from "react";
import { NextIntlClientProvider } from "next-intl";
import { setRequestLocale, getMessages } from "next-intl/server";

import type { Metadata, Viewport } from "next";

import { getLanguages } from "@/utilities/i18n";
import { fetchMetadata } from "@/utilities/metadata";

import Footer from "./components/footer";
import Credits from "./components/credits";
import { ThemeSwitcher } from "./components/theme-provider";

const Header = lazy( () => import( "./components/header" ) );
const ScrollTop = lazy( () => import( "./components/scroll-top" ) );
const ThemeProvider = lazy( () => import( "./components/theme-provider" ) );
const BirthdayEffect = lazy( () => import( "./components/birthday-effect" ) );

export const viewport: Viewport = {
    viewportFit: "cover",
    themeColor: [
        { media: "(prefers-color-scheme: light)", color: "#306cc4" },
        { media: "(prefers-color-scheme: dark)", color: "#807ae8" }
    ]
};

export async function generateMetadata(): Promise<Metadata>
{
    return fetchMetadata();
}

const languages = getLanguages();

export function generateStaticParams()
{
    return languages.map( ( locale ) => ( { locale } ) );
}

const poppins = Poppins( {
    weight: [ "400", "500", "600", "700" ],
    subsets: [ "latin" ],
    display: "swap"
} );

export default async function Layout( {
    children,
    params
}: Readonly<{
    children: ReactNode;
    params: Promise<{ locale: string }>;
}> )
{
    const { locale } = await params;

    setRequestLocale( locale );

    if ( !languages.includes( locale ) )
    {
        return null;
    }

    const messages = await getMessages();

    return (
        <html lang={locale} style={poppins.style} className="antialiased" suppressHydrationWarning>
            <head>
                <ThemeSwitcher />
            </head>

            <body>
                <ThemeProvider>
                    <NextIntlClientProvider
                        locale={locale}
                        messages={pick( messages, "modals", "landing" )}
                        timeZone={process.env.TZ}
                    >
                        <Credits />
                        <Header />

                        {children}

                        <BirthdayEffect />
                        <ScrollTop />
                        <Footer />
                    </NextIntlClientProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}
