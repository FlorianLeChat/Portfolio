export type SkillType = "front" | "back" | "other";

export type Skill = {
    name: string;
    icon: string | null;
    type: SkillType | SkillType[];
};
