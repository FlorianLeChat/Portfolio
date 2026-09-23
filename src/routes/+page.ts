import type { PageLoad } from "./$types";
import { getAllSkills } from "$lib/skills";
import { getProjects } from "$lib/projects";

export const load: PageLoad = () =>
{
    return {
        skills: getAllSkills(),
        projects: getProjects()
    };
};
