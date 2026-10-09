# Portfolio Competitive Gap Audit — Technical Review & Improvement Report

**Project:** sravanpolu.com (React 18 + CRA/craco + TypeScript + Tailwind)
**Audit dates:** 2026-10-09 → 2026-10-10
**Scope:** Architecture, code, dependencies, build/deploy configuration, SEO, performance, accessibility, content/conversion, live-site verification.
**Auditor roles applied:** Senior Staff Software Engineer, Solution Architect, UI Architect, SEO Expert, Performance Engineer, Senior Product Engineer + UX Researcher.

---

## 1. Executive Summary

This report covers two passes: (A) the original competitive gap audit with improvement implementation, and (B) a follow-up verification pass that re-checked every previously implemented fix against the actual codebase, repaired what was missing, and re-ran the complete verification suite.

**Verification outcome — all 11 fixes from pass A are present and working in the codebase** (mobile nav overlap fix, WebP conversion, PWA manifest, robots/sitemap, enriched JSON-LD, non-blocking fonts, reportWebVitals removal, CI frozen-lockfile, Netlify/Vercel security headers, dead-asset removal).

**Pass B found and fixed 4 residual defects:**

| # | Defect | Severity | Status |
|---|--------|----------|--------|
| 1 | `public/resume-preview.html` was missing from the source tree (desktop resume iframe would 404 for anyone deploying without a full rebuild) | **High** | Fixed — restored md5-identical copy |
| 2 | `public/Resume.pdf` had been overwritten by the build's generated copy; the uploaded original was restored (md5 `4ae7e25a…`) and text-identity between generated vs uploaded PDF was proven (2,540 chars identical) | **Medium** | Fixed |
| 3 | `README.md` had a malformed live-site link (`[hhttps://…`) and an empty "Project Structure" section | **Medium** | Fixed |
| 4 | Full `<noscript>` fallback duplicated the pre-rendered content and produced a second `<h1>` in raw HTML | **Low** | Fixed — replaced with compact notice |

**Critical caveat:** the live site at `https://sravanpolu.com/` is still running the **pre-audit build** (verified 2026-10-09: old JSON-LD, blocking font CSS, PNG images, 180 KB stale resume, `logo512.png` → 404, no security headers). All fixes in this repository take effect **only after redeploying** the new build. Deployment steps are in §11.

**Bottom line:** the codebase is now verified end-to-end (typecheck, 28/28 tests, production build + prerender, smoke tests, accessibility assertions, lab Core Web Vitals). Technically it is at or above the standard of strong modern developer portfolios; the remaining competitive gap is content depth (case studies, testimonial sourcing) and deployment freshness — not engineering.

---

## 2. Competitive Comparison

Compared against the patterns that consistently strong developer portfolios (e.g., brittanychiang.com, joshwcomeau.com, lee.robinson.com, and high-converting freelance developer sites) use:

| Dimension | Strong competitors | This portfolio | Verdict |
|---|---|---|---|
| First paint / speed | Fast, code-split, optimized media | LCP 672 ms desktop / 312 ms mobile (lab), CLS ≈ 0, single 372 KB initial JS chunk, lazy sections | **At par or better** |
| SEO for crawlers | SSG/SSR HTML, JSON-LD, OG/Twitter cards | Pre-rendered 178 KB HTML (no client-JS dependency), Person JSON-LD, OG/Twitter, canonical, sitemap + robots | **At par** |
| Accessibility | Keyboard nav, reduced-motion, contrast | Skip link, aria-labels, 44 px touch targets, focus-visible rings, `prefers-reduced-motion` honored, alt text on all images | **At par or better** |
| Recruiter readiness | Resume 1-click, clear stack, clear status of projects | Resume PDF + desktop iframe preview + one-click download, status badges (production/beta/demo) | **At par** |
| Case-study depth | Long-form "problem → decisions → results" write-ups | Short descriptions + links | **Gap — competitors ahead** |
| Freelance conversion | Services, process, testimonials with verifiable identity | Services section + testimonials, but testimonials lack attribution links | **Partial gap** |
| Content marketing | Blogs, talks, OSS | None | **Gap (optional strategy)** |

**Conclusion:** prioritizing useful differentiation, the highest-value next investments are (1) redeploying this audited build, (2) two or three honest case studies, (3) verifiable testimonial attribution. No framework rewrite is needed to be competitive.

---

## 3. Existing Strengths (kept, not rebuilt)

