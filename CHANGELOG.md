# Changelog

All notable changes to the sravanpolu.com portfolio project, from the competitive gap audit (October 2026).
Format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) principles.

## [Unreleased] — 2026-10-10 (Pass D — v2: metadata dates, prerender portability, CI order, accessibility 100)

v2 audit-and-fix pass. Verified every Pass C fix still holds, then closed the
remaining gaps. All changes preserve the existing UI, layout, navigation and
project content. Full report: `docs/SEO_FINAL_AUDIT.md`.

### Fixed

- **Future-dated metadata corrected** — `public/sitemap.xml` `lastmod` and the
  `ProfilePage.dateModified` JSON-LD value were `2026-10-11`, one day ahead of
  the actual content modification date. Both now use the real date
  (`2026-10-10`, UTC).
- **Obsolete / duplicate meta tags removed** from `public/index.html`:
  `googlebot` (exact duplicate of the `robots` directive), `revisit-after`,
  `rating`, `distribution` (all ignored by modern engines).
- **Puppeteer Chrome discovery made portable** — `scripts/prerender.ts` and
  `scripts/generate-resume-pdf.ts` now also probe `/usr/local/bin/chromium`
  and `/usr/bin/google-chrome-stable`. Previously the production build FAILED
  (`Could not find Chrome (ver. 148.0.7778.97)`) on systems where Chromium
  lives outside the three hard-coded paths, because the puppeteer cache can
  hold a mismatched browser build.
- **CI workflow step order fixed** (`.github/workflows/ci.yml`) — `pnpm` is
  now installed (via corepack) *before* `actions/setup-node`, whose
  `cache: pnpm` option requires the package manager on `PATH`. The previous
  order failed at the setup step. `corepack prepare` now activates the same
  version pinned in `packageManager` (10.14.0) instead of `pnpm@latest`.
- **Accessibility 96 → 100 (Lighthouse)** — `role="img"` added to the
  testimonial star-rating containers (aria-label on a role-less `div` is
  prohibited), and the nav logo / Fiverr link accessible names now contain
  their visible text (`label-content-name-mismatch`).

### Added

- `engines.node: ">=20"` in `package.json` (documents the supported runtime;
  CI uses 20, local dev verified on 24).
- `scripts/verify-interactions.ts` — 21-check post-mount regression suite:
  React-mount detection over the prerendered DOM, duplicate-DOM guard,
  nav/CTA/mobile-menu interaction tests, console-error monitoring.

### Verified (no changes needed)

- Title, meta description, canonical, robots, OG/Twitter metadata: unique,
  consistent, trailing-slash aligned with sitemap `loc` (all re-verified in
  the built HTML).
- JSON-LD `@graph` (Person + WebSite + ProfilePage): parses, `@id` references
  resolve; no duplicates after React mount.
- Prerendering: no hydration conflicts (fresh `createRoot` render over static
  snapshot — verified by mount detection + h1 content-stability test), no
  duplicate DOM, no console/page errors after mount.
- External links: 28/30 HTTP 200; LinkedIn (999) and Fiverr (403) block
  datacenter IPs (same result as the v1 audit — not broken links).

## [Unreleased] — 2026-10-11 (Pass C — SEO verification & hardening)

Pass C audited the live site against this repository, verified every Pass A/B
fix, and closed the remaining gaps. All changes preserve the existing UI,
layout, navigation and project content.

### Fixed

- **Security headers now ship inside the deploy** (`public/_headers`, copied to
  `build/_headers`). The live site was serving none of the headers from
  `netlify.toml` because they only apply to git-connected deploys; the current
  deployment appears to be drag-and-drop. `_headers` applies to every Netlify
  deploy method (identical values to `netlify.toml`, so no conflicts).
- **Non-blocking font loading restored in the deployed HTML.** The prerender
  script captured the Google Fonts link *after* the browser had already flipped
  `media="print"` to `"all"`, so the shipped HTML contained a render-blocking
  stylesheet (silently undoing the Pass A fix). `scripts/prerender.ts` now
  rewrites the link back to `media="print"` after capture; the `onload`
  handler and `<noscript>` fallback still cover JS and no-JS clients.
- **Below-fold images are lazy again in the shipped HTML.** The prerender
  script forced every image to `loading="eager"` for capture and that state
  shipped, so real browsers downloaded all ~757 KB of images upfront and the
  LCP element competed with them on slow connections. The prerender now
  restores `loading="lazy"` for everything that was not natively eager (hero
  portrait stays eager). Raw HTML still contains every `<img src>`, so
  crawlers see all images.
- **`resume-preview.html` marked `noindex`** (in `scripts/build-resume-html.ts`
  and the committed `public/` copy). It is an iframe-only embed; indexing it as
  a standalone thin page added a duplicate-content risk.
- **True image encodings:** `favicon.png` and `logo192.png` were JPEG bytes
  served as `image/png` — re-encoded as genuine PNGs (same URLs).
  `og-image.png` was also JPEG bytes; it is now correctly published as
  **`og-image.jpg`** (95 KB, progressive) with `og:image`, `twitter:image` and
  JSON-LD references updated.
