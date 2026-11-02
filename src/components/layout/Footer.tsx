import { getTranslations } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { locales } from "@/i18n/routing";
import { person } from "@/lib/site";
import { ExternalLink } from "@/components/ui/ExternalLink";
import { GitHubIcon, LinkedInIcon } from "@/components/ui/BrandIcons";

export async function Footer({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: "footer" });
  const tLang = await getTranslations({ locale, namespace: "language" });
  const tCommon = await getTranslations({ locale });
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border">
      <div className="container-page flex flex-col gap-8 py-10 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="font-display text-lg font-semibold">{person.name}</p>
          <p className="mt-1 text-sm text-muted">
            {t("role")} · {t("location")}
          </p>
          <p className="mt-4 text-xs text-muted">{t("rights", { year })}</p>
        </div>

        <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm">
          <nav aria-label={t("languages")} className="flex items-center gap-3">
            {locales.map((l) => (
              <a
                key={l}
                href={`/${l}`}
                hrefLang={l}
                lang={l}
                aria-current={l === locale ? "true" : undefined}
                className={`inline-flex min-h-11 items-center ${l === locale ? "text-fg" : "text-muted transition-colors hover:text-accent-text"}`}
              >
                {tLang(l)}
              </a>
            ))}
          </nav>
          <span aria-hidden="true" className="hidden h-4 w-px bg-border md:block" />
          <ExternalLink
            href={person.github}
            newTabLabel={tCommon("external")}
            className="inline-flex min-h-11 items-center gap-2 text-muted transition-colors hover:text-fg"
          >
            <GitHubIcon className="size-4" />
            GitHub
          </ExternalLink>
          <ExternalLink
            href={person.linkedin}
            newTabLabel={tCommon("external")}
            className="inline-flex min-h-11 items-center gap-2 text-muted transition-colors hover:text-fg"
          >
            <LinkedInIcon className="size-4" />
            LinkedIn
          </ExternalLink>
        </div>
      </div>
    </footer>
  );
}
