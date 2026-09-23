// The blog feed and the two forges are read on every page load, so the cards
// are never staler than the visit itself. That promise is per visit, not per
// page load: a visitor who reloads four times used to pay four times for the
// same five round trips.
//
// `sessionStorage` collapses those repeats without weakening the guarantee,
// since it dies with the tab. It is never a correctness dependency either:
// private browsing modes can make it throw, and every failure path simply
// falls back to fetching.
const TTL = 15 * 60 * 1000;

type Entry = {
    value: unknown;
    storedAt: number;
};

/// Reads a still valid entry.
///
/// @param {string} key - Storage key.
/// @return {T | null} The cached value, or `null` when absent, expired or
///         unreadable.
/// @author Claude
const read = <T>( key: string ): T | null =>
{
    try
    {
        const raw = sessionStorage.getItem( key );

        if ( !raw ) return null;

        const entry = JSON.parse( raw ) as Entry;

        if ( Date.now() - entry.storedAt > TTL ) return null;

        return entry.value as T;
    }
    catch
    {
        return null;
    }
};

/// Stores an entry, best effort.
///
/// @param {string} key - Storage key.
/// @param {unknown} value - Value to keep until the TTL expires.
/// @author Claude
const write = ( key: string, value: unknown ) =>
{
    try
    {
        sessionStorage.setItem( key, JSON.stringify( { value, storedAt: Date.now() } satisfies Entry ) );
    }
    catch
    {
        // Quota, private browsing or a disabled storage: not worth reacting to.
    }
};

/// Runs a loader through the session cache.
///
/// Empty results are deliberately never stored. A blog that is down for ten
/// seconds would otherwise keep its section hidden for the next fifteen
/// minutes of that tab.
///
/// @param {string} key - Storage key.
/// @param {() => Promise<T>} load - The loader to run on a miss.
/// @return {Promise<T>} The cached value when there is one, the freshly
///         loaded value otherwise.
/// @author Claude
export const withCache = async <T>( key: string, load: () => Promise<T> ): Promise<T> =>
{
    const cached = read<T>( key );

    if ( cached !== null ) return cached;

    const value = await load();
    const isEmpty = value === null || ( Array.isArray( value ) && value.length === 0 );

    if ( !isEmpty ) write( key, value );

    return value;
};
