/**
 * Post-fix verification: serve build/, then run
 *  1) Smoke test — all 9 sections render, 0 broken images, 0 console errors,
 *     resume iframe loads, /Resume.pdf 200, mobile menu opens flush.
 *  2) Lab Core Web Vitals — LCP + CLS via PerformanceObserver, desktop and
 *     mobile viewports (same methodology as the previous audit pass).
 *  3) Raw-HTML crawler view — single <h1>, prerendered content present,
 *     font stylesheet non-blocking (media="print").
 */
import http from "http";
import { existsSync, readFileSync, statSync } from "fs";
import path from "path";
import fsp from "fs/promises";
import puppeteer from "puppeteer";
import { SITE_URL, HOME_CANONICAL_URL } from "../src/constants/site";

const buildDir = path.resolve(__dirname, "..", "build");

const MIME: Record<string, string> = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".pdf": "application/pdf",
  ".xml": "application/xml; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".webp": "image/webp",
};

function startServer(): Promise<{ server: http.Server; port: number }> {
  return new Promise((resolve) => {
    const server = http.createServer((req, res) => {
      const urlPath = decodeURIComponent((req.url || "/").split("?")[0]);
      const safePath = path.normalize(urlPath).replace(/^(\.\.[\/\\])+/, "");
      let filePath = path.join(buildDir, safePath);
      if (safePath === "/" || safePath.endsWith("/") || !existsSync(filePath)) {
        filePath = path.join(buildDir, "index.html");
      }
      if (!existsSync(filePath)) {
        res.writeHead(404).end("Not found");
        return;
      }
      const ext = path.extname(filePath).toLowerCase();
      const cacheHeaders: Record<string, string> = {};
      if (safePath.startsWith("/static/")) {
        cacheHeaders["Cache-Control"] = "public, max-age=31536000, immutable";
      }
      fsp.readFile(filePath)
        .then((data) => {
          res.writeHead(200, { "Content-Type": MIME[ext] || "application/octet-stream", ...cacheHeaders });
          res.end(data);
        })
        .catch(() => {
          res.writeHead(404).end("Not found");
        });
    });
    server.listen(0, "127.0.0.1", () =>
      resolve({ server, port: (server.address() as { port: number }).port })
    );
  });
}

function getChrome(): string | undefined {
  const env = process.env.PUPPETEER_EXECUTABLE_PATH || process.env.CHROME_PATH;
  if (env && existsSync(env)) return env;
  return ["/usr/local/bin/chromium", "/usr/bin/google-chrome", "/usr/bin/chromium-browser", "/usr/bin/chromium"]
    .map((p) => (existsSync(p) ? p : undefined))
    .find(Boolean);
}


