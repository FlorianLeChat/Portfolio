# Product

<!-- impeccable:product-schema 1 -->

Facts below come from the repository (`README.md`, `CLAUDE.md`, `locales/*.json`). Anything marked *inferred* was not confirmed by the owner and should be checked.

## Platform

web

## Users

- Recruiters and hiring managers deciding whether to contact the owner. They skim, often on a phone, in English or in French. *(inferred)*
- Peers and clients looking at the projects, the skills and the blog. *(inferred)*
- The owner, who maintains the site alone and adds projects, skills and posts over time.

## Product Purpose

Personal portfolio of Florian Trayon, a Full-Stack Web Developer based in France. It presents the projects he has built (personal, academic, professional), the technologies he works with, his blog and a way to reach him. Success is a visitor who gets in touch or opens a project.

## Positioning

The site is itself a piece of evidence for the claims it makes: web applications that protect privacy, stay accessible to everyone and are made to last. It ships as flat static files, with few dependencies and optimised images, and reads live activity (latest commit, blog posts) from the browser.

## Operating Context

- Static build (`adapter-static`) published to GitLab Pages; deploys happen on tags only.
- Source hosted on a personal GitLab instance, mirrored to GitHub, where public contributions are welcome.
- One page, one URL, two languages (English, French) chosen by the visitor, then the browser, then English.
- Blog feed, GitLab API and GitHub API are read from the browser on every load and must degrade silently.

## Capabilities and Constraints

- Sections: hero with latest public commit, projects (featured rows plus a folded list), skills (fundamentals, then complements, filterable by category), blog cards, contact with copy-address button, footer with version and legacy site link.
- Light and dark themes; the visitor's choice is stored.
- Every user facing string is a Paraglide message in `locales/en.json` and `locales/fr.json`. The title, description and social tags are English only.
- No server at runtime, no cookies, no tracking.
- Spacing and breakpoints are written inline on purpose; a Tailwind migration is planned.
- Undecided: availability line, location, proof points and a photo. None of them exists on the site today.

## Brand Commitments

- First name and surname as the page title voice; a personal, first person tone (`Hi, I'm Florian`).
- Project descriptions are product focused, carry a personal touch and name no technology.
- Brand glyphs are drawn in the way their owner publishes them.

## Evidence on Hand

- Eleven projects with screenshots in `src/lib/images/`, most of them running in production.
- A blog (feed read live) and an online resume, both linked from the page.
- Real commit history, shown live through the commit card.
- Absent, and not to be invented: testimonials, client names, metrics, pricing, availability for hire.

## Product Principles

1. The site proves its claims by being fast, accessible and private itself.
2. Everything that can fail degrades to nothing, never to an error.
3. One page, no detours: a visitor reaches any project, the blog or the contact in a scroll.
4. Both languages are first class; neither is a translation of the other's layout.
5. Content is truthful: no placeholder, no invented proof.

## Accessibility & Inclusion

Contrast stays at WCAG AA in both themes. Controls carry accessible names, the page is fully keyboard operable, and motion respects `prefers-reduced-motion`. The French version must fit the same layout as the English one.
