import researchData from "../data/research.json";

export type Locale = "en" | "ja" | "vi";
export type Localized = { en: string; ja: string; vi: string };

export type Publication = {
  id: string;
  title: string;
  authors: string[];
  date: string;
  venue: string;
  status?: string;
  fieldLanguages: Partial<Record<"title" | "authors" | "venue" | "publisher", string>>;
  publisher: string;
  volume: string;
  issue: string;
  pages: string;
  doi: string;
  url: string;
  peerReviewed: boolean;
  type: string;
};

export const research = researchData;
export const text = (value: Localized, locale: Locale) => value[locale];
export const yearOf = (date: string) => date.slice(0, 4);

export const groupByYear = <T extends { date: string }>(items: T[]) =>
  Object.entries(items.reduce<Record<string, T[]>>((groups, item) => {
    const year = yearOf(item.date);
    groups[year] ??= [];
    groups[year].push(item);
    return groups;
  }, {})).sort(([a], [b]) => b.localeCompare(a));

const formatSingleDate = (date: string, locale: Locale) => {
  if (!date) return "";
  if (date === "9999") return ({ en: "Present", ja: "現在", vi: "Hiện tại" })[locale];
  const [year, month, day] = date.split("-").map(Number);
  if (!month) return String(year);
  return new Intl.DateTimeFormat(({ en: "en-US", ja: "ja-JP", vi: "vi-VN" })[locale], {
    year: "numeric",
    month: locale === "ja" ? "numeric" : "short",
    ...(day ? { day: "numeric" } : {}),
    timeZone: "UTC",
  }).format(new Date(Date.UTC(year, month - 1, day || 1)));
};

export const formatDate = (date: string, locale: Locale) => formatSingleDate(date, locale);
export const formatRange = (from: string, to: string, locale: Locale) =>
  `${formatSingleDate(from, locale)}–${formatSingleDate(to, locale)}`;

export const isSelf = (name: string) => {
  const normalized = name.toLowerCase().replace(/[\s,‐‑–—-]+/g, "");
  return normalized.includes("huulongpham") || normalized.includes("phamhuulong") || name.includes("ファム");
};
