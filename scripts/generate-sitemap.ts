/**
 * Generates public/sitemap.xml and keeps every repeated date in lockstep —
 * the "Improve" pillar of the SEO decision:
 *
 *   1. PREFLIGHT (fail the build on drift): verifies the static metadata in
 *      public/index.html, public/robots.txt and public/manifest.json against
 *      the single source of truth in src/constants/site.ts. If someone edits
 *      one of those files by hand (or edits site.ts without updating them),
 *      the build stops with the exact mismatch instead of silently forking
 *      the metadata.
 *
 *   2. GENUINE-CHANGE DATING: the sitemap <lastmod> and the JSON-LD
 *      ProfilePage.dateModified are derived from a content hash of the final
 *      prerendered page (build/index.html) — never hand-edited. Bundle-hash
 *      churn from non-visual code changes (refactors, dependency bumps) is
 *      normalized away, so the date only moves when the page a crawler
 *      actually receives changes.
 *
 *   3. LOCKSTEP WRITES: sitemap (public/ + build/), dateModified in
 *      public/index.html and build/index.html — all stamped with the same
 *      resolved date.
 *
 * State (last resolved hash + date) lives in scripts/.metadata-state.json and
 * MUST be committed together with the generated public/sitemap.xml and
 * public/index.html changes, so the next build can tell "changed" from
 * "unchanged".
 *
 * Runs as the final step of `pnpm build` (after craco build + prerender, which
 * produce build/index.html).
 */
import { existsSync, readFileSync, writeFileSync } from "fs";
import { createHash } from "crypto";
import path from "path";
import {
  SITE_URL,
  HOME_CANONICAL_URL,
  SITE_TITLE,
  META_DESCRIPTION,
  OG_DESCRIPTION,
  PERSON_JSONLD_DESCRIPTION,
  WEBSITE_NAME,
  WEBSITE_JSONLD_DESCRIPTION,
  PROFILE_PAGE_NAME,
  MANIFEST_NAME,
  MANIFEST_DESCRIPTION,
  OG_IMAGE_URL,
  OG_IMAGE_WIDTH,
  OG_IMAGE_HEIGHT,
  OG_IMAGE_ALT,
  OG_TYPE,
  OG_SITE_NAME,
  OG_LOCALE,
  TWITTER_CARD,
  TWITTER_HANDLE,
  SOCIAL_PROFILES,
  SAME_AS,
  SITEMAP_PAGES,
  pageCanonicalUrl,
} from "../src/constants/site";

const rootDir = path.resolve(__dirname, "..");
const publicIndex = path.join(rootDir, "public", "index.html");
const publicSitemap = path.join(rootDir, "public", "sitemap.xml");
const publicRobots = path.join(rootDir, "public", "robots.txt");
const publicManifest = path.join(rootDir, "public", "manifest.json");
const buildIndex = path.join(rootDir, "build", "index.html");
const buildSitemap = path.join(rootDir, "build", "sitemap.xml");
const statePath = path.join(__dirname, ".metadata-state.json");

interface MetadataState {
  contentHash: string;
  lastmod: string;
}

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
const todayUtc = (): string => new Date().toISOString().slice(0, 10);

/* ------------------------------------------------------------------ */
/* Preflight: static files vs src/constants/site.ts                    */
/* ------------------------------------------------------------------ */

function metaContent(html: string, attr: "name" | "property", key: string): string | undefined {
  const re = new RegExp(`<meta[^>]*\\b${attr}=["']${key.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}["'][^>]*>`, "i");
  const tag = html.match(re)?.[0];
  if (!tag) return undefined;
  // content= may appear before or after the key attribute
  return tag.match(/\bcontent=["']([^"']*)["']/i)?.[1];
}

/** Count how many times a given meta tag appears (name= or property=). */
function metaCount(html: string, attr: "name" | "property", key: string): number {
  const re = new RegExp(`<meta[^>]*\\b${attr}=["']${key.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}["'][^>]*>`, "gi");
  return (html.match(re) || []).length;
}

interface JsonLdGraph {
  "@graph"?: Array<Record<string, unknown>>;
}

