import { readFile, readdir } from "node:fs/promises";
import assert from "node:assert/strict";

const root = new URL("../dist/", import.meta.url);
const origin = "https://longpham28.github.io";
const paths = ["/", "/ja/", "/vi/", "/publications/", "/ja/publications/", "/vi/publications/"];
const files = new Map();
for (const path of [...paths, "/404.html"]) files.set(path, await readFile(new URL(path === "/404.html" ? "404.html" : `${path.slice(1)}index.html`, root), "utf8"));
const attribute = (tag, name) => tag.match(new RegExp(`(?:^|\\s)${name}="([^"]*)"`))?.[1];
const tags = (html, name) => html.match(new RegExp(`<${name}\\b[^>]*>`, "g")) ?? [];
const recordParts = (html) => [...html.matchAll(/<article\b[^>]*data-record-id="([^"]+)"[^>]*>(.*?)<\/article>/gs)].map(([, id, body]) => ({
  id,
  title: body.match(/<h3\b[^>]*>(.*?)<\/h3>/s)?.[1],
  authors: body.match(/<p class="authors"[^>]*>(.*?)<\/p>/s)?.[1],
  venue: body.match(/<cite\b[^>]*>(.*?)<\/cite>/s)?.[1],
  doi: body.match(/<p class="doi"[^>]*>(.*?)<\/p>/s)?.[1],
}));
for (const [path, html] of files) {
  assert(!html.includes("undefined"), `Missing copy: ${path}`);
  const locale = path.startsWith("/vi/") ? "vi" : path.startsWith("/ja/") ? "ja" : "en";
  assert.equal(attribute(tags(html, "html")[0], "lang"), locale);
  assert.equal(attribute(tags(html, "link").find(tag => attribute(tag, "rel") === "canonical"), "href"), origin + path);
  const alternates = tags(html, "link").filter(tag => attribute(tag, "rel") === "alternate");
  if (path === "/404.html") assert.equal(alternates.length, 0);
  else {
    const suffix = path.includes("publications") ? "publications/" : "";
    for (const [lang, prefix] of [["en", "/"], ["ja", "/ja/"], ["vi", "/vi/"], ["x-default", "/"]]) {
      assert.equal(attribute(alternates.find(tag => attribute(tag, "hreflang") === lang), "href"), origin + prefix + suffix);
    }
    const records = recordParts(html);
    assert.equal(records.length, suffix ? 26 : 3);
    assert.deepEqual(records, recordParts(files.get(suffix ? "/publications/" : "/")), `Bibliography parity: ${path}`);
  }
  for (const tag of tags(html, "a")) {
    const href = attribute(tag, "href");
    if (!href?.startsWith("/") && !href?.startsWith("#")) continue;
    const url = new URL(href, origin + path);
    const target = files.get(url.pathname);
    assert(target, `Broken internal link ${path}: ${href}`);
    if (url.hash) assert(target.includes(`id="${url.hash.slice(1)}"`), `Broken fragment ${href}`);
  }
}
const sitemap = await readFile(new URL("sitemap.xml", root), "utf8");
for (const path of paths) assert(sitemap.includes(`<loc>${origin}${path}</loc>`));
const outputFiles = await readdir(root, {recursive:true});
assert.equal(outputFiles.filter(file => file.endsWith(".html")).length, 7);
assert(!outputFiles.some(file => /\.jsonl$|research\.json$|rm_researchers/.test(file)), "Raw research data in public output");
console.log("Built-page checks passed: seven pages, bibliographic parity, internal links, language metadata, sitemap, and public output.");
