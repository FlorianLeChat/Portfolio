// https://github.com/pacocoursey/next-themes/blob/cd67bfa20ef6ea78a814d65625c530baae4075ef/packages/next-themes/src/index.tsx
"use client";

import { useMemo,
    useState,
    useEffect,
    useContext,
    useCallback,
    createContext,
    type ReactNode } from "react";

interface UseThemeProps
{
    theme?: string;
    setTheme: ( value: string ) => void;
}

interface ThemeProviderProps
{
    children?: ReactNode;
}

const storageKey = "NEXT_THEME";
const ThemeContext = createContext<UseThemeProps | undefined>( undefined );
const defaultContext: UseThemeProps = { theme: "light", setTheme: () => {} };

function Theme( { children = null }: Readonly<ThemeProviderProps> )
{
    const getCurrentTheme = ( key: string ) =>
    {
        if ( typeof globalThis.window === "undefined" )
        {
            return "light";
        }

        return localStorage.getItem( key ) ?? "light";
    };

    const getSystemTheme = ( event?: MediaQueryList | MediaQueryListEvent ) =>
    {
        if ( typeof globalThis.window === "undefined" )
        {
            return "light";
        }

        const media = event
            ? null
            : globalThis.window.matchMedia( "(prefers-color-scheme: dark)" );

        return media?.matches ? "dark" : "light";
    };

    const [ theme, setTheme ] = useState( () => getCurrentTheme( storageKey ) );

    const applyTheme = useCallback( ( value: string ) =>
    {
        if ( value !== "light" && value !== "dark" )
        {
            return;
        }

        setTheme( value );

        localStorage.setItem( storageKey, value );

        const element = document.documentElement;
        element.classList.remove( "light", "dark" );
        element.classList.add( value );
    }, [] );

    const detectMedia = useCallback(
        ( event: MediaQueryListEvent | MediaQueryList ) =>
        {
            applyTheme( getSystemTheme( event ) );
        },
        [ applyTheme ]
    );

    const detectStorage = useCallback(
        ( event: StorageEvent ) =>
        {
            if ( event.key !== storageKey )
            {
                return;
            }

            applyTheme( event.newValue ?? theme );
        },
        [ applyTheme, theme ]
    );

    useEffect( () =>
    {
        const media = globalThis.window.matchMedia( "(prefers-color-scheme: dark)" );

        media.addEventListener( "change", detectMedia );

        return () => media.removeEventListener( "change", detectMedia );
    }, [ detectMedia ] );

    useEffect( () =>
    {
        globalThis.window.addEventListener( "storage", detectStorage );

        return () => globalThis.window.removeEventListener( "storage", detectStorage );
    }, [ detectStorage ] );

    const value = useMemo(
        () => ( { theme, setTheme: applyTheme } ),
        [ theme, applyTheme ]
    );

    return (
        <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
    );
}

export const useTheme = () => useContext( ThemeContext ) ?? defaultContext;

export default function ThemeProvider( { children = null }: Readonly<ThemeProviderProps> )
{
    return <Theme>{children}</Theme>;
}

export function ThemeSwitcher()
{
    return (
        <script
            dangerouslySetInnerHTML={{
                __html: `
const theme = localStorage.getItem("${ storageKey }");
const element = document.documentElement;
const classes = element.classList;

classes.remove("light", "dark");

if (theme === "light" || theme === "dark")
{
    classes.add(theme)
}
else
{
    const target = globalThis.window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";

    classes.add(target);

    localStorage.setItem("${ storageKey }", target);
}`
            }}
        />
    );
}
