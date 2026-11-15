import { toSafeUrl } from "#lib/url.ts";
import { withCache } from "#lib/cache.ts";
import type { Post } from "#lib/types/Post.ts";
import { PUBLIC_BLOG_FEED_URL } from "$app/env/public";

export const MAX_POSTS = 3;

export const FEED_URL = PUBLIC_BLOG_FEED_URL;

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

        if ( lower.startsWith( "#x" ) ) return toCharacter( Number.parseInt( lower.slice( 2 ), 16 ) ) ?? match;
        if ( lower.startsWith( "#" ) ) return toCharacter( Number( lower.slice( 1 ) ) ) ?? match;

        return NAMED_ENTITIES[ lower ] ?? match;
    } );

const NOT_PROSE = "blockquote, figure, pre, h1, h2, h3, h4, h5, h6, script, style";

// The feed does not declare a `<language>`, and every post is written in
// French. A `<language>` element, if one appears, takes precedence.
export const FEED_LANGUAGE = "fr";

/// Brings third party text in line with the typography of the site's own strings.
///
/// The site writes straight apostrophes and, in French, a non breaking space
/// before `:` and a narrow one before `? ! ;`. The feed does neither, so a line
/// could otherwise start with a lone punctuation mark.
///
/// @param {string} text - Title or excerpt read from the feed.
/// @param {string} lang - BCP 47 tag of the post.
/// @return {string} The same text with apostrophes and French spacing fixed.
/// @author Claude
export const toTypography = ( text: string, lang: string ): string =>
{
    const straight = text.replace( /’/g, "'" );

    if ( !lang.toLowerCase().startsWith( "fr" ) ) return straight;

    return straight.replace( / ([?!;])/g, " $1" ).replace( / :/g, " :" );
};

/// Turns a feed description into a short plain text excerpt.
///
/// Feed descriptions carry escaped HTML. Both parsers hand that back already
/// unescaped once, so what is left is reading the prose paragraphs and
/// resolving any entity that was escaped twice at the source.
///
/// @param {string} html - Raw description content.
/// @param {number} length - Maximum number of characters to keep.
/// @return {string} A single line of plain text.
/// @author Claude
export const toExcerpt = ( html: string, length = 180 ): string =>
{
    const body = new DOMParser().parseFromString( html, "text/html" ).body;

    body.querySelectorAll( NOT_PROSE ).forEach( ( node ) => node.remove() );

    const paragraphs = [ ...body.querySelectorAll( "p" ) ].map( ( paragraph ) => paragraph.textContent ?? "" );
    const prose = paragraphs.length > 0 ? paragraphs.join( " " ) : body.textContent ?? "";
    const text = decodeEntities( prose ).replace( /\s+/g, " " ).trim();

    return text.length > length ? `${ text.slice( 0, length ).trimEnd() }…` : text;
};

/// Finds the first picture of a post.
///
/// The feed carries no `enclosure` nor `media:*` element: the pictures only
/// exist inside the description, as relative paths on the blog's own origin.
///
/// @param {string} html - Raw description content.
/// @param {string} base - URL the picture paths are relative to, the feed's.
/// @return {string} An absolute URL, or an empty string when the post has no
///         picture or its address cannot be resolved.
/// @author Claude
export const toImage = ( html: string, base: string ): string =>
{
    const source = new DOMParser().parseFromString( html, "text/html" ).querySelector( "img" )?.getAttribute( "src" );

    return source ? toSafeUrl( source, base ) : "";
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
/// the section with nothing but its link to the blog instead of breaking the
/// page.
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
        const lang = document.querySelector( "channel > language" )?.textContent?.trim() || FEED_LANGUAGE;

        return [ ...document.querySelectorAll( "item" ) ]
            .map( ( item ) => ( {
                lang,
                title: toTypography( text( item, "title" ), lang ),
                link: toSafeUrl( text( item, "link" ).trim(), FEED_URL ),
                date: toIsoDate( text( item, "pubDate" ) ),
                image: toImage( text( item, "description" ), FEED_URL ),
                excerpt: toTypography( toExcerpt( text( item, "description" ) ), lang )
            } ) )
            .filter( ( post ) => post.link !== "" )
            .slice( 0, MAX_POSTS );
    }
    catch
    {
        return [];
    }
};

/// Reads the blog feed, through the session cache.
///
/// @return {Promise<Post[]>} At most `MAX_POSTS` entries, newest first.
/// @author Claude
export const fetchPosts = (): Promise<Post[]> => withCache( "portfolio:feed:v4", loadPosts );