function readJsonLd(html: string): JsonLdGraph {
  const m = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
  if (!m) throw new Error("No application/ld+json script found in public/index.html");
  return JSON.parse(m[1]) as JsonLdGraph;
}

function preflight(): void {
  const html = readFileSync(publicIndex, "utf8");
  const robots = readFileSync(publicRobots, "utf8");
  const manifest = JSON.parse(readFileSync(publicManifest, "utf8")) as { name?: string; description?: string };

  const drift: string[] = [];
  const expect = (label: string, actual: unknown, expected: unknown, file: string) => {
    if (actual !== expected) drift.push(`${file}: ${label} expected ${JSON.stringify(expected)} but found ${JSON.stringify(actual)}`);
  };

  const title = html.match(/<title>([^<]*)<\/title>/)?.[1];
  expect("<title>", title, SITE_TITLE, "public/index.html");
  expect("og:title", metaContent(html, "property", "og:title"), SITE_TITLE, "public/index.html");
  expect("twitter:title", metaContent(html, "name", "twitter:title"), SITE_TITLE, "public/index.html");
  expect("meta description", metaContent(html, "name", "description"), META_DESCRIPTION, "public/index.html");
  expect("og:description", metaContent(html, "property", "og:description"), OG_DESCRIPTION, "public/index.html");
  expect("twitter:description", metaContent(html, "name", "twitter:description"), OG_DESCRIPTION, "public/index.html");
  expect("og:image:alt", metaContent(html, "property", "og:image:alt"), OG_IMAGE_ALT, "public/index.html");
  expect("og:type", metaContent(html, "property", "og:type"), OG_TYPE, "public/index.html");
  expect("og:site_name", metaContent(html, "property", "og:site_name"), OG_SITE_NAME, "public/index.html");
  expect("og:locale", metaContent(html, "property", "og:locale"), OG_LOCALE, "public/index.html");
  expect("twitter:card", metaContent(html, "name", "twitter:card"), TWITTER_CARD, "public/index.html");

  // Duplicate-tag guard: exactly ONE of each critical tag may exist. Duplicates
  // (e.g. a hand-edited second description, or a canonical added by a snippet)
  // confuse crawlers and social scrapers, and hide drift from the checks above.
  expect("<title> occurrences", (html.match(/<title>/g) || []).length, 1, "public/index.html");
  expect(
    'rel="canonical" occurrences',
    (html.match(/<link[^>]*rel=["']canonical["'][^>]*>/g) || []).length,
    1,
    "public/index.html"
  );
  const uniqueTags: Array<["name" | "property", string]> = [
    ["name", "description"],
    ["name", "robots"],
    ["name", "author"],
    ["name", "twitter:card"],
    ["name", "twitter:site"],
    ["name", "twitter:creator"],
    ["name", "twitter:title"],
    ["name", "twitter:description"],
    ["name", "twitter:image"],
    ["property", "og:title"],
    ["property", "og:description"],
    ["property", "og:image"],
    ["property", "og:url"],
    ["property", "og:type"],
    ["property", "og:site_name"],
    ["property", "og:locale"],
  ];
  for (const [attr, key] of uniqueTags) {
    expect(`${attr}="${key}" occurrences`, metaCount(html, attr, key), 1, "public/index.html");
  }

  const canonical = html.match(/<link rel="canonical" href="([^"]+)"/)?.[1];
  expect("canonical", canonical, HOME_CANONICAL_URL, "public/index.html");
  expect("og:url", metaContent(html, "property", "og:url"), HOME_CANONICAL_URL, "public/index.html");
  expect("og:image", metaContent(html, "property", "og:image"), OG_IMAGE_URL, "public/index.html");
  expect("og:image:width", metaContent(html, "property", "og:image:width"), String(OG_IMAGE_WIDTH), "public/index.html");
  expect("og:image:height", metaContent(html, "property", "og:image:height"), String(OG_IMAGE_HEIGHT), "public/index.html");
  expect("twitter:image", metaContent(html, "name", "twitter:image"), OG_IMAGE_URL, "public/index.html");
  expect("twitter:site", metaContent(html, "name", "twitter:site"), TWITTER_HANDLE, "public/index.html");
  expect("twitter:creator", metaContent(html, "name", "twitter:creator"), TWITTER_HANDLE, "public/index.html");

  // Obsolete-tag guard: tags removed in v4 must not creep back in.
  for (const obsolete of ["keywords", "revisit-after", "distribution", "rating", "googlebot"]) {
    const found = metaCount(html, "name", obsolete);
    if (found > 0) drift.push(`public/index.html: obsolete <meta name="${obsolete}"> present (${found}) — remove it (ignored by modern engines; adds noise)`);
  }

  try {
    const graph = readJsonLd(html)["@graph"] ?? [];
    const person = graph.find((n) => n["@type"] === "Person");
    const website = graph.find((n) => n["@type"] === "WebSite");
    const profile = graph.find((n) => n["@type"] === "ProfilePage");
    if (!person || !website || !profile) {
      drift.push("public/index.html: JSON-LD @graph must contain Person, WebSite and ProfilePage nodes");
    } else {
      expect("JSON-LD Person.url", person.url, HOME_CANONICAL_URL, "public/index.html");
      expect("JSON-LD Person.image", person.image, OG_IMAGE_URL, "public/index.html");
      expect("JSON-LD Person.description", person.description, PERSON_JSONLD_DESCRIPTION, "public/index.html");
      expect("JSON-LD Person.sameAs", JSON.stringify(person.sameAs), JSON.stringify(SAME_AS), "public/index.html");
      expect("JSON-LD WebSite.url", website.url, HOME_CANONICAL_URL, "public/index.html");
      expect("JSON-LD WebSite.name", website.name, WEBSITE_NAME, "public/index.html");
      expect("JSON-LD WebSite.description", website.description, WEBSITE_JSONLD_DESCRIPTION, "public/index.html");
      expect("JSON-LD ProfilePage.url", profile.url, HOME_CANONICAL_URL, "public/index.html");
      expect("JSON-LD ProfilePage.name", profile.name, PROFILE_PAGE_NAME, "public/index.html");
      if (typeof profile.dateModified !== "string" || !DATE_RE.test(profile.dateModified)) {
        drift.push(`public/index.html: ProfilePage.dateModified must be a YYYY-MM-DD string (found ${JSON.stringify(profile.dateModified)}) — generate:sitemap stamps it automatically, do not hand-edit`);
      }
    }
  } catch (e) {
    drift.push(`public/index.html: JSON-LD block is not parseable (${(e as Error).message})`);
  }

  const robotsSitemap = robots.match(/^Sitemap:\s*(\S+)\s*$/m)?.[1];
  expect("Sitemap: directive", robotsSitemap, `${SITE_URL}/sitemap.xml`, "public/robots.txt");
  expect("name", manifest.name, MANIFEST_NAME, "public/manifest.json");
  expect("description", manifest.description, MANIFEST_DESCRIPTION, "public/manifest.json");

  if (drift.length > 0) {
    console.error("\ngenerate-sitemap: PREFLIGHT FAILED — static metadata has drifted from src/constants/site.ts:");
    for (const d of drift) console.error(`  - ${d}`);
    console.error("\nFix: update src/constants/site.ts (the single source of truth) and/or the file(s)\nlisted above so they agree, then re-run the build. Dates are stamped automatically —\nnever edit lastmod / dateModified by hand.");
    process.exit(1);
  }
  console.log("generate-sitemap: preflight OK — index.html / robots.txt / manifest.json match src/constants/site.ts");
}

/* ------------------------------------------------------------------ */
/* Genuine-content hash of the prerendered page                        */
/* ------------------------------------------------------------------ */

function normalizeForHash(html: string): string {
  return html
    // CRA bundle filenames embed a content hash that changes on ANY code edit
    // (refactors, dependency bumps) even when the rendered page is identical.
    // Normalize js/css asset hashes so only genuine page-content changes move
    // the date. Media hashes (images/fonts) are intentionally preserved — a
    // changed image IS a genuine content change.
    .replace(/((?:\/static\/)?(?:js|css)\/[A-Za-z0-9_.-]+?)\.[a-f0-9]{8}\./g, "$1.[hash].")
    // The date tokens themselves must never trigger a bump (self-reference immunity).
    .replace(/"dateModified":\s*"[^"]*"/g, '"dateModified":"[date]"');
}

function contentHashOfBuildIndex(): string {
  if (!existsSync(buildIndex)) {
    console.error("generate-sitemap: build/index.html not found — this script must run AFTER `craco build` + `prerender` (it hashes the final prerendered page).");
    process.exit(1);
  }
  const normalized = normalizeForHash(readFileSync(buildIndex, "utf8"));
  return createHash("sha256").update(normalized, "utf8").digest("hex");
}

/* ------------------------------------------------------------------ */
/* Date resolution: KEPT / BUMPED / INIT                               */
/* ------------------------------------------------------------------ */

function readState(): MetadataState | undefined {
  if (!existsSync(statePath)) return undefined;
  try {
    const s = JSON.parse(readFileSync(statePath, "utf8")) as MetadataState;
    if (typeof s.contentHash === "string" && typeof s.lastmod === "string" && DATE_RE.test(s.lastmod)) return s;
  } catch {
    /* fall through — corrupt state is treated as missing */
  }
  return undefined;
}

function existingSitemapLastmod(): string | undefined {
  if (!existsSync(publicSitemap)) return undefined;
  const m = readFileSync(publicSitemap, "utf8").match(/<lastmod>([^<]+)<\/lastmod>/);
  return m && DATE_RE.test(m[1]) ? m[1] : undefined;
}

/* ------------------------------------------------------------------ */
/* Writers                                                             */
/* ------------------------------------------------------------------ */

function renderSitemap(lastmod: string): string {
  const rows = SITEMAP_PAGES.map((p) => {
    const loc = pageCanonicalUrl(p).replace(/&/g, "&amp;");
    return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>${p.changefreq}</changefreq>\n    <priority>${p.priority}</priority>\n  </url>`;
  });
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${rows.join("\n")}\n</urlset>\n`;
}

function patchDateModified(file: string, lastmod: string): void {
  const before = readFileSync(file, "utf8");
  if (!/"dateModified":\s*"[^"]*"/.test(before)) {
    console.error(`generate-sitemap: no "dateModified" token found in ${file} — cannot stamp ${lastmod}. Aborting so the files cannot fall out of lockstep.`);
    process.exit(1);
  }
  const after = before.replace(/("dateModified":\s*")[^"]*(")/, `$1${lastmod}$2`);
  if (after !== before) {
    writeFileSync(file, after, "utf8");
  } // else: token already holds the resolved date — nothing to do
}

/* ------------------------------------------------------------------ */

function main(): void {
  preflight();

  const hash = contentHashOfBuildIndex();
  const state = readState();
  let lastmod: string;
  let decision: string;

  if (state && state.contentHash === hash) {
    lastmod = state.lastmod;
    decision = `KEPT ${lastmod} (no genuine content change since the last build)`;
  } else if (state) {
    lastmod = todayUtc();
    decision = `BUMPED ${state.lastmod} -> ${lastmod} (genuine content change detected)`;
  } else {
    lastmod = existingSitemapLastmod() ?? todayUtc();
    decision = `INIT baseline ${lastmod} (first run — kept the existing sitemap date, no bump)`;
  }

  writeFileSync(publicSitemap, renderSitemap(lastmod), "utf8");
  if (existsSync(path.dirname(buildSitemap))) {
    writeFileSync(buildSitemap, renderSitemap(lastmod), "utf8");
  }
  patchDateModified(publicIndex, lastmod);
  patchDateModified(buildIndex, lastmod);
  writeFileSync(statePath, JSON.stringify({ contentHash: hash, lastmod }, null, 2) + "\n", "utf8");

  console.log(`generate-sitemap: date ${decision}`);
  console.log(`generate-sitemap: wrote public/sitemap.xml + build/sitemap.xml (${SITEMAP_PAGES.length} URL${SITEMAP_PAGES.length === 1 ? "" : "s"}), stamped dateModified in public/index.html + build/index.html`);
  console.log("generate-sitemap: reminder — commit scripts/.metadata-state.json together with public/sitemap.xml and public/index.html");
}

main();
