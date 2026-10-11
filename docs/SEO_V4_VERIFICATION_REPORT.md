# SEO v4 — Final Technical Fixes & Verification Report

**Project:** sravanpolu.com (React 18 + CRA/craco + TypeScript + Tailwind + Puppeteer prerendering)
**Audit date:** 2026-10-11 (all timestamps UTC+8 local; sitemap/JSON-LD dates stamped in UTC)
**Scope:** the seven findings of the v4 audit brief — React prerendering/startup behavior, fresh mobile+desktop performance audits, CI build verification, metadata maintenance, sitemap date generation, obsolete metadata removal, and this report.
**Method:** every issue was reproduced or measured *before* any change; fixes were applied only to verified problems; every number below comes from a command that was actually executed in this pass. Nothing is copied from the v2/v3 reports — historical numbers are labeled as such.

---

## 0. Executive summary

| Area | v3 (measured this pass) | v4 (measured this pass) | Status |
|---|---|---|---|
| Mobile Performance (Lighthouse 13.5, simulated) | 69 | **89 / 90 / 93** (3 runs) | ✅ +20–24 |
| Desktop Performance (same harness) | 98 | **99 / 100** (2 runs) | ✅ |
| Mobile LCP | 3.9 s | **2.7–3.1 s** | ✅ |
| Mobile TBT | 770 ms | **200–240 ms** | ✅ −70% |
| Mobile FCP | 0.9 s | **0.9 s** | ✅ (unchanged) |
| CLS (load) | 0 | **0** | ✅ |
| CLS (teleport to `#contact` during load — worst case) | n/a (v3 mounted everything at boot) | **0.025 mobile / 0 desktop / 0 tablet** | ✅ new safety property |
| Accessibility / Best Practices / SEO | 100 / 100 / 100 | **100 / 100 / 100** (every run) | ✅ |
| Initial JS (gz, incl. Hero section) | 122 KB (Hero in separate chunk) | **109 KB** | ✅ |
| Boot-time network payload | ~780 KB | **~312 KB** | ✅ −60% |
| Visible startup flash (prerender → skeleton → content) | present | **eliminated** | ✅ |
| `pnpm verify` in CI | not wired | **wired, fails CI on any critical check** | ✅ |

All 33 build checks and 21 interaction checks pass; 28/28 unit tests pass; `tsc --noEmit` clean; the full build is reproducible with stable sitemap dating (`KEPT` across identical rebuilds — verified 3×).

---

## 1. Initial v3 findings (verified before fixing)

| # | Finding | How verified |
|---|---|---|
| V4-1 | `src/index.tsx` used `createRoot()` against a Puppeteer-prerendered `build/index.html`. React's first commit wiped the prerendered DOM and repainted Suspense skeletons for every section while chunks streamed in — a visible content→skeleton→content flash, and a wasted re-render of the entire page. Measured: final LCP candidate was the *re-rendered* hero (688 ms unthrottled), pushing simulated mobile LCP to 3.9–7.2 s. | Puppeteer PerformanceObserver diagnostics (LCP candidate log, long-task log) + Lighthouse dependency analysis |
| V4-2 | Existing Lighthouse reports in `docs/internal/lighthouse/` were v2-era (mobile perf 56 class). No v3/v4 measurements existed against the actual current build. | `ls docs/internal/lighthouse/` + JSON inspection |
| V4-3 | `scripts/verify-build.ts` existed but was not referenced by any `package.json` script or CI step — it ran only if invoked manually. | `package.json` scripts + `.github/workflows/ci.yml` inspection |
| V4-4 | Metadata was centralized in `src/constants/site.ts` with a preflight, but several values (`og:type`, `og:site_name`, `og:locale`, `twitter:card`) were not covered, and there was **no duplicate-tag guard**. | Code review of `generate-sitemap.ts` preflight |
| V4-5 | Sitemap `lastmod` derived from a single homepage content hash — correct for a single-page site, but unverified against repeated-build stability in the v3 hand-off. | 3× identical rebuild test (performed below) |
| V4-6 | `public/index.html` still carried `meta name="keywords"` (obsolete; `revisit-after`/`distribution`/`rating`/`googlebot` had already been removed in the v2 pass). | Source inspection |
| V4-7 | No v4 verification report existed. | — |

Additional problems **discovered during this pass** (diagnosed before fixing):

