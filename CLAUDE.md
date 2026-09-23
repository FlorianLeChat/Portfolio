# Project conventions

Guidance for working in this repository. It assumes SvelteKit 2, Svelte 5 runes,
TypeScript and SCSS, built statically with `adapter-static` and published to
GitLab Pages.

## Language

All user facing text goes through Paraglide messages. Never hardcode a string in
a component: add the key to both `locales/en.json` and `locales/fr.json`, then
call it as `m.my_key()` from `$lib/locales/messages`.

Key names are namespaced by prefix: `landing_*` for the site chrome and
`projects_*` for project descriptions.

Both files carry the same keys, in the same order, split into blank line
separated groups: the project descriptions, then one group per section of the
landing page, roughly in the order the visitor meets them. A new key joins the
group it belongs to rather than the end of the file.

New words that trip the spell checker go in `.cspell.json`, which runs over
`locales/**` on push.

Code, comments and commit messages are written in English.

## Static build

The site is prerendered and served as flat files. Nothing may require a server
at runtime.

- There is no `+page.server.ts`. Anything that must be current is fetched from
  the browser, not baked into the build.
- `$env/dynamic/public` is resolved at build time, so changing a variable means
  rebuilding. Every variable is `PUBLIC_` prefixed.
- Every feature backed by an environment variable must render nothing when that
  variable is empty.

## External network calls

Three services are read: the blog feed, the GitLab API and the GitHub API. All
three answer with `Access-Control-Allow-Origin: *`, so no proxy is involved.

They are read **on every page load**, from the browser, so the blog cards and
the latest commit are never staler than the visit itself. Deploys only happen on
tags, so baking them into the build would have shown week old activity.

Every call must degrade without breaking anything:

- A failure resolves to `null` or `[]` and the section is simply not rendered.
- Always pass an `AbortSignal.timeout`.
- Parse feeds with `DOMParser`, never an XML library: it costs nothing to ship.

## Design tokens

Colours, radii and durations are CSS custom properties emitted by
`src/lib/styles/_colors.scss`. Never write a colour literal in a component. Two
alternate palettes sit commented above the active one in that file; keep them in
sync if the token list changes.

- Solid colour: `colors.getThemedColor( "primary" )`
- Translucent colour: `colors.getThemedAlpha( "primary", 0.5 )`, because `rgba()`
  cannot take a `var()` argument

`colors.emitPalettes()` is called exactly once, from `globals.scss`. Calling it
from another entry point would duplicate the whole token layer in that bundle.

Spacing and breakpoints are deliberately **not** abstracted: write `1.5rem` and
`@media screen and (max-width: 768px)` inline. A Tailwind migration is planned,
so helpers around those values would only be thrown away.

## Stylesheets

A component's rules live in its own `<style lang="scss">` block, next to the
markup they describe. `src/lib/styles` keeps only what is genuinely shared:

- `globals.scss` — reset, typography, base elements, section chrome; `@use`s the
  partials below and is imported by `+layout.svelte`
- `_colors.scss` — the palette, the token layer, and the accessors
- `_fonts.scss` — the `@font-face` declarations
- `_buttons.scss` — the `pill()` and `pillGhost()` mixins, included by the three
  components that render a call to action

`src/lib/styles` is a Sass load path (see `vite.config.ts`), so a component
writes `@use "colors"` exactly like a stylesheet does, with no relative path.
`_colors.scss` emits nothing at module load, so that `@use` costs nothing;
`colors.emitPalettes()` stays called once, from `globals.scss` alone.

Styling a component still means no styling class: the markup stays plain
semantic HTML and the selectors reach it through its structure. Scoping now does
the qualifying that section prefixes used to do, so write `nav > ul`, not
`header nav > ul`. Two class exceptions stay: the `show` class the header
toggles on its menu, and the icon classes the webfonts need.

### Reaching across a component boundary

Svelte scopes a selector to the markup of the component it is written in, and
`Carousel.svelte` renders its children through a snippet. The `<li>` therefore
carries the caller's scope while the `<div>` and `<ul>` around it carry the
carousel's, and neither side can match the whole path.

`:global()` bridges that, under two constraints learnt the hard way:

- It may only **open or close** a selector sequence, never sit in the middle.
  `section > :global(div) > li` does not compile.
- The compiler drops a selector whose scoped part it cannot statically match.
  `:global(section#projects > div > ul) > li` looks legal and is silently
  pruned, because the `<li>`'s parent in the template is a component, not a
  `<ul>`.

So make the **whole** path global for the element that straddles the boundary,
and keep everything below it scoped, since those descendants are ordinary markup
of the component:

```scss
:global(section#projects > div > ul > li)
{
    // the card box
}

li > img
{
    // its contents, plain scoped selectors
}
```

The other direction works without ceremony: the carousel reaches the items it
was handed with `:global` at the end of the sequence, `ul > :global(li)`.

Declarations are sorted **in a staircase**: ascending by property name length,
then by line length when two names are the same length. One unbroken staircase
per block, colours included — no blank line ever splits a run of declarations.
The media queries and the nested selectors follow, each after a blank line.

Sorting by name length keeps a shorthand ahead of its own longhands, since
`border` is shorter than `border-color` and `outline` than `outline-offset`, so
the cascade survives the sort.

```scss
li span
{
    gap: 0.5rem;
    color: colors.getThemedColor("primary");
    display: inline-flex;
    font-size: 0.85rem;
    font-weight: 600;
    align-items: center;
}
```

The token emission in `_colors.scss` is the one exception: its `:root` block
groups the custom properties by what they configure, which a staircase would
interleave.

Never give a partial the same module name as a non partial in the same folder.
Sass resolves `@use "x"` to `x.scss` over `_x.scss` and silently drops the
partial from the bundle, which type checks, lints and builds without a word.

