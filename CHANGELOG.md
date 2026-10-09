# Changelog

All notable changes to the sravanpolu.com portfolio project, from the competitive gap audit (October 2026).
Format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) principles.

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
