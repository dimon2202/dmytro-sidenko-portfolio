import { defineRouting } from "next-intl/routing";

export const locales = ["en", "nl"] as const;
export type Locale = (typeof locales)[number];

export const routing = defineRouting({
  locales,
  defaultLocale: "en",
  localePrefix: "always",
  // Browser language only picks the initial redirect from "/"; both locales stay reachable.
  localeDetection: true,
});

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}
