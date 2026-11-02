import type { Locale } from "@/i18n/routing";

export type ProjectSlug =
  | "real-estate-platform"
  | "pharmacovigilance-website"
  | "iphone-3d"
  | "taxi-next-app";

export type ProjectKind = "personal" | "client";

export type ProjectImage = {
  /** File name inside public/images/projects/<slug>/ */
  file: string;
  width: number;
  height: number;
};

export type Project = {
  slug: ProjectSlug;
  kind: ProjectKind;
  /** Year work started, from the repository history. */
  year?: number;
  stack: string[];
  links: { live?: string; github?: string };
  /** Screenshots that may exist; only files present on disk are rendered. */
  images: ProjectImage[];
};

export type TitledText = { title: string; body: string };

export type ProjectCopy = {
  title: string;
  summary: string;
  role: string;
  overview: string;
  purpose: string;
  responsibilities: string[];
  architecture: { intro: string; items: TitledText[] };
  features: string[];
  decisions: TitledText[];
  challenges: TitledText[];
  /** Only verified outcomes; omit when there are none. */
  outcomes?: string[];
  imageAlts: Record<string, string>;
  metaDescription: string;
};

export type ExperienceId = "darkbot" | "enactus";

export type Experience = {
  id: ExperienceId;
  company: string;
  start: string; // YYYY-MM
  end: string | null; // null = present
  stack: string[];
};

export type ExperienceCopy = {
  position: string;
  product: string;
  points: string[];
};

export type EducationId = "mate" | "kneu";

export type Education = {
  id: EducationId;
  institution: string;
  start: string;
  end: string | null;
};

export type EducationCopy = { programme: string };

export type SkillGroupId = "frontend" | "backend" | "databases" | "devops" | "testing" | "ai";

export type SkillGroup = {
  id: SkillGroupId;
  items: string[];
};

export type LocalizedContent = {
  projects: Record<ProjectSlug, ProjectCopy>;
  experience: Record<ExperienceId, ExperienceCopy>;
  education: Record<EducationId, EducationCopy>;
  /** Short notes on how a technology has been used, shown on focus/hover and inline on touch. */
  skillNotes: Record<string, string>;
};

export type ContentByLocale = Record<Locale, LocalizedContent>;
