import type { ReactNode } from "react";

type Props = { id: string; eyebrow: string; title: ReactNode; intro?: string };

export function SectionHeading({ id, eyebrow, title, intro }: Props) {
  return (
    <header className="mb-10 max-w-2xl md:mb-14" data-reveal>
      <p className="mb-3 font-mono text-xs uppercase tracking-[0.18em] text-muted">{eyebrow}</p>
      <h2 id={`${id}-title`} className="font-display text-3xl font-semibold tracking-tight text-balance md:text-4xl">
        {title}
      </h2>
      {intro ? <p className="mt-4 text-base leading-relaxed text-muted md:text-lg">{intro}</p> : null}
    </header>
  );
}
