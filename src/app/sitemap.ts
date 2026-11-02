import type { MetadataRoute } from "next";
import { locales } from "@/i18n/routing";
import { projects } from "@/data/projects";
import { localizedUrl } from "@/lib/metadata";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["", ...projects.map((project) => `/projects/${project.slug}`)];

  return paths.flatMap((path) =>
    locales.map((locale) => ({
      url: localizedUrl(locale, path),
      changeFrequency: "monthly" as const,
      priority: path === "" ? 1 : 0.8,
      alternates: {
        languages: Object.fromEntries(locales.map((l) => [l, localizedUrl(l, path)])),
      },
    })),
  );
}
