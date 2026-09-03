# Project status

Last updated: 2026-09-03

## Current phase

Specification approved; implementation is starting.

## Completed

- Reviewed the current public Gatsby site and repository structure.
- Reviewed the supplied researchmap JSONL export.
- Agreed on audience, routes, content scope, bilingual behavior, visual direction, and deployment architecture.
- Confirmed that the initial release has no blog, portrait, or email address.
- Confirmed academic memberships and external profile links.

## Next steps

1. Commit the approved specification and project handoff documents.
2. Replace the active Gatsby source with a minimal Astro project while preserving Git history.
3. Curate disclosed researchmap records into typed site data.
4. Build the bilingual pages and visual system.
5. Add the GitHub Pages workflow.
6. Run production and content-integrity checks.
7. Update this status document and publish through `master`.

## Important constraints

- Do not publish the raw researchmap export.
- Keep English and Japanese content aligned.
- Keep initial browser-side JavaScript at zero.
- Use atomic Conventional Commits.
