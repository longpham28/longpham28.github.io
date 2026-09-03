# Website specification

Status: Approved for implementation  
Last updated: 2026-09-03

## Purpose

Create a fast, bilingual academic profile for Huu-Long Pham. The site should make current research interests, publications, experience, awards, and academic service easy to scan while remaining simple, elegant, and inexpensive to maintain.

## Audience and language

- Primary audience: researchers, potential collaborators, students, and conference participants.
- English is served at `/` and is the canonical default.
- Japanese is served under `/ja/`.
- Language switching links to the equivalent page without automatic redirection.

## Initial routes

- `/`: English profile
- `/publications/`: English publications and MISC
- `/ja/`: Japanese profile
- `/ja/publications/`: Japanese publications and MISC
- `/404.html`: not-found page

Blog functionality is explicitly out of scope for the initial release. The structure should not prevent adding Astro Content Collections later.

## Home page content

1. Name: `Huu-Long Pham`
2. Japanese name: `ファムフーロン`
3. Current affiliation, position, and degree: Ph.D. in Information Science / 博士（情報科学）
4. Concise biography
5. Research interests
6. The three most recent published papers
7. Research experience and education
8. Awards and academic service
9. Academic memberships
10. Links to GitHub, ORCID, and researchmap

An illustrated avatar is included on both home pages. No photographic portrait or email address is included. The affiliation does not need to be linked.
The affiliated laboratory, KASYS, is linked from the profile details on both home pages.

The displayed research fields are Information Retrieval and Machine Learning / 情報検索、機械学習.

## Biography

### English

I am a Specially Appointed Assistant Professor at the Institute of Library, Information and Media Science, University of Tsukuba. My research focuses on information retrieval and machine learning, particularly the retrieval of machine learning models.

### Japanese

筑波大学図書館情報メディア系の特任助教です。情報検索と機械学習を基盤に、特に機械学習モデルの検索に取り組んでいます。

## Publications and other achievements

- Show the three newest papers on each home page.
- Show all published papers on the publications pages, grouped by year in descending order.
- Show all MISC records in a compact, initially collapsed section, grouped by year.
- Use native HTML disclosure elements where collapsing is useful; do not add JavaScript for this behavior.
- Show titles prominently and keep authors, venue, date, volume, pages, and DOI compact.
- Preserve Japanese-language publication and presentation titles in Japanese on both language versions.
- Link DOI and other authoritative publication URLs when present.
- Present experience, education, awards, and service as compact chronological lists with dates in a narrow column.

## Academic memberships

- Database Society of Japan / 日本データベース学会: https://dbsj.org/
- Information Processing Society of Japan / 情報処理学会: https://www.ipsj.or.jp/index.html

## Visual direction

- Minimal, elegant, and academic rather than decorative.
- White background, dark charcoal text, and one restrained muted antique-gold accent (`#75613B`).
- Light and dark themes follow the visitor's operating-system preference by default. A compact header menu allows a persistent System, Light, or Dark override without theme-specific routes.
- Generous whitespace, thin rules, restrained typography, and subtle interaction states.
- Use the supplied illustrated bear avatar as the single profile image.
- A photographic portrait may be added later if requested.
- Responsive from small phones to wide desktop screens.

## Technical requirements

- Astro with static output and TypeScript.
- No UI framework or client framework unless a future requirement justifies one.
- No client framework. Client-side JavaScript is limited to the small theme-preference control; all content remains statically rendered and usable without it.
- Keep dependencies minimal and commit the lockfile.
- Use semantic HTML and accessible keyboard/focus behavior.
- Main text must remain comfortable at browser zoom and text enlargement.
- Include appropriate titles, descriptions, canonical URLs, language alternates, and Person structured data.
- Use local build-time content. Do not fetch researchmap at page-view time.
- Include only records explicitly marked public in the researchmap export.
- Never copy the raw researchmap export into a public output directory.

## Deployment

- Repository: `longpham28/longpham28.github.io`
- Source branch: `master`
- GitHub Pages source: GitHub Actions
- Build and deploy automatically after pushes to `master`.
- Deploy the Astro build artifact directly to GitHub Pages.
- Do not commit generated site output or maintain a separate publishing branch.
- Preserve the old Gatsby implementation in Git history, but remove it from the active source tree and published website.

## Quality targets

- Successful clean production build.
- No broken internal links.
- No unintended horizontal scrolling on narrow screens.
- Accessible heading order, navigation, focus styles, and contrast.
- Minimal transferred assets and no render-blocking third-party scripts.

## Version-control policy

- Use atomic commits.
- Follow Conventional Commits such as `docs:`, `chore:`, `feat:`, `fix:`, and `style:`.
- Keep documentation synchronized with meaningful implementation changes.
