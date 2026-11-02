"use client";

import { useEffect, useState } from "react";
import clsx from "clsx";
import { Download, Menu, X } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { usePathname } from "@/i18n/navigation";
import { sectionIds, type SectionId } from "@/data/navigation";
import { ThemeToggle } from "./ThemeToggle";
import { LanguageSwitcher } from "./LanguageSwitcher";

export function Header({ cvHref }: { cvHref: string | null }) {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<SectionId | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Highlight the section currently crossing the upper part of the viewport.
  useEffect(() => {
    if (!isHome) {
      setActive(pathname.startsWith("/projects") ? "projects" : null);
      return;
    }
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id as SectionId);
        }
      },
      { rootMargin: "-35% 0px -60% 0px" },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [isHome, pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => setOpen(false), [pathname]);

  const links = sectionIds.map((id) => ({ id, href: `/${locale}#${id}`, label: t(id) }));

  return (
    <header
      className={clsx(
        "sticky top-0 z-50 border-b transition-[background-color,border-color] duration-300",
        scrolled || open ? "border-border bg-bg/85 backdrop-blur-md" : "border-transparent bg-bg/0",
      )}
    >
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <a
          href={`/${locale}`}
          aria-label={t("home")}
          className="font-display text-lg font-bold tracking-tight transition-colors hover:text-accent-text"
        >
          DS<span className="text-accent">.</span>
        </a>

        <nav aria-label={t("main")} className="hidden md:block">
          <ul className="flex items-center gap-1">
            {links.map((link) => (
              <li key={link.id}>
                <a
                  href={link.href}
                  aria-current={active === link.id ? (isHome ? "location" : "page") : undefined}
                  className={clsx(
                    "relative rounded-full px-3 py-2 text-sm transition-colors",
                    active === link.id ? "text-fg" : "text-muted hover:text-fg",
                  )}
                >
                  {link.label}
                  <span
                    aria-hidden="true"
                    className={clsx(
                      "absolute inset-x-3 -bottom-px h-px origin-left bg-accent transition-transform duration-300",
                      active === link.id ? "scale-x-100" : "scale-x-0",
                    )}
                  />
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-1">
          <LanguageSwitcher />
          <ThemeToggle />
          {cvHref ? (
            <a
              href={cvHref}
              download
              className="ml-2 hidden min-h-9 items-center gap-1.5 rounded-full border border-border-strong px-3.5 text-sm font-medium transition-colors hover:border-accent hover:text-accent-text md:inline-flex"
            >
              <Download className="size-3.5" aria-hidden="true" />
              {t("cv")}
            </a>
          ) : null}
          <button
            type="button"
            className="inline-flex size-11 items-center justify-center rounded-full text-fg md:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? t("closeMenu") : t("openMenu")}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
          </button>
        </div>
      </div>

      <div id="mobile-menu" hidden={!open} className="border-t border-border md:hidden">
        <nav aria-label={t("main")} className="container-page py-4">
          <ul className="flex flex-col">
            {links.map((link) => (
              <li key={link.id}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  aria-current={active === link.id ? (isHome ? "location" : "page") : undefined}
                  className={clsx(
                    "flex min-h-12 items-center border-b border-border font-display text-xl",
                    active === link.id ? "text-accent-text" : "text-fg",
                  )}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          {cvHref ? (
            <a
              href={cvHref}
              download
              className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-full bg-fg px-5 text-sm font-medium text-bg"
            >
              <Download className="size-4" aria-hidden="true" />
              {t("downloadCv")}
            </a>
          ) : null}
        </nav>
      </div>
    </header>
  );
}
