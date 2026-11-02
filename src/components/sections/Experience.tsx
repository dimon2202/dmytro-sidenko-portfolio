import { getTranslations } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { getContent } from "@/content";
import { experience } from "@/data/experience";
import { formatMonth } from "@/lib/format";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Tag } from "@/components/ui/Tag";

export async function Experience({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: "experience" });
  const content = getContent(locale).experience;

  return (
    <section id="experience" aria-labelledby="experience-title" className="border-t border-border py-20 md:py-28">
      <div className="container-page">
        <SectionHeading id="experience" eyebrow={t("eyebrow")} title={t("heading")} />
        <ol className="space-y-6">
          {experience.map((job) => {
            const copy = content[job.id];
            return (
              <li
                key={job.id}
                data-reveal
                className="grid gap-4 rounded-2xl border border-border bg-surface p-6 md:grid-cols-[13rem_1fr] md:gap-10 md:p-8"
              >
                <div>
                  <p className="font-mono text-xs text-muted">
                    <time dateTime={job.start}>{formatMonth(job.start, locale)}</time>
                    {" – "}
                    {job.end ? <time dateTime={job.end}>{formatMonth(job.end, locale)}</time> : t("present")}
                  </p>
                  <h3 className="mt-3 font-display text-xl font-semibold tracking-tight">{job.company}</h3>
                  <p className="mt-1 text-sm text-accent-text">{copy.position}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">{copy.product}</p>
                  <ul className="mt-4 space-y-2.5 text-sm leading-relaxed text-muted">
                    {copy.points.map((point) => (
                      <li
                        key={point}
                        className="relative pl-5 before:absolute before:left-0 before:top-[0.65em] before:h-px before:w-2.5 before:bg-border-strong"
                      >
                        {point}
                      </li>
                    ))}
                  </ul>
                  <ul aria-label={t("stack")} className="mt-5 flex flex-wrap gap-1.5">
                    {job.stack.map((tech) => (
                      <li key={tech}>
                        <Tag>{tech}</Tag>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
