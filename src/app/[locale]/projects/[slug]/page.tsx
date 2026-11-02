import type { Metadata } from "next";
import type { ReactNode } from "react";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { isLocale, locales } from "@/i18n/routing";
import { getContent } from "@/content";
import { getProject, projects } from "@/data/projects";
import { alternatesFor, ogLocale } from "@/lib/metadata";
import { availableImages, projectImageSrc } from "@/lib/public-file";
import { buttonClass } from "@/components/ui/button";
import { ExternalLink } from "@/components/ui/ExternalLink";
import { GitHubIcon } from "@/components/ui/BrandIcons";
import { Tag } from "@/components/ui/Tag";
import { ProjectPreview } from "@/components/projects/ProjectPreview";

type Props = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
  return locales.flatMap((locale) => projects.map((project) => ({ locale, slug: project.slug })));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const project = getProject(slug);
  if (!isLocale(locale) || !project) return {};
  const copy = getContent(locale).projects[project.slug];
  const t = await getTranslations({ locale, namespace: "meta" });
  const title = `${copy.title} — ${t("caseStudy")}`;

  return {
    title,
    description: copy.metaDescription,
    alternates: alternatesFor(locale, `/projects/${slug}`),
    openGraph: {
      type: "article",
      siteName: t("siteName"),
      locale: ogLocale[locale],
      title,
      description: copy.metaDescription,
      url: `/${locale}/projects/${slug}`,
    },
    twitter: { card: "summary_large_image", title, description: copy.metaDescription },
  };
}

function Section({ index, title, children }: { index: number; title: string; children: ReactNode }) {
  const id = `section-${index}`;
  return (
    <section aria-labelledby={id} className="grid gap-5 border-t border-border py-12 md:grid-cols-[14rem_1fr] md:gap-12 md:py-16" data-reveal>
      <h2 id={id} className="font-display text-xl font-semibold tracking-tight md:sticky md:top-24 md:self-start">
        <span aria-hidden="true" className="mb-2 block font-mono text-xs font-normal text-accent-text">{String(index).padStart(2, "0")}</span>
        {title}
      </h2>
      <div className="min-w-0 max-w-2xl">{children}</div>
    </section>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3 text-base leading-relaxed text-muted">
      {items.map((item) => (
        <li key={item} className="relative pl-6 before:absolute before:left-0 before:top-[0.7em] before:h-px before:w-3 before:bg-accent">
          {item}
        </li>
      ))}
    </ul>
  );
}

function TitledList({ items }: { items: { title: string; body: string }[] }) {
  return (
    <div className="space-y-7">
      {items.map((item) => (
        <div key={item.title}>
          <h3 className="font-medium">{item.title}</h3>
          <p className="mt-1.5 leading-relaxed text-muted">{item.body}</p>
        </div>
      ))}
    </div>
  );
}

