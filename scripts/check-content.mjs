import { readFile } from "node:fs/promises";

const data = JSON.parse(await readFile(new URL("../src/data/research.json", import.meta.url), "utf8"));
const expected = { interests: 4, areas: 1, experience: 3, education: 2, service: 3, awards: 5, papers: 12, misc: 13 };

for (const [key, count] of Object.entries(expected)) {
  if (data[key]?.length !== count) throw new Error(`Expected ${count} ${key}, received ${data[key]?.length ?? 0}`);
}

const outputs = [...data.papers, ...data.misc];
if (outputs.some((item) => !item.title.en || !item.title.ja || !item.date)) {
  throw new Error("A research output is missing a localized title or date.");
}

console.log("Content checks passed.");
