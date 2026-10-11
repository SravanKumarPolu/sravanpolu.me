# Page Metadata Guide — how metadata works today, and how to add a page tomorrow

This guide documents the metadata architecture of sravanpolu.com exactly as it
was decided:

> **Keep static:** robots.txt, homepage canonical, title, description, Open
> Graph image and personal structured data.
> **Improve:** centralize repeated metadata and generate sitemap modification
> dates from genuine content changes.
> **Make page-specific when needed:** titles, descriptions, canonicals and
> structured data for future project or service pages.
> **Avoid:** making everything dynamic, unnecessary server rendering, or
> migrating from React to Next.js purely for SEO.

## How it works today (single page)

| Artifact | Role | Who writes it |
| --- | --- | --- |
| `src/constants/site.ts` | **Single source of truth** — every repeated value (URL, titles, descriptions, OG/Twitter image, social profiles, sitemap page list) is declared here | You, by hand |
| `public/index.html` | Static, hand-auditable homepage head (title, description, canonical, OG/Twitter, JSON-LD `@graph`) | You, by hand — then verified against `site.ts` on every build |
| `public/robots.txt`, `public/manifest.json` | Static crawl/PWA config | You, by hand — same verification |
| `public/sitemap.xml` + the `dateModified` inside `public/index.html` | **Generated** by `scripts/generate-sitemap.ts` | The build — never hand-edit the dates |
| `scripts/.metadata-state.json` | Remembers the last content hash + date so the generator can tell "changed" from "unchanged" | The build — commit it with your changes |

### The build pipeline (final step of `pnpm build`)

```
generate-resume-pdf  ->  craco build  ->  prerender  ->  generate-sitemap
                                                       ├── preflight: index.html /
                                                       │   robots.txt / manifest.json
                                                       │   must match site.ts (build fails on drift)
                                                       ├── hash build/index.html with CRA bundle
                                                       │   hashes normalized away (refactors that
                                                       │   don't change the rendered page never
                                                       │   bump the date; changed images DO)
                                                       ├── date decision: KEPT / BUMPED / INIT
                                                       └── write sitemap (public/ + build/) and
                                                           stamp dateModified in both index.html
                                                           files, all in lockstep
```

`scripts/verify-build.ts` then asserts on the built output: sitemap `<loc>`
matches the canonical, the date is not in the future, sitemap `lastmod` ==
JSON-LD `dateModified` == state file, and robots.txt's `Sitemap:` line matches.

### The one rule when editing metadata

Change the value **once** in `src/constants/site.ts`, mirror it into the
matching static file (`public/index.html`, `robots.txt` or `manifest.json`),
and rebuild. The preflight exists to catch the second half if you forget — it
fails the build with the exact mismatch. **Never** hand-edit `lastmod` or
`dateModified`; the build stamps them from genuine content changes (this
removes the class of bug where the v1 sitemap shipped a future-dated `lastmod`).

## Adding a future project or service page (the "when needed" part)

When you create `https://sravanpolu.com/projects/some-project/`, give it
**page-specific metadata** using the same static pattern — no SSR, no Next.js,
no runtime metadata swapping:

1. **Create a static HTML page** in `public/projects/some-project/index.html`
   (CRA copies `public/` verbatim into `build/`). Model its `<head>` on
   `public/index.html`: its own `<title>`, `meta description`, `<link
   rel="canonical" href="https://sravanpolu.com/projects/some-project/">`,
   OG/Twitter tags with **that page's** story, and a page-specific JSON-LD node
   (`WebPage` + `BreadcrumbList`, or `CreativeWork`/`Service` as appropriate).
   Link it from the homepage so it's crawlable.
   *Existing precedent:* `public/resume-preview.html` and `public/404.html` are
   already standalone static HTML files inside `public/` — follow that pattern.
2. **Register it in the sitemap list** — add one entry to `SITEMAP_PAGES` in
   `src/constants/site.ts`:
   ```ts
   export const SITEMAP_PAGES: readonly SitemapPage[] = [
     { path: "/", changefreq: "monthly", priority: "1.0" },
     { path: "/projects/some-project/", changefreq: "monthly", priority: "0.8" },
   ] as const;
   ```
   `generate-sitemap.ts` emits one `<url>` per entry automatically and stamps
   its `lastmod` with the same genuine-change logic.
3. **If the page must render React content**, extend `scripts/prerender.ts`
   with a second pass for that route (it already knows how to serve `build/`,
   render, and write back the DOM). Keep it build-time — that is the decided
   boundary: prerendered static HTML for crawlers, the SPA boots on top for
   humans.
4. **If the page is part of the SPA router instead** (client-side route), it
   still needs the static HTML file for crawlers that don't execute JS. A
   runtime title swap alone (react-helmet style) is a UX improvement, not a
   crawler guarantee — keep the static file as the source of truth.

### What NOT to do (decided boundary)

- **No server rendering / Next.js migration** purely for SEO. The
  prerender-in-build approach gives crawlers the same fully-rendered HTML at
  zero runtime cost, and the live Lighthouse evidence (SEO 100/100, content
  fully present in the raw HTML) shows nothing is left on the table.
- **No dynamic everything.** `robots.txt`, the homepage head and the personal
  JSON-LD stay static files; only the *dates* are generated, and only at build
  time.
- **No hand-edited dates.** `lastmod` / `dateModified` come from
  `generate-sitemap.ts` or not at all.

## Deploy checklist reminder

`scripts/.metadata-state.json` is committed to the repository. When a build
bumps the date, commit the state file **together with** the regenerated
`public/sitemap.xml` and `public/index.html`, so CI and your next local build
agree on what "unchanged" means.
