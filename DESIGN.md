---
impeccable:design-schema: 1
name: Abdelrahman Ragab — Portfolio
description: Quiet editorial proof-sheet — bold type, generous whitespace, and one selected accent used with real (if bounded) presence.
colors:
  paper: "#FCF8F6"
  surface: "#FFFFFF"
  ink: "#1C1210"
  ink-muted: "#6E5C56"
  border: "rgba(87, 42, 30, 0.12)"
  accent-vermilion: "#D6331B"
  accent-verdant: "#0F7B4D"
  accent-meridian: "#2E5CE6"
  accent-wash: "rgb(accent / 0.08)"
  dark-paper: "#0C0808"
  dark-surface: "#171010"
  dark-ink: "#FBF0EC"
  dark-ink-muted: "#C2A69E"
  dark-border: "rgba(255, 227, 217, 0.14)"
typography:
  display:
    fontFamily: "Manrope, Cairo, sans-serif"
    fontSize: "clamp(2.75rem, 8vw, 5.5rem)"
    fontWeight: 800
    lineHeight: 0.98
    letterSpacing: "-0.04em"
  heading:
    fontFamily: "Manrope, Cairo, sans-serif"
    fontSize: "clamp(2rem, 4vw, 3rem)"
    fontWeight: 800
    lineHeight: 1.02
    letterSpacing: "-0.035em"
  eyebrow:
    fontFamily: "Manrope, Cairo, sans-serif"
    fontSize: "0.85rem"
    fontWeight: 700
    letterSpacing: "0.1em"
    textTransform: "uppercase"
  body:
    fontFamily: "Manrope, Cairo, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.7
rounded:
  sm: "8px"
  md: "12px"
  lg: "20px"
  pill: "999px"
spacing:
  section: "clamp(4rem, 8vw, 7rem)"
  card: "1.75rem"
components:
  badge-pill:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "6px 14px"
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    rounded: "{rounded.pill}"
    padding: "12px 28px"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "12px 28px"
  project-card:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.lg}"
    padding: "0"
---

## Overview

A personal developer portfolio, designed as a quiet editorial "proof sheet": bold typography and generous whitespace carry the work; color is restrained to one selected accent used for small emphasis and interaction. The project showcase adds a restrained technical frame around each preview so the work leads, while light and dark modes remain two expressions of the same visual language.

## Colors

### Primary

Ink (`#1C1210` light / `#FBF0EC` dark) on Paper (`#FCF8F6` light / `#0C0808` dark). This pairing carries essentially the whole surface — headings, body copy, primary buttons, borders. The exact ink/paper hue shifts a few points warmer or cooler per palette (see Secondary) so the neutral surfaces feel tinted by that palette's hue rather than pasted onto a fixed gray.

### Secondary (accent)

Three selectable palettes, each a genuinely distinct hue family so switching is visible at a glance, not three shades of the same blue-violet: **Vermilion** (warm coral-red, `#D6331B`/`#FF8066`, default), **Verdant** (deep emerald, `#0F7B4D`/`#3DDC9A`), **Meridian** (signal blue, `#2E5CE6`/`#7CA3FF`). Each palette also carries an `--accent-wash` token — a low-opacity tint (8% light / 11-12% dark) the accent is allowed to fill on small surfaces: category badges, the "+N more" tech pill, hover fills on the details link and icon buttons, a 3px top rule on project cards. This is wider than a bare dot/underline but still never a large surface — body copy, headings, and primary buttons stay ink-colored; the wash is the ceiling.

### Neutral

`surface` (`#FFFFFF` / `#171010`) is the card/panel background, one step off the page's `paper` background, distinguished by a hairline `border` (10–12% ink opacity) rather than shadow or blur.

### Named Rules

- No glass/blur surfaces. The old `.container` backdrop-blur wrapper is retired; sections sit directly on the paper background.
- No large gradient fields. `--page-bg`/`--page-glow` radial gradients are retired in favor of flat paper color (a very subtle noise/grid texture is allowed, a colored glow is not).
- Accent RGB triples (`--accent-*-rgb`) are kept for hairline glows on hover/focus, and for the `--accent-wash` fill (8% light / 11–12% dark) on small chrome (badges, pills, hover fills); never for large surfaces.

## Typography

Manrope (Latin) / Cairo (Arabic) remain the only faces — both already support the bold, tight-tracked display register this direction needs; no new font is introduced.

### Hierarchy

