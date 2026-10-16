# FLAME web (React + Vite, frontend only)

Premium all-black storefront for FLAME. Built from the approved site designs:
Home, Shop (filter, sort, grid toggle), Product (tonal/visible logo, sizes), Journal, Story, About, 404, cart drawer (saved in localStorage) and newsletter form.

## Run

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # outputs dist/
npm run preview
```

## Where to edit

| What | File |
|---|---|
| Products, prices (`price: null` shows `[PRICE] TZS`), sizes, copy | `src/data/products.js` |
| Journal stories | `src/data/journal.js` |
| Contact details, checkout link, placeholder bar on/off | `src/data/site.js` |
| Photos | `src/data/images.js` |
| Colours, spacing | `src/styles/tokens.css` |

## Logos (SVG)

`src/assets/logos/flame-logo-{color,white,black}.svg` are SVG files that **embed the approved logo artwork**. No official vector files were available, and the logo must not be redrawn. When you have the real vector SVGs, replace these three files using the same names. Nothing else changes.

## Performance

- Route-level code splitting (`React.lazy`), vendor chunk split, only Home is eager
- Self-hosted fonts (@fontsource), latin subset only, no Google Fonts request
- Garments are inline vector SVG (no image downloads); logos are ~10 KB each
- Photos: responsive `srcset`/`sizes`, WebP, lazy loading, fixed aspect ratio (no layout shift), dark placeholder, graceful fallback if the host fails
- Photos are toned to black with CSS (greyscale + darken) to match the brand
- `preconnect` to the image host, immutable caching headers (`public/_headers`, `vercel.json`), SPA rewrites for Netlify/Vercel
- Respects `prefers-reduced-motion`; skip link, labelled controls, focus styles

## Image sources and credits

Photos are loaded from Unsplash (free Unsplash licence):

- Marshal Quast, https://unsplash.com/photos/a0EfucCg3uk
- Harshit Solanki, https://unsplash.com/photos/JhKblPS3kc8
- Jakob Rosen, https://unsplash.com/photos/9O2F5D4FvZg

Blvck's own photography is not used: it is their copyrighted brand imagery. Replace the Unsplash photos with FLAME photography as soon as you have it.

## Before launch

Replace every `[BRACKET]` placeholder, set real prices, set `checkoutUrl`, connect the newsletter form to your email tool, and set `showPlaceholderNotice: false`.
