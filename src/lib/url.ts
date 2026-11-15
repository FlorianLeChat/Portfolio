/// Resolves a URL read from a third party and keeps it only when it is `https:`.
///
/// Feeds and APIs are outside the site's control: a `javascript:` or `data:`
/// address would be clickable once placed in an `href`.
///
/// @param {string} value - Address as received, absolute or relative.
/// @param {string} base - URL a relative address is resolved against.
/// @return {string} An absolute `https:` URL, or an empty string when the
///         address is missing, malformed or uses another scheme.
/// @author Claude
export const toSafeUrl = ( value: string, base?: string ): string =>
{
    try
    {
        const url = new URL( value, base );

        return url.protocol === "https:" ? url.href : "";
    }
    catch
    {
        return "";
    }
};
