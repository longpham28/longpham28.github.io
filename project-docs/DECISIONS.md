# Architecture and design decisions

## ADR-001: Static Astro site

Status: Accepted

Astro static output provides the requested performance and allows the initial site to ship without browser-side JavaScript. It also leaves a direct path to a future Markdown-based blog.

## ADR-002: Language route structure

Status: Accepted

English lives at the root and Japanese under `/ja/`. The Vietnamese extension adds `/vi/` with equivalent profile and publications pages (2026-09-10). Separate static routes are predictable, indexable, and do not require runtime language detection.

## ADR-003: GitHub Actions deployment

Status: Accepted

`master` contains source only. GitHub Actions builds and deploys the generated artifact through GitHub Pages. This replaces the previous approach of committing Gatsby output under `docs/`.

## ADR-004: Curated local research data

Status: Accepted

The site uses curated local data derived from the supplied researchmap export. Runtime fetching is avoided for speed and reliability. Only publicly disclosed records are eligible, and the source export itself is not published. User-confirmed corrections override imported values. Publication and presentation titles, author names/order, venue names, and publisher names retain source-authentic wording across every language page. English titles remain English and Japanese titles remain Japanese. Surrounding interface labels, profile prose, date formatting, and editorial publication status may be localized without changing facts.

## ADR-005: Compact achievement presentation

Status: Accepted

Publications and achievements are grouped by year. MISC uses a native disclosure element so every record remains available without overwhelming the main page or introducing JavaScript.

## ADR-006: Restrained visual system

Status: Accepted

The light visual system uses white, charcoal, and one muted antique-gold accent (`#75613B`). The warm accent was chosen after local comparison with navy and a brighter gold because it harmonizes with the illustrated avatar while remaining calm and legible. Typography and spacing carry the design; refinements favor stronger heading hierarchy and subtle interaction states over colored section backgrounds or repeated decorative rules.

## ADR-007: System-responsive dark mode

Status: Accepted

Dark mode uses CSS `prefers-color-scheme` with warm charcoal surfaces and a lighter gold accent. System preference remains the default, while a compact header menu provides persistent System, Light, and Dark overrides. The small script applies a saved preference before rendering to avoid a color flash; with JavaScript unavailable, the site falls back to the fully functional system-responsive theme. Separate theme routes are avoided because they would duplicate content, metadata, and maintenance work.

## ADR-008: Vietnamese interface with shared research records

Status: Implemented (2026-09-10)

Add Vietnamese profile and publications routes using the existing shared Astro components and visual system. Replace the binary language link with visible `English / 日本語 / Tiếng Việt` links to equivalent pages. Keep navigation static and avoid automatic language detection or redirects.

Separate translated interface/profile copy from original bibliographic fields. Maintain one shared set of papers and MISC records rather than copying records into a Vietnamese dataset. Select source-authentic fields explicitly; the page locale must not select an alternative translated title or author spelling. Review ambiguous imported variants against disclosed source content before migration, without inventing an original language from the field key alone.

See [Vietnamese language support](VIETNAMESE_DESIGN.md) for the content boundary, route behavior, implementation sequence, and acceptance criteria. The implementation uses field-specific original bibliography values and static language links, including CSS-selected links that preserve targeted profile sections without additional JavaScript.
