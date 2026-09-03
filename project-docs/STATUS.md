# Project status

Last updated: 2026-09-03

## Current phase

Initial implementation, validation, and deployment are complete. The Astro site is live at https://longpham28.github.io/, and GitHub Pages now uses GitHub Actions as its publishing source.

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
- The repository owner changed **Settings → Pages → Build and deployment → Source** from branch deployment to **GitHub Actions** and confirmed a successful workflow run without errors.
- Added the user-supplied illustrated avatar to both language versions. Astro converts the 1 MB source PNG into an approximately 8 KB WebP asset during the build.
- Simplified the home-page publication labels in both English and Japanese.
- Replaced the boxed `HLP` header mark with a restrained `Huu-Long Pham` typographic wordmark.
- Refined the visual hierarchy with slightly larger accent-colored section headings and one subtle vertical accent in the hero.
- Corrected the bilingual research fields, Kobelco Systems role and end date, graduate-program dates and labels, degree, service-role translations, award labels, and publication-page introductory copy.
- Selected muted antique gold (`#75613B`) as the site's single accent after local comparison with navy and brighter gold, and added restrained link, hover, selection, and focus states.
- Added an automatic CSS-only dark mode using the visitor's operating-system preference, with warm charcoal surfaces and a lighter gold accent.
- Verified the dark theme in English, Japanese, and publications views: all sampled text exceeds WCAG AA contrast, with no horizontal overflow or browser warnings.

## Next steps

1. Confirm the GitHub Pages workflow publishes the approved visual refinements.
2. Discuss whether a manual light/dark override is worth adding alongside system preference.
3. Perform optional visual review and content corrections after publication.
4. Add a photographic portrait or blog only when those features are intentionally brought into scope.

## Important constraints

- Do not publish the raw researchmap export.
- Keep English and Japanese content aligned.
- Keep initial browser-side JavaScript at zero.
- Use atomic Conventional Commits.
