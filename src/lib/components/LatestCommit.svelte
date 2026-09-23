<script lang="ts">
    import * as m from "$lib/locales/messages";
    import { onMount } from "svelte";
    import IconGitBranch from "~icons/tabler/git-branch";
    import IconGitlab from "~icons/simple-icons/gitlab";
    import IconGithub from "~icons/simple-icons/github";
    import { getLocale } from "$lib/locales/runtime";
    import { fetchLatestCommit } from "$lib/commit";
    import type { SkillIcon } from "$lib/types/Skill";
    import type { Commit, CommitSource } from "$lib/types/Commit";

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

    <aside>
        <h2>
            <IconGitBranch aria-hidden="true" />
            {m.landing_commit_title()}
        </h2>

        <a rel="external noopener noreferrer" href={commit.url} title={m.landing_commit_view()} target="_blank">
            {commit.title}
        </a>

        <p>
            <SourceIcon aria-hidden="true" />
            {commit.project}
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
        gap: 0.75rem;
        width: 100%;
        border: 1px solid colors.getThemedColor("border");
        display: flex;
        padding: 1.5rem;
        border-radius: var(--radius-lg);
        flex-direction: column;
        background-color: colors.getThemedColor("surface");

        h2
        {
            gap: 0.5rem;
            color: colors.getThemedColor("accent");
            display: inline-flex;
            font-size: 0.7rem;
            font-weight: 700;
            align-items: center;
            letter-spacing: 0.08em;
            text-transform: uppercase;
        }

        a
        {
            color: colors.getThemedColor("foreground-alt");
            font-size: 1rem;
            font-weight: 600;
            line-height: 1.4;

            &:hover
            {
                color: colors.getThemedColor("primary");
            }
        }

        p
        {
            gap: 0.5rem;
            color: colors.getThemedColor("muted");
            display: inline-flex;
            flex-wrap: wrap;
            font-size: 0.8rem;
            align-items: center;
        }

        time::before
        {
            content: "·";
            margin-right: 0.5rem;
        }

        &[aria-hidden="true"]
        {
            opacity: 0.4;
            min-height: 8.5rem;
        }
    }
</style>
