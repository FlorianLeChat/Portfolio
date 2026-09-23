import * as m from "$lib/locales/messages";
import projects from "$lib/data/projects.json";
import type { Project } from "$lib/types/Project";

// Screenshots are matched to projects by file name, so adding one only means
// dropping `<key>.webp` in `$lib/images`. Vite resolves these to hashed URLs at
// build time, which replaces the handwritten switch this file used to need.
const images = import.meta.glob<string>( "./images/*.webp", { eager: true, import: "default" } );

const imagesByKey = Object.fromEntries(
    Object.entries( images ).map( ( [ path, url ] ) => [ path.slice( path.lastIndexOf( "/" ) + 1, -".webp".length ), url ] )
);

// Paraglide generates one exported function per message. Indexing the module by
// a computed key is not something its types describe, hence the cast.
const messages = m as unknown as Record<string, ( () => string ) | undefined>;

const catalogue = projects as Record<string, Project>;

/// Resolves a project screenshot.
///
/// @param {string} key - Project key, matching the image file name.
/// @return {string | undefined} The hashed asset URL, or `undefined` when the
///         project has no screenshot.
/// @author Claude
export const getImage = ( key: string ) => imagesByKey[ key ];

/// Resolves a project description in the active locale.
///
/// @param {string} key - Project key, matching the `projects_<key>` message.
/// @return {string} The translated description, or an empty string when the
///         message is missing.
/// @author Claude
export const getDescription = ( key: string ) => messages[ `projects_${ key }` ]?.() ?? "";

/// Lists every project, in the order declared in `projects.json`.
///
/// @return {[ string, Project ][]} Key and project pairs.
/// @author Claude
export const getProjects = () => Object.entries( catalogue );
