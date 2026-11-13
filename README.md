<div align="center">

# FLAME — Web Storefront

**Lit from within.**

The official web storefront for **FLAME**, an all-black premium streetwear label from Dar es Salaam, Tanzania.

![React](https://img.shields.io/badge/React-18.3-0B0B0B?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5.4-0B0B0B?logo=vite&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-6-0B0B0B?logo=reactrouter&logoColor=white)
![Status](https://img.shields.io/badge/status-pre--launch-FF0000)

</div>

---

## Table of contents

1. [Overview](#1-overview)
2. [Features](#2-features)
3. [Tech stack](#3-tech-stack)
4. [Getting started](#4-getting-started)
5. [Project structure](#5-project-structure)
6. [Pages and routes](#6-pages-and-routes)
7. [Managing content](#7-managing-content)
8. [Placeholder system](#8-placeholder-system)
9. [Cart and checkout](#9-cart-and-checkout)
10. [Design system](#10-design-system)
11. [Components and hooks](#11-components-and-hooks)
12. [Accessibility](#12-accessibility)
13. [Performance](#13-performance)
14. [SEO](#14-seo)
15. [Deployment](#15-deployment)
16. [Launch checklist](#16-launch-checklist)
17. [Roadmap](#17-roadmap)
18. [Git workflow](#18-git-workflow)
19. [Credits and licence](#19-credits-and-licence)

---

## 1. Overview

FLAME makes hoodies, tees, headwear and bags in **one deep black**. The brand is built on three ideas, and the website is designed around them:

| Principle | Meaning |
|---|---|
| **Texture is the colour** | Depth comes from heavy fabric, raised print and embroidery, not from adding colours. |
| **The logo, quietly** | Black thread on black cloth by default (*tonal*); a white logo (*visible*) for pieces meant to be seen. |
| **A single red A** | Red appears in exactly one place: the A in the FLAME name. |

This repository is a **frontend-only** single-page application. It has no backend or database. All products, copy and settings live in plain JavaScript data files, so the site can be updated without touching any components.

**Current status:** pre-launch. The design, catalogue structure, cart and content system are complete. Prices, product photography, policies and checkout still need to be filled in (see [Launch checklist](#16-launch-checklist)).

---

## 2. Features

**Storefront**
- Home page with hero, featured drop, category tiles, brand pillars, journal stories and newsletter
- Shop with category filters, sorting and a 2- or 4-column grid. Filter and sort state is kept in the URL, so it can be shared.
- Product pages with a tonal or visible logo choice, size selection, and an accordion for description, details, size guide, care and delivery
- One card per product, with the second logo version shown on hover
- Journal (lookbook / stories) with individual article pages
- About page and a custom 404 page

**Commerce**
- Slide-out cart drawer, saved in the browser (`localStorage`)
- **Order on WhatsApp**: when a number is configured, the cart opens WhatsApp with the full order already written
- A switch for an external hosted checkout (`checkoutUrl`)

**Quality**
- Fixed header that sits over the hero and turns solid when the page scrolls
- Placeholder-safe content: unfinished `[BRACKET]` text is never shown to customers
- Keyboard-accessible drawers (focus trap, Escape to close, focus returned to the button that opened them)
- Route-level code splitting, self-hosted fonts, responsive WebP images

---

## 3. Tech stack

| Layer | Choice | Version |
|---|---|---|
| UI library | [React](https://react.dev) | 18.3 |
| Build tool / dev server | [Vite](https://vitejs.dev) with `@vitejs/plugin-react` | 5.4 |
| Routing | [React Router](https://reactrouter.com) (`BrowserRouter`) | 6.x |
| State | React Context + `useReducer` (cart) | — |
| Styling | Plain CSS with design tokens (CSS custom properties) | — |
| Fonts | Self-hosted via `@fontsource` — **Cormorant** (display), **Archivo** (UI) | 5.x |
| Images | Inline SVG garment illustrations; Unsplash CDN for editorial photos | — |
| Hosting | Static hosting (Vercel or Netlify configs included) | — |

No CSS framework, UI kit or state library is used. The production JavaScript is roughly **54 KB gzipped** for React and the router, plus **10 KB** for the app shell. Each page loads on demand.

---

## 4. Getting started

### Requirements

- **Node.js 18 or newer** (LTS recommended)
- npm 9+

### Install and run

```bash
git clone https://github.com/mixro/flame-web.git
cd flame-web
npm install
npm run dev
```

Open <http://localhost:5173>.

### Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Starts the development server with hot reload |
| `npm run build` | Builds the production site into `dist/` |
| `npm run preview` | Serves the built `dist/` folder locally to check the production build |

---

## 5. Project structure

```
flame-web/
├── index.html                 # HTML shell, default meta tags, theme colour
├── vite.config.js             # Build config (vendor chunk, ES2020 target)
├── vercel.json                # Vercel: SPA rewrites + asset caching
├── public/
│   ├── _headers               # Netlify: caching + security headers
│   ├── _redirects             # Netlify: SPA fallback
│   ├── favicon.svg
│   └── robots.txt
└── src/
    ├── main.jsx               # Entry: fonts, global CSS, router, cart provider
    ├── App.jsx                # Route table (lazy-loaded pages)
    ├── assets/logos/          # FLAME logo in colour, white and black
    ├── components/            # Reusable UI (header, footer, cart, cards…)
    ├── context/
    │   └── CartContext.jsx    # Cart state, persistence, actions
    ├── data/                  # ★ All editable content lives here
    │   ├── site.js            # Brand settings, contacts, nav, helpers
    │   ├── products.js        # Catalogue, categories, price formatting
    │   ├── journal.js         # Journal stories
    │   └── images.js          # Editorial photo references + credits
    ├── hooks/
    │   ├── useOverlay.js      # Drawer behaviour (scroll lock, focus trap)
    │   ├── useReveal.js       # Scroll-in animation
    │   └── useSeo.js          # Per-page title, description, OG tags
    ├── pages/                 # One file per route
    └── styles/
        ├── tokens.css         # Colours, fonts, spacing, header sizes
        ├── base.css           # Reset, typography base, utilities
        ├── components.css     # Header, cards, cart, newsletter, footer
        └── pages.css          # Page layouts (hero, shop, product, journal)
```

---

## 6. Pages and routes

| Route | Page | Notes |
|---|---|---|
| `/` | `Home.jsx` | Loaded eagerly (landing page) |
| `/shop` | `Shop.jsx` | Query params: `c` (category), `sort`, `view` |
| `/product/:slug` | `Product.jsx` | Query param: `v=black` (tonal) or `v=white` (visible) |
| `/journal` | `Journal.jsx` | Story list |
| `/journal/:slug` | `Story.jsx` | Single story |
| `/about` | `About.jsx` | Brand story |
| `*` | `NotFound.jsx` | Also shown for unknown product or story slugs |

**Shop URL examples**

```
/shop?c=hoodies                 # Hoodies only
/shop?sort=name&view=2          # A–Z, large tiles
/product/duality-hoodie?v=white # Duality Hoodie, visible logo
```

Category IDs: `hoodies`, `tees`, `headwear`, `bags`. Sort options: `featured`, `name`, `price-asc`, `price-desc`. The price sorts appear only once at least one product has a price.

---

## 7. Managing content

Everyday edits only touch the files below. No component code needs to change.

| What | Where |
|---|---|
| Brand settings, contacts, checkout, preview bar | `src/data/site.js` |
| Products, prices, sizes, descriptions | `src/data/products.js` |
| Size guide, care, delivery text (product page) | `INFO` object at the top of `src/pages/Product.jsx` |
| Journal stories | `src/data/journal.js` |
| Editorial photos | `src/data/images.js` |
| Founder story (About page) | `founderStory` at the top of `src/pages/About.jsx` |
| Newsletter endpoint and privacy link | Top of `src/components/Newsletter.jsx` |
| Colours, fonts, spacing | `src/styles/tokens.css` |
| Logos | `src/assets/logos/flame-logo-{color,white,black}.svg` |

### 7.1 Site settings — `src/data/site.js`

```js
export const site = {
  name: 'FLAME',
  tagline: 'Lit from within.',
  currency: 'TZS',
  showPlaceholderNotice: true,   // slim "preview site" bar at the top
  checkoutUrl: '',               // hosted checkout URL (optional)
  whatsapp: '255712345678',      // digits only, international format
  email: 'hello@example.com',
  instagram: 'flame.tz',         // handle without the @
  location: 'Dar es Salaam, Tanzania',
};
```

The `nav` array in the same file controls the header and mobile menu links.

### 7.2 Products — `src/data/products.js`

Each product looks like this:

```js
{
  slug: 'duality-hoodie',          // URL: /product/duality-hoodie
  title: 'Duality Hoodie',
  kind: 'hoodie',                  // hoodie | tee | beanie | tote (illustration)
  category: 'hoodies',             // must match a category id
  price: 85000,                    // TZS as a number; null = "Price at launch"
  sizes: ['XS', 'S', 'M', 'L', 'XL', '2XL'],   // or ['One size']
  variants: { black: 'Tonal black', white: 'Visible white logo' },
  description: 'A hoodie in one deep black…',
  details: ['Tonal or white chest logo', 'Red A on the inner neck label'],
}
```

- Prices display as `TZS 85,000`.
- Every product automatically has two logo versions (tonal and visible). The shop shows one card per product.
- **To add a product,** add an object to `products`. It appears in the shop, its category and the "You may also like" section automatically.
- **To add a category,** add it to `categories` and to the `nav` array in `site.js`.

### 7.3 Journal — `src/data/journal.js`

```js
{
  slug: 'inside-the-design',
  title: 'Inside the design',
  date: '12 December 2026',
  excerpt: 'From sketch to sample: the thinking behind one piece.',
  photo: 'darkRoom',             // key from src/data/images.js
  body: ['First paragraph…', 'Second paragraph…'],
}
```

### 7.4 Photos — `src/data/images.js`

Editorial photos are stored as Unsplash photo IDs. `SmartImage` builds responsive WebP URLs from them. To use FLAME's own photography, either host the images and adapt `SmartImage`, or add them to `src/assets/` and import them. Keep the `alt` text and credit fields up to date.

---

## 8. Placeholder system

Unfinished content is written in square brackets, for example `[RETURN POLICY]`, `[DATE]` or `[WHATSAPP]`.

The helper `isFilled()` in `src/data/site.js` treats any value that contains a `[BRACKET]` (or is empty) as **missing**. Missing content is **hidden from customers** instead of being shown as raw text:

| Placeholder in… | Effect while unfilled |
|---|---|
| `price: null` | Shows "Price at launch"; price sorting is hidden |
| `site.whatsapp` / `email` / `instagram` | Footer contact column and WhatsApp checkout are hidden |
| Product `details` lines | That line is hidden |
| `INFO.sizeGuide` / `care` / `delivery` | That accordion section and the "Size guide" link are hidden |
| Story `date` / `body` paragraphs | Date and placeholder paragraphs are hidden |
| Home "trust" strip items | Item hidden; the strip disappears if none are filled |
| About `founderStory` | Paragraph hidden |

**To publish a piece of content, replace the bracketed text with the real text.** Nothing else needs to change.

> Tip: run `grep -rn "\[" src/data src/pages` to list everything that is still a placeholder.

---

## 9. Cart and checkout

### Cart

- Managed by `src/context/CartContext.jsx` (`useReducer` + Context), accessed with `useCart()`.
- Stored in `localStorage` under the key `flame.cart.v2`.
- Only the **choice** is stored (`slug`, `logo`, `size`, `qty`). Title, price and labels are always read from `products.js`, so a saved cart never shows an outdated price.
- Saved data is validated when it is loaded. Unknown products or sizes are dropped, and a damaged cart is reset instead of crashing the site.
- The maximum quantity per line is 9.

### Checkout modes

Checkout works in three modes. The cart picks the first one that applies:

| Priority | Condition | Customer sees |
|---|---|---|
| 1 | `site.checkoutUrl` is set | **Checkout** button linking to that URL |
| 2 | `site.whatsapp` is set | **Order on WhatsApp**: opens `wa.me` with the order already written |
| 3 | Neither is set | Disabled "Checkout opens at launch" button |

Example of the WhatsApp message the customer sends:

```
Hi FLAME, I'd like to order:
• 1 × Duality Hoodie (Tonal black, M) – TZS 85,000
• 2 × Core Tee (Visible white logo, L) – TZS 90,000
Subtotal: TZS 175,000
```

> Online payment (mobile money or cards) is not built yet. It needs a payment provider and a small server-side function. See [Roadmap](#17-roadmap).

---

## 10. Design system

### Colour tokens (`src/styles/tokens.css`)

| Token | Value | Use |
|---|---|---|
| `--black` | `#0B0B0B` | Primary brand black, dark sections |
| `--ink-2` / `--ink-3` | `#141414` / `#1A1A1A` | Dark surfaces, tiles |
| `--line-dark` | `#2B2B2B` | Rules on dark backgrounds |
| `--sand` | `#F2F0EB` | Light section background |
| `--white` | `#FFFFFF` | Light surfaces |
| `--stone` | `#CFCDC7` | Borders, product backdrops |
| `--muted` | `#6B6B6B` | Secondary text on light |
| `--grey` / `--grey-2` | `#8A8A8A` / `#A8A8A8` | Secondary text on dark |
| `--red` | `#FF0000` | **Reserved for the A in the logo only** |

### Typography

| Role | Font | Usage |
|---|---|---|
| Display | **Cormorant** 400/500, italic 400 | Headlines (`.display`, `.hero__title`), with italic accents in grey |
| UI | **Archivo** 400/500 | Body, buttons, labels |
| Labels | Archivo 500, 10–11 px, uppercase, `letter-spacing: .2em` | `.eyebrow`, nav, buttons |

### Layout tokens

| Token | Desktop | ≤ 900 px |
|---|---|---|
| `--gutter` | 40 px | 20 px |
| `--header-h` | 76 px | 64 px |
| `--notice-h` | 30 px when the preview bar is on | same |
| `--top-h` | header + notice (used for page offsets and sticky elements) | same |

Breakpoints used: **1000 px** (grids go to 2 columns), **900 px** (mobile header, stacked layouts) and **600 px** (compact cards).

### Brand rules for contributors

1. Never introduce new colours. Depth comes from tone, texture and contrast.
2. Red is used only in the logo's A.
3. Do not redraw or alter the logo. Use the files in `src/assets/logos/`.
4. Headlines use Cormorant; everything functional uses Archivo.

---

## 11. Components and hooks

| Component | Responsibility |
|---|---|
| `Layout` | Page frame: skip link, header, `<main>`, footer, cart drawer; scroll-to-top on navigation |
| `Header` | Fixed top bar, desktop nav, mobile menu drawer, cart button with count |
| `Footer` | Brand block, shop and company links, contact links (shown only when filled) |
| `CartDrawer` | Cart panel, quantity controls, subtotal, checkout or WhatsApp button |
| `ProductCard` | Product tile with tonal/visible hover swap, price and swatches |
| `ProductArt` | Vector garment illustration with the logo placed on it |
| `SmartImage` | Responsive, lazy, layout-stable photo with a dark placeholder and graceful failure |
| `Newsletter` | Signup form; posts JSON `{ email }` to `NEWSLETTER_ENDPOINT` when set |
| `Logo` | Renders the colour, white or black logo |

| Hook | Responsibility |
|---|---|
| `useOverlay(open, onClose, panelRef, focusRef?)` | Shared scroll lock, Escape to close, focus trap, focus return |
| `useSeo(title, description)` | Sets document title, meta description and OG title/description |
| `useReveal()` | Adds the `.in` class to `.reveal` elements as they scroll into view |

---

## 12. Accessibility

- Skip-to-content link and a focusable `<main>`
- Semantic landmarks (`header`, `nav`, `main`, `footer`, `article`) and labelled navigation regions
- All icon buttons have `aria-label`s; toggles use `aria-pressed`; the current nav item uses `aria-current`
- Menu and cart are `role="dialog"` with `aria-modal`, a focus trap, Escape to close, and focus returned to the trigger
- Visible `:focus-visible` outlines
- `prefers-reduced-motion` turns off animations and scroll reveals
- Size-selection errors are announced with `role="alert"`

---

## 13. Performance

- **Code splitting:** every page except Home is lazy-loaded; React and the router are in a separate long-cached `vendor` chunk.
- **Fonts:** self-hosted, Latin subset only, WOFF2. No request to Google Fonts.
- **Images:** garments are inline SVG (no downloads). Photos use `srcset`/`sizes`, WebP, lazy loading and fixed aspect ratios, so there is no layout shift.
- **Caching:** hashed assets are served with `Cache-Control: public, max-age=31536000, immutable`.
- **Network:** `preconnect` to the image CDN.

---

## 14. SEO

- Default title, description and Open Graph tags are in `index.html`.
- `useSeo` updates the title, description and OG title/description on every page.
- `robots.txt` allows all crawlers.

**Known limitation:** the site renders in the browser, so link previews on WhatsApp and Instagram, and some crawlers, only see the default tags in `index.html`. Pre-rendering is planned (see [Roadmap](#17-roadmap)). Add an `og:image` to `index.html` before launch.

---

## 15. Deployment

The site is static: build it and upload `dist/`.

### Vercel (recommended)

1. Import the repository in Vercel.
2. Framework preset: **Vite**. Build command: `npm run build`. Output directory: `dist`.
3. `vercel.json` already provides SPA rewrites and long-term asset caching.

### Netlify

1. Build command: `npm run build`. Publish directory: `dist`.
2. `public/_redirects` (SPA fallback) and `public/_headers` (caching and security headers) are copied into the build automatically.

> If you deploy on Vercel, copy the security headers from `public/_headers` into `vercel.json` as well. Vercel does not read `_headers`.

---

## 16. Launch checklist

**Content**
- [ ] Real prices in `src/data/products.js`
- [ ] Product `details` (fabric spec, fit notes, dimensions)
- [ ] `INFO.sizeGuide`, `INFO.care`, `INFO.delivery` in `Product.jsx`
- [ ] Journal dates and story text
- [ ] Founder story in `About.jsx`
- [ ] Home trust strip (delivery, returns, payment methods)

**Brand assets**
- [ ] Real vector logo files in `src/assets/logos/` (same file names)
- [ ] Product photography (front, back, detail) for both logo versions
- [ ] FLAME editorial and lifestyle photos to replace the Unsplash images
- [ ] `og:image` (1200 × 630) for link previews

**Commerce and contact**
- [ ] `site.whatsapp` and/or `site.checkoutUrl`
- [ ] `site.email`, `site.instagram`
- [ ] `NEWSLETTER_ENDPOINT` and `PRIVACY_URL` in `Newsletter.jsx`
- [ ] Privacy policy, delivery and returns pages

**Go live**
- [ ] `showPlaceholderNotice: false`
- [ ] Custom domain and HTTPS
- [ ] Analytics (GA4) and Meta Pixel for Instagram campaigns
- [ ] Final test on a real phone: browse → choose size → cart → checkout

---

## 17. Roadmap

| Priority | Item |
|---|---|
| High | Real product photography and a multi-image product gallery |
| High | Mobile-money and card payments through a local payment provider (server-side function) |
| High | Pre-rendering (e.g. `vite-react-ssg`) for per-page link previews and SEO |
| Medium | Sitemap, product structured data (JSON-LD), web manifest, `apple-touch-icon` |
| Medium | Delivery and returns, size guide and privacy policy pages |
| Medium | Analytics and Meta Pixel |
| Medium | Headless CMS (or Google Sheet) so the owner can edit products without code |
| Low | ESLint, Prettier and a CI build check on every push |
| Low | Stock and "sold out" states per size |

---

## 18. Git workflow

| Branch | Purpose |
|---|---|
| `master` | Stable, deployable code |
| `development` | Active work; merged into `master` after review |

```bash
git checkout development
git pull
# make changes
npm run build          # make sure the build passes
git commit -m "feat: short description"
git push
```

Commit messages follow a light [Conventional Commits](https://www.conventionalcommits.org) style: `feat:`, `fix:`, `style:`, `docs:`, `refactor:`.

---

## 19. Credits and licence

**Editorial photography** (temporary, [Unsplash Licence](https://unsplash.com/license)):

- Marshal Quast — <https://unsplash.com/photos/a0EfucCg3uk>
- Harshit Solanki — <https://unsplash.com/photos/JhKblPS3kc8>
- Jakob Rosen — <https://unsplash.com/photos/9O2F5D4FvZg>

These will be replaced with FLAME's own photography before launch.

**Fonts:** Cormorant and Archivo, both under the SIL Open Font License, served via [Fontsource](https://fontsource.org).

**Licence:** © FLAME. All rights reserved. The FLAME name, logo and brand assets may not be reused without permission.