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

The site uses curated local data derived from the supplied researchmap export. Runtime fetching is avoided for speed and reliability. Only publicly disclosed records are eligible, and the source export itself is not published. User-confirmed corrections override imported values. Japanese-language research titles remain in their original language on the English site, while surrounding profile labels and metadata may be translated when the meaning is clear.

## ADR-005: Compact achievement presentation

Status: Accepted

Publications and achievements are grouped by year. MISC uses a native disclosure element so every record remains available without overwhelming the main page or introducing JavaScript.

## ADR-006: Restrained visual system

Status: Accepted

The light visual system uses white, charcoal, and one muted antique-gold accent (`#75613B`). The warm accent was chosen after local comparison with navy and a brighter gold because it harmonizes with the illustrated avatar while remaining calm and legible. Typography and spacing carry the design; refinements favor stronger heading hierarchy and subtle interaction states over colored section backgrounds or repeated decorative rules.

## ADR-007: System-responsive dark mode

Status: Accepted

Dark mode uses CSS `prefers-color-scheme` with warm charcoal surfaces and a lighter gold accent. System preference remains the default, while a compact header menu provides persistent System, Light, and Dark overrides. The small script applies a saved preference before rendering to avoid a color flash; with JavaScript unavailable, the site falls back to the fully functional system-responsive theme. Separate theme routes are avoided because they would duplicate content, metadata, and maintenance work.
