import type { PageLoad } from "./$types";
import { getAllSkills } from "#lib/skills.ts";
import { getProjects } from "#lib/projects.ts";

export const load: PageLoad = () =>
{
    return {
        skills: getAllSkills(),
        projects: getProjects()
    };
};
