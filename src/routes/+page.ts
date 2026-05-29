import type { PageLoad } from "./$types";
import type { Project } from "$lib/types/Project";
import type { Skill } from "$lib/types/Skill";
import projects from "$lib/data/projects.json";
import skills from "$lib/data/skills.json";

export const load: PageLoad = () =>
{
    return {
        projects: projects as Record<string, Project>,
        skills: skills as Record<string, Skill>
    };
};
