<script lang="ts">
    import "#lib/styles/globals.scss";

    import "sanitize.css/forms.css";
    import "sanitize.css/assets.css";
    import "sanitize.css/sanitize.css";
    import "sanitize.css/system-ui.css";
    import "sanitize.css/typography.css";
    import "sanitize.css/ui-monospace.css";
    import "sanitize.css/reduce-motion.css";

    import { asset } from "$app/paths";
    import * as m from "#lib/locales/messages.js";
    import Footer from "#lib/components/Footer.svelte";
    import Header from "#lib/components/Header.svelte";
    import ScrollTop from "#lib/components/ScrollTop.svelte";
    import { PUBLIC_ANALYTICS_ENABLED,
        PUBLIC_ANALYTICS_ENDPOINT,
        PUBLIC_ANALYTICS_PROJECT_ID,
        PUBLIC_ANALYTICS_RESPECT_DNT } from "$app/env/public";

    let { children } = $props();
</script>

<svelte:head>
    <link rel="icon" href={asset( "assets/favicons/16x16.webp" )} type="image/webp" sizes="16x16" />
    <link rel="icon" href={asset( "assets/favicons/32x32.webp" )} type="image/webp" sizes="32x32" />
    <link rel="icon" href={asset( "assets/favicons/48x48.webp" )} type="image/webp" sizes="48x48" />
    <link rel="icon" href={asset( "assets/favicons/192x192.webp" )} type="image/webp" sizes="192x192" />
    <link rel="icon" href={asset( "assets/favicons/512x512.webp" )} type="image/webp" sizes="512x512" />
    <link rel="apple-touch-icon" href={asset( "assets/favicons/180x180.webp" )} type="image/webp" sizes="180x180" />
    <link rel="manifest" href={asset( "manifest.webmanifest" )} crossorigin="use-credentials" />

    {#if PUBLIC_ANALYTICS_ENABLED}
        <script
            src={PUBLIC_ANALYTICS_ENDPOINT + "/script.js"}
            defer
            data-website-id={PUBLIC_ANALYTICS_PROJECT_ID}
            data-performance="true"
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

<a href="#content">{m.landing_header_skip()}</a>

<Header />

{@render children()}

<ScrollTop />
<Footer />

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
