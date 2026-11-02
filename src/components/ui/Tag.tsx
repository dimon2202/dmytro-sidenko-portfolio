import clsx from "clsx";
import type { ReactNode } from "react";

export function Tag({ children, emphasis = false }: { children: ReactNode; emphasis?: boolean }) {
  return (
    <span
      className={clsx(
        "inline-flex items-center rounded-full border px-2.5 py-1 text-xs leading-none",
        emphasis ? "border-accent/40 bg-accent-soft text-accent-text" : "border-border bg-surface text-muted",
      )}
    >
      {children}
    </span>
  );
}
