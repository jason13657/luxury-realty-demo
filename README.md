# Sterling Realty — Luxury Real Estate Portfolio

A full-featured luxury real estate website built with **Next.js 16 (App Router)**, demonstrating advanced front-end capabilities including animations, interactive maps, sliders, CMS API integration, and responsive design.

> Built as a portfolio demonstration for a front-end development engagement.

---

## Tech Stack

| Category  | Technology                              |
| --------- | --------------------------------------- |
| Framework | Next.js 16.2 (App Router)               |
| Language  | TypeScript                              |
| Styling   | CSS Modules + CSS Variables             |
| Animation | Framer Motion                           |
| Slider    | Swiper.js                               |
| Map       | Leaflet + React-Leaflet (OpenStreetMap) |
| CMS API   | JSONPlaceholder (ISR, 1h revalidation)  |
| Fonts     | Playfair Display + Inter (Google Fonts) |
| Images    | Unsplash (remote patterns)              |
| Deploy    | Vercel                                  |

---

## Pages

| Route              | Type     | Description                                                    |
| ------------------ | -------- | -------------------------------------------------------------- |
| `/`                | Static   | Home — Hero, stats counters, featured properties, team preview |
| `/properties`      | Static   | Property listing with category filter + sort                   |
| `/properties/[id]` | SSG      | Property detail with Swiper gallery, spec bar, contact form    |
| `/map`             | Static   | Interactive Leaflet map with category pin toggling             |
| `/about`           | Static   | Company story, values grid, team bios                          |
| `/news`            | ISR (1h) | News articles fetched from headless CMS API                    |
| `/news/[slug]`     | Dynamic  | Article detail with author sidebar                             |
| `/contact`         | Static   | Contact form + office info + agent directory                   |

---

## Key Features

- **Scroll-triggered animations** — `AnimatedSection` wrapper using Framer Motion + `useInView`
- **Animated counters** — Stats section with number animation on scroll
- **Swiper gallery** — Main slider + synced thumbnail row on property detail pages
- **Interactive map** — Leaflet with custom category icons, fly-to animation, popups, side panel
- **CMS API (ISR)** — News fetched server-side with 1-hour revalidation via `next: { revalidate: 3600 }`
- **Sticky navbar** — Transparent → blur/dark on scroll, active link underline via Framer Motion `layoutId`
- **Mobile responsive** — All pages fully responsive, hamburger menu with `AnimatePresence`

---

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

```bash
npm run build   # Production build
npm run start   # Start production server
npm run lint    # ESLint check
```

---

## Project Structure

```
app/
├── page.tsx                  # Home
├── properties/
│   ├── page.tsx              # Listing page (Server Component)
│   ├── PropertiesClient.tsx  # Filter/sort logic (Client Component)
│   └── [id]/
│       ├── page.tsx          # Detail page
│       └── PropertyGallery.tsx
├── map/
│   ├── page.tsx
│   ├── MapClient.tsx         # Category filter + side list
│   └── MapView.tsx           # Leaflet map (ssr: false)
├── about/page.tsx
├── news/
│   ├── page.tsx              # async Server Component, ISR
│   └── [slug]/page.tsx
└── contact/
    ├── page.tsx
    └── ContactForm.tsx       # Client Component with form state

components/
├── Navbar/
├── Footer/
├── Hero/                     # Framer Motion stagger animations
├── PropertyCard/
├── AnimatedSection/          # Reusable scroll-triggered wrapper
└── Counter/                  # Animated number counter

lib/
├── data.ts                   # Mock property/team/stats data
└── types.ts                  # TypeScript interfaces
```