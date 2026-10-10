# SEO Final Audit — sravanpolu.com (v2)

**Date:** 2026-10-10 (UTC) · **Scope:** SEO metadata, prerendering, build/CI configuration, technical SEO, Core Web Vitals, regression testing · **Source:** `sravanpolu-portfolio-seo-optimized-source.zip` (Pass C output), audited and fixed in place — nothing rebuilt from scratch.

**Method:** every existing implementation was verified *before* any change; fixes were applied only to verified issues. All results below are real measurements from this pass, run on the final build. Nothing is claimed that was not executed.

---

## 1. Issues discovered

| # | Issue | Severity | Discovered by |
|---|-------|----------|---------------|
| V2-1 | `public/sitemap.xml` `lastmod` = `2026-10-11` — **one day in the future** (actual UTC date of the audit: 2026-10-10). Inaccurate lastmod can erode crawler trust in the signal. | Medium | Manual inspection |
| V2-2 | `ProfilePage.dateModified` in the JSON-LD `@graph` = `2026-10-11` — same future-dating problem; structured-data dates should reflect real content modification. | Medium | Manual inspection |
| V2-3 | Obsolete / duplicate meta tags: `googlebot` (byte-identical duplicate of `robots`), `revisit-after`, `rating`, `distribution` — ignored by modern engines, add noise. | Low | Manual inspection |
| V2-4 | **Production build failure** — `pnpm build` failed at `build:resume` with `Could not find Chrome (ver. 148.0.7778.97)`: `scripts/prerender.ts` and `scripts/generate-resume-pdf.ts` probe only three hard-coded Linux Chrome paths, none of which existed in this environment (`/usr/local/bin/chromium` did). `scripts/verify-build.ts` *did* probe that path, which is why verification previously passed while a fresh build failed. | **High** | Reproduced: build exited 1 |
| V2-5 | CI workflow broken by step order: `actions/setup-node` with `cache: pnpm` runs **before** pnpm is installed (step 4). The caching helper invokes `pnpm store path`, which fails when pnpm is not on PATH. Additionally `corepack prepare pnpm@latest` contradicted the `packageManager` pin (`pnpm@10.14.0`). | **High** | Static analysis (documented setup-node behavior); not executable here — see §6 |
| V2-6 | No `engines` field in `package.json` — supported Node range undocumented (CI pins 20; local verified on 24). | Low | Manual inspection |
| V2-7 | Lighthouse accessibility 96 — `aria-prohibited-attr` (aria-label on a role-less `div`: testimonial star ratings) and `label-content-name-mismatch` (nav logo and Fiverr link accessible names do not contain their visible text). | Medium | Lighthouse 13.5, mobile, final build |
| V2-8 | TBT is hardware-sensitive on the shared audit sandbox — v1 vs v2 mobile simulated scores moved within a noise band (54 → 52–56) with zero runtime-code changes; documented so score deltas are not misread as regressions/improvements. | Info | Comparative runs |

**Verified as already correct (no changes made):** title / meta description / canonical (trailing-slash, matches sitemap `loc`, `og:url`, JSON-LD `url`) / robots directives; OG + Twitter card completeness incl. `og:image` 1200×630 (actual JPEG verified 1200×630); JSON-LD `@graph` structure and `@id` resolution; single `<h1>`; heading hierarchy; 35/35 images with alt + width/height; lazy-loading + hero `fetchpriority="high"`; non-blocking fonts (`media="print"` + `onload` + `<noscript>` fallback); `robots.txt` with `Sitemap:` directive; `noindex` on `resume-preview.html` and `404.html`; `_headers` / `netlify.toml` / `vercel.json` consistency; per-section code splitting; skip-link and 44px+ touch targets; internal anchor links all resolve to existing section ids (9/9).

---

## 2. Root causes

- **V2-1/V2-2 (future dates):** the previous pass stamped `2026-10-11` — correct only in UTC+8 — while sitemap/JSON-LD dates are consumed globally and compared against UTC crawler clock. Root cause: timezone assumption during manual dating. Fix policy: stamp the actual UTC content-modification date (`2026-10-10`).
- **V2-4 (build failure):** environment-dependent Chrome discovery. The scripts hardcoded three Linux paths common on typical dev machines; this environment (and many CI/docker images) keeps Chromium at `/usr/local/bin/chromium`. When the path list misses, the fallback is puppeteer's cache — which held a *different* build (155) than the pinned puppeteer expects (148), so the launch aborted. Root cause: incomplete path list + cache/version skew.
- **V2-5 (CI order):** `cache: pnpm` requires the package manager binary before `setup-node` runs; the workflow was written with the install step after. `pnpm@latest` activation was copy-paste boilerplate contradicting the repo's own `packageManager` pin.
- **V2-7 (a11y):** aria-labels were written for screen-reader clarity but two did not follow the two rules involved: (a) aria-label is only valid on elements with an allowed role — plain `div`s need `role="img"` etc.; (b) the accessible name must *contain* the visible label text (WCAG 2.5.3 Label in Name).

