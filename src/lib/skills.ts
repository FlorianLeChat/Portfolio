import { SKILLS } from "#lib/data/skills.ts";
import type { Skill } from "#lib/types/Skill.ts";

const registry: Record<string, Skill> = SKILLS;

/// Returns the whole skill registry.
///
/// @return {Record<string, Skill>} Every known technology, keyed by slug.
/// @author Claude
export const getAllSkills = () => registry;

/// Resolves technology keys to registry entries.
///
/// Unknown keys still produce a chip, labelled with the raw key, so a typo is
/// visible rather than silently dropping a technology. That entry carries no
/// glyph, which Svelte renders as nothing.
///
/// @param {string[]} keys - Skill keys, typically listed on a project.
/// @return {Skill[]} The matching registry entries.
/// @author Claude
export const getSkills = ( keys: string[] ): Skill[] =>
    keys.map( ( key ) => registry[ key ] ?? { name: key, icon: null, type: "other" } );

/// Exposes a skill's brand colour to its glyph's stylesheet.
///
/// The colour is handed over as a custom property rather than painted
/// directly, so the stylesheet can blend it with the theme's ink and keep it
/// legible on both backgrounds.
///
/// @param {Skill} skill - Registry entry, possibly without a brand colour.
/// @return {string | undefined} A `--brand` declaration, or `undefined` when the
///         glyph should simply follow the text colour.
/// @author Claude
export const brandStyle = ( skill: Skill ) => ( skill.color ? `--brand: ${ skill.color }` : undefined );
