# Architecture and design decisions

## ADR-001: Static Astro site

Status: Accepted

Astro static output provides the requested performance and allows the initial site to ship without browser-side JavaScript. It also leaves a direct path to a future Markdown-based blog.

## ADR-002: Bilingual route structure

Status: Accepted

English lives at the root and Japanese under `/ja/`. Separate static routes are predictable, indexable, and do not require runtime language detection.

## ADR-003: GitHub Actions deployment

Status: Accepted

`master` contains source only. GitHub Actions builds and deploys the generated artifact through GitHub Pages. This replaces the previous approach of committing Gatsby output under `docs/`.

## ADR-004: Curated local research data

Status: Accepted

The site uses curated local data derived from the supplied researchmap export. Runtime fetching is avoided for speed and reliability. Only publicly disclosed records are eligible, and the source export itself is not published.

## ADR-005: Compact achievement presentation

Status: Accepted

Publications and achievements are grouped by year. MISC uses a native disclosure element so every record remains available without overwhelming the main page or introducing JavaScript.

## ADR-006: Restrained visual system

Status: Accepted

The initial visual system uses white, charcoal, and navy, with a light theme only. Typography and spacing carry the design; portraits and decorative imagery are deferred.
