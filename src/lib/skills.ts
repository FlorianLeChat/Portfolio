import { SKILLS } from "$lib/data/skills";
import type { Skill } from "$lib/types/Skill";

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
