<script lang="ts">
    import { onMount } from "svelte";
    import IconX from "~icons/tabler/x";
    import { resolve } from "$app/paths";
    import IconMenu2 from "~icons/tabler/menu-2";
    import * as m from "#lib/locales/messages.js";
    import IconSun from "~icons/tabler/sun-filled";
    import IconMoon from "~icons/tabler/moon-filled";
    import { themeStore, STORAGE_KEY } from "#lib/theme.svelte.ts";
    import { setLocale } from "#lib/locales/runtime.js";
    import { currentLocale, otherLocale } from "#lib/locale.svelte.ts";

    const SECTIONS = [ "projects", "skills", "blog", "contact" ];

    let active = $state( "" );
    let mounted = $state( false );
    let showMenu = $state( false );
    let header = $state<HTMLElement | null>( null );
    let menuButton = $state<HTMLButtonElement | null>( null );

    const home = resolve( "/" );
    const isLightTheme = $derived( mounted ? themeStore.value === "light" : true );
    const alternate = $derived( otherLocale( currentLocale() ) );
    const themeLabel = $derived( isLightTheme ? m.landing_header_theme_dark() : m.landing_header_theme_light() );

    const closeMenu = () => ( showMenu = false );
    const toggleMenu = () => ( showMenu = !showMenu );

    /// Closes the mobile menu and hands the focus back to the button that
    /// opened it, which would otherwise be left on a hidden element.
    ///
    /// @author Claude
    const dismissMenu = () =>
    {
        if ( !showMenu ) return;

        showMenu = false;

        menuButton?.focus();
    };

    /// Closes the mobile menu on `Escape`.
    ///
    /// @param {KeyboardEvent} event - The key press being handled.
    /// @author Claude
    const handleKeydown = ( event: KeyboardEvent ) =>
    {
        if ( event.key === "Escape" ) dismissMenu();
    };

    /// Closes the mobile menu when the visitor taps anywhere outside the
    /// header, the way a dropdown is expected to behave.
    ///
    /// @param {MouseEvent} event - The click being handled.
    /// @author Claude
    const handleOutsideClick = ( event: MouseEvent ) =>
    {
        if ( !showMenu || !header ) return;

        // The path is recorded at dispatch, whereas `contains()` would test the
        // target as it is now: the menu icon that was tapped has already been
        // swapped for the close icon and detached, so it reads as outside.
        if ( event.composedPath().includes( header ) ) return;

        closeMenu();
    };

    /// Switches the language. Paraglide stores the choice, so the browser
    /// language no longer decides for a visitor who picked one, and reloads the
    /// page: the messages are plain functions, not reactive values.
    ///
    /// @author Claude
    const switchLocale = () => setLocale( alternate );

    onMount( () =>
    {
        mounted = true;

        const handleStorage = ( event: StorageEvent ) =>
        {
            if ( event.key !== STORAGE_KEY ) return;
            if ( event.newValue === "light" || event.newValue === "dark" )
            {
                themeStore.apply( event.newValue );
            }
        };

        window.addEventListener( "storage", handleStorage );

        const observer = new IntersectionObserver( ( entries ) =>
        {
            for ( const entry of entries )
            {
                if ( entry.isIntersecting )
                {
                    active = entry.target.id;
                }
                else if ( active === entry.target.id )
                {
                    active = "";
                }
            }
        }, { rootMargin: "-45% 0px -54% 0px" } );

        for ( const id of SECTIONS )
        {
            const section = document.getElementById( id );

            if ( section ) observer.observe( section );
        }

        return () =>
        {
            observer.disconnect();

            window.removeEventListener( "storage", handleStorage );
        };
    } );
</script>

<svelte:window onkeydown={handleKeydown} onclick={handleOutsideClick} />

