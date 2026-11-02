import { useLocale, useTranslations } from "next-intl";
import { buttonClass } from "@/components/ui/button";

export default function NotFound() {
  const t = useTranslations("notFound");
  const locale = useLocale();

  return (
    <section className="container-page flex min-h-[60vh] flex-col items-start justify-center py-24">
      <p className="font-mono text-xs text-muted">404</p>
      <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight md:text-5xl">{t("title")}</h1>
      <p className="mt-4 max-w-md text-muted">{t("body")}</p>
      <a href={`/${locale}`} className={buttonClass("primary", "mt-8")}>
        {t("home")}
      </a>
    </section>
  );
}
