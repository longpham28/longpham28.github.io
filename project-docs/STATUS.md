# Project status

Last updated: 2026-09-10

## Current phase

Initial implementation, validation, and deployment are complete. The Astro site is live at https://longpham28.github.io/, and GitHub Pages now uses GitHub Actions as its publishing source.

Vietnamese support is implemented, validated, and published on 2026-09-10, following [VIETNAMESE_DESIGN.md](VIETNAMESE_DESIGN.md). The site now builds English, Japanese, and Vietnamese profile/publications pages plus the shared 404. GitHub Pages deployment of `a7e9d3e` succeeded (Actions run `34420638004`); live Vietnamese profile and publications pages were verified, including all requested terminology, name spelling, and wrapping corrections.

## Completed

- Removed GitHub and ORCID profile links from all language pages and shared Person metadata at the user’s request; retained researchmap.

- Kept `Hữu Long` together in the Vietnamese profile heading, allowing wrapping only after `Phạm`.

- Shortened the Vietnamese role to `Giáo sư trợ lý` in the profile, biography, and experience at the user’s request.

- Applied the user-supplied name `Phạm Hữu Long` throughout Vietnamese profile identity and metadata, preserving original publication author names.

- Applied the user’s Vietnamese terminology corrections: `Task Organizer` remains English, and `Giáo sư trợ lý` is used consistently in the current role, biography, and experience.

- Added `/vi/` and `/vi/publications/`, Vietnamese interface/profile copy, localized dates and publication status, and visible three-language navigation.
- Preserved equivalent pages and targeted profile sections when switching languages, using static links and CSS without new client-side JavaScript.
- Audited all 26 paper/MISC records against the disclosed 2026-09-08 export and migrated bibliographic fields to shared original wording with field-specific language tags; retained the user-corrected ICADL venue.
- Updated reciprocal language metadata, self-canonicals, page-specific `x-default`, Open Graph locales, and the sitemap.
- Changed the importer to produce review candidates without overwriting curated records; retained approved corrections/translations and excluded explicitly non-disclosed records.
- Passed the seven-page production build, content checks, and the new `check:build` validation for bibliography parity, internal links/fragments, language metadata, sitemap coverage, and public-output exclusions.
- Verified all six content pages at 320, 768, and 1440 pixels in both themes. Checked no-JavaScript language/section switching and MISC disclosure, keyboard skip navigation, persisted theme selection, and 200% text enlargement. Fixed timeline overflow during these checks.

- Documented Vietnamese routes, three-language navigation, translation boundaries, shared original-language research records, and implementation acceptance criteria (2026-09-10).

- Updated the ICADL 2026 venue in both languages to “Proceedings of the 28th International Conference on Asia-Pacific Digital Libraries (ICADL 2026)” at the user's request.
- Added the user-supplied ICADL 2026 paper to the shared publication data, bringing the paper count to 13, with “To appear.” / “掲載予定” shown on both home and publications pages.
- Reviewed the current public Gatsby site and repository structure.
- Reviewed the supplied researchmap JSONL export.
- Agreed on audience, routes, content scope, bilingual behavior, visual direction, and deployment architecture.
- Confirmed that the initial release has no blog, portrait, or email address.
- Confirmed academic memberships and external profile links.
- Replaced Gatsby with Astro 7.2.10 while preserving the previous implementation in Git history.
- Added English and Japanese profile and publications routes.
- Imported 43 publicly disclosed researchmap records into curated local data.
- Added compact year-grouped publications, collapsed MISC, timelines, awards, service, and memberships.
- Added a GitHub Pages deployment workflow.
- Passed the content-integrity check and a clean production build of all five pages.
- Pushed the atomic commits to `master` and confirmed the custom Pages workflow completed successfully.
- Confirmed the public URL serves Astro 7.2.10 content.
- The repository owner changed **Settings → Pages → Build and deployment → Source** from branch deployment to **GitHub Actions** and confirmed a successful workflow run without errors.
- Added the user-supplied illustrated avatar to both language versions. Astro converts the 1 MB source PNG into an approximately 8 KB WebP asset during the build.
- Simplified the home-page publication labels in both English and Japanese.
- Replaced the boxed `HLP` header mark with a restrained `Huu-Long Pham` typographic wordmark.
- Refined the visual hierarchy with slightly larger accent-colored section headings and one subtle vertical accent in the hero.
- Corrected the bilingual research fields, Kobelco Systems role and end date, graduate-program dates and labels, degree, service-role translations, award labels, and publication-page introductory copy.
- Selected muted antique gold (`#75613B`) as the site's single accent after local comparison with navy and brighter gold, and added restrained link, hover, selection, and focus states.
- Added an automatic CSS-only dark mode using the visitor's operating-system preference, with warm charcoal surfaces and a lighter gold accent.
- Verified the dark theme in English, Japanese, and publications views: all sampled text exceeds WCAG AA contrast, with no horizontal overflow or browser warnings.
- Added the approved compact header appearance menu with persistent System, Light, and Dark options.
- Corrected the desktop hero grid so the `01` marker remains aligned with the profile content and capped the hero height to avoid excessive whitespace in tall viewports.
- Simplified the bilingual biography to focus on information retrieval, machine learning, and machine-learning-model retrieval.
- Added the KASYS laboratory affiliation and official website link to both home-page language versions.
- Added the Ohshima Laboratory affiliation and official website link to the master's and doctoral education records.
- Added a branded favicon, social-sharing image, and Open Graph and Twitter/X card metadata.
- Added the user-supplied Google Search Console verification meta tag to the shared layout for both languages.

## Next steps

1. Complete HTML-tag verification in Google Search Console and submit the updated `sitemap.xml`.
2. Perform optional content corrections after publication.
3. Add a photographic portrait or blog only when those features are intentionally brought into scope.

## Important constraints

- Do not publish the raw researchmap export.
- Keep English, Japanese, and Vietnamese content aligned.
- Preserve original-language research records across every language page.
- Keep browser-side JavaScript limited to the theme-preference control unless a future feature clearly requires more.
- Use atomic Conventional Commits.
