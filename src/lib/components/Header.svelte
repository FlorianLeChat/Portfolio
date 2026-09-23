<script lang="ts">
    import * as m from "$lib/locales/messages";
    import { onMount } from "svelte";
    import IconX from "~icons/tabler/x";
    import { resolve } from "$app/paths";
    import IconSun from "~icons/tabler/sun-filled";
    import IconMoon from "~icons/tabler/moon-filled";
    import IconMenu2 from "~icons/tabler/menu-2";
    import { themeStore, STORAGE_KEY } from "$lib/theme.svelte";

    let mounted = $state( false );
    let showMenu = $state( false );
    let menuButton = $state<HTMLButtonElement | null>( null );

    const home = resolve( "/" );
    const isLightTheme = $derived( mounted ? themeStore.value === "light" : true );

    // The icon alone carries the state and is hidden from assistive technology,
    // so the accessible name has to say which theme the button switches to.
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

        return () => window.removeEventListener( "storage", handleStorage );
    } );
</script>

<svelte:window onkeydown={handleKeydown} />

<header>
    <a href={home} aria-label={m.landing_header_home()}>
        {m.landing_developer_firstname()[ 0 ]}{m.landing_developer_surname()[ 0 ]}
    </a>

    <nav>
        <ul id="navigation-menu" class:show={showMenu}>
            <li>
                <a href="#projects" onclick={closeMenu}>{m.landing_header_projects()}</a>
            </li>

            <li>
                <a href="#skills" onclick={closeMenu}>{m.landing_header_skills()}</a>
            </li>

            <li>
                <a href="#blog" onclick={closeMenu}>{m.landing_header_blog()}</a>
            </li>

            <li>
                <a href="#contact" onclick={closeMenu}>{m.landing_header_contact()}</a>
            </li>
        </ul>

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
        height: 5rem;
        z-index: 20;
        display: flex;
        position: sticky;
        align-items: center;
        justify-content: space-between;
        background-color: colors.getThemedColor("background");

        @supports ( backdrop-filter: blur( 1px ) )
        {
            backdrop-filter: blur(0.75rem);
            background-color: colors.getThemedAlpha("background", 0.75);
        }

        > a
        {
            width: 2.75rem;
            color: colors.getThemedColor("primary");
            height: 2.75rem;
            border: 2px solid colors.getThemedColor("primary");
            display: flex;
            font-size: 1.1rem;
            transition: color var(--duration) var(--ease), background-color var(--duration) var(--ease);
            font-weight: 700;
            align-items: center;
            border-radius: 50%;
            letter-spacing: 0;
            justify-content: center;

            @media (hover: hover) and (pointer: fine)
            {
                &:hover
                {
                    color: colors.getThemedColor("background");
                    background-color: colors.getThemedColor("primary");
                }
            }
        }
    }

    nav
    {
        gap: 0.5rem;
        display: flex;
        align-items: center;

        > ul
        {
            gap: 1.25rem;
            display: flex;
            align-items: center;

            @media screen and (max-width: 768px)
            {
                gap: 1.5rem;
                width: 0;
                inset: 5rem 0 auto;
                padding: 3rem 0;
                position: absolute;
                overflow: hidden;
                visibility: hidden;
                transition: width var(--duration) var(--ease), visibility var(--duration) var(--ease);
                flex-direction: column;
                background-color: colors.getThemedColor("background");

                &.show
                {
                    width: 100%;
                    visibility: visible;
                }
            }
        }

        li a
        {
            color: colors.getThemedColor("foreground-alt");
            position: relative;
            font-size: 0.95rem;
            font-weight: 500;
            padding-bottom: 0.15rem;

            &::before
            {
                left: 0;
                width: 0;
                bottom: 0;
                height: 0.15rem;
                content: "";
                position: absolute;
                transition: width var(--duration) var(--ease);
                border-radius: var(--radius-pill);
                background-color: colors.getThemedColor("primary");
            }

            @media (hover: hover) and (pointer: fine)
            {
                &:hover
                {
                    color: colors.getThemedColor("primary");

                    &::before
                    {
                        width: 100%;
                    }
                }
            }
        }

        > button
        {
            width: 2.5rem;
            color: colors.getThemedColor("foreground-alt");
            border: none;
            height: 2.5rem;
            cursor: pointer;
            padding: 0;
            display: flex;
            font-size: 1.25rem;
            background: none;
            transition: color var(--duration) var(--ease), background-color var(--duration) var(--ease);
            align-items: center;
            border-radius: 50%;
            justify-content: center;

            @media screen and (max-width: 768px)
            {
                width: 2.75rem;
                height: 2.75rem;
            }

            @media (hover: hover) and (pointer: fine)
            {
                &:hover
                {
                    color: colors.getThemedColor("primary");
                    background-color: colors.getThemedColor("primary-light");
                }
            }
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