async function main(): Promise<void> {
  const { server, port } = await startServer();
  const base = `http://127.0.0.1:${port}`;
  const results: string[] = [];
  const failures: string[] = [];
  const check = (name: string, ok: boolean, detail: string) => {
    results.push(`${ok ? "PASS" : "FAIL"}  ${name}  ${detail}`);
    if (!ok) failures.push(name);
  };

  const executablePath = getChrome();
  const browser = await puppeteer.launch({
    headless: true,
    ...(executablePath ? { executablePath } : {}),
    args: ["--no-sandbox", "--disable-dev-shm-usage"],
  });

  try {
    // ---------- Raw HTML (crawler view) ----------
    const raw = await (await fetch(`${base}/`)).text();
    check("raw-h1-count", (raw.match(/<h1[\s>]/g) || []).length === 1, "exactly one <h1> in prerendered HTML");
    check("raw-has-flagship-content", raw.includes("DebiasDaily") && raw.includes("SKR E-Commerce"), "project content present for crawlers");
    const preloadLinks = raw.match(/<link\b[^>]*rel="preload"[^>]*>/g) || [];
    const interFontPreloaded = preloadLinks.some(
      (tag) => tag.includes('as="font"') && tag.includes("inter-v20-latin-var.woff2") && tag.includes("crossorigin")
    );
    check(
      "raw-fonts-selfhosted",
      // The DOM serializer normalizes `font-family: 'Inter'` to `font-family:Inter`
      /@font-face\s*\{[^}]*font-family:\s*["']?Inter["']?/.test(raw) && interFontPreloaded,
      "Inter is self-hosted (inline @font-face + same-origin preload)"
    );
    check(
      "raw-no-thirdparty-font-css",
      !/fonts\.googleapis\.com/.test(raw),
      "no render-delaying Google Fonts CSS in shipped HTML"
    );
    check("raw-canonical", raw.includes('rel="canonical" href="https://sravanpolu.com/"'), "canonical https://sravanpolu.com/");
    check("raw-jsonld-graph", raw.includes('"@type": "WebSite"') && raw.includes('"@type": "ProfilePage"'), "WebSite + ProfilePage JSON-LD present");
    check("raw-og-image-jpg", raw.includes("og-image.jpg"), "og:image points to og-image.jpg");

    const pdfStat = statSync(path.join(buildDir, "Resume.pdf"));
    check("resume-pdf-size", pdfStat.size > 10000 && pdfStat.size < 500000, `Resume.pdf ${(pdfStat.size / 1024).toFixed(1)} KB`);
    check("headers-file", existsSync(path.join(buildDir, "_headers")), "build/_headers ships with deploy");

    // ---------- Sitemap + date lockstep (generate-sitemap output) ----------
    const sitemapXml = readFileSync(path.join(buildDir, "sitemap.xml"), "utf8");
    const sitemapLoc = sitemapXml.match(/<loc>([^<]+)<\/loc>/)?.[1];
    check("sitemap-loc-canonical", sitemapLoc === HOME_CANONICAL_URL, `sitemap <loc> ${sitemapLoc}`);

    const sitemapLastmod = sitemapXml.match(/<lastmod>([^<]+)<\/lastmod>/)?.[1];
    const todayUtc = new Date().toISOString().slice(0, 10);
    check(
      "sitemap-lastmod-valid",
      !!sitemapLastmod && /^\d{4}-\d{2}-\d{2}$/.test(sitemapLastmod) && sitemapLastmod <= todayUtc,
      `lastmod ${sitemapLastmod} (not future vs UTC ${todayUtc})`
    );

    const jsonldDate = raw.match(/"dateModified":\s*"(\d{4}-\d{2}-\d{2})"/)?.[1];
    const statePath = path.resolve(__dirname, ".metadata-state.json");
    const stateLastmod = existsSync(statePath)
      ? (JSON.parse(readFileSync(statePath, "utf8")) as { lastmod?: string }).lastmod
      : undefined;
    check(
      "dates-lockstep",
      !!jsonldDate && jsonldDate === sitemapLastmod && stateLastmod === sitemapLastmod,
      `sitemap ${sitemapLastmod} == JSON-LD ${jsonldDate} == state ${stateLastmod}`
    );

    const robotsTxt = readFileSync(path.join(buildDir, "robots.txt"), "utf8");
    const robotsSitemap = robotsTxt.match(/^Sitemap:\s*(\S+)\s*$/m)?.[1];
    check("robots-sitemap-directive", robotsSitemap === `${SITE_URL}/sitemap.xml`, `robots.txt Sitemap: ${robotsSitemap}`);

    const ogUrl = raw.match(/<meta property="og:url" content="([^"]+)"/)?.[1];
    check("og-url-canonical", ogUrl === HOME_CANONICAL_URL, `og:url ${ogUrl}`);

    // ---------- Lab CWV observer installation (BEFORE navigation) ----------
    // We register the LCP/CLS PerformanceObserver via evaluateOnNewDocument
    // so it is installed before any paint happens. This is the methodology used
    // by Lighthouse and the web-vitals library: capturing every LCP candidate
    // from t=0 ensures we report the *actual* final LCP element, rather than
    // re-sampling post-load entries that may have missed the first paint.
    //
    // IMPORTANT: the LCP measurement is taken on the natural page-load lifecycle
    // — we do NOT scroll before measuring LCP. Scroll-triggered paints still
    // count toward LCP (per the spec), but real users typically do not scroll
    // within the LCP window, so the realistic page-load LCP is what we report.
    const CWV_BOOTSTRAP = `
      (function () {
        window.__cwv = { lcp: [], cls: 0, err: [] };
        function describe(el) {
          if (!el) return "<none>";
          var id = el.id ? "#" + el.id : "";
          var cls = (el.className && typeof el.className === "string")
            ? "." + el.className.split(/\\s+/).filter(Boolean).slice(0, 3).join(".")
            : "";
          var tag = el.tagName.toLowerCase();
          var url = el.currentSrc || el.src || el.href || "";
          var rect = el.getBoundingClientRect();
          return tag + id + cls
            + (url ? " url=" + String(url).slice(0, 80) : "")
            + " rect=" + Math.round(rect.width) + "x" + Math.round(rect.height)
            + "@" + Math.round(rect.left) + "," + Math.round(rect.top);
        }
        try {
          new PerformanceObserver(function (list) {
            var es = list.getEntries();
            for (var i = 0; i < es.length; i++) {
              window.__cwv.lcp.push({
                startTime: es[i].startTime,
                renderTime: es[i].renderTime,
                size: es[i].size,
                tag: describe(es[i].element),
                url: es[i].url
              });
            }
          }).observe({ type: "largest-contentful-paint", buffered: true });
        } catch (e) { window.__cwv.err.push("lcp:" + e); }
        try {
          new PerformanceObserver(function (list) {
            var es = list.getEntries();
            for (var i = 0; i < es.length; i++) {
              if (!es[i].hadRecentInput) window.__cwv.cls += es[i].value;
            }
          }).observe({ type: "layout-shift", buffered: true });
        } catch (e) { window.__cwv.err.push("cls:" + e); }
      })();
    `;

    // ---------- Desktop smoke + Lab CWV (single desktop page) ----------
    const desktop = await browser.newPage();
    // Install the CWV observer BEFORE navigation so it captures the first paint.
    await desktop.evaluateOnNewDocument(CWV_BOOTSTRAP);
    const consoleErrors: string[] = [];
    desktop.on("console", (m) => m.type() === "error" && consoleErrors.push(m.text()));
    desktop.on("pageerror", (e) => consoleErrors.push(String(e)));
    await desktop.setViewport({ width: 1280, height: 800, deviceScaleFactor: 1 });
    await desktop.goto(base + "/", { waitUntil: "networkidle0", timeout: 60000 });

    // Wait for document.fonts.ready before snapshotting CWV — mirrors real
    // page lifecycle and matches the web-vitals library's behavior.
    await desktop.evaluate(() => (document as unknown as { fonts?: FontFaceSet }).fonts?.ready);

    // ---------- Capture Lab CWV (desktop) BEFORE any scroll ----------
    // We snapshot now (no scroll) to get the realistic page-load LCP. The
    // scroll-based interaction tests below intentionally run AFTER LCP capture
    // so they cannot pollute the LCP candidate list.
    const vDesk = await desktop.evaluate(
      () =>
        new Promise<{ lcp: number | null; lcpElement: string | null; lcpSize: number | null; allLcp: { startTime: number; size: number; tag: string }[]; cls: number; err: string[] }>((resolve) => {
          // Final LCP candidate: per the spec, LCP is the largest contentful
          // paint that occurred during the page lifecycle. We give a short
          // window (1.5 s) after fonts.ready for any final paint to settle
          // (e.g. late lazy-hydration work), then take the last entry.
          setTimeout(() => {
            const d = (window as unknown as { __cwv?: { lcp: { startTime: number; size: number; tag: string }[]; cls: number; err: string[] } }).__cwv;
            if (!d) {
              resolve({ lcp: null, lcpElement: null, lcpSize: null, allLcp: [], cls: 0, err: ["__cwv missing"] });
              return;
            }
            // Per the LCP spec, the "final" LCP is the entry with the largest
            // size — the last reported entry corresponds to the most recent
            // largest paint, which is what web-vitals' getLCP() reports.
            const last = d.lcp.length ? d.lcp[d.lcp.length - 1] : null;
            resolve({
              lcp: last ? last.startTime : null,
              lcpElement: last ? last.tag : null,
              lcpSize: last ? last.size : null,
              allLcp: d.lcp,
              cls: d.cls,
              err: d.err,
            });
          }, 1500);
        })
    );

    const sections = ["home", "about", "services", "work", "resume", "skills", "testimonials", "contact", "footer"];
    for (const id of sections) {
      const found = await desktop.evaluate((sid) => !!document.getElementById(sid), id);
      check(`section-${id}`, found, `#${id} present`);
    }

    const brokenImgs = await desktop.evaluate(() =>
      Array.from(document.querySelectorAll("img"))
        .filter((i) => i.complete && i.naturalWidth === 0)
        .map((i) => (i as HTMLImageElement).src)
    );
    check("no-broken-images", brokenImgs.length === 0, `${brokenImgs.length} broken${brokenImgs.length ? ": " + brokenImgs.slice(0, 3).join(", ") : ""}`);

    // Resume iframe: sections below the fold mount lazily (IntersectionObserver
    // gate with an 800px preload margin), so bring #resume into view first and
    // wait for its iframe to mount — mirrors a real visitor scrolling down.
    await desktop.evaluate(() => (document.getElementById("resume") as HTMLElement)?.scrollIntoView());
    let iframeOk = false;
    try {
      await desktop.waitForSelector('iframe[src="/resume-preview.html"]', { timeout: 15000 });
      await new Promise((r) => setTimeout(r, 500));
      iframeOk = await desktop.evaluate(() => {
        const f = document.querySelector('iframe[src="/resume-preview.html"]');
        return !!f && !!(f as HTMLIFrameElement).contentDocument;
      });
    } catch {
      iframeOk = false;
    }
    check("resume-iframe", iframeOk, "resume iframe loads same-origin preview (after lazy mount)");

    // Interactivity: nav link scroll + mobile menu
    await desktop.evaluate(() => (document.getElementById("contact") as HTMLElement)?.scrollIntoView());
    await new Promise((r) => setTimeout(r, 700));

    // ---------- Mobile smoke + Lab CWV (separate mobile page) ----------
    const mobile = await browser.newPage();
    // Same observer-bootstrap approach as desktop.
    await mobile.evaluateOnNewDocument(CWV_BOOTSTRAP);
    const mobileErrors: string[] = [];
    mobile.on("pageerror", (e) => mobileErrors.push(String(e)));
    await mobile.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true, deviceScaleFactor: 3 });
    await mobile.goto(base + "/", { waitUntil: "networkidle0", timeout: 60000 });
    await mobile.evaluate(() => (document as unknown as { fonts?: FontFaceSet }).fonts?.ready);

    // Capture mobile CWV BEFORE scrolling/menu interaction (same methodology
    // as desktop — measure the realistic page-load LCP first, then exercise
    // interactivity so the interaction tests don't pollute the LCP).
    const vMob = await mobile.evaluate(
      () =>
        new Promise<{ lcp: number | null; lcpElement: string | null; lcpSize: number | null; allLcp: { startTime: number; size: number; tag: string }[]; cls: number; err: string[] }>((resolve) => {
          setTimeout(() => {
            const d = (window as unknown as { __cwv?: { lcp: { startTime: number; size: number; tag: string }[]; cls: number; err: string[] } }).__cwv;
            if (!d) {
              resolve({ lcp: null, lcpElement: null, lcpSize: null, allLcp: [], cls: 0, err: ["__cwv missing"] });
              return;
            }
            const last = d.lcp.length ? d.lcp[d.lcp.length - 1] : null;
            resolve({
              lcp: last ? last.startTime : null,
              lcpElement: last ? last.tag : null,
              lcpSize: last ? last.size : null,
              allLcp: d.lcp,
              cls: d.cls,
              err: d.err,
            });
          }, 1500);
        })
    );

    const menuBtn = await mobile.$('button[aria-controls="mobile-menu"]');
    let menuOk = false;
    if (menuBtn) {
      await menuBtn.click();
      await new Promise((r) => setTimeout(r, 500));
      menuOk = await mobile.evaluate(() => !!document.getElementById("mobile-menu"));
      const overlap = await mobile.evaluate(() => {
        const nav = document.querySelector("nav");
        const menu = document.getElementById("mobile-menu");
        if (!nav || !menu) return 999;
        return menu.getBoundingClientRect().top - nav.getBoundingClientRect().bottom;
      });
      check("mobile-menu-flush", overlap <= 2, `menu offset ${overlap}px below navbar`);
      const link = await mobile.$('#mobile-menu a[href="#contact"]');
      if (link) {
        await link.click();
        await new Promise((r) => setTimeout(r, 900));
      }
    }
    check("mobile-menu-opens", menuOk, "hamburger opens navigation");
    check("mobile-no-page-errors", mobileErrors.length === 0, `${mobileErrors.length} page errors`);

    // 404 handling
    const notFound = await (await fetch(`${base}/definitely-not-a-page-xyz`)).status;
    check("spa-fallback-404", notFound === 200 || notFound === 404, `unknown path returns ${notFound} (build dir test; Netlify serves 404.html)`);

    const fmt = (v: { lcp: number | null; lcpElement: string | null; lcpSize: number | null; cls: number }) =>
      `LCP ${v.lcp === null ? "n/a" : (v.lcp / 1000).toFixed(3) + " s"} (${v.lcpSize ?? 0} px²; ${(v.lcpElement ?? "<none>").slice(0, 100)}) | CLS ${v.cls.toFixed(4)}`;
    results.push(`INFO  cwv-desktop     ${fmt(vDesk)} (target LCP<2.5s, CLS<0.1)`);
    results.push(`INFO  cwv-mobile      ${fmt(vMob)} (target LCP<2.5s, CLS<0.1)`);
    if (vDesk.allLcp.length > 1) {
      results.push(`INFO  cwv-desktop-candidates  ${vDesk.allLcp.length} LCP entries: ${vDesk.allLcp.map((e) => `${(e.startTime / 1000).toFixed(2)}s/${e.size}px²`).join(", ")}`);
    }
    if (vMob.allLcp.length > 1) {
      results.push(`INFO  cwv-mobile-candidates   ${vMob.allLcp.length} LCP entries: ${vMob.allLcp.map((e) => `${(e.startTime / 1000).toFixed(2)}s/${e.size}px²`).join(", ")}`);
    }
    if (vDesk.err.length > 0) results.push(`WARN  cwv-desktop-observer-err  ${vDesk.err.join("; ")}`);
    if (vMob.err.length > 0) results.push(`WARN  cwv-mobile-observer-err   ${vMob.err.join("; ")}`);
    // A missing LCP measurement (null) must FAIL — it means the
    // PerformanceObserver never fired, which indicates a broken measurement
    // or a page that never painted. Treating null as 0 would silently pass a
    // broken page through the gate.
    const lcpOk = (v: { lcp: number | null }) => v.lcp !== null && v.lcp < 2500;
    check("cwv-desktop-good", lcpOk(vDesk) && vDesk.cls < 0.1, fmt(vDesk));
    check("cwv-mobile-good", lcpOk(vMob) && vMob.cls < 0.1, fmt(vMob));

    check("desktop-no-console-errors", consoleErrors.length === 0, `${consoleErrors.length} errors${consoleErrors.length ? ": " + consoleErrors.slice(0, 3).join(" | ") : ""}`);

    // ---------- Font loading check ----------
    const fontsOk = await desktop.evaluate(
      () => new Promise<boolean>((resolve) => {
        (document as unknown as { fonts?: FontFaceSet }).fonts?.ready.then(() => {
          resolve((document as unknown as { fonts?: FontFaceSet }).fonts!.status === "loaded");
        });
      })
    );
    check("fonts-loaded", fontsOk, "document.fonts.status === 'loaded' (Inter active)");

    console.log("\n===== VERIFICATION RESULTS =====");
    for (const r of results) console.log(r);
    console.log("\n" + (failures.length === 0 ? "ALL CHECKS PASSED" : `FAILURES: ${failures.join(", ")}`));
    process.exitCode = failures.length === 0 ? 0 : 1;
  } finally {
    await browser.close();
    server.close();
  }
}

main().catch((e) => {
  console.error("Verification failed:", e);
  process.exit(1);
});
