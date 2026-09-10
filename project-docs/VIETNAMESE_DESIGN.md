# Vietnamese language support

Date: 2026-09-10
Status: Implemented locally; deployment pending

## Scope and intent

Add a Vietnamese interface and profile to the existing academic website. All three languages share the same research records, sections, ordering, links, and visual system. This document records the agreed design, now implemented locally.

The user confirmed that research and publication details should retain their original language. An English paper title stays English on English, Japanese, and Vietnamese pages; a Japanese presentation title stays Japanese on all three. No Vietnamese translation of the bibliography is needed.

## Page and navigation design

| Page | English | Japanese | Vietnamese |
| --- | --- | --- | --- |
| Profile | `/` | `/ja/` | `/vi/` |
| Publications and MISC | `/publications/` | `/ja/publications/` | `/vi/publications/` |

Replace the single alternate-language link in the header with a small language navigation group: `English / 日本語 / Tiếng Việt`. Give the current language a visible active state and `aria-current="page"`; use ordinary links with appropriate `lang` and `hreflang` attributes. Use language names rather than flags. Switching from publications must stay on publications; switching from a profile stays on a profile. Existing section IDs remain consistent, and section fragments are preserved where equivalent anchors exist.

Keep the existing wordmark, avatar, gold accent, section hierarchy, content widths, and appearance control. Place language links alongside the header controls on wide screens; allow the group to wrap onto a separate row on narrow screens without truncating names or creating horizontal scrolling. Do not introduce a JavaScript language menu. Keep the existing shared English 404 page; its language links may lead to the three home pages and must not advertise translated 404 equivalents.

## Translation boundary

| Content | Vietnamese treatment |
| --- | --- |
| Navigation, headings, buttons, skip link, accessibility labels, footer | Translate |
| Biography, generic research interests, role/degree descriptions, explanatory copy | Translate faithfully from approved profile facts |
| Institution, laboratory, society, and personal proper names | Retain established names; do not invent Vietnamese official names |
| Publication and presentation titles | One verified original title across all page languages |
| Bibliographic authors, journals/proceedings, publishers | Same source-authentic names and author order across all page languages |
| DOI, URLs, year/date values, volume, issue, pages | Preserve; locale-specific date formatting and surrounding labels allowed |
| Editorial status such as “To appear.” | Translate as interface copy, e.g. “Sắp xuất bản.” |
| Career, education, awards, service | Translate generic descriptions/roles; retain proper names and identical facts/dates |

Existing approved English/Japanese profile organization labels can remain. This does not permit page-dependent rewriting of bibliographic records. Separate editorial status from source descriptions so that a status translation cannot accidentally translate original research text.

Draft Vietnamese interface vocabulary:

| English | Vietnamese |
| --- | --- |
| About | Giới thiệu |
| Research | Nghiên cứu |
| Publications | Công bố khoa học |
| Experience and education | Kinh nghiệm và học vấn |
| Awards | Giải thưởng |
| Academic service | Hoạt động học thuật |
| Memberships | Thành viên các hội học thuật |
| Other research outputs (MISC) | Các công trình khác |
| View all publications | Xem tất cả công bố |
| Appearance / System / Light / Dark | Giao diện / Hệ thống / Sáng / Tối |

Keep `Huu-Long Pham` as the wordmark and existing profile identity. No new Vietnamese personal-name spelling is inferred. Vietnamese biography and profile prose are implemented from the approved facts. Proper organization names retain their established forms.

## Content and component design

- Expand the locale type to `en | ja | vi`. Use complete dictionaries for interface text and translated profile descriptions rather than binary `isJa` branches. Required interface strings must not silently fall back to English.
- Define a shared route map keyed by page identity and locale. Use it for header links, section links, language links, and metadata instead of a single `alternatePath`.
- Continue sharing `HomePage`, `PublicationsPage`, `PublicationItem`, and `Timeline`; add thin Vietnamese route wrappers. Preserve static output and current theme behavior.
- Separate localized profile/interface text from bibliographic source fields. Plan explicit original title, authors, venue, and publisher display values plus known language tags. Retain existing curated record IDs and every factual field; do not duplicate the research dataset per locale.
- Audit existing bilingual bibliography values before choosing originals. Use disclosed source content or authoritative publication evidence; do not assume the `en` key is always original. Record unresolved ambiguity for review rather than silently guessing. Retain useful imported variants as provenance if needed, but render the same selected original on every page.
- Update the import workflow so future imports cannot overwrite verified original wording or user corrections with translated variants. Update content validation to check original fields instead of requiring translated titles.
- Format dates with `vi-VN` while preserving source precision and chronological order. Translate “Present” consistently; do not invent missing months or days.
- Mark original-language text spans with `lang` when the language is known. Check Vietnamese diacritics with the existing font stack before adding any fonts.

## Search and sharing metadata

Each profile/publications page has its own canonical URL, localized title and description, and reciprocal `en`, `ja`, and `vi` alternate links. `x-default` points to the English equivalent of that page, including `/publications/` for publication pages. Vietnamese pages use `html lang="vi"` and Open Graph locale `vi_VN`; include corresponding alternate Open Graph locales. Keep Person identity and authoritative profile URLs consistent.

Add both Vietnamese URLs to the static sitemap. Reuse the avatar, favicon, and social card; localize image descriptions where applicable. Do not create language-specific theme URLs or redirect based on browser language.

## Implementation sequence

1. Audit research-field variants and establish shared original display values without losing source facts or user corrections.
2. Add the locale/route dictionaries, Vietnamese profile copy, and localized date formatting; update shared components and importer/validation rules.
3. Add `/vi/` and `/vi/publications/`, three-language navigation, reciprocal metadata, and sitemap entries.
4. Verify the acceptance criteria below, then update project status and commit in atomic Conventional Commits. Deployment is a separate step from this documentation milestone; a push to `master` triggers the existing publishing workflow.

## Acceptance criteria

- Production build succeeds with seven pages: six language content pages plus the shared 404.
- Content checks preserve the current 13 papers and 13 MISC records, unless a separately authorized content update changes those counts.
- Every language has the same latest three papers, complete record lists, year ordering, MISC disclosure, and profile sections.
- For every research record, title, authors/order, venue, publisher, identifiers, and links match across the three rendered versions. Verify English and Japanese originals explicitly.
- Every language switch reaches the equivalent page; profile section navigation remains valid. Existing English/Japanese URLs remain unchanged.
- All required Vietnamese interface/profile strings exist, with no `undefined` output or accidental English fallback in translatable interface text.
- Canonicals, reciprocal alternates, page-specific `x-default`, document language, sharing metadata, and sitemap entries resolve correctly.
- Review all six pages on a narrow phone and desktop, in light and dark modes. Check Vietnamese diacritics, language-link wrapping, keyboard navigation, focus states, zoom, and overflow.
- Content, language links, and native MISC disclosure work with JavaScript disabled. Add no client-side JavaScript for localization.
- No raw export, non-public content, or unverified new factual claims enter the public output.