- **URL-form consistency:** canonical, `og:url` and JSON-LD `url` now use
  `https://sravanpolu.com/` (trailing slash), matching the sitemap `<loc>`.
- **Lint failures fixed** (first time ESLint ran on the codebase): split
  multiple assertions inside `waitFor` callbacks, switched to `findByText`,
  removed unused imports (`render`, `screen`, `useEffect`,
  `removeNotification`).

### Added

- **WebSite + ProfilePage JSON-LD** — the Person schema is now an `@id`-linked
  `@graph` (Person, WebSite, ProfilePage), satisfying the structured-data
  checklist without inventing content.
- **`lint` and `typecheck` scripts** and matching CI steps
  (install → typecheck → lint → test → build). ESLint 8.57.1 and
  eslint-config-react-app 7.0.1 were promoted from transitive to direct
  devDependencies — no new packages added to the lockfile.
- **`scripts/verify-build.ts`** — reusable smoke + Core Web Vitals suite
  (sections render, images, iframe, mobile menu, crawler-view HTML assertions,
  LCP/CLS measurement) run against `build/`.
- **`docs/SEARCH_CONSOLE_GUIDE.md`** — deploy verification checklist, GSC
  property setup, sitemap submission, indexing request, and honest monitoring
  expectations.

### Changed

- **Project screenshots right-sized** (17 images, 1280 px → 800 px wide —
  2× their ~400 px card display) and hero/flagship images recompressed:
  `src/assets/images` went 800 KB → 487 KB (−39%); the Netflix-clone
  screenshot alone dropped 174 KB → 74 KB. No layout change (same aspect
  ratio, `object-cover` cards).
- `sitemap.xml` `lastmod` updated to 2026-10-11.
- Removed unused duplicate `src/assets/Resume.pdf` (the served PDF is
  `public/Resume.pdf`, regenerated from `resume-data.ts` on every build).

### Corrected documentation

- Pass B's claim that `public/Resume.pdf` was "restored to the uploaded
  original (md5 `4ae7e25a…`)" no longer held: a later `pnpm build`
  regeneration overwrote it (by design — the build regenerates the PDF from
  `resume-data.ts`; output is text-identical, only the embedded PDF timestamp
  differs). The AUDIT_REPORT addendum documents the pipeline behavior instead
  of a stale md5.

### Verified (Pass C, executed not assumed)

- `pnpm run typecheck` — PASS · `pnpm run lint` — PASS (0 errors, 0 warnings)
- Tests: 28/28 passing (6 suites) — no regressions
- Production build + prerender: 179.3 KB fully-rendered HTML; font link ships
  `media="print"`; 27 lazy + 2 eager images
- `pnpm install --frozen-lockfile` — consistent (CI-safe)
- Smoke suite (32 checks): 9/9 sections, 0 console/page errors, 0 broken
  images, resume iframe loads, mobile menu opens flush (−1 px), fonts load,
  single `<h1>` in raw HTML
- Lab Core Web Vitals (unthrottled, local): LCP 564 ms desktop / 420 ms
  mobile, CLS 0.0016 / 0.0000
- Lighthouse 13 (throttled lab, against local `build/`):
  **SEO 100 · Best Practices 100 · Accessibility 96 · Performance 94 desktop
  (LCP 1.5 s, TBT 100 ms) / 83–88 mobile applied-throttled (LCP 2.5 s)** —
  mobile performance was 66 (LCP 8.8 s) before the lazy-loading and image
  fixes. Methodology note: Lighthouse's *simulated*-throttling mobile run
  scores lower (~53) because deferring work (non-blocking fonts, lazy images)
  shifts main-thread tasks into the FCP→TTI measurement window — total
  main-thread work is unchanged (~2.7 s) and every user-facing metric (LCP,
  Speed Index, TTI, transferred bytes) improved. Real-user INP/field data
  (CrUX) remain the authoritative signal after deploy.
- External links: 25/25 project + GitHub URLs return 200; LinkedIn (HTTP 999)
  and Fiverr (403) block automated agents from datacenter IPs — pages open
  normally in browsers, but could not be verified from this environment
- Live-site checks performed 2026-10-10: www → apex 301, http → https 301,
  proper 404 status for unknown paths, robots/sitemap/logo512-maskable all
  correct. **Security headers still missing on live until redeploy.**

## [Unreleased] — 2026-10-10


### Fixed (Pass B — verification round)

- **`public/resume-preview.html` restored** (8,025 bytes). It had gone missing from the
  source tree, which would have broken the desktop resume iframe preview
  (`src/sections/Resume.tsx`) for any deployment that does not run a full rebuild.
- **`public/Resume.pdf` and `src/assets/Resume.pdf` restored to the uploaded resume**
  (md5 `4ae7e25a…`). A rebuild had overwritten the user's PDF with the generated copy;
  the generated PDF was verified **text-identical** to the uploaded one (2,540 chars,
  `pdftotext` comparison), so the build pipeline stays consistent either way.
