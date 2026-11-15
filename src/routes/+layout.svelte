<script lang="ts">
    import "#lib/styles/globals.scss";

    import "sanitize.css/forms.css";
    import "sanitize.css/assets.css";
    import "sanitize.css/sanitize.css";
    import "sanitize.css/system-ui.css";
    import "sanitize.css/typography.css";
    import "sanitize.css/ui-monospace.css";
    import "sanitize.css/reduce-motion.css";

    import { onMount } from "svelte";
    import { asset } from "$app/paths";
    import * as m from "#lib/locales/messages.js";
    import Footer from "#lib/components/Footer.svelte";
    import Header from "#lib/components/Header.svelte";
    import ScrollTop from "#lib/components/ScrollTop.svelte";
    import { PUBLIC_VERSION,
        PUBLIC_ANALYTICS_ENABLED,
        PUBLIC_ANALYTICS_ENDPOINT,
        PUBLIC_ANALYTICS_PROJECT_ID,
        PUBLIC_ANALYTICS_RESPECT_DNT,
        PUBLIC_ANALYTICS_ENVIRONMENT } from "$app/env/public";
    import { currentLocale, revealLocale } from "#lib/locale.svelte.ts";

    let { children } = $props();
    let canTrack = $state( false );

    /**
     * Tells whether the analytics scripts may load for this visitor.
     *
     * The recorder has no privacy option and the tracker ignores Global Privacy
     * Control, so honouring Do Not Track or GPC means never loading them. Runs
     * in `onMount` since the prerender cannot read the browser's preference.
     * The cast covers GPC, missing from TypeScript's DOM library.
     *
     * @returns `true` when the visitor sends no opt-out signal that applies.
     * @author Claude
     */
    const isTrackingAllowed = (): boolean =>
    {
        const privacyNavigator = navigator as Navigator & { globalPrivacyControl?: boolean };
        const respectOptOut = PUBLIC_ANALYTICS_RESPECT_DNT;
        const dntRequested = [ "1", "yes" ].includes( privacyNavigator.doNotTrack ?? "" );
        const gpcRequested = privacyNavigator.globalPrivacyControl === true;
        const optedOut = dntRequested || gpcRequested;

        return !( respectOptOut && optedOut );
    };

    onMount( () =>
    {
        revealLocale();

        canTrack = isTrackingAllowed();
    } );
</script>

<svelte:head>
    <link rel="icon" href={asset( "assets/favicons/16x16.webp" )} type="image/webp" sizes="16x16" />
    <link rel="icon" href={asset( "assets/favicons/32x32.webp" )} type="image/webp" sizes="32x32" />
    <link rel="icon" href={asset( "assets/favicons/48x48.webp" )} type="image/webp" sizes="48x48" />
    <link rel="icon" href={asset( "assets/favicons/192x192.webp" )} type="image/webp" sizes="192x192" />
    <link rel="icon" href={asset( "assets/favicons/512x512.webp" )} type="image/webp" sizes="512x512" />
    <link rel="apple-touch-icon" href={asset( "assets/favicons/180x180.webp" )} type="image/webp" sizes="180x180" />
    <link rel="manifest" href={asset( "manifest.webmanifest" )} crossorigin="anonymous" />

    {#if PUBLIC_ANALYTICS_ENABLED && canTrack}
        <script
            src={PUBLIC_ANALYTICS_ENDPOINT + "/script.js"}
            defer
            data-errors="true"
            data-release={PUBLIC_VERSION}
            data-website-id={PUBLIC_ANALYTICS_PROJECT_ID}
            data-performance="true"
            data-environment={PUBLIC_ANALYTICS_ENVIRONMENT}
            data-do-not-track={PUBLIC_ANALYTICS_RESPECT_DNT}
            data-exclude-hash="true"
            data-exclude-search="true"
        ></script>

        <script
            src={PUBLIC_ANALYTICS_ENDPOINT + "/recorder.js"}
            defer
            data-website-id={PUBLIC_ANALYTICS_PROJECT_ID}
        ></script>
    {/if}
</svelte:head>

{#key currentLocale()}
    <a href="#content">{m.landing_header_skip()}</a>

    <Header />

    {@render children()}

    <ScrollTop />
    <Footer />
{/key}

<style lang="scss">
    @use "colors";

    a
    {
        top: 0;
        left: 0;
        color: colors.getThemedColor("background");
        z-index: 30;
        padding: 0.75rem 1.25rem;
        position: fixed;
        transform: translateY(-150%);
        transition: transform var(--duration) var(--ease);
        font-weight: 600;
        border-radius: 0 0 var(--radius-md) 0;
        background-color: colors.getThemedColor("primary");

        &:focus-visible
        {
            transform: translateY(0);
        }
    }
</style>
