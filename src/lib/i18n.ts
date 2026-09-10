import type { Locale } from "./content";

export const locales = ["en", "ja", "vi"] as const;
export const languageNames = { en: "English", ja: "日本語", vi: "Tiếng Việt" };
export const ogLocales = { en: "en_US", ja: "ja_JP", vi: "vi_VN" };
export const routes = {
  home: { en: "/", ja: "/ja/", vi: "/vi/" },
  publications: { en: "/publications/", ja: "/ja/publications/", vi: "/vi/publications/" },
} as const;
export type Page = keyof typeof routes;

export const ui = {
  en: {
    about: "About", research: "Research", publications: "Publications", cv: "CV",
    appearance: "Appearance", system: "System", light: "Light", dark: "Dark",
    language: "Language", navigation: "Main navigation", home: "Home", skip: "Skip to content",
    footer: "Statically built with Astro", social: "Academic profile of Huu-Long Pham",
    avatar: "Bear avatar representing Huu-Long Pham", laboratory: "Laboratory", toAppear: "To appear.",
  },
  ja: {
    about: "概要", research: "研究", publications: "業績", cv: "経歴",
    appearance: "表示テーマ", system: "システム", light: "ライト", dark: "ダーク",
    language: "言語", navigation: "メインナビゲーション", home: "ホーム", skip: "本文へ移動",
    footer: "Astroで静的に構築", social: "Huu-Long Phamの研究者プロフィール",
    avatar: "Huu-Long Phamを表すクマのアバター", laboratory: "所属研究室", toAppear: "掲載予定",
  },
  vi: {
    about: "Giới thiệu", research: "Nghiên cứu", publications: "Công bố", cv: "Lý lịch",
    appearance: "Giao diện", system: "Hệ thống", light: "Sáng", dark: "Tối",
    language: "Ngôn ngữ", navigation: "Điều hướng chính", home: "Trang chủ", skip: "Chuyển đến nội dung",
    footer: "Được tạo dưới dạng trang tĩnh bằng Astro", social: "Hồ sơ học thuật của Huu-Long Pham",
    avatar: "Hình đại diện gấu của Huu-Long Pham", laboratory: "Phòng nghiên cứu", toAppear: "Sắp xuất bản.",
  },
} satisfies Record<Locale, Record<string, string>>;
