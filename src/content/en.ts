import type { LocalizedContent } from "@/types/content";

export const en: LocalizedContent = {
  projects: {
    "real-estate-platform": {
      title: "Full-Stack Real Estate Platform",
      summary:
        "A property marketplace with listing search, map view, user accounts, real-time private messaging and an admin dashboard.",
      role: "Independent project: data model, REST API, real-time service, frontend and deployment.",
      overview:
        "A full-stack web application where people can publish properties for sale or rent, search and filter listings, view them on a map, save favourites and message each other privately. I built every part of it: the MongoDB data model, the Express REST API, a separate Socket.IO service for messaging, the React client and the deployment on Render.",
      purpose:
        "A property marketplace has to connect two sides: people publishing listings and people looking for a place. That means structured, filterable listing data, a map to judge location, and a direct way for both sides to talk without leaving the platform. The project was built to cover that whole flow end to end, including moderation by an administrator.",
      responsibilities: [
        "Designed the data model in Prisma for users, listings, listing details, saved listings, chats and messages.",
        "Built the Express REST API for authentication, users, listings, chats, messages and administration.",
        "Implemented cookie-based JWT authentication with route-level middleware, plus a separate admin session.",
        "Built the React client: search, filtering, map view, listing pages, profile, listing editor and chat.",
        "Integrated the Cloudinary upload widget for property and avatar images.",
        "Built a separate Socket.IO server for real-time message delivery.",
        "Deployed the client, the API and the socket server as separate services on Render.",
      ],
      architecture: {
        intro:
          "The application is split into three deployable services that share one MongoDB database through the API.",
        items: [
          {
            title: "Client",
            body: "React SPA built with Vite. React Router data loaders fetch listings and profile data, using deferred responses so pages render while data streams in. Zustand holds the unread-messages counter; React context holds the current user and the socket connection. Maps use Leaflet via react-leaflet.",
          },
          {
            title: "REST API",
            body: "Node.js and Express with resource routes under /api/auth, /api/users, /api/posts, /api/chats, /api/messages and /api/admin. Prisma is the data-access layer on top of MongoDB.",
          },
          {
            title: "Real-time service",
            body: "A standalone Socket.IO server keeps a map of online users to socket IDs and forwards new messages only to the recipient. Messages are persisted through the REST API, so history does not depend on the socket connection.",
          },
          {
            title: "Data model",
            body: "Prisma models for User, Post, PostDetail (one-to-one with Post), SavedPost (unique per user and listing), Chat and Message. Enums restrict listing type (buy, rent), property type and renovation state.",
          },
        ],
      },
      features: [
        "Listing search with filters for city, buy or rent, property type, bedrooms and price range, applied server-side in the database query.",
        "Map view with a pin for every listing in the result set.",
        "Listing pages with an image slider, property details and distances to the nearest school, bus stop and restaurant.",
        "Listing editor with a rich-text description and multi-image upload to Cloudinary.",
        "User profiles with own listings, saved listings and conversations.",
        "Private real-time messaging between users, with read status and an unread-conversations counter in the navigation.",
        "Admin area with its own login for reviewing data and removing listings or users.",
      ],
      decisions: [
        {
          title: "JWT in an httpOnly cookie",
          body: "The token is issued as an httpOnly cookie instead of being stored in localStorage, so client-side scripts cannot read it. Protected routes are guarded by an Express middleware that verifies the token and attaches the user ID to the request.",
        },
        {
          title: "Separate admin session",
          body: "Administration uses its own cookie and a role claim checked by a dedicated middleware, so a regular user token can never reach admin endpoints.",
        },
        {
          title: "Prisma on MongoDB",
          body: "Prisma gives a typed, explicit schema and relations on top of a document database, which keeps queries such as filtering listings or counting unread chats readable.",
        },
        {
          title: "Messaging as its own service",
          body: "Keeping Socket.IO out of the REST API keeps the API stateless and lets each part be deployed and restarted independently.",
        },
        {
          title: "Sanitised rich text",
          body: "Listing descriptions are written with a rich-text editor and sanitised with DOMPurify before rendering, to prevent stored HTML from injecting scripts.",
        },
      ],
      challenges: [
        {
          title: "Delivering messages to the right person",
          body: "Each connected client registers its user ID with the socket server. When a message is sent, the server looks up the recipient's socket and emits only to them; if they are offline, the message is still saved through the API and appears on their next visit.",
        },
        {
          title: "Keeping the unread counter correct",
          body: "Each chat stores the IDs of users who have seen the latest message. Opening a chat marks it as read, and the counter is a single query for chats that include the user but do not list them as having seen it.",
        },
        {
          title: "Three services, one origin policy",
          body: "Because the client, API and socket server run on different hosts, CORS is configured with explicit allowed origins and credentials enabled so authentication cookies are sent with requests.",
        },
      ],
      imageAlts: {
        "home.png": "Real estate platform home page with the property search form",
        "listings.webp": "Listing results next to a map with property pins",
        "listing.webp": "Property detail page with image gallery and nearby places",
      },
      metaDescription:
        "Case study: a full-stack real estate platform built with React, Node.js, Express, Prisma, MongoDB and Socket.IO, with map search and real-time messaging.",
    },
    "pharmacovigilance-website": {
      title: "Sokola PV — Pharmacovigilance Website",
      summary:
        "A bilingual (English and Ukrainian) company website for a pharmacovigilance service provider, built with Next.js and deployed as a static site.",
      role: "Web development: Next.js implementation, page structure, localisation and static deployment.",
      overview:
        "The website for Sokola PV presents the company's pharmacovigilance services and its educational programmes, including the “Pharmacovigilance in Simple Words” course. It is built with the Next.js 14 App Router and exported as a static site, with English and Ukrainian versions of the content.",
      purpose:
        "The company needed a clear, credible online presence for two audiences: pharmaceutical companies looking for pharmacovigilance services, and industry professionals looking for training. The site had to explain six distinct services, present the education programmes, and make it easy to get in touch, in both English and Ukrainian.",
      responsibilities: [
        "Implemented the website with Next.js 14 and the App Router.",
        "Structured the content into home, about, six service pages, education and contact.",
        "Set up the English and Ukrainian versions of the site with a language switcher.",
        "Implemented the visual identity as a consistent set of typography, colours and components.",
        "Configured static generation and export, and deployed the site to Hostinger through a GitHub-based workflow.",
      ],
      architecture: {
        intro:
          "This is a content website, so the architecture focuses on routing, content structure and delivery rather than on a backend.",
        items: [
          {
            title: "Static generation",
            body: "Every page is pre-rendered at build time and exported as static HTML. There is no application server in production, which keeps hosting simple and pages fast.",
          },
          {
            title: "Content structure",
            body: "Each service has its own page under /services/, the education programmes live under /education/, and the home page links into both.",
          },
          {
            title: "Localisation",
            body: "English is served at the root and the Ukrainian version under /ua/. The education programmes themselves are taught in Ukrainian, which the English pages state explicitly.",
          },
          {
            title: "Deployment",
            body: "The exported build is published to Hostinger static hosting from the GitHub repository.",
          },
        ],
      },
      features: [
        "Home page introducing the company, its services and its training offer.",
        "Six dedicated service pages, from pharmacovigilance process execution to audits and crisis management.",
        "Education section presenting the training programmes, including “Pharmacovigilance in Simple Words”.",
        "English and Ukrainian language versions with a switcher in the header.",
        "Contact section with email, phone and messenger links.",
      ],
      decisions: [
        {
          title: "Static export instead of a server",
          body: "The content changes rarely and has no user accounts, so a static export gives fast pages, no server to maintain and inexpensive hosting.",
        },
        {
          title: "Separate pages per service",
          body: "Giving each service its own URL keeps pages focused and makes each one individually linkable and indexable.",
        },
        {
          title: "Shared design system",
          body: "Typography, colours and components are defined once and reused, so new pages stay consistent with the visual identity.",
        },
      ],
      challenges: [
        {
          title: "Bilingual content without a server",
          body: "With static export there is no server-side locale detection, so each language has its own pre-rendered routes and the visitor switches language explicitly.",
        },
        {
          title: "Specialised subject matter",
          body: "Pharmacovigilance terminology is precise. The site structure keeps each service on its own page with a clear heading so visitors can find the specific service they need.",
        },
      ],
      imageAlts: {
        "home.png": "Sokola PV home page in English",
        "service.png": "Sokola PV service page for pharmacovigilance system audits",
        "education.png": "Sokola PV education programmes page",
        "home-ua.png": "Sokola PV home page in Ukrainian",
      },
      metaDescription:
        "Case study: the Sokola PV company website, a bilingual Next.js 14 static site for a pharmacovigilance service provider.",
    },
    "iphone-3d": {
      title: "iPhone 3D",
      summary:
        "An interactive 3D product viewer for an iPhone model, built with React Three Fiber and animated with GSAP.",
      role: "Personal project: 3D scene setup, interactions, animation and deployment.",
      overview:
        "A product-presentation experiment in the style of a premium product page. Visitors can rotate an iPhone model, switch between five finishes and toggle between the 6.1″ and 6.7″ sizes, with an animated transition between the two.",
      purpose:
        "The goal was to learn how to present a physical product interactively on the web: loading a 3D model, lighting it convincingly, letting people inspect it, and animating state changes smoothly — while keeping the scene light enough to run in a normal browser.",
      responsibilities: [
        "Set up the React Three Fiber scene, camera, controls and lighting.",
        "Loaded the GLB model and textures and recoloured its materials for each finish.",
        "Built the size switch with a GSAP timeline that transitions between two views.",
        "Styled the interface with Tailwind CSS and deployed the project to Vercel.",
      ],
      architecture: {
        intro: "A single-page React application built with Vite. Three.js is used through React Three Fiber.",
        items: [
          {
            title: "Rendering",
            body: "One Canvas renders two Drei View components through View.Port, so both phone sizes share a single WebGL context instead of creating two.",
          },
          {
            title: "Model and materials",
            body: "The phone is a GLB model loaded with useGLTF. When a finish is selected, the body materials are recoloured while screen and camera materials are left unchanged.",
          },
          {
            title: "Lighting",
            body: "A Drei Environment built from Lightformer panels creates studio-style reflections without loading an HDR environment file.",
          },
          {
            title: "Animation",
            body: "GSAP, through the @gsap/react hook, animates the transition between sizes: the model's rotation and both views move in a single timeline.",
          },
        ],
      },
      features: [
        "Drag to rotate the model with OrbitControls; zoom and pan are disabled to keep the framing consistent.",
        "Five colour finishes that update the model's materials instantly.",
        "6.1″ and 6.7″ size toggle with an animated slide between two views.",
        "Loading indicator while the model and textures are fetched.",
      ],
      decisions: [
        {
          title: "React Three Fiber over plain Three.js",
          body: "Describing the scene declaratively as React components keeps the 3D state (selected colour, size, rotation) in the same model as the rest of the UI.",
        },
        {
          title: "One canvas for two views",
          body: "Browsers limit the number of WebGL contexts, and each one has a cost. Drei's View lets both sizes share a single canvas.",
        },
        {
          title: "Restricted camera",
          body: "Disabling zoom and pan keeps the product framed as intended and avoids awkward camera states on touch devices.",
        },
      ],
      challenges: [
        {
          title: "Keeping rotation between sizes",
          body: "When the visitor rotates one model and switches size, the stored azimuthal angle from the controls is applied in the GSAP timeline, so the transition continues from where they left off.",
        },
        {
          title: "Recolouring only the right parts",
          body: "The model has many materials. Screen, lens and frame-detail materials are excluded by name so only the body changes colour.",
        },
      ],
      imageAlts: {
        "viewer.png": "Interactive iPhone 3D model with colour and size controls",
        "viewer-large.png": "iPhone 3D viewer showing the larger 6.7-inch model",
      },
      metaDescription:
        "Case study: an interactive iPhone 3D viewer built with React Three Fiber, Three.js and GSAP.",
    },
    "taxi-next-app": {
      title: "Taxi Next App",
      summary:
        "A ride-booking web app: sign in, pick a route on Google Maps, choose a ride class and pay with Stripe.",
      role: "Personal project: frontend, API route, third-party integrations.",
      overview:
        "A ride-hailing style web application built with the Next.js App Router. Signed-in users enter a pickup point and a destination, see the driving route on a map, compare ride classes priced by distance and complete a payment through Stripe.",
      purpose:
        "The project explores how a booking flow fits together when most of the heavy lifting is done by external services: authentication by Clerk, places and routes by Google Maps, and payments by Stripe. The focus is on connecting them into one coherent user flow.",
      responsibilities: [
        "Built the booking interface with Next.js, React and Tailwind CSS.",
        "Integrated Clerk for sign-up, sign-in and route protection through middleware.",
        "Integrated Google Places autocomplete, map markers and driving directions.",
        "Implemented distance-based pricing for several ride classes.",
        "Built the Stripe checkout with the Payment Element and a server-side route that creates the PaymentIntent.",
      ],
      architecture: {
        intro: "A Next.js 13 App Router application. Server-side code is limited to one API route for payments.",
        items: [
          {
            title: "Authentication",
            body: "Clerk's middleware protects every page and API route; sign-in and sign-up use Clerk's prebuilt components on their own routes.",
          },
          {
            title: "Booking state",
            body: "Pickup and destination are stored in two React contexts shared by the search form and the map.",
          },
          {
            title: "Maps",
            body: "The Google Maps JavaScript API loads with the Places library. Autocomplete inputs resolve coordinates, the map pans to the selection, and the Directions service draws the driving route.",
          },
          {
            title: "Payments",
            body: "The client renders Stripe's Payment Element. On submit, a Next.js route handler creates a PaymentIntent with the secret key on the server and returns only the client secret.",
          },
        ],
      },
      features: [
        "Sign-up and sign-in, with all app routes protected.",
        "Pickup and destination inputs with Google Places autocomplete.",
        "Map with markers and the driving route between the two points.",
        "Ride classes with seat count and a price calculated from the trip distance.",
        "Checkout page with Stripe's Payment Element.",
      ],
      decisions: [
        {
          title: "Managed authentication",
          body: "Using Clerk instead of a custom auth system meant secure sessions and sign-in flows without storing passwords, leaving the time for the booking flow itself.",
        },
        {
          title: "Secret key stays on the server",
          body: "The Stripe secret key is only used in the route handler; the browser receives the PaymentIntent's client secret and nothing else.",
        },
        {
          title: "Context instead of a state library",
          body: "Only two values — pickup and destination — are shared, so React context was enough without adding a state-management dependency.",
        },
      ],
      challenges: [
        {
          title: "Coordinating map and form",
          body: "The map reacts to changes in either location: it pans to a new pickup point and requests a new route once both points are known.",
        },
        {
          title: "Pricing from distance",
          body: "The trip distance is currently calculated as a straight line with the Maps geometry library. A natural next step is to price from the route distance returned by the Directions service.",
        },
      ],
      imageAlts: {
        "search.png": "Taxi Next App search panel next to a map",
        "rides.png": "List of ride classes with prices for the selected route",
        "payment.png": "Stripe payment form in Taxi Next App",
      },
      metaDescription:
        "Case study: Taxi Next App, a ride-booking web app built with Next.js, Clerk, the Google Maps API and Stripe.",
    },
  },
  experience: {
    darkbot: {
      position: "Front-End Developer",
      product: "AI-powered crypto trading platform (FinTech)",
      points: [
        "Built production SPA and SSR applications with React, Next.js and TypeScript.",
        "Developed the frontend architecture for trading dashboards, analytics interfaces and marketing pages.",
        "Implemented a reusable internationalisation system with next-i18next to support multiple locales.",
        "Delivered responsive, cross-browser interfaces for desktop and mobile.",
        "Investigated and resolved production issues together with the backend and product teams.",
        "Focused on performance, maintainability and a reliable user experience.",
      ],
    },
    enactus: {
      position: "Full Stack Engineer",
      product: "Web platforms for educational and humanitarian initiatives",
      points: [
        "Developed responsive, component-based web applications for educational and humanitarian initiatives.",
        "Built user interfaces with React and Redux.",
        "Integrated REST APIs and contributed to reliable communication between frontend and backend.",
        "Worked with designers and backend developers to turn requirements into maintainable frontend solutions.",
        "Refactored reusable UI components and contributed to performance and cross-browser improvements.",
      ],
    },
  },
  education: {
    mate: { programme: "Full-Stack Developer programme" },
    kneu: { programme: "Bachelor’s degree in Computer Science" },
  },
  skillNotes: {
    React: "Daily driver at Darkbot and in every personal project.",
    "Next.js": "SSR and SPA apps at Darkbot; App Router sites such as Sokola PV and this portfolio.",
    TypeScript: "Production code at Darkbot; typed content and components in this portfolio.",
    "Node.js": "Express REST API and Socket.IO server for the real estate platform.",
    Redux: "State management at Darkbot and Enactus KNEU.",
    Zustand: "Lightweight global state in the real estate platform.",
    "Styled Components": "Component styling at Darkbot.",
    "Three.js": "3D product viewer through React Three Fiber.",
    GSAP: "Animation timelines in iPhone 3D and scroll reveals on this site.",
    "WebSockets / Socket.IO": "Real-time private messaging in the real estate platform.",
    "JWT authentication": "Cookie-based JWT sessions in the real estate platform.",
    "Stripe API": "Payment Element checkout in Taxi Next App.",
    "Prisma ORM": "Data model and queries on MongoDB in the real estate platform.",
    MongoDB: "Primary database of the real estate platform.",
  },
};