<header bind:this={header}>
    <a href={home} aria-label={m.landing_header_home()}>
        ft<span aria-hidden="true">_</span>
    </a>

    <nav aria-label={m.landing_header_landmark()}>
        <ul id="navigation-menu" class:show={showMenu}>
            <li>
                <a href="#projects" onclick={closeMenu} aria-current={active === "projects" ? "true" : undefined}>{m.landing_header_projects()}</a>
            </li>

            <li>
                <a href="#skills" onclick={closeMenu} aria-current={active === "skills" ? "true" : undefined}>{m.landing_header_skills()}</a>
            </li>

            <li>
                <a href="#blog" onclick={closeMenu} aria-current={active === "blog" ? "true" : undefined}>{m.landing_header_blog()}</a>
            </li>

            <li>
                <a href="#contact" onclick={closeMenu} aria-current={active === "contact" ? "true" : undefined}>{m.landing_header_contact()}</a>
            </li>
        </ul>

        <button
            type="button"
            lang={alternate}
            title={m.landing_header_language()}
            onclick={switchLocale}
            aria-label={m.landing_header_language()}
        >
            {alternate}
        </button>

        <button
            type="button"
            title={themeLabel}
            onclick={() => themeStore.apply( isLightTheme ? "dark" : "light" )}
            aria-label={themeLabel}
        >
            {#if isLightTheme}
                <IconMoon aria-hidden="true" />
            {:else}
                <IconSun aria-hidden="true" />
            {/if}
        </button>

        <button
            bind:this={menuButton}
            type="button"
            title={m.landing_header_navigation()}
            onclick={toggleMenu}
            aria-label={m.landing_header_navigation()}
            aria-expanded={showMenu}
            aria-controls="navigation-menu"
        >
            {#if showMenu}
                <IconX aria-hidden="true" />
            {:else}
                <IconMenu2 aria-hidden="true" />
            {/if}
        </button>
    </nav>
</header>

<style lang="scss">
    @use "colors";

    header
    {
        top: 0;
        gap: 1rem;
        height: 4.5rem;
        z-index: 20;
        display: flex;
        position: sticky;
        align-items: center;
        justify-content: space-between;
        background-color: colors.getThemedColor("background");

        // The header is as narrow as the content, so its background is carried
        // out to both edges of the window by a shadow, clipped to the header's
        // own height. On a pseudo element, because clipping the header itself
        // would also cut off the mobile menu that unrolls below it.
        &::before
        {
            inset: 0;
            content: "";
            z-index: -1;
            position: absolute;
            clip-path: inset( 0 -100vmax );
            box-shadow: 0 0 0 100vmax colors.getThemedColor("background");
            background-color: colors.getThemedColor("background");
        }

        @media screen and (max-width: 768px)
        {
            &:has( ul.show )::after
            {
                inset: 4.5rem 0 0;
                content: "";
                z-index: -1;
                position: fixed;
                background-color: colors.getThemedAlpha("foreground", 0.4);
            }
        }

        > a
        {
            color: colors.getThemedColor("foreground-alt");
            padding: 0.5rem 0;
            display: inline-flex;
            min-width: 2.75rem;
            font-size: 1.15rem;
            min-height: 2.75rem;
            font-weight: 700;
            align-items: center;
            font-family: var(--font-mono);
            letter-spacing: -0.04em;

            > span
            {
                color: colors.getThemedColor("primary");
            }
        }
    }

    nav
    {
        gap: 0.25rem;
        display: flex;
        align-items: center;

        > ul
        {
            gap: 0.25rem;
            display: flex;
            align-items: center;
            margin-right: 0.75rem;

            @media screen and (max-width: 768px)
            {
                gap: 0;
                inset: 4.5rem 0 auto;
                margin: 0 -4vw;
                padding: 0.5rem 4vw 1.5rem;
                position: absolute;
                clip-path: inset( 0 0 100% 0 );
                visibility: hidden;
                box-shadow: colors.getThemedColor("container-shadow");
                transition: clip-path calc( var(--duration) * 1.5 ) var(--ease), visibility calc( var(--duration) * 1.5 ) var(--ease);
                align-items: stretch;
                border-bottom: 1px solid colors.getThemedColor("border");
                flex-direction: column;
                background-color: colors.getThemedColor("background");

                &.show
                {
                    clip-path: inset( 0 0 -2rem 0 );
                    visibility: visible;
                }
            }
        }

        li a
        {
            color: colors.getThemedColor("foreground");
            display: flex;
            padding: 0.5rem 0.75rem;
            font-size: 0.85rem;
            min-height: 2.75rem;
            transition: color var(--duration) var(--ease);
            align-items: center;
            font-family: var(--font-mono);
            text-underline-offset: 0.35em;

            @media screen and (max-width: 768px)
            {
                padding: 0.75rem 0;
                font-size: 1rem;
                border-bottom: 1px solid colors.getThemedColor("border");
            }

            &:hover, &[aria-current]
            {
                color: colors.getThemedColor("primary");
                text-decoration: underline;
            }
        }

        > button
        {
            width: 2.75rem;
            color: colors.getThemedColor("foreground");
            border: none;
            cursor: pointer;
            height: 2.75rem;
            padding: 0;
            display: flex;
            font-size: 1.15rem;
            background: none;
            transition: color var(--duration) var(--ease), background-color var(--duration) var(--ease);
            align-items: center;
            border-radius: var(--radius-sm);
            justify-content: center;

            &:hover
            {
                color: colors.getThemedColor("primary");
                background-color: colors.getThemedColor("primary-light");
            }
        }

        > button:first-of-type
        {
            font-size: 0.8rem;
            font-weight: 600;
            font-family: var(--font-mono);
            text-transform: uppercase;
        }

        > button:last-of-type
        {
            display: none;

            @media screen and (max-width: 768px)
            {
                display: flex;
            }
        }
    }
</style>
