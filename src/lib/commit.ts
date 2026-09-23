import { env } from "$env/dynamic/public";
import { withCache } from "$lib/cache";
import type { Commit } from "$lib/types/Commit";

// Isomorphic on purpose. The same code prefetches at build time, so the card
// paints immediately, and refreshes in the browser, so a build from three weeks
// ago does not advertise three-week-old activity. Both GitLab and GitHub answer
// with `Access-Control-Allow-Origin: *`, so no proxy is involved.
const GITLAB_API = env.PUBLIC_GITLAB_API_URL ?? "https://git.florian-dev.fr";
const GITLAB_USER = env.PUBLIC_GITLAB_USERNAME ?? "floriantrayon";
const GITHUB_USER = env.PUBLIC_GITHUB_USERNAME ?? "FlorianLeChat";

const TIMEOUT = 8_000;

/// Fetches JSON, resolving to `null` instead of throwing.
///
/// @param {typeof fetch} fetch - The `fetch` implementation to use.
/// @param {string} url - Endpoint to read.
/// @return {Promise<unknown>} The decoded body, or `null` on any failure.
/// @author Claude
const readJson = async ( fetch: typeof globalThis.fetch, url: string ): Promise<unknown> =>
{
    try
    {
        const response = await fetch( url, {
            headers: { Accept: "application/json" },
            signal: AbortSignal.timeout( TIMEOUT )
        } );

        return response.ok ? await response.json() : null;
    }
    catch
    {
        return null;
    }
};

/// Reads the most recent push from the self hosted GitLab instance.
///
/// @param {typeof fetch} fetch - The `fetch` implementation to use.
/// @return {Promise<Commit | null>} The latest push, or `null` when
///         unreachable.
/// @author Claude
const fetchGitLabCommit = async ( fetch: typeof globalThis.fetch ): Promise<Commit | null> =>
{
    const users = await readJson( fetch, `${ GITLAB_API }/api/v4/users?username=${ GITLAB_USER }` );

    // Every field below comes from an API this code does not own, so each one
    // is checked rather than assumed: a shape that drifted used to throw out of
    // here and, through `Promise.all`, take the other forge down with it.
    const user = Array.isArray( users ) ? users[ 0 ] : null;

    if ( !user?.id ) return null;

    const events = await readJson( fetch, `${ GITLAB_API }/api/v4/users/${ user.id }/events?action=pushed&per_page=1` );
    const event = Array.isArray( events ) ? events[ 0 ] : null;

    if ( !event?.push_data?.commit_to || !event.project_id ) return null;

    // Reading the commit rather than the project: the event only carries a
    // `commit_title` that GitLab truncates around seventy characters, whereas
    // this endpoint returns the full title and a ready made web URL.
    const commit = ( await readJson(
        fetch,
        `${ GITLAB_API }/api/v4/projects/${ event.project_id }/repository/commits/${ event.push_data.commit_to }`
    ) ) as { title?: string; web_url?: string } | null;

    if ( !commit?.title || !commit.web_url ) return null;

    return {
        url: commit.web_url,
        date: new Date( event.created_at ).toISOString(),
        title: String( commit.title ),
        source: "gitlab",
        project: String( event.target_title ?? "" )
    };
};

/// Reads the most recent public push from GitHub.
///
/// Unauthenticated requests are capped at 60 per hour per IP. At build time
/// that is the CI runner and in the browser it is the visitor, so neither gets
/// close.
///
/// @param {typeof fetch} fetch - The `fetch` implementation to use.
/// @return {Promise<Commit | null>} The latest push, or `null` when
///         unreachable or rate limited.
/// @author Claude
const fetchGitHubCommit = async ( fetch: typeof globalThis.fetch ): Promise<Commit | null> =>
{
    const events = await readJson( fetch, `https://api.github.com/users/${ GITHUB_USER }/events/public` );

    if ( !Array.isArray( events ) ) return null;

    const event = events.find( ( entry ) => entry.type === "PushEvent" && entry.payload?.commits?.length > 0 );
    const repository = event?.repo?.name;

    if ( !repository || !event.payload.head ) return null;

    const commits = event.payload.commits;
    const last = commits[ commits.length - 1 ];

    return {
        url: `https://github.com/${ repository }/commit/${ event.payload.head }`,
        date: new Date( event.created_at ).toISOString(),
        title: String( last?.message ?? "" ).split( "\n" )[ 0 ],
        source: "github",
        project: String( repository ).split( "/" )[ 1 ] ?? String( repository )
    };
};

/// Returns the most recent public commit across both forges.
///
/// The two lookups run concurrently and are independent: one being down, or
/// answering with something unexpected, never hides the other. That is what
/// `allSettled` buys over `all`, which would have dropped both on the first
/// rejection.
///
/// @param {typeof fetch} fetch - The `fetch` implementation to use.
/// @return {Promise<Commit | null>} The newer of the two, or `null` when
///         neither answered.
/// @author Claude
const loadLatestCommit = async ( fetch: typeof globalThis.fetch ): Promise<Commit | null> =>
{
    const settled = await Promise.allSettled( [ fetchGitLabCommit( fetch ), fetchGitHubCommit( fetch ) ] );

    const found = settled
        .filter( ( result ) => result.status === "fulfilled" )
        .map( ( result ) => result.value )
        .filter( ( commit ): commit is Commit => commit !== null );

    if ( found.length === 0 ) return null;

    return found.toSorted( ( a, b ) => Date.parse( b.date ) - Date.parse( a.date ) )[ 0 ];
};

/// Returns the most recent public commit, through the session cache.
///
/// @param {typeof fetch} fetch - The `fetch` implementation to use.
/// @return {Promise<Commit | null>} The newer of the two, or `null` when
///         neither answered.
/// @author Claude
export const fetchLatestCommit = ( fetch: typeof globalThis.fetch ): Promise<Commit | null> =>
    withCache( "portfolio:commit", () => loadLatestCommit( fetch ) );
