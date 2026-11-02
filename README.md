# Dmytro Sidenko — Portfolio

Bilingual (English / Dutch) portfolio built with Next.js 15 (App Router), TypeScript, Tailwind CSS v4, next-intl and GSAP.

## Run

```bash
npm install
npm run dev        # http://localhost:3000 → redirects to /en or /nl
npm run build && npm start
npm run lint && npm run typecheck
```

Set `NEXT_PUBLIC_SITE_URL` (see `.env.example`) to the production domain. It is used for canonical URLs, hreflang, the sitemap and Open Graph.

## Routes

| Path | Content |
| --- | --- |
| `/en`, `/nl` | Home page |
| `/{locale}/projects/real-estate-platform` | Case study |
| `/{locale}/projects/pharmacovigilance-website` | Case study |
| `/{locale}/projects/iphone-3d` | Case study |
| `/{locale}/projects/taxi-next-app` | Case study |
| `/sitemap.xml`, `/robots.txt`, `/manifest.webmanifest` | SEO |

`/` redirects by `Accept-Language`; both locales are always reachable through the switcher and their own URLs.

## Where content lives

| What | File |
| --- | --- |
| Interface text (nav, headings, buttons, meta) | `messages/en.json`, `messages/nl.json` |
| Case studies, experience, education, skill notes | `src/content/en.ts`, `src/content/nl.ts` |
| Locale-independent data (stacks, links, dates, screenshots) | `src/data/*.ts` |
| Name, contact links, "open to opportunities", CV path | `src/lib/site.ts` |
| Colour tokens (light / dark) | `src/app/globals.css` |

Both content files implement the same `LocalizedContent` type, so TypeScript fails the build if a translation is missing.

## Assets to add

- **CV**: put the PDF at `public/cv/dmytro-sidenko-cv.pdf`. All "Download CV" buttons appear automatically once the file exists, and stay hidden until then.
- **Screenshots**: file names are listed per project in `src/data/projects.ts` and go in `public/images/projects/<slug>/`. Only files that exist are rendered; otherwise a neutral, labelled placeholder frame is shown.
  `npm run screenshots` captures the live sites with Playwright (run `npx playwright install chromium` first). Review every image before committing.
  Taxi Next App screenshots must be taken from a local run, because the deployed version currently returns a server error.

## Notes

- Theme: light by default; the choice is stored in `localStorage` and applied by an inline script before first paint (no flash).
- Motion: CSS entrance for the hero, GSAP ScrollTrigger reveals for sections. Content is visible without JavaScript, and all non-essential motion is off under `prefers-reduced-motion`.
- Deploy: import the repository in Vercel; no extra configuration is required.
