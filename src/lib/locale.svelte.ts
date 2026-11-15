import { baseLocale,
    getLocale,
    locales,
    overwriteGetLocale,
    getTextDirection,
    type Locale } from "#lib/locales/runtime.js";

// Pinned to the base locale until `revealLocale()`: the prerender is English, and hydrating it with
// French text would leave every attribute in English.
const detect = getLocale;

const state = $state<{ locale: Locale }>( { locale: baseLocale } );

overwriteGetLocale( () => state.locale );

/// The locale the page is currently rendered in, reactive.
///
/// @return {Locale} Active locale.
/// @author Claude
export const currentLocale = () => state.locale;

/// Switches from the prerendered locale to the one the visitor asked for.
///
/// Called once the page is mounted. It also updates `<html>`, which the
/// prerender could only write for the base locale.
///
/// @author Claude
export const revealLocale = () =>
{
    const detected = detect();

    document.documentElement.lang = detected;
    document.documentElement.dir = getTextDirection( detected );

    state.locale = detected;
};

/// Picks the language the switch in the header leads to.
///
/// @param {Locale} current - Locale the page is rendered in.
/// @return {Locale} The first other locale the site is published in.
/// @author Claude
export const otherLocale = ( current: Locale ): Locale => locales.find( ( locale ) => locale !== current ) ?? current;