---

## 3. Files modified

| File | Change |
|------|--------|
| `public/sitemap.xml` | `lastmod` 2026-10-11 → **2026-10-10** |
| `public/index.html` | `dateModified` → 2026-10-10; removed 4 obsolete/duplicate meta tags (`googlebot`, `revisit-after`, `rating`, `distribution`) |
| `scripts/prerender.ts` | Linux Chrome path list: added `/usr/local/bin/chromium`, `/usr/bin/google-chrome-stable` |
| `scripts/generate-resume-pdf.ts` | same path-list fix |
| `.github/workflows/ci.yml` | corepack step moved **before** `setup-node`; `corepack prepare pnpm@10.14.0 --activate` (was `pnpm@latest`); explanatory comments |
| `package.json` | added `"engines": { "node": ">=20" }` |
| `src/components/Nav.tsx` | logo aria-label now contains visible text: `"Sravan Polu Developer - go to home"` |
| `src/components/Testimonials.tsx` | `role="img"` on star-rating container; Fiverr link aria-label starts with its visible text |
| `scripts/verify-interactions.ts` | **new** — 21-check post-mount interaction/regression suite |
| `CHANGELOG.md` | Pass D entry |
| `docs/SEO_FINAL_AUDIT.md` | this report |
| `docs/internal/lighthouse/v2-*.report.{json,html}` | new evidence: before-a11y-fix mobile run + 3 final runs |

No visual design, layout, content, copy, projects, resume data, links or navigation were modified.

---

## 4. Changes implemented

1. **Metadata truthing (V2-1..3):** sitemap `lastmod` and JSON-LD `dateModified` now carry the actual UTC modification date of this release (`2026-10-10`). Four dead meta tags removed; `robots`, `geo.region`, `geo.placename`, `keywords`, `author` retained (still parsed by at least some engines, harmless).
2. **Portable build tooling (V2-4):** both Puppeteer-using scripts now probe, in order: env override (`PUPPETEER_EXECUTABLE_PATH` / `CHROME_PATH`) → `/usr/local/bin/chromium` → `/usr/bin/google-chrome` → `/usr/bin/google-chrome-stable` → `/usr/bin/chromium-browser` → `/usr/bin/chromium` → puppeteer's bundled browser. Verified: the previously failing `pnpm build` now completes (resume PDF → CRA build → prerender, 179.5 KB crawlable HTML).
3. **CI correctness (V2-5/6):** pnpm installed via corepack before `setup-node` so `cache: pnpm` works; the activated pnpm version now equals the `packageManager` pin (10.14.0); `engines.node >= 20` documented. CI still runs typecheck → lint → tests (`--watchAll=false`) → full production build (resume + CRA + prerender) — no new dependencies introduced anywhere.
4. **Accessibility to 100 (V2-7):** three attribute-level fixes (§3); re-measured Lighthouse accessibility **96 → 100**.
5. **Regression tooling:** `scripts/verify-interactions.ts` committed — proves React mounts over the prerendered DOM without conflicts and that all interactive features work post-mount (details in §6).

---

## 5. Before-and-after comparison

| Check | Before (v1 source) | After (v2) | Notes |
|-------|--------------------|------------|-------|
| Sitemap `lastmod` | 2026-10-11 (future) | **2026-10-10** | actual UTC content date |
| JSON-LD `dateModified` | 2026-10-11 (future) | **2026-10-10** | actual UTC content date |
| Obsolete/duplicate meta tags | 4 | **0** | googlebot, revisit-after, rating, distribution |
| `pnpm build` in a Chromium-at-/usr/local env | **FAILS** (`Could not find Chrome 148…`) | **PASSES** (179.5 KB prerendered HTML) | reproduced before, green after |
| CI pnpm caching step | fails at setup-node (pnpm absent) | pnpm present before setup-node | static analysis — needs GitHub run to confirm (§6) |
| pnpm version consistency | CI `@latest` vs pin 10.14.0 | **both 10.14.0** | `packageManager` + corepack prepare aligned |
| Node engines documented | absent | `>=20` | CI=20, local=24 verified |
| Lighthouse Accessibility (mobile) | 96 | **100** | both failing audits fixed |
| Lighthouse SEO / Best Practices | 100 / 100 | **100 / 100** | unchanged (verified, not regressed) |
| Lighthouse Performance — desktop, simulated | 94 | **93** | run-to-run variance, no runtime code change |
| Lighthouse Performance — mobile, applied throttling | 82 | **81** | run-to-run variance (LCP 2.7 s → 2.6 s, TBT 370 → 430 ms on shared CPU) |
| Lighthouse Performance — mobile, simulated | 54 | **52–56** across 3 runs | shared-sandbox TBT noise band; bundle unchanged |
| Lab CWV (unthrottled, verify-build) | LCP 564 ms d / 420 ms m | **LCP 712 ms d / 444 ms m**, CLS 0.0016 / 0.0000 | same "Good" band; sandbox load variance |
| Duplicate-DOM / hydration safety | not directly tested | **21 automated post-mount checks PASS** | mount detection + h1 stability + interactions |
| External links | 25/25 (v1) | **28/30 × 200** | LinkedIn 999 + Fiverr 403 = datacenter bot-blocks, not breakage |

