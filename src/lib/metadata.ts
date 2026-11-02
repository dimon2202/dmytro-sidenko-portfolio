import type { Metadata } from "next";
import { locales, type Locale } from "@/i18n/routing";
import { siteUrl } from "./site";

export const ogLocale: Record<Locale, string> = { en: "en_US", nl: "nl_NL" };

export function localizedUrl(locale: Locale, path = "") {
  return `${siteUrl}/${locale}${path}`;
}

/** Canonical URL plus hreflang links to every locale's equivalent of `path`. */
export function alternatesFor(locale: Locale, path = ""): Metadata["alternates"] {
  const languages: Record<string, string> = Object.fromEntries(
    locales.map((l) => [l, localizedUrl(l, path)]),
  );
  languages["x-default"] = localizedUrl("en", path);
  return { canonical: localizedUrl(locale, path), languages };
}
