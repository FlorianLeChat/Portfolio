<script lang="ts">
    import * as m from "$lib/locales/messages";
    import { onMount } from "svelte";
    import Carousel from "$lib/components/Carousel.svelte";
    import type { Skill, SkillType } from "$lib";

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

    onMount( () =>
    {
        const requested = new URL( window.location.href ).searchParams.get( "filter" ) as Filter | null;

        if ( requested && FILTERS.includes( requested ) )
        {
            filter = requested;
        }
    } );

    const updateFilter = ( value: Filter ) =>
    {
        filter = value;

        const url = new URL( window.location.href );
        url.searchParams.set( "filter", value );

        history.replaceState( null, "", url.toString() );
    };
</script>

<section id="skills">
    <h2>{m.landing_header_skills()}</h2>

    <fieldset>
        <legend>{m.landing_filter_legend()}</legend>

        <ul>
            {#each FILTERS as value ( value )}
                <li>
                    <input
                        id="filter-{value}"
                        type="radio"
                        name="skills"
                        checked={filter === value}
                        onchange={() => updateFilter( value )}
                    />
                    <label for="filter-{value}">{labels[ value ]}</label>
                </li>
            {/each}
        </ul>
    </fieldset>

    <Carousel label={m.landing_carousel_skills()}>
        {#each visible as [ key, value ] ( key )}
            <li>
                {#if value.icon}
                    <i class="devicon-{value.icon}" aria-hidden="true"></i>
                {/if}

                {value.name}
            </li>
        {/each}
    </Carousel>
</section>

<style lang="scss">
    @use "colors";

    fieldset
    {
        border: none;
        margin: 0 0 2.5rem;
        padding: 0;
    }

    legend
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
        gap: 1.25rem;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;

        li
        {
            gap: 0.5rem;
            display: flex;
            font-weight: 500;
            align-items: center;
        }

        input
        {
            margin: 0;
            cursor: pointer;
            accent-color: colors.getThemedColor("primary");
        }

        label
        {
            cursor: pointer;
        }
    }

    :global(section#skills > div > ul)
    {
        gap: 1rem;

        @media screen and (max-width: 640px)
        {
            gap: 0.75rem;
        }
    }

    :global(section#skills > div > ul > li)
    {
        gap: 0.5rem;
        flex: 0 0 8rem;
        border: 1px solid colors.getThemedColor("border");
        display: flex;
        padding: 1.25rem 0.5rem;
        overflow: hidden;
        position: relative;
        font-size: 0.8rem;
        text-align: center;
        font-weight: 500;
        align-items: center;
        border-radius: var(--radius-md);
        flex-direction: column;
        justify-content: center;
        background-color: colors.getThemedColor("surface");

        @media screen and (max-width: 640px)
        {
            flex-basis: 6.5rem;
        }

        @media (hover: hover) and (pointer: fine)
        {
            &:hover::before
            {
                transform: scaleX(1);
            }
        }

        &::before
        {
            inset: auto 0 0;
            height: 0.25rem;
            content: "";
            position: absolute;
            transform: scaleX(0);
            transition: transform var(--duration) var(--ease);
            background-color: colors.getThemedColor("primary");
        }
    }

    li i
    {
        font-size: 2.25rem;
    }
</style>
