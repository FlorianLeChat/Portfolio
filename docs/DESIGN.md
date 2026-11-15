---
name: Portfolio
description: A paper and phosphor portfolio, set in a reading serif with a monospace interface voice.
colors:
  paper: "#f4f1ea"
  paper-raised: "#fbf9f4"
  paper-surface: "#fffdf8"
  ink: "#3a3631"
  ink-strong: "#1a1815"
  ink-muted: "#655f57"
  rule: "#cfc6b4"
  phosphor-green: "#1b6a46"
  phosphor-green-deep: "#14563a"
  amber: "#9c4609"
  amber-deep: "#7f3907"
  night: "#11120f"
  night-raised: "#171914"
  night-surface: "#1c1f19"
  chalk: "#d6d3c8"
  chalk-strong: "#f2efe6"
  chalk-muted: "#9d998c"
  night-rule: "#363a30"
  phosphor-glow: "#6fd69c"
  phosphor-glow-soft: "#9be6b9"
  lamp: "#f2b25c"
  lamp-soft: "#f6c886"
typography:
  display:
    fontFamily: "Newsreader, Iowan Old Style, Georgia, serif"
    fontSize: "5.25rem"
    fontWeight: 500
    lineHeight: 1.1
    letterSpacing: "-0.03em"
  headline:
    fontFamily: "Newsreader, Iowan Old Style, Georgia, serif"
    fontSize: "3rem"
    fontWeight: 500
    lineHeight: 1.1
    letterSpacing: "-0.025em"
  title:
    fontFamily: "Newsreader, Iowan Old Style, Georgia, serif"
    fontSize: "1.5rem"
    fontWeight: 500
    lineHeight: 1.1
    letterSpacing: "-0.015em"
  body:
    fontFamily: "Newsreader, Iowan Old Style, Georgia, serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "JetBrains Mono, ui-monospace, Cascadia Mono, monospace"
    fontSize: "0.875rem"
    fontWeight: 500
rounded:
  sm: "0.25rem"
  md: "0.375rem"
  lg: "0.5rem"
  pill: "5rem"
components:
  button-primary:
    backgroundColor: "{colors.phosphor-green}"
    textColor: "{colors.paper}"
    typography: "{typography.label}"
    rounded: "{rounded.sm}"
    padding: "0.8rem 1.25rem"
    height: "2.75rem"
  button-primary-hover:
    backgroundColor: "{colors.phosphor-green-deep}"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.phosphor-green}"
    rounded: "{rounded.sm}"
---

# Design System: Portfolio

Colour tokens are listed for the light theme with its night counterparts. The source of truth is `src/lib/styles/_colors.scss`; this file describes it.

## Overview

**Creative North Star: "The Lab Notebook"**

A page of cream paper written in a book serif, annotated by a terminal. The text a visitor reads (headings, descriptions, the blog) is set in Newsreader; everything the interface says (navigation, buttons, chips, dates, the commit, the version) is set in JetBrains Mono. Green phosphor is the single voice that means *act here*; amber is the rare second voice.

The layout is calm and sectioned: one column of content on a 1120px measure, hairline rules between sections, generous vertical air. Nothing is decorative; monospace is never used as ornament.

**Key Characteristics:**
- Two typefaces with two strict jobs.
- Warm neutrals tinted toward yellow-brown, never pure white or pure black.
- One accent for action (green), one for emphasis (amber).
- Flat surfaces separated by hairlines and a soft tonal shadow.
- Same identity in the dark theme: charcoal-olive night, green glow, lamp amber.

## Colors

Warm paper and ink with a phosphor green accent. The active palette is "paper and phosphor"; three alternates sit commented in the same file.

