import { readFile, writeFile, mkdtemp } from "node:fs/promises";
import { tmpdir } from "node:os";
import { basename, dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const inputPath = process.argv[2];

if (!inputPath) {
  console.error("Usage: npm run import:researchmap -- /path/to/researchmap.jsonl");
  process.exit(1);
}

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
// Imports are review candidates, never replacements for curated public content.
const curatedPath = resolve(projectRoot, "src/data/research.json");
const curated = JSON.parse(await readFile(curatedPath, "utf8"));
const outputPath = resolve(await mkdtemp(resolve(tmpdir(), "researchmap-review-")), "research.json");
const lines = (await readFile(resolve(inputPath), "utf8")).split("\n").filter(Boolean);
const records = lines.map((line) => JSON.parse(line));
const disclosed = records.filter((record) => record.merge?.display === "disclosed");

const localized = (value) => {
  if (!value) return { en: "", ja: "" };
  if (typeof value === "string") return { en: value, ja: value };
  return { en: value.en ?? value.ja ?? "", ja: value.ja ?? value.en ?? "" };
};

const authorList = (items = []) => {
  const names = items.map((author) => author.name);
  return names.length === 1 && names[0].split(", ").length > 2 ? names[0].split(", ") : names;
};

const firstLink = (data) =>
  data.see_also?.find((link) => link.label === "doi")?.["@id"] ??
  data.see_also?.find((link) => link.label === "cinii_research")?.["@id"] ??
  data.see_also?.find((link) => link.label === "DBLP")?.["@id"] ??
  data.see_also?.[0]?.["@id"] ??
  "";

const pageRange = (data) => {
  const start = data.starting_page === "none" ? "" : (data.starting_page ?? "");
  const end = data.ending_page ?? "";
  return start && end ? `${start}–${end}` : start;
};

const byDate = (a, b) => (b.date ?? b.fromDate ?? "").localeCompare(a.date ?? a.fromDate ?? "");
const ofType = (type) => disclosed.filter((record) => record.insert.type === type);

const original = (value, id, field) => {
  if (!value) return field === "authors" ? [] : "";
  if (typeof value === "string") return value;
  const variants = Object.values(value);
  if (!variants.every((entry) => JSON.stringify(entry) === JSON.stringify(variants[0]))) {
    throw new Error(`Record ${id}: review original ${field} before import; differing source variants.`);
  }
  return field === "authors" ? authorList(variants[0]) : (variants[0] ?? "");
};
const publication = (record) => {
  const data = record.merge;
  const existing = [...curated.papers, ...curated.misc].find((item) => item.id === record.insert.id);
  if (existing) return existing;
  const fields = {
    title: original(data.paper_title, record.insert.id, "title"),
    authors: original(data.authors, record.insert.id, "authors"),
    venue: original(data.publication_name, record.insert.id, "venue"),
    publisher: original(data.publisher, record.insert.id, "publisher"),
  };
  return {
    id: record.insert.id,
    ...fields,
    // Language tags for new records require review; field keys are not evidence.
    fieldLanguages: {},
    date: data.publication_date ?? "",
    volume: data.volume ?? "",
    issue: data.number ?? "",
    pages: pageRange(data),
    doi: data.identifiers?.doi?.[0] ?? "",
    url: firstLink(data),
    peerReviewed: data.referee ?? false,
    type: data.published_paper_type ?? data.misc_type ?? "",
  };
};

const result = {
  source: `researchmap export ${basename(inputPath)}`,
  importedOn: new Date().toISOString().slice(0, 10),
  interests: ofType("research_interests").map((record) => ({ id: record.insert.id, label: localized(record.merge.keyword) })),
  areas: ofType("research_areas").map((record) => ({
    id: record.insert.id,
    discipline: localized(record.merge.discipline),
    field: localized(record.merge.research_field),
  })),
  experience: ofType("research_experience").map((record) => ({
    id: record.insert.id,
    fromDate: record.merge.from_date ?? "",
    toDate: record.merge.to_date ?? "",
    affiliation: localized(record.merge.affiliation),
    section: localized(record.merge.section),
    role: localized(record.merge.job),
  })).sort(byDate),
  education: ofType("education").map((record) => ({
    id: record.insert.id,
    fromDate: record.merge.from_date ?? "",
    toDate: record.merge.to_date ?? "",
    affiliation: localized(record.merge.affiliation),
    department: localized(record.merge.department),
  })).sort(byDate),
  service: ofType("committee_memberships").map((record) => ({
    id: record.insert.id,
    fromDate: record.merge.from_date ?? "",
    toDate: record.merge.to_date ?? "",
    role: localized(record.merge.committee_name),
    organization: localized(record.merge.association),
  })).sort(byDate),
  awards: ofType("awards").map((record) => ({
    id: record.insert.id,
    date: record.merge.award_date ?? "",
    name: localized(record.merge.award_name),
    title: localized(record.merge.award_title),
    organization: localized(record.merge.association),
  })).sort(byDate),
  papers: ofType("published_papers").map(publication).sort(byDate),
  misc: ofType("misc").map(publication).sort(byDate),
};

// Preserve manual additions, translations, dates, and other approved corrections.
// Explicitly non-disclosed records in this source must not survive the merge.
const hidden = new Set(records.filter((record) => record.merge?.display !== "disclosed").map((record) => record.insert.id));
for (const [key, items] of Object.entries(result)) {
  if (!Array.isArray(items)) continue;
  const existing = new Map((curated[key] ?? []).filter((item) => !hidden.has(item.id)).map((item) => [item.id, item]));
  for (const item of items) if (!existing.has(item.id)) existing.set(item.id, item);
  result[key] = [...existing.values()];
  // Keep approved display order (including forthcoming papers); review placement of additions.
}
await writeFile(outputPath, `${JSON.stringify(result, null, 2)}\n`, "utf8");
console.log(`Review candidate written to ${outputPath}. Curated site data is unchanged. Review new records, language tags, and translations before applying.`);
