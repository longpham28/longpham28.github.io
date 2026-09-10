# Project guide

This repository contains the multilingual academic website of Huu-Long Pham.

Before making changes, read:

1. `project-docs/SPEC.md`
2. `project-docs/DECISIONS.md`
3. `project-docs/STATUS.md`
4. `project-docs/CONTENT_SOURCES.md`

Keep the site statically generated with Astro and avoid client-side JavaScript unless a feature genuinely requires it. Preserve content parity between English, Japanese, and Vietnamese pages. Keep research titles and bibliographic details in their original language across all pages. Never publish the raw researchmap export or content marked as non-public.

Use atomic commits following Conventional Commits. Update `project-docs/STATUS.md` whenever a meaningful implementation milestone changes the current state or next steps.
