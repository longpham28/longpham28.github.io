# Huu-Long Pham — Academic website

A bilingual academic profile built with Astro and deployed to GitHub Pages.

## Local development

Requirements: Node.js 22 or newer and npm.

```sh
npm install
npm run dev
```

The production build is generated in `dist/`:

```sh
npm run check:content
npm run build
```

## Updating researchmap data

Export the latest JSONL file from researchmap, then run:

```sh
npm run import:researchmap -- /path/to/export.jsonl
npm run check:content
```

The importer includes only records whose display status is `disclosed` and writes a curated dataset to `src/data/research.json`. Never copy the original export into `public/` or commit it to the repository.

Review both language versions after an import because some researchmap records have content in only one language.

## Deployment

Pushes to `master` trigger `.github/workflows/deploy.yml`. GitHub Actions builds the site and deploys the generated artifact directly to GitHub Pages; generated output is not committed.

In the repository settings, **Pages → Build and deployment → Source** must be set to **GitHub Actions**.

## Project documentation

- [Specification](project-docs/SPEC.md)
- [Architecture decisions](project-docs/DECISIONS.md)
- [Content sources](project-docs/CONTENT_SOURCES.md)
- [Current status](project-docs/STATUS.md)
