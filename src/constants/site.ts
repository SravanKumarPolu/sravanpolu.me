/**
 * ─────────────────────────────────────────────────────────────────────────────
 * SINGLE SOURCE OF TRUTH for site-level metadata.
 * ─────────────────────────────────────────────────────────────────────────────
 * Every repeated SEO value — site URL, page titles, descriptions, Open Graph /
 * Twitter image, social profile URLs, sitemap page list — is declared HERE and
 * nowhere else.
 *
 * How the other artifacts stay in sync with this file:
 *
 *   1. `scripts/generate-sitemap.ts` (runs on every `pnpm build`) PREFLIGHT-
 *      CHECKS the static files (`public/index.html`, `public/robots.txt`,
 *      `public/manifest.json`) against the values declared here and FAILS the
 *      build with a precise message if any of them drift.
 *   2. The same script generates `public/sitemap.xml` from SITEMAP_PAGES and
 *      stamps `lastmod` / JSON-LD `dateModified` from genuine content changes
 *      (content-hash of the prerendered page — never hand-edited dates).
 *   3. App code and resume generation import their URLs from here instead of
 *      hardcoding them (`resume-data.ts`, `constants/index.ts`).
 *
 * The static files remain 100% static and hand-auditable (no templating, no
 * runtime injection) — this module is the *declared* source they are verified
 * against, so the "one place to update" guarantee holds without giving up the
 * keep-static decision.
 *
 * When adding a future project/service page, see docs/PAGE_METADATA_GUIDE.md:
 * add its path to SITEMAP_PAGES and give it page-specific title/description/
 * canonical/JSON-LD in its own static HTML file.
 */

/** Canonical origin, no trailing slash. */
export const SITE_URL = "https://sravanpolu.com";

/** Canonical homepage URL (trailing slash — matches sitemap <loc>, og:url and JSON-LD url). */
export const HOME_CANONICAL_URL = `${SITE_URL}/`;

/** Homepage <title> — also used verbatim for og:title and twitter:title. */
export const SITE_TITLE = "Sravan Kumar Polu | React & Next.js Full-Stack Developer";

/** Homepage meta description (search snippets). */
export const META_DESCRIPTION =
  "Frontend / Full-Stack developer building production React, Next.js and TypeScript applications — available for freelance, contract and full-time opportunities.";

/** Shorter variant used for og:description and twitter:description. */
export const OG_DESCRIPTION =
  "Frontend / Full-Stack developer — production React, Next.js and TypeScript apps. Available for freelance, contract and full-time opportunities.";

/** JSON-LD Person.description (third-person phrasing). */
export const PERSON_JSONLD_DESCRIPTION =
  "Full-stack developer building production React, Next.js and TypeScript applications — UI, APIs and deployment";

/** JSON-LD WebSite node. */
export const WEBSITE_NAME = "Sravan Kumar Polu — Portfolio";
export const WEBSITE_JSONLD_DESCRIPTION =
  "Portfolio of Sravan Kumar Polu, React and Next.js full-stack developer — freelance, contract and full-time.";

/** JSON-LD ProfilePage node name. */
export const PROFILE_PAGE_NAME = "Sravan Kumar Polu — React & Next.js Full-Stack Developer";

/** PWA manifest (public/manifest.json). */
export const MANIFEST_NAME = "Sravan Kumar Polu - React & Next.js Full-Stack Developer";
export const MANIFEST_DESCRIPTION =
  "Portfolio of a frontend / full-stack developer building production React, Next.js and TypeScript applications.";

/** Social share image (1200×630 JPEG in public/). */
export const OG_IMAGE_PATH = "/og-image.jpg";
export const OG_IMAGE_URL = `${SITE_URL}${OG_IMAGE_PATH}`;
export const OG_IMAGE_WIDTH = 1200;
export const OG_IMAGE_HEIGHT = 630;
export const OG_IMAGE_ALT = "Sravan Kumar Polu - React & Next.js Full-Stack Developer";

/** Open Graph card type / site name / locale (public/index.html og: tags). */
export const OG_TYPE = "website";
export const OG_SITE_NAME = "Sravan Kumar Polu Portfolio";
export const OG_LOCALE = "en_US";

/** Twitter/X card type (public/index.html twitter:card). */
export const TWITTER_CARD = "summary_large_image";

/** Twitter/X handle (twitter:site / twitter:creator). */
export const TWITTER_HANDLE = "@SravanPolu";

/** Social profile URLs — used by footer/contact links, resume PDF and JSON-LD sameAs. */
export const SOCIAL_PROFILES = {
  linkedIn: "https://www.linkedin.com/in/SravanPolu",
  github: "https://github.com/SravanKumarPolu",
  x: "https://x.com/SravanPolu",
} as const;

/** JSON-LD Person.sameAs — ORDER MATTERS: keep in sync with SOCIAL_PROFILES. */
export const SAME_AS = [SOCIAL_PROFILES.linkedIn, SOCIAL_PROFILES.github, SOCIAL_PROFILES.x];

export type SitemapPage = {
  /** Route path, always starting with "/" — the homepage is exactly "/". */
  path: `/${string}`;
  changefreq: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  /** Sitemap priority as a string ("1.0", "0.8", …). */
  priority: string;
};

/**
 * Pages emitted into public/sitemap.xml by scripts/generate-sitemap.ts.
 * Add future project/service pages here (see docs/PAGE_METADATA_GUIDE.md).
 */
export const SITEMAP_PAGES: readonly SitemapPage[] = [
  { path: "/", changefreq: "monthly", priority: "1.0" },
] as const;

/** Canonical absolute URL for a sitemap page (homepage keeps its trailing slash). */
export function pageCanonicalUrl(page: Pick<SitemapPage, "path">): string {
  return page.path === "/" ? HOME_CANONICAL_URL : `${SITE_URL}${page.path}`;
}
