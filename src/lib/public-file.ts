import "server-only";
import fs from "node:fs";
import path from "node:path";
import type { Project } from "@/types/content";
import { cvPath } from "./site";

function publicFileExists(publicPath: string) {
  return fs.existsSync(path.join(process.cwd(), "public", publicPath));
}

export function hasCv() {
  return publicFileExists(cvPath);
}

export function projectImageSrc(project: Project, file: string) {
  return `/images/projects/${project.slug}/${file}`;
}

/** Screenshots are optional: render only those that were actually captured. */
export function availableImages(project: Project) {
  return project.images.filter((image) => publicFileExists(projectImageSrc(project, image.file)));
}
