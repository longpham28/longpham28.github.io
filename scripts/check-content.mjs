import { readFile } from "node:fs/promises";

const data = JSON.parse(await readFile(new URL("../src/data/research.json", import.meta.url), "utf8"));
const expected = { interests: 4, areas: 1, experience: 3, education: 2, service: 3, awards: 5, papers: 13, misc: 13 };

for (const [key, count] of Object.entries(expected)) {
  if (data[key]?.length !== count) throw new Error(`Expected ${count} ${key}, received ${data[key]?.length ?? 0}`);
}

const outputs = [...data.papers, ...data.misc];
if (outputs.some((item) => typeof item.title !== "string" || !item.title || !item.date || !Array.isArray(item.authors) || !item.authors.length || typeof item.venue !== "string" || typeof item.publisher !== "string")) {
  throw new Error("A research output is missing original bibliographic fields or its date.");
}


if (new Set(outputs.map((item) => item.id)).size !== outputs.length) throw new Error("Duplicate research output IDs.");
for (const item of outputs) {
  if (item.status && item.status !== "to-appear") throw new Error(`Unknown status on ${item.id}`);
  for (const field of ["title", "authors", "venue", "publisher"]) {
    if (item[field].length && !["en", "ja"].includes(item.fieldLanguages?.[field])) throw new Error(`Review ${field} language on ${item.id}`);
  }
}
const checkTranslations = (value) => {
  if (!value || typeof value !== "object") return;
  if ("en" in value && "ja" in value && typeof value.vi !== "string") throw new Error("Missing Vietnamese profile translation.");
  Object.values(value).forEach(checkTranslations);
};
checkTranslations(data);

console.log("Content checks passed.");
