import type { Project, ProjectSlug } from "@/types/content";

export const projects: Project[] = [
  {
    slug: "real-estate-platform",
    kind: "personal",
    year: 2025,
    stack: [
      "React",
      "JavaScript",
      "Vite",
      "Zustand",
      "React Router",
      "Leaflet",
      "Node.js",
      "Express",
      "Prisma",
      "MongoDB",
      "Socket.IO",
      "JWT",
      "Cloudinary",
      "Render",
    ],
    links: {
      live: "https://real-estate-website-client-rob5.onrender.com",
      github: "https://github.com/dimon2202/real-estate-website",
    },
    images: [
      { file: "home.png", width: 1440, height: 900 },
      { file: "listings.png", width: 1440, height: 900 },
      { file: "listing.png", width: 1440, height: 900 },
    ],
  },
  {
    slug: "pharmacovigilance-website",
    kind: "client",
    stack: ["Next.js 14", "App Router", "React", "Static export", "Hostinger", "GitHub"],
    links: { live: "https://sokolapv.com" },
    images: [
      { file: "home.png", width: 1440, height: 900 },
      { file: "service.png", width: 1440, height: 900 },
      { file: "education.png", width: 1440, height: 900 },
      { file: "home-ua.png", width: 1440, height: 900 },
    ],
  },
  {
    slug: "iphone-3d",
    kind: "personal",
    year: 2024,
    stack: ["React", "Vite", "Three.js", "React Three Fiber", "Drei", "GSAP", "Tailwind CSS", "Vercel"],
    links: {
      live: "https://iphope-3d.vercel.app",
      github: "https://github.com/dimon2202/iphope-3d",
    },
    images: [
      { file: "viewer.png", width: 1440, height: 900 },
      { file: "viewer-large.png", width: 1440, height: 900 },
    ],
  },
  {
    slug: "taxi-next-app",
    kind: "personal",
    year: 2024,
    stack: ["Next.js 13", "App Router", "React", "Tailwind CSS", "Clerk", "Google Maps API", "Stripe"],
    links: { github: "https://github.com/dimon2202/taxi-next-app" },
    images: [
      { file: "search.png", width: 1440, height: 900 },
      { file: "rides.png", width: 1440, height: 900 },
      { file: "payment.png", width: 1440, height: 900 },
    ],
  },
];

export const projectSlugs = projects.map((project) => project.slug);

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

export function isProjectSlug(slug: string): slug is ProjectSlug {
  return projectSlugs.includes(slug as ProjectSlug);
}
