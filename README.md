# Sai Kripa

Website for Sai Kripa — event and field operations in JP Nagar, Bengaluru.
Manpower, printing, media promotions, event supplies, F&B support, logistics and management support.

Single static page, no build step. `index.html` contains the markup, styles and the Three.js hero scene.

## What's in here

| File | Purpose |
|---|---|
| `index.html` | The whole site — markup, styles, both WebGL scenes, quote dialog |
| `images/` | Logo files, app icons, share card, eight event illustrations |
| `manifest.webmanifest` | Makes the site installable to a phone home screen |
| `sw.js` | Service worker — the site opens even with no signal |
| `vercel.json` | Security headers and asset caching |
| `robots.txt`, `sitemap.xml` | Search engine basics |

## Logo files

Your SK logo drives the whole identity. It was supplied as a flat image on white, so it has been cut off its background and prepared in two families.

**`brand/`** — print-ready, full resolution. Not loaded by the website; these are for invoices, quotations, T-shirts, banners and vendor paperwork.

| File | Use |
|---|---|
| `logo-full.png` | Complete sheet with the seven service icons — good for a quotation header |
| `logo-full-dark.png` | Same, for dark or photographic backgrounds |
| `logo-lockup.png` | Monogram, wordmark and "People / Support / Success" |
| `logo-mark.png` | SK monogram alone |
| `*-dark.png` | Versions where the navy becomes white, for dark backgrounds |

**`images/`** — compressed web copies the site actually loads, plus favicons and app icons generated from the monogram.

All backgrounds are transparent, so the logo sits on any colour. The dark variants exist because the navy half of the original disappears against a dark background — use `-dark` on navy or photos, plain versions on white or paper.

One limitation worth knowing: the source is a raster image, so it cannot be scaled indefinitely. For a large banner or a vehicle wrap, have a designer redraw it as vector once — the shapes are simple and it is an hour of work. Everything on the website and anything up to A3 print is fine as is.

## Quote form

The "Get a quote" button opens a dialog. When the visitor sends it, the form builds a formatted message and opens either WhatsApp to **74067 26043** or their email app addressed to `hello@saikripa.in`. Nothing is stored and there is no backend to maintain — change the number in `index.html` by searching for `const WA`.

## Edit these before going live

| Where | Currently | Replace with |
|---|---|---|
| Contact block + CTA | `hello@saikripa.in` | Real email address (also in `sw.js` context and the JSON-LD block) |
| Head, sitemap, robots | `saikripa.in` | Your real domain, once you buy it |
| Hero line | People · Support · Success | Your tagline, already taken from the logo |
| Contact block | `JP Nagar, Bengaluru` | Full street address |
| Stats section | 500+, 7, 24 hrs, 1 | Your real numbers, or delete the section |
| Since 2019 section | Founding story | Correct anything that didn't happen that way |
| Founders section | Awign background lines | Reword however you want it said publicly |

Search the file for `saikripa.in` to find the email fields fast.

Phone numbers and LinkedIn profiles for Pradeep S and Shreyas R are live in both the founders section and the contact block, with WhatsApp links (`wa.me`) alongside each number.

## Put it on GitHub

```bash
cd sai-kripa
git init
git add .
git commit -m "Sai Kripa website"
git branch -M main
git remote add origin https://github.com/<your-username>/sai-kripa.git
git push -u origin main
```

Create the empty repo on github.com first (no README, no .gitignore — this folder already has one).

## Deploy on Vercel

1. Go to vercel.com and sign in with GitHub.
2. **Add New → Project**, import `sai-kripa`.
3. Framework preset: **Other**. Leave build command and output directory empty.
4. **Deploy.** You get a live `*.vercel.app` URL in about 30 seconds.

Every push to `main` redeploys automatically.

### Custom domain

Project → **Settings → Domains** → add `saikripa.in` (or whatever you buy). Vercel shows the DNS records; add them at your registrar. SSL is automatic.

## Brand colours

The site was rebuilt around the logo rather than the other way round.

| Role | Hex | Where |
|---|---|---|
| Navy base | `#06182C` | Page background |
| Navy panel | `#0D2540` | Contact block, dialog, mobile menu |
| Gold | `#D9A441` | Buttons, accents, the open service |
| Light gold | `#E8C87A` | Secondary highlights, the 3D panels |
| Paper | `#EEF2F7` | Body text |

Both WebGL scenes and all eight event illustrations were regenerated in these colours, so the page, the logo and the artwork are one palette.

## Photos

Every event tile already carries a custom isometric illustration (`images/*.svg`) drawn in the site palette, so the page is complete as it ships — nothing looks unfinished.

To swap in a real photo, drop a `.jpg` into `images/` with the matching name (`corporate.jpg`, `launch.jpg`, `activation.jpg`, `wedding.jpg`, `exhibition.jpg`, `fest.jpg`, `opening.jpg`, `community.jpg`). It covers the illustration automatically — no code change. Add them one at a time; tiles without a photo keep their illustration.

Use your own event photos, not stock. Stock images are copyrighted, and a client who recognises one discounts everything else on the page. Landscape, about 1200px wide, under 400 KB. Full notes in `images/README.txt`.

## Notes on the build

- The hero is a WebGL scene: a city plate that swells, six venue markers, and dispatch pulses running from the JP Nagar hub outward. It falls back to a plain gradient if WebGL is unavailable, and freezes motion when the visitor has reduced-motion turned on.
- The services section has a second WebGL panel with seven low-poly models — crew, print roll, canopy, stage, F&B counter, tempo, run sheet. Hovering or opening a service swaps the model. It pauses when scrolled out of view or the tab is hidden, so it costs nothing on battery.
- Fonts load from Google Fonts (Archivo for headlines, Karla for body). To go fully self-hosted, download the woff2 files and swap the `<link>` for an `@font-face` block.
- No tracking, no cookies, no backend, no ads.
- Modern platform features used: the Popover API for the mobile menu, a native `<dialog>` for the quote form, `@starting-style` and `allow-discrete` transitions so both animate in and out without JavaScript, CSS container queries for the event grid, `:has()` to focus the open service row, `color-mix()` for tints, a scroll-driven progress bar via `animation-timeline`, and `content-visibility` to skip offscreen rendering work. Every one degrades quietly on older browsers — nothing breaks, it just stops animating.
- Search engines get JSON-LD `ProfessionalService` structured data covering both founders, all seven services, opening hours and the Bengaluru service area. That is what produces a rich result rather than a plain blue link.
- Sharing a link on WhatsApp or LinkedIn shows `images/og.png` with the logo and tagline.
