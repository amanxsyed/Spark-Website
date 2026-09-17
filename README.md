# Spark Realty — website

A Next.js 16 site for Spark Realty Inc., Brokerage. Static, self-hosted fonts,
no third-party requests, no CSS framework — it is built to load fast and to
still look current in a few years.

---

## Deploy in three steps

1. Unzip this folder and push it to a GitHub repository.
2. In Vercel: **Add New → Project → Import** that repository.
3. Leave every build setting on its default and press **Deploy**.

Vercel detects Next.js on its own. There are no environment variables and no
external services to configure yet.

### Running it locally

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

Node 20.9 or newer.

---

## What to change first

Almost all copy sits in one file: **`src/lib/data.ts`**.

| What | Where |
| --- | --- |
| Phone, email, address, social links | `brokerage` |
| Featured launches | `projects` |
| Neighbourhood panels | `places` |
| City list and counts | `cities`, `tickerItems` |
| Team | `advisors` |
| Testimonials | `quotes` |
| Journal posts | `posts` |
| The four allocation steps | `steps` |
| Header navigation | `navigation` |

Headline, hero stats and section headings live in `src/app/page.tsx`.

### Everything here is placeholder content

Project names, developers, prices, benchmark figures, listing counts, advisor
names, testimonials, the phone number and the address are invented so the
design could be built against realistic content. **None of it is verified.**
Replace all of it before this goes anywhere near a client or the public — a
brokerage site carries advertising obligations under RECO and the local real
estate boards, and the disclaimer text in the footer needs a look from whoever
handles the brokerage's compliance.

### Images

`public/media/` holds generated stylized skyline artwork, not photography.
Drop real photos in with the same filenames and nothing in the code has to
change:

| File | Used for | Suggested size |
| --- | --- | --- |
| `hero-skyline.jpg` | homepage hero | 2400 × 1350 |
| `chip.jpg` | the small photo inside the headline | 960 × 600 |
| `project-1…6.jpg` | launch cards | 1000 × 1300 (portrait) |
| `place-1…5.jpg` | neighbourhood panels | 900 × 1250 (portrait) |
| `interior-dark.jpg` | allocation section | 1500 × 1100 |
| `skyline-wide.jpg` | interior page headers | 1700 × 950 |
| `og.jpg` | social sharing card | 1200 × 630 |

Keep them under about 300 KB each. Next.js converts them to AVIF/WebP and
resizes per breakpoint automatically.

---

## Structure

```
src/
  app/
    layout.tsx              header, footer, fonts, metadata
    page.tsx                homepage — every section in order
    new-construction/       index + [slug] project pages
    resale/  sell/  about/  advisors/  journal/  contact/  register/
    privacy/  terms/  not-found.tsx
  components/               header, footer, and the interactive pieces
  lib/data.ts               all content
  lib/fonts.ts              self-hosted font setup
  fonts/                    Fraunces + Inter Tight (variable, latin subset)
  styles/
    base.css                design tokens, type scale, buttons
    chrome.css              header, drawer, footer, form fields
    home.css                homepage sections
    pages.css               interior pages
```

### Design notes

- **Colour** — midnight `#0B1220`, warm paper `#FBF9F7`, mist `#EEEAE4`, and
  the brand crimson `#C8102E` used only for actions and one accent per
  section. All defined at the top of `base.css`; change them there and the
  whole site follows.
- **Type** — Fraunces for display (optical sizing on, WONK axis pinned so the
  serifs stay distinctive at large sizes), Inter Tight for everything else.
  Both self-hosted and subset, so there is no Google Fonts request.
- **Motion** — one orchestrated entrance on the hero, one reveal per section,
  and hover/press states everywhere else. `prefers-reduced-motion` turns all
  of it off.
- **Accessibility** — skip link, visible focus rings, real labels on every
  field, keyboard-reachable carousel and menu.

---

## Connecting the listing data

`src/lib/data.ts` is the seam. When the RedBricks / Repliers keys are
available, replace the exported arrays with `async` fetches (or route
handlers under `src/app/api/`) — the components take the same shapes and will
not need changes. Add any external image host to `images.remotePatterns` in
`next.config.mjs`.

The register form in `src/components/RegisterForm.tsx` validates on the client
and then stops; point its submit at GoHighLevel, a Next.js route handler, or
whichever CRM the brokerage uses.

---

## Still to build

The homepage is finished. These pages exist, are styled and are linked, but
hold outline content only: resale search, project detail, journal articles,
privacy and terms.