export default async function CaseStudyPage({ params }: Props) {
  const { locale, slug } = await params;
  const project = getProject(slug);
  if (!isLocale(locale) || !project) notFound();
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "caseStudy" });
  const tProjects = await getTranslations({ locale, namespace: "projects" });
  const tCommon = await getTranslations({ locale });
  const content = getContent(locale).projects;
  const copy = content[project.slug];
  const images = availableImages(project);
  const [lead, ...gallery] = images;
  const position = projects.indexOf(project);
  const next = projects[(position + 1) % projects.length];

  let n = 0;
  const step = () => ++n;

  return (
    <article className="container-page pb-16 pt-10 md:pt-16">
      <nav aria-label={t("breadcrumb")}>
        <a
          href={`/${locale}#projects`}
          className="inline-flex min-h-11 items-center gap-2 text-sm text-muted transition-colors hover:text-fg"
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          {t("back")}
        </a>
      </nav>

      <header className="mt-8 md:mt-12">
        <p className="rise flex items-center gap-3 font-mono text-xs text-muted">
          <span>{String(position + 1).padStart(2, "0")}</span>
          <span aria-hidden="true" className="h-px w-6 bg-border-strong" />
          <span>{tProjects(`kind.${project.kind}`)}</span>
        </p>
        <h1 className="rise mt-5 max-w-4xl font-display text-4xl font-semibold leading-[1.05] tracking-tight text-balance md:text-6xl" style={{ ["--rise-delay" as string]: "100ms" }}>
          {copy.title}
        </h1>
        <p className="rise mt-6 max-w-3xl text-lg leading-relaxed text-muted md:text-xl" style={{ ["--rise-delay" as string]: "200ms" }}>
          {copy.summary}
        </p>

        <dl className="rise mt-10 grid gap-6 border-y border-border py-6 text-sm sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr]" style={{ ["--rise-delay" as string]: "300ms" }}>
          <div>
            <dt className="text-xs uppercase tracking-[0.14em] text-muted">{tProjects("role")}</dt>
            <dd className="mt-2 leading-relaxed">{copy.role}</dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-[0.14em] text-muted">{t("type")}</dt>
            <dd className="mt-2">{tProjects(`kind.${project.kind}`)}</dd>
          </div>
          {project.year ? (
            <div>
              <dt className="text-xs uppercase tracking-[0.14em] text-muted">{t("year")}</dt>
              <dd className="mt-2">{project.year}</dd>
            </div>
          ) : null}
        </dl>

        <div className="mt-8 flex flex-wrap gap-3">
          {project.links.live ? (
            <ExternalLink href={project.links.live} newTabLabel={tCommon("external")} className={buttonClass("primary")}>
              {t("live")}
              <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
            </ExternalLink>
          ) : null}
          {project.links.github ? (
            <ExternalLink
              href={project.links.github}
              newTabLabel={tCommon("external")}
              className={buttonClass(project.links.live ? "secondary" : "primary")}
            >
              <GitHubIcon className="size-4" />
              {t("github")}
            </ExternalLink>
          ) : null}
        </div>
      </header>

      <div className="group mt-12 md:mt-16">
        <ProjectPreview
          project={project}
          index={position}
          image={lead}
          alt={lead ? copy.imageAlts[lead.file] ?? copy.title : ""}
          pendingLabel={tProjects("previewPending")}
          priority
          sizes="(min-width: 1152px) 1088px, 100vw"
        />
      </div>

      <div className="mt-12 md:mt-20">
        <Section index={step()} title={t("overview")}>
          <p className="text-lg leading-relaxed">{copy.overview}</p>
        </Section>

        <Section index={step()} title={t("purpose")}>
          <p className="leading-relaxed text-muted">{copy.purpose}</p>
        </Section>

        <Section index={step()} title={t("role")}>
          <BulletList items={copy.responsibilities} />
        </Section>

        <Section index={step()} title={t("architecture")}>
          <p className="mb-8 leading-relaxed text-muted">{copy.architecture.intro}</p>
          <div className="grid gap-4 sm:grid-cols-2">
            {copy.architecture.items.map((item) => (
              <div key={item.title} className="rounded-xl border border-border bg-surface p-5">
                <h3 className="font-medium">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{item.body}</p>
              </div>
            ))}
          </div>
          <h3 className="mb-3 mt-8 text-sm font-medium">{t("stack")}</h3>
          <ul className="flex flex-wrap gap-1.5">
            {project.stack.map((tech) => (
              <li key={tech}>
                <Tag>{tech}</Tag>
              </li>
            ))}
          </ul>
        </Section>

        <Section index={step()} title={t("features")}>
          <BulletList items={copy.features} />
        </Section>

        <Section index={step()} title={t("decisions")}>
          <TitledList items={copy.decisions} />
        </Section>

        <Section index={step()} title={t("challenges")}>
          <TitledList items={copy.challenges} />
        </Section>

        {copy.outcomes?.length ? (
          <Section index={step()} title={t("outcomes")}>
            <BulletList items={copy.outcomes} />
          </Section>
        ) : null}

        {gallery.length > 0 || images.length === 0 ? (
        <Section index={step()} title={t("gallery")}>
          {gallery.length > 0 ? (
            <div className="grid gap-4">
              {gallery.map((image) => (
                <figure key={image.file} className="overflow-hidden rounded-xl border border-border">
                  <Image
                    src={projectImageSrc(project, image.file)}
                    alt={copy.imageAlts[image.file] ?? copy.title}
                    width={image.width}
                    height={image.height}
                    sizes="(min-width: 1024px) 672px, 100vw"
                    className="h-auto w-full"
                  />
                </figure>
              ))}
            </div>
          ) : (
            <p className="leading-relaxed text-muted">{t("galleryPending")}</p>
          )}
        </Section>
        ) : null}
      </div>

      <nav aria-label={t("next")} className="mt-8 border-t border-border pt-10">
        <a
          href={`/${locale}/projects/${next.slug}`}
          className="group flex items-center justify-between gap-6 rounded-2xl border border-border bg-surface p-6 transition-[border-color,box-shadow] duration-300 hover:border-border-strong hover:shadow-card md:p-8"
        >
          <span>
            <span className="block font-mono text-xs text-muted">{t("next")}</span>
            <span className="mt-2 block font-display text-2xl font-semibold tracking-tight md:text-3xl">
              {content[next.slug].title}
            </span>
          </span>
          <ArrowRight
            className="size-6 shrink-0 text-muted transition-[transform,color] duration-300 group-hover:translate-x-1 group-hover:text-accent"
            aria-hidden="true"
          />
        </a>
      </nav>
    </article>
  );
}
