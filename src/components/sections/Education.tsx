import { getTranslations } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { getContent } from "@/content";
import { education } from "@/data/experience";
import { formatMonth } from "@/lib/format";
import { SectionHeading } from "@/components/ui/SectionHeading";

export async function Education({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: "education" });
  const content = getContent(locale).education;

  return (
    <section id="education" aria-labelledby="education-title" className="border-t border-border py-20 md:py-28">
      <div className="container-page">
        <SectionHeading id="education" eyebrow={t("eyebrow")} title={t("heading")} />
        <ul className="divide-y divide-border border-y border-border">
          {education.map((item) => (
            <li
              key={item.id}
              data-reveal
              className="grid gap-1 py-6 md:grid-cols-[1fr_1fr_auto] md:items-baseline md:gap-10"
            >
              <h3 className="font-display text-lg font-semibold tracking-tight">{item.institution}</h3>
              <p className="text-sm text-muted">{content[item.id].programme}</p>
              <p className="font-mono text-xs text-muted">
                <time dateTime={item.start}>{formatMonth(item.start, locale)}</time>
                {" – "}
                {item.end ? <time dateTime={item.end}>{formatMonth(item.end, locale)}</time> : t("present")}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
