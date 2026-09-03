import { readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const inputPath = process.argv[2];

if (!inputPath) {
  console.error("Usage: npm run import:researchmap -- /path/to/researchmap.jsonl");
  process.exit(1);
}

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const outputPath = resolve(projectRoot, "src/data/research.json");
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

const authors = (value) => ({
  en: authorList(value?.en ?? value?.ja),
  ja: authorList(value?.ja ?? value?.en),
});

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

const publication = (record) => {
  const data = record.merge;
  return {
    id: record.insert.id,
    title: localized(data.paper_title),
    authors: authors(data.authors),
    date: data.publication_date ?? "",
    venue: localized(data.publication_name),
    publisher: localized(data.publisher),
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
  source: "researchmap export rm_researchers20260903.jsonl",
  importedOn: "2026-09-03",
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

await writeFile(outputPath, `${JSON.stringify(result, null, 2)}\n`, "utf8");
console.log(`Imported ${disclosed.length} disclosed records into ${outputPath}`);