### Primary
- **Phosphor Green** (#1b6a46 light, #6fd69c dark): links, primary buttons, focus ring, selection, caret. Its deeper variant (#14563a, #9be6b9) is the hover state.

### Secondary
- **Amber** (#9c4609 light, #f2b25c dark): the rare emphasis; deeper variant (#7f3907, #f6c886).

### Neutral
- **Paper** (#f4f1ea) page, **Paper Raised** (#fbf9f4) alternate band, **Paper Surface** (#fffdf8) cards.
- **Ink** (#3a3631) body text, **Ink Strong** (#1a1815) headings, **Ink Muted** (#655f57) secondary text.
- **Rule** (#cfc6b4) hairlines and borders.
- Night counterparts: #11120f, #171914, #1c1f19 for surfaces; #d6d3c8, #f2efe6, #9d998c for text; #363a30 for rules.

### Named Rules
**The One Voice Rule.** Green means an action or a place to act. It is never used as a decorative fill.

**The Tint Rule.** Translucent accents come from `getThemedAlpha()` over the `-rgb` triplet, at 10% in light and 16% in dark.

**The Brand Exception Rule.** Brand colours exist only on skill glyphs, blended 50% with the ink so they stay legible in both themes.

## Typography

**Display and Body Font:** Newsreader (with Iowan Old Style, Georgia)
**Label/Mono Font:** JetBrains Mono (with ui-monospace, Cascadia Mono)

**Character:** a bookish serif for what is read, a terminal mono for what is operated. Both are self hosted variable fonts.

### Hierarchy
- **Display** (500, clamp(2.75rem, 1.5rem + 5vw, 5.25rem), 1.1, -0.03em): the hero name only.
- **Headline** (500, clamp(2rem, 1.4rem + 2.5vw, 3rem), 1.1): section titles.
- **Title** (500, 1.5rem): project and post titles.
- **Body** (400, 1.125rem, 1.6): descriptions; section intros are muted at 1.2rem and capped at 60ch.
- **Label** (500, 0.875rem, mono): buttons, chips, nav, dates, commit, version.

### Named Rules
**The Two Voices Rule.** Serif for the reader's text, mono for the interface's voice. Monospace never decorates.

## Layout

Single page. Header and main share a 92% width capped at 1120px. Sections are separated by a top hairline, 7rem apart (4.5rem under 768px). Scroll padding is 6rem for the sticky header. Spacing and the 768px breakpoint are written inline on purpose.

The hero is two columns when the latest commit loads and falls back to one when it fails. Featured projects alternate in rows of three; the rest sit in a grid behind a "see more" control. Skills are chips grouped as fundamentals, then a folded complement list.

## Elevation & Depth

Tonal layering first (paper, raised, surface), hairline borders second, and a two layer soft shadow only on containers (`0 1px 2px` plus `0 10px 28px -14px`, tinted brown in light and black in dark). Surfaces are flat at rest.

## Shapes

Small, quiet corners: 0.25rem on buttons, 0.375rem and 0.5rem on cards and media, fully round only for pills and the scrollbar thumb.

## Components

### Buttons
- **Shape:** 0.25rem radius, 2.75rem minimum height.
- **Primary:** Phosphor Green fill, paper text, mono 0.875rem, padding 0.8rem 1.25rem.
- **Hover / Focus:** deeper green; a 2px primary outline offset 3px on focus; 0.125rem press on active.
- **Ghost:** transparent, green text and green outline kept for a 3:1 boundary, tinted fill on hover.

### Chips
- **Style:** mono labels with the skill glyph; brand colour blended into the ink.
- **State:** the selected filter takes a tinted green fill.

### Cards / Containers
- **Corner Style:** 0.375rem to 0.5rem.
- **Background:** Paper Surface over Paper.
- **Shadow Strategy:** the container shadow above.

### Navigation
Mono labels in the header, a menu with a scrim on mobile (the `show` class), language and theme switches as buttons with accessible names.

### Latest commit card
A live card in the hero showing the project, the commit and its age in mono; it disappears when the request fails.

## Do's and Don'ts

### Do:
- **Do** read every colour from a token (`getThemedColor`, `getThemedAlpha`).
- **Do** keep AA contrast in both themes and every palette.
- **Do** size icons in `em` and keep brand glyphs monochrome unless a skill carries a colour.
- **Do** respect `prefers-reduced-motion` through the `--duration` token.

### Don't:
- **Don't** use a colour literal in a component, except skill brand data.
- **Don't** use monospace as decoration or serif for interface controls.
- **Don't** add a styling class; the `show` class is the one exception.
- **Don't** paint raw brand colours on glyphs.

## Type sizes in components

Components set their own font sizes between 0.7rem and 2.5rem for labels, meta rows and lead text. These are accepted and are not tokenized; only the hierarchy above is normative for headings and body.
