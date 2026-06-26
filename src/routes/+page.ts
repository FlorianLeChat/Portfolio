import type { PageLoad } from "./$types";
import projects from "$lib/data/projects.json";
import skills from "$lib/data/skills.json";

export const load: PageLoad = () =>
{
    return { projects, skills };
};
