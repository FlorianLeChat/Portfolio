export type CommitSource = "gitlab" | "github";

export type Commit = {
    project: string;
    title: string;
    date: string;
    url: string;
    source: CommitSource;
};
