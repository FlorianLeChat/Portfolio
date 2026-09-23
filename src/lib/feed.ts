import { env } from "$env/dynamic/public";
import { withCache } from "$lib/cache";
import type { Post } from "$lib/types/Post";

// The feed is read in the browser on every visit rather than baked at build
// time, so the cards are never older than the page the visitor is looking at.
// `DOMParser` does the parsing, which means no XML library ships to the client.
export const MAX_POSTS = 3;

export const FEED_URL = env.PUBLIC_BLOG_FEED_URL ?? "https://blog.florian-dev.fr/feed.xml";

// Named entities a French blog realistically emits. Numeric forms are handled
// generically below, so this only has to cover the named spellings.
const NAMED_ENTITIES: Record<string, string> = {
    amp: "&",
    lt: "<",
    gt: ">",
    quot: "\"",
    apos: "'",
    nbsp: " ",
    agrave: "à",
    acirc: "â",
    ccedil: "ç",
    eacute: "é",
    egrave: "è",
    ecirc: "ê",
    euml: "ë",
    icirc: "î",
    iuml: "ï",
    ocirc: "ô",
    oelig: "œ",
    ugrave: "ù",
    ucirc: "û",
    uuml: "ü",
    laquo: "«",
    raquo: "»",
    lsquo: "‘",
    rsquo: "’",
    ldquo: "“",
    rdquo: "”",
    ndash: "–",
    mdash: "—",
    hellip: "…",
    deg: "°",
    euro: "€",
    times: "×"
};

// One pass over numeric and named forms together. Running separate passes would
// let `&#38;eacute;` decode twice and turn into a character the feed never had.
const ENTITY_PATTERN = /&(#\d+|#x[0-9a-f]+|[a-z]+[0-9]*);/gi;

/// Resolves a numeric entity to its character.
///
/// `String.fromCodePoint` throws on anything outside the Unicode range, and a
/// single `&#1114112;` in one article used to take the whole blog section down
/// with it.
///
/// @param {number} code - Code point read from the entity.
/// @return {string | null} The character, or `null` when the code point is not
///         a valid one.
/// @author Claude
const toCharacter = ( code: number ): string | null =>
    Number.isInteger( code ) && code >= 0 && code <= 0x10ffff ? String.fromCodePoint( code ) : null;

/// Decodes HTML entities in a string.
///
/// @param {string} value - Text possibly containing entities.
/// @return {string} The same text with entities resolved; unknown named
///         entities are left untouched rather than dropped.
/// @author Claude
const decodeEntities = ( value: string ): string =>
    value.replace( ENTITY_PATTERN, ( match, entity: string ) =>
    {
        const lower = entity.toLowerCase();

        if ( lower.startsWith( "#x" ) ) return toCharacter( parseInt( lower.slice( 2 ), 16 ) ) ?? match;
        if ( lower.startsWith( "#" ) ) return toCharacter( Number( lower.slice( 1 ) ) ) ?? match;

        return NAMED_ENTITIES[ lower ] ?? match;
    } );

/// Turns a feed description into a short plain text excerpt.
///
/// Feed descriptions carry escaped HTML. Both parsers hand that back already
/// unescaped once, so what is left is stripping the tags and resolving any
/// entity that was escaped twice at the source.
///
/// @param {string} html - Raw description content.
/// @param {number} length - Maximum number of characters to keep.
/// @return {string} A single line of plain text.
/// @author Claude
export const toExcerpt = ( html: string, length = 180 ): string =>
{
    const text = decodeEntities( html.replace( /<[^>]*>/g, " " ) ).replace( /\s+/g, " " ).trim();

    return text.length > length ? `${ text.slice( 0, length ).trimEnd() }…` : text;
};

/// Normalises a feed date into ISO 8601.
///
/// @param {string} value - Date as written in the feed, usually RFC 822.
/// @return {string} An ISO string, or an empty string when unparseable.
/// @author Claude
export const toIsoDate = ( value: string ): string =>
{
    const date = new Date( value );

    return Number.isNaN( date.getTime() ) ? "" : date.toISOString();
};

/// Reads the blog feed and returns the most recent posts.
///
/// Every failure path resolves to an empty list, so an unreachable blog leaves
/// the section unrendered instead of breaking the page.
///
/// @return {Promise<Post[]>} At most `MAX_POSTS` entries, newest first.
/// @author Claude
const loadPosts = async (): Promise<Post[]> =>
{
    try
    {
        const response = await fetch( FEED_URL, { signal: AbortSignal.timeout( 8_000 ) } );

        if ( !response.ok ) return [];

        const document = new DOMParser().parseFromString( await response.text(), "application/xml" );

        if ( document.querySelector( "parsererror" ) ) return [];

        const text = ( item: Element, tag: string ) => item.querySelector( tag )?.textContent ?? "";

        return [ ...document.querySelectorAll( "item" ) ].slice( 0, MAX_POSTS ).map( ( item ) => ( {
            title: text( item, "title" ),
            link: text( item, "link" ),
            date: toIsoDate( text( item, "pubDate" ) ),
            excerpt: toExcerpt( text( item, "description" ) )
        } ) );
    }
    catch
    {
        // Network error, timeout or malformed feed: the section stays hidden.
        return [];
    }
};

/// Reads the blog feed, through the session cache.
///
/// @return {Promise<Post[]>} At most `MAX_POSTS` entries, newest first.
/// @author Claude
export const fetchPosts = (): Promise<Post[]> => withCache( "portfolio:feed", loadPosts );