| # | Finding | Evidence |
|---|---|---|
| V4-8 | The Google Fonts CSS shipped as `media="print"` (non-blocking), placing `@font-face` discovery + the font file behind a **lowest-priority** request that lands after the main bundle on slow links. A/B experiment (fonts stripped from an otherwise identical build): mobile LCP 3.4 s → 2.5 s, TBT 230 ms → 170 ms, score 88 → 95. | Lighthouse A/B on the same build with/without font links |
| V4-9 | The eager import chain `Nav → constants/index.ts → react-icons/si` pulled the shared `react-icons/si` barrel (~35 KB minified, every Simple Icons brand used anywhere in the app) into `main.js` for a single `SiFiverr` icon. | Source-map attribution of output bytes per package |
| V4-10 | React.lazy code-splitting did not defer work: all 13 section chunks and ~35 section images were fetched/parsed/rendered during initial load ("lazy" only split the files). | Lighthouse network log: all chunk + image requests at 240–500 ms unthrottled |
| V4-11 | First attempt at fixing fonts by preloading the Google CSS URL **regressed** FCP to 4.8 s (the preloaded print-stylesheet confused render-blocking accounting, and the font was double-fetched because the preload did not match the CSS-initiated request). Reverted in favor of self-hosting. | Lighthouse A/B (documented so it is not retried) |

---

## 2. Root causes and exact implementation changes

### Task 1 — Prerendering/startup (V4-1)

**Root cause.** `createRoot` replaces the container's children at the first commit. With every section behind `React.lazy` + Suspense, that first commit painted 9 skeleton fallbacks where the prerendered page had final content, then sections streamed back in. Full `hydrateRoot` was evaluated and **rejected with evidence**: the prerender is captured at a 1280 px viewport, while `Nav` (`min-width:1060px`), `Resume` (`min-width:768px`) and `Link` render *structurally different component trees* per breakpoint (`useMediaQuery`). Hydrating a mobile client against desktop-structure markup guarantees structural mismatch → React 18 client-render fallback + console errors — worse than the status quo on exactly the devices that need the win.

