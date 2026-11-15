<script lang="ts">
    import { onMount } from "svelte";
    import * as m from "#lib/locales/messages.js";
    import IconGithub from "~icons/simple-icons/github";
    import IconGitlab from "~icons/simple-icons/gitlab";
    import { getLocale } from "#lib/locales/runtime.js";
    import IconGitCommit from "~icons/tabler/git-commit";
    import type { SkillIcon } from "#lib/types/Skill.ts";
    import type { Commit, CommitSource } from "#lib/types/Commit.ts";
    import { fetchLatestCommit, toReadableTitle } from "#lib/commit.ts";

    let commit = $state<Commit | null>( null );
    let settled = $state( false );

    const SOURCE_ICONS: Record<CommitSource, SkillIcon> = {
        gitlab: IconGitlab,
        github: IconGithub
    };

    const relative = new Intl.RelativeTimeFormat( getLocale(), { numeric: "auto" } );

    const UNITS: [ Intl.RelativeTimeFormatUnit, number ][] = [
        [ "year", 365 * 24 * 3600 ],
        [ "month", 30 * 24 * 3600 ],
        [ "day", 24 * 3600 ],
        [ "hour", 3600 ],
        [ "minute", 60 ]
    ];

    /// Formats a timestamp as a coarse relative age.
    ///
    /// @param {string} value - ISO date of the commit.
    /// @return {string} Something like "3 days ago", in the active locale.
    /// @author Claude
    const formatAge = ( value: string ) =>
    {
        const seconds = ( Date.parse( value ) - Date.now() ) / 1000;

        for ( const [ unit, size ] of UNITS )
        {
            if ( Math.abs( seconds ) >= size )
            {
                return relative.format( Math.round( seconds / size ), unit );
            }
        }

        return relative.format( Math.round( seconds ), "second" );
    };

    onMount( () =>
    {
        const load = async () =>
        {
            commit = await fetchLatestCommit( fetch );
            settled = true;
        };

        load();
    } );
</script>

{#if commit}
    {@const SourceIcon = SOURCE_ICONS[ commit.source ]}

    <aside aria-labelledby="latest-commit">
        <p id="latest-commit">
            <IconGitCommit aria-hidden="true" />
            {m.landing_commit_title()}
        </p>

        <a lang="en" rel="external noopener noreferrer" href={commit.url} title={m.landing_commit_view()} target="_blank">
            {toReadableTitle( commit.title )}
        </a>

        <p>
            <SourceIcon aria-hidden="true" />
            <code>{commit.project}</code>
            <time datetime={commit.date}>{formatAge( commit.date )}</time>
        </p>
    </aside>
{:else if !settled}
    <aside aria-hidden="true"></aside>
{/if}

<style lang="scss">
    @use "colors";

    aside
    {
        gap: 0.9rem;
        width: 100%;
        border: 1px solid colors.getThemedColor("border");
        display: flex;
        padding: 1.5rem;
        box-shadow: colors.getThemedColor("container-shadow");
        border-radius: var(--radius-md);
        flex-direction: column;
        background-color: colors.getThemedColor("surface");

        &:not( [aria-hidden="true"] )
        {
            animation: reveal calc( var(--duration) * 2 ) var(--ease);
        }

        &[aria-hidden="true"]
        {
            opacity: 0.4;
            min-height: 9.5rem;

            @media screen and (max-width: 1024px)
            {
                display: none;
            }
        }
    }

    @keyframes reveal
    {
        from
        {
            opacity: 0;
        }
    }

    p:first-child
    {
        gap: 0.5rem;
        color: colors.getThemedColor("accent");
        display: inline-flex;
        font-size: 0.75rem;
        align-items: center;
        font-family: var(--font-mono);
    }

    a
    {
        color: colors.getThemedColor("foreground-alt");
        display: flex;
        font-size: 1.3rem;
        text-wrap: pretty;
        min-height: 2.75rem;
        line-height: 1.3;
        align-items: center;

        &:hover
        {
            color: colors.getThemedColor("primary");
            text-decoration: underline;
        }
    }

    p:last-child
    {
        gap: 0.5rem;
        color: colors.getThemedColor("muted");
        display: flex;
        flex-wrap: wrap;
        font-size: 0.8rem;
        align-items: center;
        font-family: var(--font-mono);
    }

    code
    {
        min-width: 0;
        font-family: inherit;
        overflow-wrap: anywhere;
    }

    time
    {
        flex-shrink: 0;
        white-space: nowrap;
    }

    time::before
    {
        content: "·";
        margin-right: 0.5rem;
    }

    p:last-child > :global(svg)
    {
        flex-shrink: 0;
    }
</style>
