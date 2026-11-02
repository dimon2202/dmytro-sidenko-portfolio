import type { SkillGroup } from "@/types/content";

export const skillGroups: SkillGroup[] = [
  {
    id: "frontend",
    items: [
      "React",
      "Next.js",
      "TypeScript",
      "Redux",
      "Zustand",
      "Tailwind CSS",
      "Styled Components",
      "HTML5",
      "CSS3",
      "Three.js",
      "GSAP",
    ],
  },
  {
    id: "backend",
    items: ["Node.js", "Express", "REST APIs", "WebSockets / Socket.IO", "JWT authentication", "Stripe API", "Prisma ORM"],
  },
  { id: "databases", items: ["PostgreSQL", "MongoDB", "SQL"] },
  { id: "devops", items: ["Git", "GitHub", "CI/CD", "Docker", "Webpack", "ESLint", "npm / yarn", "Jira"] },
  { id: "testing", items: ["Jest", "Playwright", "Cypress"] },
  {
    id: "ai",
    items: ["Claude Code", "ChatGPT", "AI-assisted development", "Debugging and code analysis", "Workflow automation"],
  },
];