**Changes.**
1. `src/index.tsx` — kept `createRoot` (documented rationale). Before mounting, React records each prerendered section's rendered height at the *live* viewport into `window.__prerenderSectionHeights` (see Task 2/CLS).
2. `src/components/LazySection.tsx` —
   - **Hero is now bundled eagerly** (`import Hero from '../sections/Hero'`): it is the above-the-fold LCP section, so a separate chunk adds a serial round-trip to the LCP chain; with it in `main.js`, the first React commit paints the real Nav + Hero — the prerendered content is never visibly replaced by anything.
   - **All other sections mount on an IntersectionObserver gate** (`react-intersection-observer`'s `useInView`, `rootMargin: 800px`, `triggerOnce`) — below-fold chunks, rendering work and images now load on approach.
   - **Layout-stability pin:** while a gated section shows a skeleton (both before it enters the margin *and* while its chunk loads), its wrapper is pinned to the prerendered height (`height: Npx; overflow: hidden`) — dropped via a `SectionMountedProbe` effect the moment real content mounts. Skeletons are frequently *taller* than real sections (the footer skeleton is `min-h-screen`), so `min-height` alone was insufficient (measured CLS 1.0 → fixed to 0). Sections whose React tree is structurally different below a breakpoint skip the pin (`PIN_GUARDS`: Resume @768px — its desktop iframe layout vs mobile layout differ by ~400 px).
3. `scripts/prerender.ts` — adaptive scroll pass (600 px steps, repeated while lazy sections grow the page), then waits for zero `[aria-busy="true"]` placeholders before capture; the prerendered HTML still contains every section (verified: all 9 sections, `DebiasDaily`/`SKR E-Commerce` present, single `<h1>`).

**Verified outcome.** Startup diagnostics at 390×844: prerendered hero paints at 256 ms, React's hero at 456 ms as the *only* LCP candidate (no double-paint), 2 long tasks totalling 200 ms (was 3 / 276 ms). No skeleton is ever visible above the fold; no content duplication; zero console/page errors; all interactions pass (below).

### Task 2 — Fresh performance audits + real mobile improvements (V4-2, V4-8, V4-9, V4-10)

**Measurement setup (identical for every number in this report).** Lighthouse 13.5 CLI, `--throttling-method=simulate` (Lantern, slow-4G + 4× CPU), all categories, against the local static server with **gzip compression, Netlify-style cache headers and SPA fallback** — matching production delivery. *(The first baseline runs used an uncompressed server; those numbers — mobile 56/desktop 95 — are retained in the report history but are not comparable. All before/after pairs below were measured with the gzip server.)* Mobile = default emulation (Moto G Power), desktop = `--preset=desktop`. Runs repeated to expose variance.

**Root causes addressed** (each verified by measurement before the fix):
- **V4-8 fonts** — self-hosted the exact Inter v20 + JetBrains Mono v24 latin variable files (OFL-licensed; byte-identical rendering) with an inline `@font-face` (`font-display: swap` semantics preserved) and a same-origin preload for the LCP-critical Inter. Removed the two `fonts.googleapis`/`fonts.gstatic` connections. Immutable caching added to `public/_headers`, `netlify.toml`, `vercel.json` (versioned filenames).
- **V4-9 react-icons** — replaced the two *eagerly-imported* icons (`FiDownload` in Nav, `SiFiverr` in constants) with byte-identical inline SVG components (`src/components/icons/FiverrIcon.tsx`; inline in Nav/Hero for FiDownload/FiArrowRight). Icons used by lazy sections stay in their chunks; nothing visual changed.
- **V4-10 boot work** — the IO-gating from Task 1 (boot now fetches/renders only hero + nav; 11 remaining chunks stream on scroll).

**Rejected experiments** (measured, documented, reverted): Google-CSS preload (V4-11 above); `LazyMotion`/`m` refactor (would change animation timing — UX risk out of proportion); hero-image re-encode (640×960 webp at 35 KB is already optimal for its 320 px display size).

### Task 3 — CI build verification (V4-3)

`package.json` gains `verify` / `verify:build` / `verify:interactions`; `.github/workflows/ci.yml` runs `pnpm verify` **after** `pnpm build` (so it validates the final prerendered output) with the same `PUPPETEER_EXECUTABLE_PATH` the build uses; any failed check exits non-zero and fails CI. No duplicate build steps were added; Node 20 + pnpm 10.14.0 pins are unchanged. Verification includes structural checks (JSON-LD graph parsed and node-verified, sitemap XML matched against canonical, lockstep date comparison across sitemap/JSON-LD/state file) — not just string matching.

### Task 4 — Metadata maintenance (V4-4)

The v3 "static files + preflight enforcement" architecture was kept (it already satisfies "one authoritative configuration" for a static site). Extended `src/constants/site.ts` with `OG_TYPE`, `OG_SITE_NAME`, `OG_LOCALE`, `TWITTER_CARD` and extended the `generate-sitemap.ts` preflight to verify their values plus a **duplicate-tag guard** (exactly one `<title>`, one canonical link, and one of each critical OG/Twitter tag — verified working by injecting a duplicate description + a keywords tag and watching the build fail with precise messages, then restoring). Obsolete-tag guard prevents regressions (below).

### Task 5 — Sitemap date generation (V4-5)

Reviewed the v3 implementation (content-hash with bundle-hash normalization + `.metadata-state.json`) — kept as-is; it already implements genuine-change dating for the single-page site. **Stability verified in this pass:** three consecutive prerender+sitemap runs of an unchanged tree each reported `date KEPT 2026-10-10` (no false bumps from build timestamps or nondeterministic HTML); a genuine change (font/keywords changes) correctly reported `BUMPED`. Single-page infrastructure retained (no multi-page scaffolding), `lastmod` ≤ UTC today enforced by `verify-build.ts`, sitemap `<loc>` == canonical verified.

### Task 6 — Obsolete metadata (V4-6)

Removed `meta name="keywords"` from `public/index.html` (the other four obsolete tags had already been removed in v2; `revisit-after`/`distribution`/`rating`/`googlebot` confirmed absent from all shipped HTML). Kept: title, description, viewport, canonical, robots, author, geo tags, full OG/Twitter sets, JSON-LD `@graph` (Person + WebSite + ProfilePage). The preflight now *fails the build* if any obsolete tag reappears.

### Task 7 — This report.

---

## 3. Files modified

| File | Change |
|---|---|
| `src/index.tsx` | Documented startup strategy; prerendered section-height capture before mount |
| `src/components/LazySection.tsx` | Eager Hero import; IO-gated sections; height pin + `SectionMountedProbe`; `PIN_GUARDS` |
| `src/components/icons/FiverrIcon.tsx` | **new** — inline SiFiverr replacement |
| `src/components/Nav.tsx` | Inline FiDownload SVG (replaces react-icons import) |
| `src/sections/Hero.tsx` | Inline FiArrowRight SVG (replaces react-icons import) |
| `src/constants/index.ts` | Imports FiverrIcon instead of react-icons/si |
| `src/constants/site.ts` | + `OG_TYPE`, `OG_SITE_NAME`, `OG_LOCALE`, `TWITTER_CARD` |
| `public/index.html` | Self-hosted `@font-face` + Inter preload (replaces Google Fonts links); keywords removed |
| `public/fonts/*.woff2` | **new** — Inter v20 + JetBrains Mono v24 latin variable fonts |
| `public/_headers`, `netlify.toml`, `vercel.json` | `/fonts/*` immutable caching |
| `scripts/prerender.ts` | Adaptive scroll pass; wait-for-mount before capture; font-link restoration made informational |
| `scripts/verify-build.ts` | Self-hosted-font checks; lazy-mount-aware resume-iframe check |
| `scripts/verify-interactions.ts` | Scroll-walk before DOM assertions (lazy-mount aware) |
| `scripts/generate-sitemap.ts` | Duplicate-tag guard; og:type/site_name/locale + twitter:card checks; obsolete-tag guard |
| `package.json` | `verify`, `verify:build`, `verify:interactions` scripts |
| `.github/workflows/ci.yml` | "Verify production build" step after build |
| `CHANGELOG.md` | Pass F (v4) entry |
| `docs/SEO_V4_VERIFICATION_REPORT.md` | **new** — this report |
| `docs/internal/lighthouse/v4/*` | **new** — baseline + final Lighthouse evidence (JSON + HTML), screenshots |

No component design, layout, copy, projects, resume data, links or navigation were modified. All icon replacements are byte-identical path data; all fonts are the same upstream files.

---

## 4. Actual tests executed (this pass)

| Test | Command | Result |
|---|---|---|
| Typecheck | `tsc --noEmit` | ✅ clean |
| Unit tests | `craco test --watchAll=false` | ✅ 28/28 (6 suites) |
| Production build | `pnpm build` (resume PDF → CRA → prerender → sitemap) | ✅ repeatable; `KEPT` dating on identical trees (×3) |
| Preflight failure path | injected duplicate description + keywords tag | ✅ build failed with exact drift messages; restored |
| Build verification | `pnpm verify:build` | ✅ 33/33 checks (raw-HTML crawler view, 1×`<h1>`, JSON-LD graph, sitemap/robots/manifest lockstep, 9 sections, 0 broken images, resume assets, CWV lab desktop LCP 0.55 s/CLS 0.03, mobile LCP 0.26 s/CLS 0, fonts loaded, 0 console errors) |
| Interaction verification | `pnpm verify:interactions` | ✅ 21/21 (React mount, no duplicate DOM after mount, prerendered == mounted h1, nav clicks scroll, hero CTA scrolls, mobile menu open/Escape/navigate, resume PDF serves, mailto affordance, 0 console/page errors, 2 long tasks during session) |
| Startup diagnostics | custom Puppeteer LCP/long-task logger, 390×844 + 1280×800 | ✅ single LCP candidate (no prerender-wipe double paint); hero paints in first React commit |
| Teleport CLS probes | jump to `#contact` during load at 390/768/1280 px | ✅ CLS 0.025 / 0 / 0 |
| Lighthouse mobile ×3 | Lighthouse 13.5, simulated throttling, gzip server | ✅ perf 93 / 90 / 89; a11y 100; BP 100; SEO 100 |
| Lighthouse desktop ×2 | same | ✅ perf 99 / 100; a11y 100; BP 100; SEO 100 |
| Lighthouse baseline (v3 build, same harness) ×2 | rebuilt v3 source, gzip server | mobile 69 (LCP 3.9 s, TBT 770 ms), desktop 98 — the honest before/after |
| A/B font experiments | with/without font links; preload variant | 88 → 95 (no fonts) confirmed the font chain as the LCP gate; preload variant rejected (FCP 4.8 s regression, double font fetch) |
| Visual review | full-page + fold screenshots at 3 viewports, VLM review | ✅ mobile/desktop OK; tablet notes are pre-existing responsive text wrap, not regressions |
| Security | secrets scan (`.env`, key/token patterns), `process.env` audit, `pnpm audit` | ✅ no secrets; env usage is Chrome paths + `NODE_ENV` only; **0 advisories in runtime dependency chain** (75 advisories are CRA dev-toolchain only — never shipped; CRA migration remains a documented roadmap item) |

**Passed:** everything above. **Failed:** none at delivery. (Two intermediate failures — `resume-iframe` and `desktop-contact-affordance` — were verification scripts asserting on not-yet-mounted lazy sections; fixed by making the scripts scroll first, mirroring a real visitor. One intermediate real defect — teleport CLS 1.0 from skeleton heights — was found by the CWV check and fixed with the height pin.)

---

## 5. Lighthouse measurements (Lighthouse 13.5, simulated throttling, gzip serving)

### Mobile (Moto G Power emulation) — 3 runs, final v4 build

| Run | Perf | FCP | LCP | TBT | CLS | SI | A11y | BP | SEO |
|---|---|---|---|---|---|---|---|---|---|
| 1 | **93** | 0.9 s | 2.7 s | 200 ms | 0 | 1.2 s | 100 | 100 | 100 |
| 2 | **90** | 0.9 s | 3.1 s | 220 ms | 0 | 1.3 s | 100 | 100 | 100 |
| 3 | **89** | 0.9 s | 3.1 s | 240 ms | 0 | 1.2 s | 100 | 100 | 100 |

### Desktop — 2 runs, final v4 build

| Run | Perf | FCP | LCP | TBT | CLS | SI | A11y | BP | SEO |
|---|---|---|---|---|---|---|---|---|---|
| 1 | **99** | 0.3 s | 0.8 s | 40 ms | 0 | 0.5 s | 100 | 100 | 100 |
| 2 | **100** | 0.3 s | 0.8 s | 30 ms | 0 | 0.5 s | 100 | 100 | 100 |

### Before / after (same harness, v3 rebuild vs v4 final)

| Metric | v3 | v4 | Δ |
|---|---|---|---|
| Mobile Performance | 69 | 89–93 | **+20–24** |
| Mobile LCP | 3.9 s | 2.7–3.1 s | −0.8–1.2 s |
| Mobile TBT | 770 ms | 200–240 ms | **−520–570 ms** |
| Mobile FCP / CLS / SI | 0.9 s / 0 / 1.6 s | 0.9 s / 0 / 1.2–1.3 s | FCP =, SI −0.3 s |
| Desktop Performance | 98 | 99–100 | +1–2 |
| Desktop LCP / TBT | 1.0 s / 100 ms | 0.8 s / 30–40 ms | −0.2 s / −60–70 ms |
| Initial JS transferred (gz) | 122 KB (+ Hero chunk) | 109 KB (Hero included) | −13 KB + one less request |
| Boot network payload | ~780 KB | ~312 KB | **−60%** |

**INP:** no real-user (CrUX) data exists yet — the site must be deployed and collect ~28 days of field data. Lab proxies measured this pass: 2 long tasks (>50 ms) during a full desktop interaction session, TBT 200–240 ms mobile simulated. The in-app `useWebVitals` hook (v2 API) remains dev-diagnostics only; upgrading it to the v3 API for INP is still an optional roadmap item (unchanged from v3).

**Against the brief's targets:** Desktop 90+ ✅ (99–100). Accessibility 95+ ✅ (100). Best Practices 95+ ✅ (100). SEO 100 ✅. Mobile 90+ ✅ *partially*: 2 of 3 runs ≥ 90, median 90 — achieved "where realistically achievable" without removing features; the remaining gap is dominated by the ~109 KB gz React+framer-motion runtime executing on a simulated 4×-slowed CPU (see limitations).

---

## 6. Remaining limitations (honest list)

1. **Simulated mobile is CPU-bound.** Mobile perf 89–93 is gated by LCP (2.7–3.1 s) + TBT (200–240 ms), both dominated by evaluating `main.js` (react-dom 127 KB + framer-motion 118 KB raw are ~73% of it). Removing framer-motion or LazyMotion-izing ~40 components was rejected as UX-risky over-engineering for a portfolio. Real devices are typically faster than the simulated 4× slowdown.
2. **Field data pending.** CrUX / Search Console CWV (real LCP/INP/CLS) needs ~28 days of post-deploy traffic. No field claims are made.
3. **Prerender is single-viewport.** The prerendered HTML is captured at 1280 px; on narrow screens the pre-JS snapshot shows the desktop-shaped nav/resume layouts for the first moments until React mounts the mobile variants (same as v3; inherent to single-file static prerendering without edge device negotiation).
4. **Resume section CLS on small screens.** Because its React tree differs across 768 px, its height pin is disabled below that width; a worst-case instant jump to `#contact` during initial load measures CLS 0.025 on mobile (still "good", < 0.1).
5. **CRA maintenance mode** (unchanged from v3): react-scripts 5.0.1 builds fine; `pnpm audit` flags only dev-toolchain advisories (0 in the shipped runtime chain); Vite/Next migration remains a roadmap item.
6. **`act()` warnings in test output** (React 18.3 + RTL 13; cosmetic) — unchanged, roadmap item.
7. **CI not executed on a real GitHub runner** — the workflow is corrected and `pnpm verify` runs green locally with the same Chrome path convention CI uses; confirm on first push (as with any workflow change).
8. **Live site still serves the pre-audit build** until the owner redeploys (deployment checklist below).

---

## 7. Production deployment checklist

- [ ] 1. `git add -A && git commit -m "SEO pass F (v4): startup, self-hosted fonts, lazy sections, CI verify, mobile 90+" && git push` — Netlify builds; **watch the first GitHub Actions run** (it now includes the new Verify step).
- [ ] 2. Drag-and-drop alternative: deploy the `build/` folder from the v4 ZIP (`_headers` ships inside, so security headers + immutable `/static/` + `/fonts/` caching apply either way).
- [ ] 3. Verify `/` page source: contains `@font-face` + `/fonts/inter-v20-latin-var.woff2` preload; **no** `fonts.googleapis.com`; `"dateModified": "2026-10-10"`; one `<h1>`.
- [ ] 4. Verify `/sitemap.xml` → `lastmod` 2026-10-10 (or the UTC day of a genuine content change); `/robots.txt` → `Sitemap: https://sravanpolu.com/sitemap.xml`.
- [ ] 5. Verify response headers on `/`: `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`, `Strict-Transport-Security`, `CSP: frame-ancestors 'self'`; `/fonts/inter-v20-latin-var.woff2` → 200 with `Cache-Control: public, max-age=31536000, immutable`.
- [ ] 6. Verify `/og-image.jpg` → 200; `/resume-preview.html` → 200 (noindex); `/Resume.pdf` → 200; unknown path → styled 404.
- [ ] 7. Rich Results Test on `https://sravanpolu.com/` → Person detected from the `@graph`; schema.org validator passes.
- [ ] 8. Search Console (see next section) + request indexing.
- [ ] 9. PageSpeed Insights on the deployed URL to confirm the lab numbers from a production edge (expect the same or better — production brotli beats the local gzip harness).
- [ ] 10. After ~28 days: Search Console → Experience → Core Web Vitals for field LCP/INP/CLS.

## 8. Google Search Console verification instructions

Unchanged from `docs/SEARCH_CONSOLE_GUIDE.md`; condensed:

1. **Add property** — URL prefix `https://sravanpolu.com/` (non-www, trailing slash — matches canonical/sitemap). Verify via HTML tag or DNS TXT.
2. **Submit sitemap** — `sitemap.xml` → expect "Success, 1 discovered URL" within minutes–24 h.
3. **Request indexing** — URL inspection → Request indexing for `https://sravanpolu.com/`.
4. **Validate structured data** — Rich Results Test (expect Person) + validator.schema.org.
5. **Expectations** — "Discovered — currently not indexed" for a few days is normal. No ranking claims are made; what is guaranteed is the absence of the technical blockers listed in §4.

---

## 9. Verification status legend

- **Verified in source** — code inspected this pass (all files in §3).
- **Verified in local production build** — executed against `build/` (everything in §4).
- **Verified on live deployment** — **not possible from this environment** (no deploy credentials); §7 items 3–7 cover it.
- **Requires manual verification** — first CI run on GitHub; live-site checks in §7; field CWV after 28 days.
- **Not tested** — Google indexing/rankings (by design, no claims); CrUX/INP field data (needs traffic).

Historical v2/v3 reports are preserved unchanged in `docs/SEO_FINAL_AUDIT.md`, `AUDIT_REPORT.md` and `docs/internal/lighthouse/` (v2-era files left in place, clearly named; v4 evidence lives in `docs/internal/lighthouse/v4/`).
