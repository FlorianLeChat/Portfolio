import type { Component } from "svelte";
import type { SVGAttributes } from "svelte/elements";

export type SkillType = "front" | "back" | "other";
export type SkillIcon = Component<SVGAttributes<SVGSVGElement>>;

export type Skill = {
    name: string;
    icon: SkillIcon | null;
    type: SkillType | SkillType[];
    color?: string;
};