- **Resume pipeline as code** — `src/constants/resume-data.ts` is the single source of truth; `pnpm build` regenerates both `public/Resume.pdf` and `public/resume-preview.html` (verified text-identical output to the uploaded PDF).
- **Prerender pipeline** (`scripts/prerender.ts`) — serves the built SPA, scrolls through it, and writes fully-rendered HTML back to `build/index.html`; crawlers get full content without JS.
- **Code-split sections** — 9 sections loaded through `LazySection`; only `main.js` is initial; the rest arrive on scroll.
- **Layered resilience** — global `ErrorBoundary`, per-section `SectionErrorBoundary`, notification system, skeleton loaders.
- **Accessibility engineering** — announcement system (aria-live), focus context, keyboard navigation (Esc closes menu), haptics on mobile.
- **Honest project labeling** — `PROJECT_META` statuses (production/beta/demo) differentiate real shipped apps from demos.

---

## 4. Missing Features and Weaknesses

1. **Deployment freshness (blocker):** live site runs the pre-audit build; all fixes are invisible to visitors until redeploy.
2. **Case studies:** flagship projects (DebiasDaily, SKR E-Commerce) lack the problem/architecture/outcome narrative recruiters and clients scan for.
3. **Testimonial attribution:** quotes lack names/roles/links, weakening freelance credibility.
4. **Blog/content surface:** no writing, which limits long-tail SEO for freelance queries (e.g., "hire React developer India").
5. **Framework age:** CRA (`react-scripts` 5.0.1) is in maintenance mode — not a defect today, but a strategic risk (see §12).
6. **Cosmetic test warnings:** two `act()` warnings from React 18.3 + older `@testing-library/react` 13 (tests still pass).
7. **Legacy config:** `craco.config.js` still ignores `@mediapipe/tasks-vision` sourcemap warnings although that dependency no longer exists (harmless; left untouched per "avoid unrelated changes").

---

## 5. Findings (severity + code references)

| ID | Severity | Finding | Reference | Disposition |
|----|----------|---------|-----------|-------------|
| F-01 | High | `public/resume-preview.html` absent from source tree — desktop resume iframe (`src/sections/Resume.tsx:108`, `src="/resume-preview.html"`) relies on it; also missing from the interim project zip | `public/resume-preview.html` | **Fixed (pass B)** — restored; md5 `f4afb402…` matches the verified version |
| F-02 | High | Live site serves stale build: 180,383-byte old resume (md5 `17fa78…`), old robots.txt (67 B, no Sitemap line), old sitemap (232 B), old manifest (771 B), `/logo512.png` + `/logo512-maskable.png` → 404, blocking font CSS, old JSON-LD, PNG images | `https://sravanpolu.com/*` | **Open — requires redeploy by owner** (steps §11) |
| F-03 | Medium | `public/Resume.pdf` in the working tree had been regenerated by a build, diverging (bytewise) from the uploaded resume the user asked to serve | `public/Resume.pdf`, `src/assets/Resume.pdf` | **Fixed (pass B)** — uploaded original restored to both paths |
| F-04 | Medium | README live-site link malformed (`[hhttps://sravanpolu.com/`) and "Project Structure" heading had no content | `README.md:5`, `README.md:20` | **Fixed (pass B)** |
| F-05 | Low | Raw HTML contained two `<h1>` elements (Hero + full `<noscript>` fallback), and no-JS visitors would see duplicated content (prerendered DOM *plus* fallback) | `public/index.html` body | **Fixed (pass B)** — compact noscript notice; raw HTML now has exactly 1 h1 |
| F-06 | Low | `act()` warnings in test output (React 18.3.1 + @testing-library/react 13.4.0) | test run logs | Left as-is (cosmetic; upgrade path in §12) |
| F-07 | Info | `web-vitals` dependency is legitimately used via dynamic import in `useWebVitals` | `src/hooks/usePerformanceMonitor.ts:148` | Confirmed — no dead dependency |
| F-08 | Info | CI, Netlify, Vercel configs all verified present and correct (`--frozen-lockfile`, CSP `frame-ancestors 'self'` protecting the same-origin resume iframe) | `.github/workflows/ci.yml`, `netlify.toml`, `vercel.json` | No change needed |

---

## 6. Root Causes

- **F-01/F-03 (missing files):** the resume files are *build artifacts that live in `public/`* — a mid-session rebuild regenerated/removed working-tree copies, and the hand-off between work sessions lost track of the restored state. Root fix: this report + README now document that `pnpm build` regenerates both files and that `public/` must keep committed copies of both.
- **F-02 (stale deployment):** audit fixes were implemented and verified locally, but deployment is owner-controlled (Netlify); no credentials exist in this environment.
- **F-04/F-05:** residual editing errors from rapid iteration; both were caught by the follow-up verification pass (evidence that the "verify before/after" discipline works).

---

## 7. Before → After Measurements

