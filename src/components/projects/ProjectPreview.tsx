import Image from "next/image";
import clsx from "clsx";
import type { Project, ProjectImage } from "@/types/content";
import { projectImageSrc } from "@/lib/public-file";

type Props = {
  project: Project;
  index: number;
  image: ProjectImage | undefined;
  alt: string;
  pendingLabel: string;
  priority?: boolean;
  sizes: string;
};

function hostOf(project: Project) {
  const url = project.links.live ?? project.links.github;
  return url ? new URL(url).host : project.slug;
}

/**
 * A real screenshot when one exists; otherwise a neutral, clearly labelled frame.
 * The frame never imitates the product's interface.
 */
export function ProjectPreview({ project, index, image, alt, pendingLabel, priority, sizes }: Props) {
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-surface-2">
      <div className="flex h-8 items-center gap-1.5 border-b border-border bg-surface px-3" aria-hidden="true">
        <span className="size-2 rounded-full bg-border-strong" />
        <span className="size-2 rounded-full bg-border-strong" />
        <span className="size-2 rounded-full bg-border-strong" />
        <span className="ml-3 truncate font-mono text-[11px] text-muted">{hostOf(project)}</span>
      </div>
      <div className="relative aspect-[16/10] overflow-hidden">
        {image ? (
          <Image
            src={projectImageSrc(project, image.file)}
            alt={alt}
            width={image.width}
            height={image.height}
            sizes={sizes}
            priority={priority}
            className="size-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
          />
        ) : (
          <div className="flex size-full flex-col justify-between p-6">
            <span
              aria-hidden="true"
              className={clsx(
                "font-display text-7xl font-semibold tracking-tighter text-border-strong transition-colors duration-500 group-hover:text-accent/40 md:text-8xl",
              )}
            >
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="self-start rounded-full border border-border bg-surface px-2.5 py-1 text-xs text-muted">
              {pendingLabel}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
