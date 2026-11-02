import { Check } from "lucide-react";
import { getTranslations } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { SectionHeading } from "@/components/ui/SectionHeading";

const focusKeys = ["apps", "frontBack", "api", "data", "auth", "ship", "problems", "ai"] as const;

export async function About({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: "about" });

  return (
    <section id="about" aria-labelledby="about-title" className="border-t border-border py-20 md:py-28">
      <div className="container-page">
        <SectionHeading id="about" eyebrow={t("eyebrow")} title={t("heading")} />
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr] md:gap-16">
          <div className="space-y-5 text-base leading-relaxed text-muted md:text-lg" data-reveal>
            <p className="text-fg">{t("p1")}</p>
            <p>{t("p2")}</p>
            <p>{t("p3")}</p>
          </div>
          <div data-reveal>
            <h3 className="mb-4 text-sm font-medium text-fg">{t("focusTitle")}</h3>
            <ul className="divide-y divide-border border-y border-border">
              {focusKeys.map((key) => (
                <li key={key} className="flex items-center gap-3 py-3 text-sm">
                  <Check className="size-4 shrink-0 text-accent" aria-hidden="true" />
                  {t(`focus.${key}`)}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
