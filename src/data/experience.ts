import type { Education, Experience } from "@/types/content";

export const experience: Experience[] = [
  {
    id: "darkbot",
    company: "Darkbot Inc.",
    start: "2024-04",
    end: "2026-04",
    stack: ["React", "Next.js", "TypeScript", "Redux", "Styled Components", "next-i18next"],
  },
  {
    id: "enactus",
    company: "Enactus KNEU",
    start: "2023-03",
    end: "2024-03",
    stack: ["React", "Redux", "JavaScript", "REST APIs"],
  },
];

export const education: Education[] = [
  { id: "mate", institution: "MATE Academy", start: "2025-07", end: null },
  { id: "kneu", institution: "Kyiv National Economic University", start: "2021-09", end: "2025-06" },
];
