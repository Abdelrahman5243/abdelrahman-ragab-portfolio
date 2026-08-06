# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary visitors are recruiters/HR, engineering managers and tech leads, potential freelance/agency clients, and technical peers/community — evaluating Abdelrahman Ragab Abdelbaky as a frontend developer, either for a hiring decision, a contract, or professional networking.

## Product Purpose

A personal portfolio site for a frontend developer (1.5+ years professional experience: React, Next.js, Magento 2, e-commerce/LMS/marketplace apps, SSR/PWA with GraphQL, Core Web Vitals/SEO optimization, GA4/GTM, multilingual AR/EN with RTL/LTR). Success is a visitor becoming convinced of the quality of the work/experience shown and then reaching out (email, LinkedIn, or the contact form).

## Positioning

Not a generic template CV — it demonstrates the same frontend craft (i18n/RTL, theming, animation, component architecture) it claims on the resume, functioning as a working sample of the developer's skill rather than just a listing of it.

## Operating Context

Bilingual site (English/Arabic via i18next, namespace "main", static or dynamic JSON backend). Arabic mode switches to RTL layout and Cairo font. Sections in order: Hero, Skills, Experience, Projects, Education, Articles, Contact. Separate routes exist for full article list, article detail, and project detail pages. Visitors also download/preview a CV (hosted externally on Google Drive) and can submit a contact form (Formspree-backed).

## Capabilities and Constraints

- Must keep EN/AR i18n and RTL layout switching functional.
- Must keep the existing 3-accent-palette picker system (user-switchable, persisted) — visual redesign changes the base theme/tokens but should keep palette-switching itself as a feature unless the user decides otherwise in the visual-design phase.
- Dark/light mode toggle is an existing feature (`useThemeMode`); the user has now asked to shift the *default* visual direction toward a lighter, airier theme — exact scope of dark mode's fate is a visual-world decision, not decided here.
- Existing sections (Hero, Skills, Experience, Projects, Education, Articles, Contact) and their underlying data/content are factual and must be preserved; redesign changes presentation, not content or copy meaning.

## Brand Commitments

- Name: Abdelrahman Ragab Abdelbaky. Site title: "Abdelrahman Ragab's Portfolio". Header brand mark currently reads "AR." (short logo/initials).
- Real social/contact links: email (abdelrahman.ragab.abdelbaky@gmail.com), LinkedIn, GitHub, CodePen.
- Role framing per hero copy: "Frontend Developer" (not "Software Engineer" or other title) — 1.5+ years experience.

## Evidence on Hand

- Real experience entries, education entries, and project entries already exist in `src/en.json`/`src/ar.json` (projects keyed "1"–"12", ranked by featured/company). No fabricated stats, testimonials, or client logos exist today, and none should be invented — any "impressive stat" callout (like the reference screenshot's "47+ shipped features") must use a real, verifiable number from actual project/experience data, or be omitted.
- CV file is an external Google Drive link, not a local asset.

## Product Principles

1. Content is real and already authored (EN/AR) — redesign is presentation-only; never fabricate metrics, testimonials, or claims to fill a visual pattern borrowed from a reference.
2. The site itself is a work sample — polish, correctness, and bilingual/RTL fidelity are part of what's being evaluated, not just decoration.
3. Multiple distinct audiences (recruiters, tech leads, clients, peers) must all be able to quickly find proof of quality and a clear path to contact.
4. Existing user-facing features (palette picker, dark/light mode, language switch) are product commitments unless the user explicitly decides to cut one during the visual redesign.