## Page weight

The portfolio is a showcase, so it stays presentable rather than stripped down,
but nothing heavy ships without earning it. Anything sizeable and optional goes
behind a dynamic `import()`, the way PhotoSwipe, SweetAlert2 and the confetti
already do. Screenshots are `loading="lazy"` and `decoding="async"`.

## Icons

Icons come from two webfont stylesheets loaded in `+layout.svelte`:

- UI and brand icons: FontAwesome, `<i class="fa-solid fa-code">` or
  `<i class="fa-brands fa-github">`
- Technology icons: devicon, `<i class="devicon-{skill.icon}">`, where `icon`
  is the class fragment stored in `data/skills.json`

That fragment includes the `colored` suffix for glyphs devicon ships with brand
colours, and omits it for the monochrome ones so they follow `currentColor`.
Verify a variant actually exists before adding it: several entries used to
declare a `plain` variant devicon does not ship, which rendered a blank square.

**Known cost:** devicon publishes no woff2, so browsers fall back to
`devicon.woff`, about 1.46 MB on every visit. This is a deliberate, temporary
trade-off. Inlining the glyphs as an SVG sprite cut it to roughly 53 KB and is
the obvious fix when the subject comes back around.

## Comments and JSDoc

Document exported functions with a JSDoc block covering parameters and return
value. Close blocks written by the assistant with `@author Claude`.

Inline comments explain **why**, not what. A comment restating the code is
noise; a comment recording a constraint, a trade-off or a non-obvious browser
behaviour earns its place.

## Prefer arrow functions

Use arrow syntax rather than `function` declarations, except for Svelte class
methods.

## Clarity over shortcuts

Extract complex expressions into named variables. Prefer a named helper over a
clever one-liner. Readability wins over terseness.

## Code style

ESLint enforces a distinctive house style, so run it rather than guessing:

- Allman braces, 4 space indent, double quotes
- Spaces inside parentheses, brackets and template placeholders:
  `foo( bar )`, `[ 1, 2 ]`, `` `${ value }` ``
- No trailing commas
- `type` rather than `interface`
- Internal navigation goes through `resolve()` from `$app/paths`

Before committing:

```bash
npm run check && npm run lint && npm run check-spell
```

`svelte.config.js` sets `preprocess: vitePreprocess()`. Without it `svelte-check`
silently skips every component using `<style lang="scss">`.

## Planning before implementation

Non trivial changes get a plan approved before any code is written. Typo fixes
and one line corrections do not.

## Preview and dev server

Never start a dev server. Ask the user to run `npm run dev` or `npm run preview`.

`vite preview` caches the file listing at startup: after a rebuild it keeps
serving the previous `index.html` and every asset 404s. Restart it after each
build.

## End to end tests (Playwright)

`tests/e2e/navigation.spec.ts` runs against `vite preview` and covers the paths
a visitor actually takes. Keep it short: this is a portfolio, not a product.

- Assert on hrefs rather than opening real external sites. Two tests used to
  open the blog and the online resume and assert their titles, which broke the
  pipeline whenever either site changed.
- Tests read the English strings, since the config pins `locale: "en-GB"`.
- Update the spec whenever user facing behaviour changes.

Scroll driven behaviour has to be verified here rather than in a preview pane:
a browser that is not compositing frames fires no `scroll` events and never
animates a smooth `scrollBy`, so carousels look broken when they are not.

## Commits

Conventional Commits, lowercase, no trailing period:

```
feat(projects): add technology filtering to the catalogue
```

End the message with the model attribution trailer.

## Semantic HTML

Prefer semantic elements over generic containers: `<main>`, `<section>`,
`<nav>`, `<footer>`, `<button>`, `<time>`, `<ul>`. Use `<button>` for actions and
`<a>` for navigation, never the reverse.

Interactive controls carry an accessible name. Icons next to a visible label are
`aria-hidden`; icons standing alone get a label.

External URLs live in `$lib/links`, never as literals in a component. ESLint's
`no-navigation-without-resolve` cannot tell an external constant from an
unresolved internal route, so those links carry a targeted disable comment
stating why.

Keep contrast at WCAG AA in both themes and every palette.

`svelte-ignore` is not used. An accessibility warning is a description of the
markup, so the markup is what changes: the carousel dropped the `tabindex` the
compiler objected to and leans on its arrow buttons, which are real controls,
for keyboard operation.

## Component decomposition

Extract a sub-component as soon as a responsibility is clear or a file grows
long. Its styles move with it, into its own `<style lang="scss">` block.

## Structure

```
src/
  app.html              Shell, plus the blocking theme/palette/eco script
  hooks.ts              Locale de-localisation for routing
  hooks.server.ts       Paraglide middleware
  lib/
    cache.ts            Short lived session cache for the network reads
    commit.ts           Latest public commit, fetched in the browser
    feed.ts             Blog feed fetching and parsing, browser only
    icons.ts            Generated UI icon paths
    links.ts            Every external destination, in one place
    projects.ts         Project images and descriptions
    skills.ts           Technology registry
    theme.svelte.ts     Colour scheme store
    components/         One file per component: markup, logic and its styles
    data/               projects.json, skills.json
    images/             Project screenshots, matched by file name
    styles/             Only the shared rules, see above
    types/              One type per file
  routes/
    +layout.svelte      Global CSS, header, footer
    +page.ts            Landing page data, static only
    +page.svelte        The whole site: hero, blog, projects, skills, contact
tests/e2e/              The Playwright spec
```

The site is a single page. Navigation is made of fragments, so a new section
means a new `id` and a matching entry in `Header.svelte`.

Adding a project means touching four files: `data/projects.json`, the screenshot
in `lib/images/<key>.webp`, and the `projects_<key>` message in both locales.
