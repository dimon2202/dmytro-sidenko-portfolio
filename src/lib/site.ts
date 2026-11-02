export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://dmytro-sidenko.vercel.app").replace(/\/$/, "");

export const person = {
  name: "Dmytro Sidenko",
  firstName: "Dmytro",
  role: "Full-Stack Developer",
  email: "sidenkodima2202@gmail.com",
  phone: "+31 62 647 0233",
  city: "Ede",
  country: "NL",
  github: "https://github.com/dimon2202",
  linkedin: "https://www.linkedin.com/in/dimon4ik/",
} as const;

/** Set to false when no longer looking for a new role. */
export const openToOpportunities = true;

/** Public path of the CV. The CV buttons are hidden until the file exists in /public. */
export const cvPath = "/cv/dmytro-sidenko-cv.pdf";

export const coreStack = ["React", "Next.js", "TypeScript", "Node.js"] as const;
