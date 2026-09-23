import data from "$lib/data/skills.json";
import type { Skill } from "$lib/types/Skill";

// JSON imports widen `type` to `string`, so the registry is asserted once here
// rather than at every call site.
const registry = data as Record<string, Skill>;

/// Returns the whole skill registry.
///
/// @return {Record<string, Skill>} Every known technology, keyed by slug.
/// @author Claude
export const getAllSkills = () => registry;

/// Resolves technology keys to registry entries.
///
/// Unknown keys still produce a chip, labelled with the raw key, so a typo is
/// visible rather than silently dropping a technology.
///
/// @param {string[]} keys - Skill keys, typically listed on a project.
/// @return {Skill[]} The matching registry entries.
/// @author Claude
export const getSkills = ( keys: string[] ): Skill[] =>
    keys.map( ( key ) => registry[ key ] ?? { name: key, icon: null, type: "other" } );
