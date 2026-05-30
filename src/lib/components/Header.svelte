<script lang="ts">
    import * as m from "$lib/locales/messages";
    import { onMount } from "svelte";
    import { themeStore } from "$lib/theme.svelte";

    let mounted = $state( false );
    let showMenu = $state( false );

    const isLightTheme = $derived( mounted ? themeStore.value === "light" : true );
    const toggleMenu = () => ( showMenu = !showMenu );

    onMount( () =>
    {
        mounted = true;

        const handleStorage = ( event: StorageEvent ) =>
        {
            if ( event.key !== "COLOR_SCHEME" ) return;
            if ( event.newValue === "light" || event.newValue === "dark" )
            {
                themeStore.apply( event.newValue );
            }
        };

        window.addEventListener( "storage", handleStorage );

        return () => window.removeEventListener( "storage", handleStorage );
    } );
</script>

<header>
    <a rel="noopener noreferrer" href="https://github.com/FlorianLeChat" target="_blank">
        {m.landing_developer_firstname()[ 0 ]}{m.landing_developer_surname()[ 0 ]}
    </a>

    <nav>
        <ul class={showMenu ? "show" : ""}>
            <li>
                <a href="#projects">{m.landing_header_projects()}</a>
            </li>

            <li>
                <a href="#skills">{m.landing_header_skills()}</a>
            </li>

            <li>
                <a href="#contact">{m.landing_header_contact()}</a>
            </li>

            <li>
                <a rel="noopener noreferrer" href="https://blog.florian-dev.fr/" target="_blank">
                    {m.landing_header_blog()}
                </a>
            </li>
        </ul>

        <button
            type="button"
            title={m.landing_header_theme()}
            onclick={() => themeStore.apply( isLightTheme ? "dark" : "light" )}
            aria-label={m.landing_header_theme()}
        >
            <i class="fa-solid fa-moon"></i>
            <i class="fa-solid fa-sun"></i>
        </button>

        <button
            type="button"
            title={m.landing_header_navigation()}
            onclick={toggleMenu}
            aria-label={m.landing_header_navigation()}
        >
            {#if showMenu}
                <i class="fa-solid fa-times"></i>
            {:else}
                <i class="fa-solid fa-bars"></i>
            {/if}
        </button>
    </nav>
</header>

<style>
    :global(html.dark) .fa-moon {
        display: none;
    }

    :global(html:not(.dark)) .fa-sun {
        display: none;
    }
</style>
