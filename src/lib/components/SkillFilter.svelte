<script lang="ts">
    import { brandStyle } from "#lib/skills.ts";
    import type { Skill, SkillType } from "#lib";
    import * as m from "#lib/locales/messages.js";

    let { skills }: { skills: Record<string, Skill> } = $props();

    type Filter = SkillType | "all";

    const FILTERS: Filter[] = [ "all", "front", "back", "other" ];

    const labels: Record<Filter, string> = {
        all: m.landing_filter_all(),
        front: m.landing_filter_front(),
        back: m.landing_filter_back(),
        other: m.landing_filter_other()
    };

    let filter = $state<Filter>( "all" );

    const matches = ( skill: Skill, value: Filter ) =>
    {
        if ( value === "all" ) return true;

        return Array.isArray( skill.type ) ? skill.type.includes( value ) : skill.type === value;
    };

    const visible = $derived( Object.entries( skills ).filter( ( [ , skill ] ) => matches( skill, filter ) ) );

    const core = $derived( visible.filter( ( [ , skill ] ) => skill.core ) );
    const familiar = $derived( visible.filter( ( [ , skill ] ) => !skill.core ) );

</script>

<section id="skills">
    <h2>{m.landing_header_skills()}</h2>

    <p>{m.landing_skills_intro()}</p>

    <fieldset>
        <legend>{m.landing_filter_legend()}</legend>

        <ul>
            {#each FILTERS as value ( value )}
                <li>
                    <input
                        id="filter-{value}"
                        type="radio"
                        name="skills"
                        {value}
                        bind:group={filter}
                    />
                    <label for="filter-{value}">{labels[ value ]}</label>
                </li>
            {/each}
        </ul>
    </fieldset>

    <p role="status">{m.landing_filter_count( { count: visible.length } )}</p>

    {#if core.length > 0}
        <div>
            <h3>{m.landing_skills_core()}</h3>

            <ul>
                {#each core as [ key, value ] ( key )}
                    <li>
                        <value.icon style={brandStyle( value )} aria-hidden="true" />
                        {value.name}
                    </li>
                {/each}
            </ul>
        </div>
    {/if}

    {#if familiar.length > 0}
        <details>
            <summary>
                <h3>{m.landing_skills_familiar()}</h3>
            </summary>

            <ul>
                {#each familiar as [ key, value ] ( key )}
                    <li>
                        <value.icon style={brandStyle( value )} aria-hidden="true" />
                        {value.name}
                    </li>
                {/each}
            </ul>
        </details>
    {/if}
</section>

<style lang="scss">
    @use "colors";

    fieldset
    {
        border: none;
        margin: 0 0 3rem;
        padding: 0;
    }

    legend, input, p[role="status"]
    {
        width: 1px;
        height: 1px;
        margin: -1px;
        padding: 0;
        overflow: hidden;
        position: absolute;
        clip-path: inset( 50% );
        white-space: nowrap;
    }

    fieldset > ul
    {
        border: 1px solid colors.getThemedColor("border");
        padding: 0.25rem;
        display: inline-flex;
        flex-wrap: wrap;
        border-radius: var(--radius-md);
        background-color: colors.getThemedColor("background-alt");
    }

    // Keeps each visually hidden radio over its own label, so a screen reader's
    // virtual cursor and the label share the same spot on the page.
    fieldset li
    {
        position: relative;
    }

    label
    {
        color: colors.getThemedColor("muted");
        cursor: pointer;
        display: flex;
        padding: 0.6rem 1rem;
        font-size: 0.85rem;
        min-height: 2.75rem;
        transition: color var(--duration) var(--ease), background-color var(--duration) var(--ease);
        align-items: center;
        font-family: var(--font-mono);
        border-radius: var(--radius-sm);

        &:hover
        {
            color: colors.getThemedColor("foreground-alt");
        }
    }

    input:checked + label
    {
        color: colors.getThemedColor("primary");
        font-weight: 600;
        box-shadow: inset 0 0 0 1px colors.getThemedColor("primary");
        background-color: colors.getThemedColor("primary-light");
    }

    input:focus-visible + label
    {
        outline: 2px solid colors.getThemedColor("primary");
        outline-offset: 2px;
    }

    details
    {
        margin-top: 3rem;
    }

    summary
    {
        cursor: pointer;
        padding: 0.6rem 0;
        margin-bottom: 1.25rem;

        &:focus-visible
        {
            outline: 2px solid colors.getThemedColor("primary");
            outline-offset: 4px;
        }
    }

    summary > h3
    {
        margin: 0;
        display: inline;
    }

    details:not( [open] ) > summary
    {
        margin-bottom: 0;
    }

    h3
    {
        color: colors.getThemedColor("muted");
        font-size: 1.25rem;
        font-style: italic;
        font-weight: 400;
        margin-bottom: 1.25rem;
    }

    div > h3 + ul
    {
        gap: 0.75rem;
        display: grid;
        grid-template-columns: repeat( auto-fill, minmax( min( 100%, 9.5rem ), 1fr ) );
    }

    div > h3 + ul > li
    {
        gap: 0.75rem;
        color: colors.getThemedColor("foreground-alt");
        border: 1px solid colors.getThemedColor("border");
        display: flex;
        padding: 0.75rem 1rem;
        align-items: center;
        border-radius: var(--radius-md);
        background-color: colors.getThemedColor("surface");
    }

    details > ul
    {
        gap: 0.5rem 1.5rem;
        display: flex;
        flex-wrap: wrap;
    }

    details > ul > li
    {
        gap: 0.4rem;
        color: colors.getThemedColor("foreground-alt");
        display: inline-flex;
        font-size: 0.9rem;
        align-items: center;
        font-family: var(--font-mono);
    }

    details > ul > li > :global(svg)
    {
        width: 1em;
        color: color-mix(in oklab, var(--brand, currentColor) 50%, colors.getThemedColor("foreground-alt"));
        height: 1em;
        flex-shrink: 0;
    }

    li > :global(svg)
    {
        width: 1.5rem;
        color: color-mix(in oklab, var(--brand, currentColor) 50%, colors.getThemedColor("foreground-alt"));
        height: 1.5rem;
        flex-shrink: 0;
    }
</style>
