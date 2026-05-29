const STORAGE_KEY = "COLOR_SCHEME";

class ThemeStore
{
    value = $state<string>( "light" );

    init()
    {
        if ( globalThis.window === undefined ) return;

        const stored = localStorage.getItem( STORAGE_KEY );

        if ( stored === "light" || stored === "dark" )
        {
            this.value = stored;
        }
        else
        {
            const isDark = globalThis.matchMedia( "(prefers-color-scheme: dark)" ).matches;

            this.value = isDark ? "dark" : "light";
        }
    }

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
