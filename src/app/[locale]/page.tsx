import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { isLocale } from "@/i18n/routing";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Skills } from "@/components/sections/Skills";
import { Projects } from "@/components/sections/Projects";
import { Experience } from "@/components/sections/Experience";
import { HowIWork } from "@/components/sections/HowIWork";
import { Education } from "@/components/sections/Education";
import { Contact } from "@/components/sections/Contact";
import { JsonLd } from "@/components/seo/JsonLd";
import { hasCv } from "@/lib/public-file";
import { localizedUrl } from "@/lib/metadata";
import { cvPath, person, siteUrl } from "@/lib/site";

type Props = { params: Promise<{ locale: string }> };

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "meta" });
  const tHero = await getTranslations({ locale, namespace: "hero" });
  const cvHref = hasCv() ? cvPath : null;

  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "Person",
      "@id": `${siteUrl}/#person`,
      name: person.name,
      jobTitle: tHero("role"),
      url: localizedUrl(locale),
      email: `mailto:${person.email}`,
      address: { "@type": "PostalAddress", addressLocality: person.city, addressCountry: person.country },
      sameAs: [person.github, person.linkedin],
      knowsAbout: ["React", "Next.js", "TypeScript", "Node.js", "Express", "REST APIs", "PostgreSQL", "MongoDB"],
      alumniOf: { "@type": "CollegeOrUniversity", name: "Kyiv National Economic University" },
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      name: t("siteName"),
      url: localizedUrl(locale),
      inLanguage: locale,
      author: { "@id": `${siteUrl}/#person` },
    },
  ];

  return (
    <>
      <JsonLd data={structuredData} />
      <Hero locale={locale} cvHref={cvHref} />
      <About locale={locale} />
      <Skills locale={locale} />
      <Projects locale={locale} />
      <Experience locale={locale} />
      <HowIWork locale={locale} />
      <Education locale={locale} />
      <Contact locale={locale} cvHref={cvHref} />
    </>
  );
}
