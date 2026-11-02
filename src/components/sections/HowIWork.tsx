import { getTranslations } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { SectionHeading } from "@/components/ui/SectionHeading";

const steps = ["understand", "design", "build", "ai", "ship"] as const;

export async function HowIWork({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: "howIWork" });

  return (
    <section id="process" aria-labelledby="process-title" className="border-t border-border py-20 md:py-28">
      <div className="container-page">
        <SectionHeading id="process" eyebrow={t("eyebrow")} title={t("heading")} />
        <ol className="grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-5">
          {steps.map((step, index) => (
            <li key={step} data-reveal className="bg-surface p-6 last:sm:col-span-2 last:lg:col-span-1">
              <span className="font-mono text-xs text-accent-text">{String(index + 1).padStart(2, "0")}</span>
              <h3 className="mt-6 font-display text-lg font-semibold leading-snug tracking-tight">
                {t(`steps.${step}.title`)}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{t(`steps.${step}.body`)}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
