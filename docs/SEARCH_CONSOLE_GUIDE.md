# Google Search Console — Setup & Sitemap Submission Guide

This guide covers the manual steps that only the site owner can perform.
Everything code-side (robots.txt with `Sitemap:` directive, valid sitemap.xml,
canonical tags, indexable HTML, structured data) is already in place and
verified in this repository.

**Prerequisite:** the updated build must be deployed first (see
[AUDIT_REPORT.md §11](../AUDIT_REPORT.md)). The steps below verify what Google
actually receives — do not skip the deploy.

---

## 1. Deploy the updated build

```bash
git add -A && git commit -m "SEO pass C: headers, prerender fixes, JSON-LD, image optimization" && git push
```

- **Netlify (repo-connected):** the build runs automatically (`pnpm build`, publish `build/`).
- **Netlify (drag-and-drop):** deploy the `build/` folder — `build/_headers`
  now ships inside it, so security headers and caching apply to drag-and-drop
  deploys too (previously they only applied to git-connected deploys).

## 2. Verify the deployment (2 minutes)

Check these URLs in a browser or with `curl -I`:

| URL / check | Expected |
|---|---|
| `https://sravanpolu.com/` | 200, page source contains `media="print"` on the Google Fonts link (non-blocking) |
| `https://sravanpolu.com/robots.txt` | includes `Sitemap: https://sravanpolu.com/sitemap.xml` |
| `https://sravanpolu.com/sitemap.xml` | valid XML, `<lastmod>2026-10-11</lastmod>` |
| `https://sravanpolu.com/og-image.jpg` | 200 (JPEG) — replaces the old `og-image.png` |
| `https://sravanpolu.com/resume-preview.html` | 200 and contains `<meta name="robots" content="noindex">` |
| Response headers on `/` | `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`, `Strict-Transport-Security`, `Content-Security-Policy: frame-ancestors 'self'` |
| `https://sravanpolu.com/logo512-maskable.png` | 200 |
| Unknown path (e.g. `/xyz`) | 404 status with the styled 404 page |

## 3. Add the property in Google Search Console

1. Go to <https://search.google.com/search-console>.
2. **Add property → URL prefix →** enter `https://sravanpolu.com/`
   (trailing slash, non-www — this matches the canonical URL and sitemap).
   A Domain property (`sravanpolu.com`) is an alternative that covers all
   subdomains/protocols, but it requires DNS verification.
3. **Verify ownership** — pick one:
   - **HTML tag (easiest for Netlify):** GSC shows a `<meta name="google-site-verification" ...>` tag. Add it to `public/index.html` `<head>`, rebuild, redeploy, then click Verify.
   - **DNS TXT record** (required if you choose the Domain property).
   - Google Analytics / Tag Manager verification if either is already installed.

## 4. Submit the sitemap

1. In GSC, open **Sitemaps** (left sidebar).
2. Enter `sitemap.xml` (GSC prefixes the property URL).
3. Click **Submit**. Expected status: **Success — "1 discovered URL"** within a
   few minutes to 24 hours.
4. If GSC reports "Couldn't fetch": recheck `/robots.txt` is not blocking
   crawling of `/sitemap.xml` (it isn't — `Disallow:` is empty), then use
   **URL inspection** on `https://sravanpolu.com/sitemap.xml` to see the
   fetched response.

## 5. Request indexing of the homepage

1. **URL inspection** (search bar at top) → paste `https://sravanpolu.com/`.
2. Click **Request indexing**. Google then queues a live crawl.
3. Repeat for any other URL you want prioritized (this site is a single page,
   so the homepage + the sitemap is the full story).

## 6. Validate structured data rendering

- Open <https://search.google.com/test/rich-results>, enter
  `https://sravanpolu.com/`, click **Test URL**.
- Expected: **Person** rich result detected from the JSON-LD (`@graph` with
  Person, WebSite, ProfilePage).
- Also check schema completeness at <https://validator.schema.org> — the
  JSON-LD parses and all `@id` references resolve.

## 7. What to expect (honest expectations)

- **Indexing is not instant.** "Discovered — currently not indexed" or a few
  days' delay is normal and does not indicate a problem.
- **Ranking improvements cannot be promised** from an audit alone; what this
  pass guarantees is the absence of technical blockers (indexability,
  canonical consistency, crawlable content, valid sitemap/robots, structured
  data, solid Core Web Vitals in lab tests).
- **Field Core Web Vitals** (real-user LCP/INP/CLS) appear in GSC's
  **Experience → Core Web Vitals** report roughly 28 days after real traffic
  starts flowing. Lab numbers for this build: LCP 564 ms desktop / 420 ms
  mobile, CLS ≈ 0.002 / 0.000 (local, unthrottled); Lighthouse mobile
  performance 83–88 (applied throttling) / desktop 94 (lab).
- Monitor **Pages**, **Sitemaps**, and **Core Web Vitals** reports over the
  following weeks. Use **URL inspection → View crawled page** any time you
  want to confirm what Googlebot sees.

## 8. Optional: check backlink profile and other engines

- Bing Webmaster Tools (<https://www.bing.com/webmasters>) supports importing
  the GSC property with one click — worth doing; Bing also powers many
  AI-answer search experiences.
- The site does not need `hreflang` (single language) or additional sitemaps
  (single page).