---

## 6. Actual test results

Status legend: **PASS** (executed, green) · **FAIL** (executed, red) · **NOT RUN** (not executable here) · **MANUAL** (requires owner/environment we cannot access).

| Check | Status | Evidence |
|-------|--------|----------|
| Dependency install (`pnpm install --frozen-lockfile`) | **PASS** | completes in 3.4 s with pnpm 10.14.0 (corepack honors `packageManager`); lockfile in sync |
| Type checking (`tsc --noEmit`) | **PASS** | 0 errors (run twice: baseline and after all edits) |
| Linting (`eslint src …`) | **PASS** | 0 errors, 0 warnings (run twice) |
| Automated tests (`CI=true pnpm test --watchAll=false`) | **PASS** | 6 suites, **28/28 tests**; pre-existing cosmetic `act()` warnings in output (React 18.3 + RTL 13 — see §7) |
| Production build (`pnpm build`) | **PASS** | failed before the Chrome-path fix (V2-4), passes after: resume PDF + preview + CRA build + prerender (179.5 KB) |
| Generated HTML inspection | **PASS** | `html_markers.py` diff vs live v1: 27 lazy + 2 eager images, `fetchpriority="high"`, `decoding="async"` ×22, `media="print"` fonts, 1 title, 1 canonical, 1 JSON-LD, `og-image.jpg`, 0 obsolete tags, `lastmod`/`dateModified` = 2026-10-10 |
| Sitemap validation | **PASS** | well-formed XML, single URL, `loc` = canonical, non-future `lastmod` |
| robots.txt validation | **PASS** | allows all, references sitemap (live site serves it identically) |
| Structured-data validation | **PASS** (syntax/structure) · **MANUAL** (Google Rich Results) | JSON-LD parses; `@graph` Person + WebSite + ProfilePage, `@id`s resolve, types/properties match Schema.org expectations. Google's Rich Results Test requires the deployed URL — run after deploy (§8) |
| Prerendered page inspection | **PASS** | `verify-build.ts`: 32/32 — crawler-view content, single `<h1>`, all 9 sections, 0 broken images, resume iframe, non-blocking fonts |
| React mount / prerender coexistence | **PASS** | `verify-interactions.ts`: 21/21 — React 18 container key detected over static snapshot; single h1/title/JSON-LD after mount; h1 text identical pre/post mount; 0 console/page errors (desktop + mobile) |
| Browser interaction & regression | **PASS** | nav clicks scroll (About → top 80 px), hero CTA → #work, mobile hamburger opens, Escape closes, menu link navigates + closes, resume PDF 200 (>10 KB), contact mailto present, skip link present, all images loaded |
| Lighthouse desktop (simulated) | **PASS** | Perf 93 · **A11y 100** · BP 100 · **SEO 100**; LCP 1.4 s, CLS 0.003, TBT 120 ms — `docs/internal/lighthouse/v2-desktop-final.report.*` |
| Lighthouse mobile (applied/devtools) | **PASS** | Perf 81 · **A11y 100** · BP 100 · **SEO 100**; LCP 2.6 s, CLS 0.059, TBT 430 ms — `v2-mobile-applied-final.report.*` |
| Lighthouse mobile (simulated, default) | **PASS** | Perf 56 · **A11y 100** · BP 100 · **SEO 100** (before-a11y-fix run: 52/96 — kept as evidence, `v2-mobile.report.*`) |
| Lab CWV (verify-build, unthrottled) | **PASS** | LCP 712 ms desktop / 444 ms mobile; CLS 0.0016 / 0.0000 — all "Good" |
| Long-task monitor (INP proxy) | **PASS** | 3 long tasks during the entire desktop interaction session |
| External links (30 URLs) | **PASS** (28) · **MANUAL** (2) | 28× HTTP 200; LinkedIn 999 / Fiverr 403 — bot-blocks against datacenter IPs (identical in v1); verify from a residential browser |
| Live-site HTTP redirects | **PASS** (verified 2026-10-10) | `https://www.sravanpolu.com` → apex 301; `http://` → `https://` 301; unknown paths → 404 page |
| GitHub Actions CI end-to-end | **NOT RUN** (needs a GitHub runner) | workflow corrected by static analysis against documented `setup-node` behavior; confirm on first push — see §7 |
| Google indexing / ranking | **NOT RUN** | cannot be measured here by design; no claims made |
| Field Core Web Vitals (CrUX) | **MANUAL** | appears in Search Console ~28 days after real traffic |

