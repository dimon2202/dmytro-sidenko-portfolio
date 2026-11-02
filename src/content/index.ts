import type { Locale } from "@/i18n/routing";
import type { ContentByLocale } from "@/types/content";
import { en } from "./en";
import { nl } from "./nl";

const content: ContentByLocale = { en, nl };

export function getContent(locale: Locale) {
  return content[locale];
}
