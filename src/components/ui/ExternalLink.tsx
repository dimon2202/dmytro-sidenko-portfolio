import type { AnchorHTMLAttributes, ReactNode } from "react";

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & { href: string; newTabLabel: string; children: ReactNode };

/** Opens in a new tab and tells assistive technology that it does. */
export function ExternalLink({ href, newTabLabel, children, ...rest }: Props) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" {...rest}>
      {children}
      <span className="sr-only"> {newTabLabel}</span>
    </a>
  );
}
