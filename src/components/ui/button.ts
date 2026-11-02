import clsx from "clsx";

type Variant = "primary" | "secondary" | "ghost";

const base =
  "group inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-5 text-sm font-medium transition-[background-color,border-color,color,transform] duration-200 active:scale-[0.98]";

const variants: Record<Variant, string> = {
  primary: "bg-fg text-bg hover:bg-accent hover:text-white dark:hover:text-[#17191d]",
  secondary: "border border-border-strong bg-surface text-fg hover:border-accent hover:text-accent-text",
  ghost: "text-fg hover:text-accent-text",
};

export function buttonClass(variant: Variant = "primary", className?: string) {
  return clsx(base, variants[variant], className);
}
