import researchData from "../data/research.json";

export type Locale = "en" | "ja";
export type Localized = { en: string; ja: string };

export type Publication = {
  id: string;
  title: Localized;
  authors: { en: string[]; ja: string[] };
  date: string;
  venue: Localized;
  publisher: Localized;
  volume: string;
  issue: string;
  pages: string;
  doi: string;
  url: string;
  peerReviewed: boolean;
  type: string;
};

export const research = researchData;
export const text = (value: Localized, locale: Locale) => value[locale] || value.en || value.ja;
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
  if (date === "9999") return locale === "ja" ? "現在" : "Present";
  const [year, month, day] = date.split("-").map(Number);
  if (!month) return String(year);
  return new Intl.DateTimeFormat(locale === "ja" ? "ja-JP" : "en-US", {
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