| Metric | Before audit | After (verified) | Notes |
|---|---|---|---|
| Image media weight (src/assets) | 4.0 MB PNG | **752 KB WebP (−82%)** | footerLogo.png kept (WebP was larger); verified served as `.webp` |
| Total media shipped | 4.2 MB | **824 KB (−80%)** | incl. public/ assets |
| Raw-HTML `<h1>` count | 2 | **1** | noscript fallback replaced |
| Initial JS (raw) | — | **372 KB** single chunk | remaining 164 KB lazy across 13 chunks |
| Prerendered HTML size | — | **178.4 KB** full content | |
| LCP (local lab) | — | **672 ms desktop / 312 ms mobile** | "Good" < 2.5 s |
| CLS (local lab) | — | **0.0016 / 0.0** | "Good" < 0.1 |
| Mobile menu overlap | −12 px | **−1 px (flush)** | `top-full` positioning |
| Tests | 28/28 | **28/28** | no regressions |
| `tsc --noEmit` | pass | **pass** | |
| Resume PDF served | (live: stale 180 KB) | **60,237 bytes**, text-identical to uploaded PDF | live still stale until redeploy |

## 8. Changes Implemented (cumulative, both passes)

**Pass A (verified present — all 11):** mobile-nav overlap fix; `role="navigation"` removal; 22 images → WebP; unreferenced `public/skr.png` removed; manifest `id`/`start_url`/512+maskable icons; robots.txt `Sitemap:`; sitemap `lastmod`; JSON-LD enrichment + non-blocking fonts + duplicate favicon link removal; no-op `reportWebVitals()` removal; CI `--frozen-lockfile`; `netlify.toml` + `vercel.json` security headers with CSP `frame-ancestors 'self'` (chosen over `X-Frame-Options: DENY` specifically to preserve the same-origin resume iframe).

**Pass B (this session):** F-01, F-03, F-04, F-05 as detailed above, plus full re-verification and this report.

## 9. Test & Build Results (executed, not assumed)

| Check | Command | Result |
|---|---|---|
| Install | `pnpm install` | ✅ clean (23 s) |
| Typecheck | `npx tsc --noEmit` | ✅ pass |
| Unit tests | `CI=true npx craco test --watchAll=false` | ✅ 6 suites, 28/28 |
| Production build | `pnpm build` (resume → bundle → prerender) | ✅ prerendered 178.4 KB |
| Smoke test (headless) | served `build/` | ✅ 9 sections, 0 broken images, 0 console errors, iframe renders resume, `/Resume.pdf` 200, 404 handling OK, menu flush (−1 px) |
| Accessibility assertions | Playwright | ✅ 1 h1, skip link first tab stop, reduced-motion class applied |
| Resume integrity | `pdftotext` diff | ✅ generated vs uploaded: identical text |
| Lab CWV | PerformanceObserver | ✅ see §7 |
| Live endpoints | `curl` | ⚠️ see F-02 (stale build) |

## 10. Remaining Limitations & Risks

1. **Live site not yet redeployed** — biggest outstanding item; fully in the owner's control (§11).
2. **Lab metrics ≠ field data** — CWV numbers are localhost lab measurements; validate with PageSpeed Insights / CrUX after deploy.
3. **Lighthouse CLI was not run** in this environment; equivalent checks (prerendered content, image weights, JS budget, CLS/LCP) were measured with Playwright instead.
4. **INP not directly measured** (no interaction simulation); scroll listeners are `{ passive: true }` and event surface is small, so risk is low.
5. **CRA maintenance mode** — build tooling works today; migration is a strategic decision (§12), deliberately **not** executed per the "don't change frameworks" constraint.

## 11. Redeploy Steps (owner action)

```bash
git add -A && git commit -m "Audit fixes + verification report" && git push
# Netlify (repo-connected): builds run automatically (build cmd `pnpm build`, publish `build/`)
# Or manual: pnpm install && pnpm build && deploy the build/ folder
```
After deploy, verify: `/robots.txt` shows `Sitemap:` line; `/logo512-maskable.png` → 200; `/Resume.pdf` → 60,237 bytes (md5 `4ae7e25a…` or regenerated text-identical); response headers include `Content-Security-Policy: frame-ancestors 'self'` and immutable caching on `/static/*`.

## 12. Prioritized Roadmap

| Priority | Item | Why |
|---|---|---|
| P1 | Redeploy + live verification (§11) | Unlocks every shipped fix |
| P2 | Case studies for DebiasDaily + SKR E-Commerce (problem, contribution, architecture, verified outcomes) | Highest recruiter/client ROI; evidence-backed only |
| P3 | Testimonial attribution (name, role, LinkedIn link, engagement context) | Freelance conversion |
| P4 | Upgrade `@testing-library/react` (clears act() warnings); consider Playwright e2e for contact + resume flows | Maintainability |
| P5 | CRA → Vite (or Next.js if a blog is planned) | Build speed, smaller runtime; framework stays React either way |
| P6 | Content marketing (2–3 technical posts on shipped projects) | Long-tail freelance SEO |
