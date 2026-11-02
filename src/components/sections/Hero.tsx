import type { CSSProperties } from "react";
import { ArrowDown, Download, MapPin } from "lucide-react";
import { getTranslations } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { coreStack, openToOpportunities, person } from "@/lib/site";
import { buttonClass } from "@/components/ui/button";
import { ExternalLink } from "@/components/ui/ExternalLink";
import { GitHubIcon, LinkedInIcon } from "@/components/ui/BrandIcons";

const delay = (ms: number) => ({ "--rise-delay": `${ms}ms` }) as CSSProperties;

export async function Hero({ locale, cvHref }: { locale: Locale; cvHref: string | null }) {
  const t = await getTranslations({ locale, namespace: "hero" });
  const tCommon = await getTranslations({ locale });

  return (
    <section aria-labelledby="hero-title" className="relative isolate overflow-hidden">
      <div aria-hidden="true" className="hero-grid pointer-events-none absolute inset-0 -z-10" />

      <div className="container-page pb-20 pt-14 md:pb-28 md:pt-24">
        <div className="rise flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted" style={delay(0)}>
          <span className="font-medium text-fg">
            {person.name} — {t("role")}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <MapPin className="size-3.5" aria-hidden="true" />
            {t("location")}
          </span>
          {openToOpportunities ? (
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-2.5 py-1 text-xs text-fg">
              <span className="relative flex size-2" aria-hidden="true">
                <span className="absolute inline-flex size-full rounded-full bg-emerald-500/60 motion-safe:animate-ping" />
                <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
              </span>
              {t("available")}
            </span>
          ) : null}
        </div>

        <h1
          id="hero-title"
          className="rise mt-8 max-w-4xl font-display text-[2.6rem] font-semibold leading-[1.04] tracking-tight text-balance sm:text-6xl md:text-7xl"
          style={delay(120)}
        >
          {t("headline")}
        </h1>

        <p className="rise mt-7 max-w-2xl text-lg leading-relaxed text-muted md:text-xl" style={delay(260)}>
          {t("intro")}
        </p>

        <div className="rise mt-8 flex flex-wrap items-center gap-2" style={delay(360)}>
          <span className="mr-1 text-xs uppercase tracking-[0.16em] text-muted">{t("coreStack")}</span>
          {coreStack.map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-border-strong bg-surface px-3 py-1.5 text-sm font-medium"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="rise mt-10 flex flex-wrap items-center gap-3" style={delay(460)}>
          <a href="#projects" className={buttonClass("primary")}>
            {t("viewWork")}
            <ArrowDown className="size-4 transition-transform group-hover:translate-y-0.5" aria-hidden="true" />
          </a>
          {cvHref ? (
            <a href={cvHref} download className={buttonClass("secondary")}>
              <Download className="size-4" aria-hidden="true" />
              {t("downloadCv")}
            </a>
          ) : null}
          <div className="flex items-center gap-1 sm:ml-2">
            <ExternalLink
              href={person.github}
              newTabLabel={tCommon("external")}
              className="inline-flex size-11 items-center justify-center rounded-full text-muted transition-colors hover:text-fg"
            >
              <GitHubIcon className="size-5" />
              <span className="sr-only">GitHub</span>
            </ExternalLink>
            <ExternalLink
              href={person.linkedin}
              newTabLabel={tCommon("external")}
              className="inline-flex size-11 items-center justify-center rounded-full text-muted transition-colors hover:text-fg"
            >
              <LinkedInIcon className="size-5" />
              <span className="sr-only">LinkedIn</span>
            </ExternalLink>
          </div>
        </div>
      </div>
    </section>
  );
}
