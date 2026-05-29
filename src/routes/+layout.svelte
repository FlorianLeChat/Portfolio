<script lang="ts">
    import "$lib/styles/globals.scss";

    import "devicon/devicon.min.css";
    import "sanitize.css/sanitize.css";
    import "sanitize.css/forms.css";
    import "sanitize.css/assets.css";
    import "sanitize.css/system-ui.css";
    import "sanitize.css/typography.css";
    import "sanitize.css/ui-monospace.css";
    import "sanitize.css/reduce-motion.css";

    import "@fortawesome/fontawesome-free/css/solid.min.css";
    import "@fortawesome/fontawesome-free/css/brands.min.css";
    import "@fortawesome/fontawesome-free/css/fontawesome.min.css";

    import Header from "$lib/components/Header.svelte";
    import Footer from "$lib/components/Footer.svelte";
    import { asset } from "$app/paths";
    import ScrollTop from "$lib/components/ScrollTop.svelte";
    import { onMount } from "svelte";
    import BirthdayEffect from "$lib/components/BirthdayEffect.svelte";
    import { themeStore } from "$lib/theme.svelte";

    let { children } = $props();

    onMount( () => themeStore.init() );
</script>

<svelte:head>
    <link rel="icon" href={asset( "/assets/favicons/16x16.webp" )} type="image/webp" sizes="16x16" />
    <link rel="icon" href={asset( "/assets/favicons/32x32.webp" )} type="image/webp" sizes="32x32" />
    <link rel="icon" href={asset( "/assets/favicons/48x48.webp" )} type="image/webp" sizes="48x48" />
    <link rel="icon" href={asset( "/assets/favicons/192x192.webp" )} type="image/webp" sizes="192x192" />
    <link rel="icon" href={asset( "/assets/favicons/512x512.webp" )} type="image/webp" sizes="512x512" />
    <link rel="apple-touch-icon" href={asset( "/assets/favicons/180x180.webp" )} type="image/webp" sizes="180x180" />
    <link rel="manifest" href={asset( "/manifest.webmanifest" )} crossorigin="use-credentials" />
</svelte:head>

<Header />

{@render children()}

<BirthdayEffect />
<ScrollTop />
<Footer />
