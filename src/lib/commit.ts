import { toSafeUrl } from "#lib/url.ts";
import { withCache } from "#lib/cache.ts";
import type { Commit } from "#lib/types/Commit.ts";
import { PUBLIC_GITLAB_API_URL, PUBLIC_GITLAB_USERNAME, PUBLIC_GITHUB_USERNAME } from "$app/env/public";

const GITLAB_API = PUBLIC_GITLAB_API_URL;
const GITLAB_USER = PUBLIC_GITLAB_USERNAME;
const GITHUB_USER = PUBLIC_GITHUB_USERNAME;

const TIMEOUT = 8_000;
const PAGE_SIZE = 10;

// `type(scope)!: ` as written by Conventional Commits. The prefix is for the
// changelog tooling; a visitor reading the card only needs what follows it.
const CONVENTIONAL_PREFIX = /^[a-z]+(\([^)]*\))?!?:\s*/i;

/// Rewrites a commit subject for a reader rather than for tooling.
///
/// @param {string} title - First line of the commit message.
/// @return {string} The subject without its Conventional Commits prefix,
///         starting with a capital letter.
/// @author Claude
export const toReadableTitle = ( title: string ): string =>
{
    const subject = title.replace( CONVENTIONAL_PREFIX, "" ).trim() || title;

    return subject.charAt( 0 ).toLocaleUpperCase() + subject.slice( 1 );
};

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

    const user = Array.isArray( users ) ? users[ 0 ] : null;

    if ( !user?.id ) return null;

    const events = await readJson( fetch, `${ GITLAB_API }/api/v4/users/${ user.id }/events?action=pushed&per_page=${ PAGE_SIZE }` );

    // `action=pushed` also covers branch creations and deletions, which carry a
    // null `commit_to`. Deleting a branch right after merging it is routine, so
    // reading a single event used to leave the card empty until the next push.
    const event = Array.isArray( events )
        ? events.find( ( entry ) => entry?.push_data?.commit_to && entry.project_id )
        : null;

    if ( !event ) return null;

    // Reading the commit rather than the project: the event only carries a
    // `commit_title` that GitLab truncates around seventy characters, whereas
    // this endpoint returns the full title and a ready made web URL.
    const commit = ( await readJson(
        fetch,
        `${ GITLAB_API }/api/v4/projects/${ event.project_id }/repository/commits/${ event.push_data.commit_to }`
    ) ) as { title?: string; web_url?: string } | null;

    const url = toSafeUrl( String( commit?.web_url ?? "" ) );

    if ( !commit?.title || !url ) return null;

    return {
        url,
        date: new Date( event.created_at ).toISOString(),
        title: String( commit.title ),
        source: "gitlab",
        project: String( event.target_title ?? "" )
    };
};

/// Reads the most recent public push from GitHub.
///
/// Unauthenticated requests are capped at 60 per hour per IP, and this costs
/// two of them. The requests come from the visitor's browser, so the cap is
/// theirs and never gets close.
///
/// @param {typeof fetch} fetch - The `fetch` implementation to use.
/// @return {Promise<Commit | null>} The latest push, or `null` when
///         unreachable or rate limited.
/// @author Claude
const fetchGitHubCommit = async ( fetch: typeof globalThis.fetch ): Promise<Commit | null> =>
{
    const events = await readJson( fetch, `https://api.github.com/users/${ GITHUB_USER }/events/public` );

    if ( !Array.isArray( events ) ) return null;

    const event = events.find( ( entry ) => entry.type === "PushEvent" && entry.payload?.head && entry.repo?.name );

    if ( !event ) return null;

    const repository = String( event.repo.name );
    const head = String( event.payload.head );
    const commit = ( await readJson(
        fetch,
        `https://api.github.com/repos/${ repository }/commits/${ head }`
    ) ) as { commit?: { message?: string } } | null;

    if ( !commit?.commit?.message ) return null;

    return {
        url: `https://github.com/${ repository }/commit/${ head }`,
        date: new Date( event.created_at ).toISOString(),
        title: String( commit.commit.message ).split( "\n" )[ 0 ],
        source: "github",
        project: String( repository ).split( "/" )[ 1 ] ?? String( repository )
    };
};

/// Returns the most recent public commit, GitHub first and GitLab second.
///
/// GitLab is only asked when GitHub answered nothing, so a visit costs one
/// forge in the common case. Each lookup resolves to `null` on failure, which
/// is what lets the fallback chain stay a plain `??`.
///
/// @param {typeof fetch} fetch - The `fetch` implementation to use.
/// @return {Promise<Commit | null>} The GitHub commit, else the GitLab one,
///         or `null` when neither answered.
/// @author Claude
const loadLatestCommit = async ( fetch: typeof globalThis.fetch ): Promise<Commit | null> =>
    ( await fetchGitHubCommit( fetch ) ) ?? ( await fetchGitLabCommit( fetch ) );

/// Returns the most recent public commit, through the session cache.
///
/// @param {typeof fetch} fetch - The `fetch` implementation to use.
/// @return {Promise<Commit | null>} The GitHub commit, else the GitLab one,
///         or `null` when neither answered.
/// @author Claude
export const fetchLatestCommit = ( fetch: typeof globalThis.fetch ): Promise<Commit | null> =>
    withCache( "portfolio:commit", () => loadLatestCommit( fetch ) );
