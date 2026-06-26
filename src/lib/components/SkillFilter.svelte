<script lang="ts">
    import * as m from "$lib/locales/messages";
    import type { Skill } from "$lib";

    let { skills }: { skills: Record<string, Skill> } = $props();

    let filter = $state( "all" );

    const updateFilter = ( value: string ) =>
    {
        filter = value;

        const url = new URL( window.location.href );
        url.searchParams.set( "filter", value );

        history.pushState( null, "", url.toString() );
    };
</script>

<section id="skills">
    <h2>{m.landing_header_skills()}</h2>

    <ul>
        <li>
            <input
                id="all"
                type="radio"
                name="skills"
                checked={filter === "all"}
                onchange={() => updateFilter( "all" )}
            />
            <label for="all">{m.landing_filter_all()}</label>
        </li>

        <li>
            <input
                id="front"
                type="radio"
                name="skills"
                checked={filter === "front"}
                onchange={() => updateFilter( "front" )}
            />
            <label for="front">{m.landing_filter_front()}</label>
        </li>

        <li>
            <input
                id="back"
                type="radio"
                name="skills"
                checked={filter === "back"}
                onchange={() => updateFilter( "back" )}
            />
            <label for="back">{m.landing_filter_back()}</label>
        </li>

        <li>
            <input
                id="other"
                type="radio"
                name="skills"
                checked={filter === "other"}
                onchange={() => updateFilter( "other" )}
            />
            <label for="other">{m.landing_filter_other()}</label>
        </li>
    </ul>

    <ul>
        {#each Object.entries( skills ) as [ key, value ] ( key )}
            {#if filter === "all" || ( Array.isArray( value.type ) ? value.type.includes( filter ) : value.type === filter )}
                <li>
                    <i class={`devicon-${ key }-${ value.icon }`}></i>
                    {value.name}
                </li>
            {/if}
        {/each}
    </ul>
</section>