- **`README.md` repaired**: malformed live-site link (`[hhttps://…`) corrected to a
  proper `[https://sravanpolu.com/](https://sravanpolu.com/)` link; empty
  "Project Structure" section filled with the actual tree; audit report linked.
- **`public/index.html` noscript simplified**: the full no-JS fallback (which duplicated
  the pre-rendered content and produced a second `<h1>` in raw HTML) was replaced with a
  compact notice. The prerender pipeline (`scripts/prerender.ts`) already provides
  complete HTML content to crawlers and no-JS visitors, so the duplication was an SEO
  defect, not a feature.

### Added (Pass B)

- **`AUDIT_REPORT.md`** — competitive gap audit, technical review, findings F-01…F-08
  with severities and code references, before/after measurements, test results,
  limitations, and a prioritized roadmap.
- **`CHANGELOG.md`** (this file).
- Verification tooling (outside the repo, in the audit workspace): 15-fix programmatic
  verifier, production smoke test, final accessibility assertions, Core Web Vitals lab
  measurement.

### Verified

- TypeScript: `npx tsc --noEmit` — PASS
- Tests: 28/28 passing (6 suites)
- Production build: compiles cleanly; prerendered `index.html` = 178.4 KB
- Smoke test (served build): 9/9 sections render, 0 console errors, 0 broken images,
  resume iframe renders real content, `/Resume.pdf` → 200, mobile menu flush (−1 px)
- Raw HTML: exactly one `<h1>`, full project content present for crawlers

## [Unreleased] — 2026-10-09

### Fixed (Pass A — initial audit implementation)

1. **Mobile navigation overlap** (`src/components/Nav.tsx`): the mobile menu used
   `fixed top-[57px]`, which overlapped the 69 px navbar by 12 px. Now positioned
   `absolute inset-x-0 top-full` — verified flush (−1 px) on a 390 px viewport.
2. **Redundant `role="navigation"`** removed from the `<nav>` element
   (`src/components/Nav.tsx`) — the landmark role is implicit.
3. **Image weight reduced ~82%**: 21 images converted PNG → WebP (media weight
   4.0 MB → 752 KB). `footerLogo.png` kept as PNG because its WebP was larger.
   All imports updated in `src/constants/index.ts`, `Hero.tsx`, `About.tsx`,
   `Testimonials.tsx`.
4. **Dead asset removed**: unreferenced `public/skr.png` (121 KB) deleted — it was
   copied into every build.
5. **PWA manifest completed** (`public/manifest.json`): added `id: "/"`,
   `start_url: "/"`, 512 px icon and 512 px maskable icon (generated from
   `headerLogo.png`).
6. **`public/robots.txt`**: added `Sitemap: https://sravanpolu.com/sitemap.xml`.
7. **`public/sitemap.xml`**: added `<lastmod>`.
8. **`public/index.html` SEO/head hygiene**:
   - JSON-LD Person schema enriched: `email`, `alumniOf` (Lovely Professional
     University), `knowsLanguage`, `address` (country IN), `jobTitle` aligned with
     the page title.
   - Duplicate favicon `<link>` removed.
   - Google Fonts CSS made non-blocking: `media="print" onload="this.media='all'"`
     plus `<noscript>` fallback (font-loading verified: `document.fonts.status =
     loaded`, Inter active).
9. **No-op `reportWebVitals()` call removed** from `src/index.tsx`; orphaned
   `src/reportWebVitals.js` deleted. Web-vitals measurement remains via the app's
   own `useWebVitals` hook (dynamic import).
10. **CI hardened** (`.github/workflows/ci.yml`): `pnpm install --frozen-lockfile`
    so CI fails on lockfile drift instead of silently resolving.
11. **Deploy configs added** — `netlify.toml` and `vercel.json`:
    - Security headers: `X-Content-Type-Options`, `Referrer-Policy`,
      `Permissions-Policy`, `Strict-Transport-Security`, and
      `Content-Security-Policy: frame-ancestors 'self'` (deliberately **not**
      `X-Frame-Options: DENY`, which would break the same-origin
      `/resume-preview.html` iframe in the Resume section).
    - Caching: immutable `max-age=31536000` for `/static/*` and `*.webp`;
      short `max-age=3600` for `/Resume.pdf` (regenerated per build).

### Performance results (lab, local production build)

- Initial JS: one 372 KB raw chunk; 13 section chunks lazy-loaded on scroll.
- LCP: 672 ms desktop / 312 ms mobile — CLS: 0.0016 / 0.0 (both "Good").
- Total shipped media: 4.2 MB → 824 KB (−80%).

### Known limitations

- The **live site** (sravanpolu.com) still runs the pre-audit build until the owner
  redeploys (see AUDIT_REPORT.md §11 for exact steps and post-deploy checks).
- `act()` warnings in test output come from React 18.3 + @testing-library/react 13;
  cosmetic, all tests pass. Upgrade listed in the roadmap.
- CRA (`react-scripts` 5.0.1) is in maintenance mode; migration to Vite/Next is a
  roadmap item, intentionally not executed during the audit.
