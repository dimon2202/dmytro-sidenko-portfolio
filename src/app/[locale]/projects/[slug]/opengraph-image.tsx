import { getTranslations } from "next-intl/server";
import { isLocale, routing } from "@/i18n/routing";
import { getContent } from "@/content";
import { getProject } from "@/data/projects";
import { person } from "@/lib/site";
import { ogSize, renderOgImage } from "@/components/seo/og";

export const size = ogSize;
export const contentType = "image/png";
export const alt = "Case study — Dmytro Sidenko";

export default async function OpenGraphImage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale: raw, slug } = await params;
  const locale = isLocale(raw) ? raw : routing.defaultLocale;
  const t = await getTranslations({ locale, namespace: "meta" });
  const project = getProject(slug);
  const title = project ? getContent(locale).projects[project.slug].title : person.name;

  return renderOgImage({
    eyebrow: t("caseStudy"),
    title,
    subtitle: `${person.name} · ${t("ogTagline")}`,
    footer: project?.stack.slice(0, 4).join(" · ") ?? "",
  });
}
