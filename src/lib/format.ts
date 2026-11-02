import type { Locale } from "@/i18n/routing";

/** "2024-04" → "Apr 2024" (en) / "apr 2024" (nl) */
export function formatMonth(value: string, locale: Locale) {
  const [year, month] = value.split("-").map(Number);
  return new Intl.DateTimeFormat(locale === "nl" ? "nl-NL" : "en-GB", {
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(Date.UTC(year, month - 1, 1)));
}
