# Project status

Last updated: 2026-09-03

## Current phase

Implementation and local validation are complete. Publication is pending a push to `master` and confirmation that the repository's Pages source is set to GitHub Actions.

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

## Next steps

1. Push the completed commits to `master`.
2. Set **Pages → Build and deployment → Source** to **GitHub Actions** if it still points to `master/docs`.
3. Confirm the deployment workflow succeeds and the public URL serves the Astro site.
4. Perform an optional visual review and content corrections after publication.

## Important constraints

- Do not publish the raw researchmap export.
- Keep English and Japanese content aligned.
- Keep initial browser-side JavaScript at zero.
- Use atomic Conventional Commits.