- **Display** (hero name): `clamp(2.75rem, 8vw, 5.5rem)`, weight 800, line-height 0.98, tracking -0.04em.
- **Heading** (section titles): `clamp(2rem, 4vw, 3rem)`, weight 800, tracking -0.035em — slightly tighter/bolder than the previous section-heading scale.
- **Eyebrow** (numbered kickers, badges): 0.85–0.9rem, weight 700, tracking ~0.1em, uppercase, full ink color (not muted) — paired with a small accent-colored dot instead of colored text. Bumped up from an initial 0.7rem pass after user feedback that the small-caps kicker/badge/stat-label text was hard to read, especially in Arabic.
- **Body**: 1rem–1.125rem, line-height 1.7, ink-muted color, max 68ch.
- **Small labels** (skill items, stat captions, card labels): floor of 0.8–0.9rem — nothing below that size carries real reading content; sub-0.8rem is reserved for short badge/pill chrome only (e.g. "Trainee", "In Progress").

### Named Rules

- Headings are always ink color, never accent-colored (previously accent sometimes tinted headings/links — retired).
- Numbered section kickers ("01 / TECHNOLOGIES") are preserved verbatim as a signature device from the incumbent system.

## Layout

Generous vertical rhythm: `clamp(4rem, 8vw, 7rem)` between major sections (up from the previous `my-8`/`my-12`/`my-16` mix). Content max-width stays comfortable-reading (existing container width), but the bordered "card shell" wrapping the entire page is removed — the page breathes edge-to-edge on paper, and individual cards (project cards, stat tiles, contact cards) carry their own hairline borders instead.

## Elevation & Depth

Shadows are nearly eliminated. Cards use a 1px hairline border (`border` token) as the primary separation device; at most a very soft single-layer shadow (`0 1px 2px rgb(0 0 0 / 0.04)`) on hover for cards, never on rest state. Backdrop blur is removed everywhere except the sticky header (kept minimal, for legibility while scrolling only).

### Named Rules

- Rest-state cards: border only, no shadow.
- Hover-state cards: border darkens slightly + shadow appears; this is the only elevation change allowed.

## Shapes

- Buttons and badges: full pill (`rounded: 999px`).
- Cards/panels: `rounded-lg` (20px) — softer and slightly larger radius than the incumbent `rounded-2xl` Tailwind default, to read as calmer.
- Small icon containers (skill category icons, stat tiles): `rounded-md` (12px).
- Decorative motif: a small checkerboard/tile grid (alternating filled/empty squares, ink + accent + empty), used once in the hero as a signature decorative element echoing the reference screenshot — not repeated elsewhere as a texture.

## Components

### Buttons

- **Primary** (e.g. hero "View selected work"): filled ink pill, paper-colored text, weight 600.
- **Secondary** (e.g. hero "Read résumé"): transparent/outline pill, 1px border, ink text.

### Chips / Badges

- Pill shape, 1px border, small colored dot (accent) + label, e.g. "Available for new opportunities". Used for availability status and experience-type tags (full-time/trainee/training) — replaces the previous solid-colored `typeColors` badge fills with border+dot.

### Cards / Containers

- Project cards: white/dark-surface panel, hairline border, rounded-lg, generous internal padding, thumbnail area at top, eyebrow category label + year, title, description, 1–2 outcome tags at bottom. No gradient overlays. A 3px accent rule sits along the card's top edge, dimmed at rest and expanding to full width on hover/focus — the one place a card carries a persistent (if quiet) accent mark instead of only reacting on hover. The category eyebrow is a wash-filled pill rather than plain colored text, and the footer's "View details" link fills with the wash on hover instead of only changing text color.

### Inputs / Fields

Unchanged behavior; visual update to flat surface + hairline border + ink focus ring (no accent glow blur).

### Navigation

Header becomes a slim, mostly-transparent bar on paper background (no dark pill-nav by default in light mode); nav links are plain text with an underline-on-hover, matching the reference's plain-text top nav rather than a bordered/blurred pill container.

## Do's and Don'ts

- Do let whitespace and type size carry hierarchy; don't reach for a shadow or gradient to create separation.
- Do keep the numbered eyebrow kicker pattern; don't drop it — it's a signature device worth carrying forward.
- Do use the accent color sparingly (dot, underline, wash-filled badge/pill, hover state); don't tint large surfaces or headings with it — the wash tint is the ceiling, not a step toward filled panels.
- Do keep dark mode a faithful inversion of the same rules (ink/paper swap); don't invent a separate dark identity (no neon, no glow).
- Do keep all three accent palettes selectable; don't let switching palette change anything except the accent hue.
