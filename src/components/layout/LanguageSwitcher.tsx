"use client";

import clsx from "clsx";
import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { locales } from "@/i18n/routing";

/** Links to the same page in each locale, so a case study switches to its translated case study. */
export function LanguageSwitcher({ className }: { className?: string }) {
  const t = useTranslations("language");
  const current = useLocale();
  const pathname = usePathname();

  return (
    <div role="group" aria-label={t("label")} className={clsx("flex items-center rounded-full text-xs font-medium", className)}>
      {locales.map((locale) => {
        const isCurrent = locale === current;
        return (
          <Link
            key={locale}
            href={pathname}
            locale={locale}
            hrefLang={locale}
            lang={locale}
            aria-current={isCurrent ? "true" : undefined}
            aria-label={isCurrent ? t(locale) : t("switchTo")}
            className={clsx(
              "inline-flex min-h-11 min-w-9 items-center justify-center px-1.5 uppercase tracking-wider transition-colors",
              isCurrent ? "text-fg" : "text-muted hover:text-accent-text",
            )}
          >
            <span className={clsx(isCurrent && "border-b border-accent pb-0.5")}>{locale}</span>
          </Link>
        );
      })}
    </div>
  );
}
