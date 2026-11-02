"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Fades in every [data-reveal] element as it enters the viewport.
 * Content is visible in the server HTML; GSAP only hides an element right before animating it,
 * so nothing stays hidden if JavaScript fails. Skipped entirely for reduced motion.
 */
export function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const targets = gsap.utils
        .toArray<HTMLElement>("[data-reveal]")
        // Leave anything already on screen alone to avoid a hide-then-show flicker.
        .filter((el) => el.getBoundingClientRect().top > window.innerHeight * 0.92);

      gsap.set(targets, { autoAlpha: 0, y: 18 });
      ScrollTrigger.batch(targets, {
        start: "top 92%",
        once: true,
        onEnter: (batch) =>
          gsap.to(batch, { autoAlpha: 1, y: 0, duration: 0.7, ease: "power2.out", stagger: 0.08, overwrite: true }),
      });
    });

    return () => mm.revert();
  }, [pathname]);

  return null;
}
