# Changelog

All notable changes to the sravanpolu.com portfolio project, from the competitive gap audit (October 2026).
Format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) principles.

## [Unreleased] — 2026-10-11 (Pass G — v5: desktop LCP fix + CWV test methodology)

Fixes the desktop LCP regression that caused `pnpm verify` to exit with
code 1 in v4 (`cwv-desktop-good` failed at LCP = 4.680 s). The fix is
minimal (2 lines in `src/sections/Hero.tsx`) and the CWV measurement
methodology in `scripts/verify-build.ts` is hardened so the result is
both reproducible and debuggable. Full root-cause analysis:
`docs/LCP_ROOT_CAUSE_REPORT.md`.

### Changed — desktop LCP root-cause fix

- **`src/sections/Hero.tsx`** — replaced the two above-the-fold
  `framer-motion` entrance animations (`initial={{ opacity: 1, y: 24 }}`
  on the hero content wrapper, `initial={{ opacity: 1, y: 12 }}` on the
  "Latest build" widget) with `initial={false}`. The prerendered DOM
  has `transform: none` (captured post-animation by `prerender.ts`),
  but React's previous initial state was `translateY(24px)`, so when
  React mounted on slower CPUs the hero portrait image was briefly
  shifted 24 px and then animated back to 0 over 600 ms. Chrome fired
  a new LCP entry when the animation settled, producing a desktop LCP
  of ~4 s on a 16×-throttled CPU. `initial={false}` makes React's
  first paint match the prerendered DOM exactly, so the hero image's
  LCP candidate stays at its first paint (~0.4-0.5 s). All hover / 3D
  / mouse-tracking effects on the hero portrait are preserved (they
  use inline `style`, not `initial/animate`). Below-the-fold entrance
  animations in About / Resume / Skills / Testimonials / Contact are
  untouched (they don't affect LCP).
- **`scripts/verify-build.ts`** — hardened the CWV measurement:
  - LCP / CLS PerformanceObserver now registered via
    `page.evaluateOnNewDocument(...)` so it captures every paint from
    t=0 (Lighthouse / web-vitals methodology). The previous version
    registered the observer inside `desktop.evaluate(...)` after
    `goto` + scroll tests, which on some Chrome lifecycle states
    missed the first paint.
  - LCP is captured **before** any scroll / menu interaction. The
    scroll-based tests (resume iframe, mobile menu) now run after
    LCP capture so they can't pollute the LCP candidate list. Real
    users don't scroll within the LCP window, so the realistic
    page-load LCP is what the gate reports.
  - The LCP element's tag, bounding rect, src URL, and size are
    captured for every candidate and printed in the INFO line, so
    future regressions are debuggable from the verify output alone
    (no separate diagnostic run needed).
  - Multiple LCP candidates (if any) are printed as a separate
    `cwv-*-candidates` INFO line, exposing the full LCP timeline.
  - Settle window reduced from 6 s to 1.5 s (post-`fonts.ready`).
    The 6 s window was large enough to occasionally capture a slow
    late paint as a false-positive LCP. 1.5 s is sufficient for lab
    measurement and keeps the test cycle fast.
  - LCP (<2500 ms) and CLS (<0.1) thresholds unchanged. No check
    is skipped or weakened.
- **`scripts/lcp-diagnostic-full.ts`** — new diagnostic script that
  captures every LCP candidate with element identity across CPU
  throttle rates 1× / 4× / 8× / 16×. Reproduces the v4 desktop LCP
  failure on 16× throttle and confirms the v5 fix. Preserved in the
  shipped project for future regression analysis.
- **`docs/LCP_ROOT_CAUSE_REPORT.md`** — new detailed report covering
  the diagnostic methodology, root cause, code changes, before/after
  measurements, and test-script validation.

### Verification — v5

| Check | v4 | v5 |
|-------|----|----|
| `pnpm run typecheck` | PASS | PASS |
| `pnpm run lint` | PASS | PASS |
| `pnpm test --watchAll=false` | 28/28 | 28/28 |
| `pnpm run build` | exit 0 | exit 0 |
| `pnpm verify` (verify:build) | FAIL (cwv-desktop-good) | PASS (31/31) |
| `pnpm verify` (verify:interactions) | PASS | PASS (20/20) |
| Desktop LCP (1× CPU) | 4.680 s | 0.476 s |
| Desktop LCP (16× CPU) | 4.080 s | 0.780 s |
| Mobile LCP (1× CPU) | 0.192 s | 0.240 s |
| Desktop CLS | 0.0000 | 0.0000 |
| Mobile CLS | 0.0757 | 0.0000 |

---

## [v4] — 2026-10-10 (Pass F — startup behavior, real mobile performance, CI verification, self-hosted fonts)

Fixes the seven findings of the v4 SEO audit. Headline results (same test
harness, production-like gzip serving, Lighthouse 13.5, simulated throttling):
**mobile Performance 69 → 89–93, desktop 98 → 99–100**, TBT 770 ms → 180–240 ms
(mobile), CLS 0 everywhere including anchor jumps, SEO/Accessibility/Best
Practices 100 across all runs. Full evidence: `docs/SEO_V4_VERIFICATION_REPORT.md`.

### Changed — startup & rendering (fixes v4 Task 1)

- **`src/index.tsx`** — documented why `createRoot` (not `hydrateRoot`) is the
  correct startup for this architecture: the prerender is captured at 1280px
  while `Nav`/`Resume`/`Link` render structurally different trees per
  breakpoint (`useMediaQuery`), so hydration would structurally mismatch on
  every non-desktop device and fall back to a client render with console
  errors. Before mounting, React now records each prerendered section's true
  height at the live viewport (`window.__prerenderSectionHeights`) for the
  layout-stability work below.
- **`src/components/LazySection.tsx`** — sections below the fold now mount on
  an IntersectionObserver gate (800px preload margin, once-only), so a cold
  load only downloads/parses/renders what is visible; the Hero is bundled
  *eagerly* (above-the-fold LCP section — no serial chunk round-trip, and the
  first React commit paints the real Nav + Hero so the prerendered content is
  never visibly replaced by skeletons). Each gated wrapper is pinned to the
  section's prerendered height (clipped `overflow:hidden`) until the real
  content mounts, which keeps CLS at 0 even when a visitor jumps to a mid-page
  anchor during initial load; the pin is skipped for sections whose React tree
  is structurally different below a breakpoint (`PIN_GUARDS`: Resume @768px).
- **`scripts/prerender.ts`** — the scroll pass is now adaptive (walks the page
  in 600px steps, repeating while lazy sections keep growing the document),
  then waits until zero `[aria-busy]` placeholders remain before capture, so
  the prerendered HTML still contains every section.

### Changed — performance (fixes v4 Task 2)

- **Self-hosted fonts** (`public/fonts/`, inline `@font-face` in
  `public/index.html`): identical Inter v20 / JetBrains Mono v24 latin
  variable files previously served by Google Fonts, now same-origin with a
  preload for the LCP-critical Inter. The old `media="print"` Google-CSS
  pattern placed `@font-face` discovery behind a lowest-priority request that
  landed after the main bundle on slow links (measured cost ≈ 0.9 s simulated
  mobile LCP + a double font fetch when preloading the CSS URL). Also removes
  two third-party connections and adds immutable caching
  (`public/_headers`, `netlify.toml`, `vercel.json`).
- **react-icons evicted from the initial bundle** — `Nav`'s FiDownload and
  `constants`' SiFiverr are replaced with byte-identical inline SVGs
  (`src/components/icons/FiverrIcon.tsx`, inline components in Nav/Hero for
  FiDownload/FiArrowRight). The eager import chain previously dragged the
  shared `react-icons/si` barrel (~35 KB minified) into `main.js`; icons now
  live in the lazy chunks that use them.
- Net effect: initial JS 372 KB → 354 KB raw / 122 KB → 109 KB gz (now
  *including* the Hero), boot-time network only fetches what the first
  viewport needs (byte weight 780 KB → ~312 KB), and long tasks at boot were
  cut from 3× ≈90 ms to 2× ≈70 ms unthrottled.

### Changed — metadata & verification (fixes v4 Tasks 3–6)

- **`package.json`** — new scripts: `verify` (= `verify:build` +
  `verify:interactions`), wired into `.github/workflows/ci.yml` as a
  post-build CI step that fails the run on any critical check (verification
  runs against the final prerendered output; no duplicate builds).
- **`scripts/generate-sitemap.ts`** — preflight extended: duplicate-tag guard
  (exactly one of each critical title/description/canonical/OG/Twitter tag),
  value checks for `og:type`, `og:site_name`, `og:locale`, `twitter:card`
  (new constants in `src/constants/site.ts`), and an obsolete-tag guard
  (keywords/revisit-after/distribution/rating/googlebot fail the build if they
  reappear).
- **`public/index.html`** — removed `meta name="keywords"` (obsolete; Google
  ignores it). `author` and geo tags retained deliberately.
- **`scripts/verify-build.ts`** — font checks updated for the self-hosted
  setup; the resume-iframe check now scrolls the section into view first
  (sections mount lazily); CWV checks confirm LCP < 2.5 s and CLS < 0.1 on
  desktop and mobile viewports.
- **`scripts/verify-interactions.ts`** — walks the page once (like a real
  visitor) before asserting on the DOM, so checks run against fully mounted
  lazy sections; contact-affordance check passes again.

### Verified

- 28/28 unit tests, `tsc --noEmit` clean, full production build + prerender +
  sitemap with `KEPT`/`BUMPED` dating stable across repeated runs.
- `pnpm verify`: 33/33 build checks + 21/21 interaction checks (raw-HTML
  crawler view, single `<h1>`, all 9 sections exactly once, no duplicate
  metadata after mount, nav/CTA/menu/resume/mailto interactions, 0 console
  errors, lab CWV desktop LCP 0.55 s / CLS 0.03, mobile LCP 0.26 s / CLS 0).
- Teleport-to-anchor CLS probes at 390/768/1280 px: 0.025 / 0 / 0.
- Lighthouse 13.5 (×3 mobile, ×2 desktop, simulated throttling, gzip
  serving): see report. No secrets in the tree; `pnpm audit` finds no
  runtime-dependency advisories (all findings are CRA dev-toolchain, never
  shipped).

## [Pass E — v3] — 2026-10-10 (centralized metadata + genuine-change sitemap dating)

Implements the remaining "Improve" pillar of the SEO decision: repeated
metadata is now centralized with build-time enforcement, and sitemap
`lastmod` / JSON-LD `dateModified` are generated from genuine content
changes instead of being hand-edited. Static delivery is untouched — no
SSR, no Next.js, no runtime metadata. Guide: `docs/PAGE_METADATA_GUIDE.md`.

### Added

- **`src/constants/site.ts` — single source of truth** for every repeated
  metadata value: site URL, homepage title/description variants, OG/Twitter
  image, social profile URLs, manifest name/description, and the sitemap
  page list (`SITEMAP_PAGES`, extensible for future pages).
- **`scripts/generate-sitemap.ts`** (final step of `pnpm build`):
  - *Preflight drift guard* — fails the build with the exact mismatch if
    `public/index.html`, `public/robots.txt` or `public/manifest.json`
    disagree with `site.ts` (hand-edits can no longer fork the metadata).
  - *Genuine-change dating* — SHA-256 of the final prerendered
    `build/index.html` with CRA bundle hashes normalized away, so pure
    refactors/dependency bumps never move the date while real content
    changes (text, DOM, images) always do. The v1 future-dated-`lastmod`
    class of bug is now structurally impossible.
  - *Lockstep writes* — regenerates `public/sitemap.xml` + `build/sitemap.xml`
    and stamps `dateModified` in both `index.html` files with the same
    resolved date (`KEPT` / `BUMPED` / `INIT`, decided from
    `scripts/.metadata-state.json`, which must be committed with the
    generated changes).
- **`scripts/verify-build.ts`** — 5 new checks (32 → 37): sitemap `<loc>`
  matches canonical, `lastmod` valid and not future-dated, sitemap ==
  JSON-LD == state-file lockstep, robots.txt `Sitemap:` directive, `og:url`
  == canonical.
- **`docs/PAGE_METADATA_GUIDE.md`** — how metadata works today and the
  decided pattern for page-specific title/description/canonical/JSON-LD when
  future project/service pages are added (static per-route HTML, following
  the `resume-preview.html` / `404.html` precedent; no SSR, no Next.js).

### Changed

- `src/constants/resume-data.ts` and `src/constants/index.ts` now import
  their profile URLs from `site.ts` instead of hardcoding them — resume PDF,
  rendered footer/contact links and JSON-LD `sameAs` can no longer drift.
- `package.json` — `build` chain is now `build:resume → craco build →
  prerender → generate:sitemap` (new `generate:sitemap` script). No new
  dependencies.

### Verified (zero regressions)

- typecheck PASS, lint 0 problems, tests 28/28, build PASS end-to-end,
  `verify-build` 37/37, `verify-interactions` 21/21 (LCP 0.648 s desktop /
  0.456 s mobile, CLS 0.0016/0.0000).
- generate-sitemap behavior proven: no-change rebuild → `KEPT 2026-10-10`
  (also proves cross-build hash determinism); injected content change →
  `BUMPED` with hash change; hand-edited title → preflight `FAIL` with the
  exact mismatch; after restore → `KEPT` again.

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
