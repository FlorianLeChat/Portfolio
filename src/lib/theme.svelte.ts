import type { Theme } from "$lib/types/Theme";

export const STORAGE_KEY = "portfolio:theme";

const getInitialTheme = (): Theme =>
{
    if ( typeof document === "undefined" ) return "light";

    return document.documentElement.classList.contains( "dark" ) ? "dark" : "light";
};

class ThemeStore
{
    value = $state<Theme>( getInitialTheme() );

    apply( value: string )
    {
        if ( value !== "light" && value !== "dark" ) return;

        this.value = value;

        if ( typeof document !== "undefined" )
        {
            localStorage.setItem( STORAGE_KEY, value );

            document.documentElement.classList.remove( "light", "dark" );
            document.documentElement.classList.add( value );
        }
    }
}

export const themeStore = new ThemeStore();
