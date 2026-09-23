// Every external destination the site points at, in one place. They were
// scattered as literals across components, which made the resume URL drift
// between the hero and the header.
export const LINKS = {
    blog: "https://blog.florian-dev.fr/",
    github: "https://github.com/FlorianLeChat",
    gitlab: "https://git.florian-dev.fr/floriantrayon",
    legacy: "https://legacy.florian-dev.fr/portfolio/",
    resume: "https://pages.florian-dev.fr/floriantrayon/Online-Resume/",
    linkedin: "https://www.linkedin.com/in/florian-trayon/",
    repository: "https://github.com/FlorianLeChat/Portfolio"
} as const;

export const CONTACT_MAIL = "contact@florian-dev.fr";
