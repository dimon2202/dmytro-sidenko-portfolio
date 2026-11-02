import { ArrowUpRight, Download, Mail, Phone } from "lucide-react";
import { getTranslations } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { person } from "@/lib/site";
import { buttonClass } from "@/components/ui/button";
import { ExternalLink } from "@/components/ui/ExternalLink";
import { GitHubIcon, LinkedInIcon } from "@/components/ui/BrandIcons";

export async function Contact({ locale, cvHref }: { locale: Locale; cvHref: string | null }) {
  const t = await getTranslations({ locale, namespace: "contact" });
  const tCommon = await getTranslations({ locale });

  const rows = [
    { label: t("email"), value: person.email, href: `mailto:${person.email}`, icon: Mail, external: false },
    { label: t("phone"), value: person.phone, href: `tel:${person.phone.replace(/\s/g, "")}`, icon: Phone, external: false },
    { label: t("linkedin"), value: "in/dimon4ik", href: person.linkedin, icon: LinkedInIcon, external: true },
    { label: t("github"), value: "dimon2202", href: person.github, icon: GitHubIcon, external: true },
  ];

  return (
    <section id="contact" aria-labelledby="contact-title" className="border-t border-border py-20 md:py-28">
      <div className="container-page grid gap-12 md:grid-cols-[1.2fr_1fr] md:gap-16">
        <div data-reveal>
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.18em] text-muted">{t("eyebrow")}</p>
          <h2 id="contact-title" className="font-display text-3xl font-semibold tracking-tight text-balance md:text-5xl">
            {t("heading")}
          </h2>
          <p className="mt-5 max-w-lg text-base leading-relaxed text-muted md:text-lg">{t("body")}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={`mailto:${person.email}`} className={buttonClass("primary")}>
              <Mail className="size-4" aria-hidden="true" />
              {t("sendEmail")}
            </a>
            {cvHref ? (
              <a href={cvHref} download className={buttonClass("secondary")}>
                <Download className="size-4" aria-hidden="true" />
                {t("cv")}
              </a>
            ) : null}
          </div>
        </div>

        <ul className="self-end divide-y divide-border border-y border-border" data-reveal>
          {rows.map(({ label, value, href, icon: Icon, external }) => {
            const inner = (
              <>
                <Icon className="size-4 shrink-0 text-muted" aria-hidden="true" />
                <span className="w-20 shrink-0 text-xs text-muted">{label}</span>
                <span className="min-w-0 flex-1 truncate font-medium">{value}</span>
                <ArrowUpRight
                  className="size-4 shrink-0 text-muted transition-[transform,color] duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                  aria-hidden="true"
                />
              </>
            );
            const className = "group flex min-h-14 items-center gap-4 py-3 text-sm transition-colors hover:text-accent-text";
            return (
              <li key={label}>
                {external ? (
                  <ExternalLink href={href} newTabLabel={tCommon("external")} className={className}>
                    {inner}
                  </ExternalLink>
                ) : (
                  <a href={href} className={className}>
                    {inner}
                  </a>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
