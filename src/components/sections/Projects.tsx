import { getTranslations } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { getContent } from "@/content";
import { projects } from "@/data/projects";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectCard } from "@/components/projects/ProjectCard";

export async function Projects({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: "projects" });
  const content = getContent(locale).projects;

  return (
    <section id="projects" aria-labelledby="projects-title" className="border-t border-border py-20 md:py-28">
      <div className="container-page">
        <SectionHeading id="projects" eyebrow={t("eyebrow")} title={t("heading")} intro={t("intro")} />
        <div className="grid gap-5 lg:grid-cols-2">
          {projects.map((project, index) => (
            <ProjectCard key={project.slug} project={project} copy={content[project.slug]} index={index} locale={locale} />
          ))}
        </div>
      </div>
    </section>
  );
}
