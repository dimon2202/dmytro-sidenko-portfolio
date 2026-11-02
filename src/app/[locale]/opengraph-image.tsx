import { getTranslations } from "next-intl/server";
import { isLocale, routing } from "@/i18n/routing";
import { person } from "@/lib/site";
import { ogSize, renderOgImage } from "@/components/seo/og";

export const size = ogSize;
export const contentType = "image/png";
export const alt = "Dmytro Sidenko — Full-Stack Developer";

export default async function OpenGraphImage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  const locale = isLocale(raw) ? raw : routing.defaultLocale;
  const t = await getTranslations({ locale, namespace: "meta" });

  return renderOgImage({
    eyebrow: t("ogLocation"),
    title: person.name,
    subtitle: t("ogTagline"),
    footer: "github.com/dimon2202",
  });
}