## 7. Remaining issues (honest list)

1. **Live site still runs the pre-Pass-C build** until the owner redeploys — every fix from Pass C *and* this pass (v2) takes effect only after deploy. `https://sravanpolu.com/og-image.jpg` currently 404s and `sitemap.xml` still shows `lastmod` 2026-10-09 on the live edge.
2. **CI run needs first-push confirmation** — GitHub Actions cannot execute from this audit environment. The order/pinning fixes are documented-correct; watch the first run after `git push`.
3. **`act()` warnings in test output** — cosmetic, from React 18.3 + @testing-library/react 13; all 28 tests pass. Remedy (RTL 14/16 upgrade) is a roadmap item, deliberately not bundled into an audit pass.
4. **`web-vitals` v2 in-app monitoring lacks INP** (INP arrived in v3). The hook is dev-diagnostics only; upgrading means API migration (`getCLS`→`onCLS` etc.). Lab INP proxy here: 3 long tasks per session, TBT 120 ms desktop — no evidence of an INP problem. Upgrade remains optional roadmap.
5. **CRA / react-scripts 5.0.1 is in maintenance mode** — builds fine today; Vite/Next migration stays a roadmap item (out of audit scope).
6. **Simulated mobile Performance (52–56) is dominated by shared-sandbox TBT noise** (900–1,120 ms across runs with an unchanged bundle). On real hardware expect materially better; treat applied-throttling (81) and field data as the meaningful mobile signals.
7. **Old domain `sravanpolu.me` no longer resolves (NXDOMAIN)** — any legacy backlinks are dead; reclaim + 301 only if that matters to you.

## 8. Google Search Console verification instructions

Prerequisite: **deploy first** (§9), then follow `docs/SEARCH_CONSOLE_GUIDE.md` (step-by-step). Condensed:

1. **Add property** — URL prefix, `https://sravanpolu.com/` (trailing slash, non-www — matches canonical/sitemap). Verify via HTML tag (add the `<meta name="google-site-verification">` to `public/index.html`, rebuild, redeploy) or DNS TXT.
2. **Submit sitemap** — Sitemaps → `sitemap.xml` → expect "Success, 1 discovered URL" within minutes–24 h. Post-deploy the served file must show `<lastmod>2026-10-10</lastmod>`.
3. **Request indexing** — URL inspection → `https://sravanpolu.com/` → Request indexing.
4. **Validate structured data** — <https://search.google.com/test/rich-results> → expect Person from the `@graph`; also <https://validator.schema.org> for full validation.
5. **Expectations** — indexing is not instant; "Discovered — currently not indexed" for a few days is normal. No ranking claims are made by this audit — what is guaranteed is the absence of the technical blockers listed in §6.

## 9. Deployment checklist

- [ ] 1. `git add -A && git commit -m "SEO pass D (v2): dates, CI order, prerender portability, a11y 100" && git push` — Netlify builds automatically; **watch the first GitHub Actions run** (CI was re-ordered).
- [ ] 2. Drag-and-drop alternative: deploy the `build/` folder from this ZIP (`build/_headers` ships inside, so security headers + caching apply either way).
- [ ] 3. Verify: `/` page source contains `og-image.jpg`, `media="print"` on the Google-Fonts link, `"dateModified": "2026-10-10"`.
- [ ] 4. Verify: `/sitemap.xml` → `lastmod` 2026-10-10; `/robots.txt` → contains `Sitemap: https://sravanpolu.com/sitemap.xml`.
- [ ] 5. Verify response headers on `/`: `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`, `Strict-Transport-Security`, `Content-Security-Policy: frame-ancestors 'self'`.
- [ ] 6. Verify: `/og-image.jpg` → 200; `/resume-preview.html` → 200 with `noindex`; unknown path → styled 404.
- [ ] 7. Rich Results Test on `https://sravanpolu.com/` → Person detected.
- [ ] 8. Search Console: property + sitemap + request indexing (§8).
- [ ] 9. After ~28 days: check Experience → Core Web Vitals (field LCP/INP/CLS) in Search Console.
