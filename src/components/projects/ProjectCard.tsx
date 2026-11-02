import { ArrowUpRight } from "lucide-react";
import { getTranslations } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import type { Project, ProjectCopy } from "@/types/content";
import { availableImages } from "@/lib/public-file";
import { ExternalLink } from "@/components/ui/ExternalLink";
import { GitHubIcon } from "@/components/ui/BrandIcons";
import { Tag } from "@/components/ui/Tag";
import { ProjectPreview } from "./ProjectPreview";

type Props = { project: Project; copy: ProjectCopy; index: number; locale: Locale };

export async function ProjectCard({ project, copy, index, locale }: Props) {
  const t = await getTranslations({ locale, namespace: "projects" });
  const tCommon = await getTranslations({ locale });
  const image = availableImages(project)[0];
  const href = `/${locale}/projects/${project.slug}`;

  return (
    <article
      data-reveal
      className="group relative flex flex-col rounded-2xl border border-border bg-surface p-3 transition-[border-color,box-shadow] duration-300 hover:border-border-strong hover:shadow-card focus-within:border-border-strong"
    >
      <ProjectPreview
        project={project}
        index={index}
        image={image}
        alt={image ? copy.imageAlts[image.file] ?? copy.title : ""}
        pendingLabel={t("previewPending")}
        sizes="(min-width: 1024px) 560px, 100vw"
      />

      <div className="flex flex-1 flex-col px-3 pb-3 pt-6">
        <div className="flex items-center gap-3 font-mono text-xs text-muted">
          <span>{String(index + 1).padStart(2, "0")}</span>
          <span aria-hidden="true" className="h-px w-6 bg-border-strong" />
          <span>{t(`kind.${project.kind}`)}</span>
          {project.year ? <span className="ml-auto">{project.year}</span> : null}
        </div>

        <h3 className="mt-4 font-display text-2xl font-semibold tracking-tight">
          {/* The stretched link makes the whole card clickable without nesting the other links inside it. */}
          <a href={href} className="outline-none after:absolute after:inset-0 after:rounded-2xl focus-visible:after:outline-2 focus-visible:after:outline-offset-2 focus-visible:after:outline-accent">
            {copy.title}
          </a>
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-muted">{copy.summary}</p>
        <p className="mt-3 text-sm leading-relaxed">
          <span className="font-medium">{t("role")}: </span>
          <span className="text-muted">{copy.role}</span>
        </p>

        <ul aria-label={t("stack")} className="mt-5 flex flex-wrap gap-1.5">
          {project.stack.slice(0, 7).map((tech) => (
            <li key={tech}>
              <Tag>{tech}</Tag>
            </li>
          ))}
          {project.stack.length > 7 ? (
            <li>
              <Tag>+{project.stack.length - 7}</Tag>
            </li>
          ) : null}
        </ul>

        <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-2 pt-6 text-sm">
          <span aria-hidden="true" className="inline-flex items-center gap-1 font-medium text-accent-text">
            {t("caseStudy")}
            <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </span>
          {project.links.live ? (
            <ExternalLink
              href={project.links.live}
              newTabLabel={tCommon("external")}
              className="relative z-10 inline-flex min-h-11 items-center text-muted underline-offset-4 transition-colors hover:text-fg hover:underline sm:min-h-0"
            >
              {t("live")}
            </ExternalLink>
          ) : null}
          {project.links.github ? (
            <ExternalLink
              href={project.links.github}
              newTabLabel={tCommon("external")}
              className="relative z-10 inline-flex min-h-11 items-center gap-1.5 text-muted underline-offset-4 transition-colors hover:text-fg hover:underline sm:min-h-0"
            >
              <GitHubIcon className="size-3.5" />
              {t("github")}
            </ExternalLink>
          ) : null}
        </div>
      </div>
    </article>
  );
}
