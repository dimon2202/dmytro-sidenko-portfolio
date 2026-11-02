import { getTranslations } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { getContent } from "@/content";
import { skillGroups } from "@/data/skills";
import { coreStack } from "@/lib/site";
import { SectionHeading } from "@/components/ui/SectionHeading";

export async function Skills({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: "skills" });
  const { skillNotes } = getContent(locale);
  const core = new Set<string>(coreStack);

  return (
    <section id="skills" aria-labelledby="skills-title" className="border-t border-border py-20 md:py-28">
      <div className="container-page">
        <SectionHeading id="skills" eyebrow={t("eyebrow")} title={t("heading")} intro={t("intro")} />

        <h3 className="sr-only">{t("core")}</h3>
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {coreStack.map((tech, index) => (
            <li
              key={tech}
              data-reveal
              className="rounded-2xl border border-border bg-surface p-5 transition-[border-color,transform] duration-300 hover:-translate-y-0.5 hover:border-accent/50"
            >
              <span className="font-mono text-xs text-muted">{String(index + 1).padStart(2, "0")}</span>
              <p className="mt-6 font-display text-2xl font-semibold tracking-tight">{tech}</p>
              <p className="mt-2 text-sm leading-relaxed text-muted">{skillNotes[tech]}</p>
            </li>
          ))}
        </ul>

        <div className="mt-12 grid gap-x-10 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group) => {
            // Usage notes are always visible as text, so nothing depends on hover.
            const noted = group.items.filter((item) => !core.has(item) && skillNotes[item]);
            return (
              <div key={group.id} data-reveal>
                <h3 className="mb-4 border-b border-border pb-3 text-sm font-medium">{t(`groups.${group.id}`)}</h3>
                <ul className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className={
                        core.has(item)
                          ? "rounded-full border border-accent/40 bg-accent-soft px-3 py-1 text-sm font-medium text-accent-text"
                          : "rounded-full border border-border px-3 py-1 text-sm text-muted transition-colors hover:border-border-strong hover:text-fg"
                      }
                    >
                      {item}
                    </li>
                  ))}
                </ul>
                {noted.length > 0 ? (
                  <dl className="mt-4 space-y-2 text-xs leading-relaxed">
                    {noted.map((item) => (
                      <div key={item}>
                        <dt className="inline font-medium text-fg">{item}: </dt>
                        <dd className="inline text-muted">{skillNotes[item]}</dd>
                      </div>
                    ))}
                  </dl>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
