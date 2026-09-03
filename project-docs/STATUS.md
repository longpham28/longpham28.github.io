# Project status

Last updated: 2026-09-03

## Current phase

Implementation, validation, and the first GitHub Actions deployment are complete. The Astro site is live at https://longpham28.github.io/.

## Completed

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

## Next steps

1. In GitHub, confirm **Settings → Pages → Build and deployment → Source** is set to **GitHub Actions**. The legacy branch-based Pages process also ran after the migration and failed because `master/docs` was intentionally removed; the custom Actions deployment succeeded independently.
2. Perform an optional visual review and content corrections after publication.

## Important constraints

- Do not publish the raw researchmap export.
- Keep English and Japanese content aligned.
- Keep initial browser-side JavaScript at zero.
- Use atomic Conventional Commits.
