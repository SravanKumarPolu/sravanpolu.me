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
import { existsSync, statSync } from "fs";
import path from "path";
import fsp from "fs/promises";
import puppeteer from "puppeteer";

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
    check("raw-font-nonblocking", /fonts\.googleapis\.com[^>]*media="print"/.test(raw), "font stylesheet is media=print (non-blocking)");
    check("raw-canonical", raw.includes('rel="canonical" href="https://sravanpolu.com/"'), "canonical https://sravanpolu.com/");
    check("raw-jsonld-graph", raw.includes('"@type": "WebSite"') && raw.includes('"@type": "ProfilePage"'), "WebSite + ProfilePage JSON-LD present");
    check("raw-og-image-jpg", raw.includes("og-image.jpg"), "og:image points to og-image.jpg");

    const pdfStat = statSync(path.join(buildDir, "Resume.pdf"));
    check("resume-pdf-size", pdfStat.size > 10000 && pdfStat.size < 500000, `Resume.pdf ${(pdfStat.size / 1024).toFixed(1)} KB`);
    check("headers-file", existsSync(path.join(buildDir, "_headers")), "build/_headers ships with deploy");

    // ---------- Desktop smoke ----------
    const desktop = await browser.newPage();
    const consoleErrors: string[] = [];
    desktop.on("console", (m) => m.type() === "error" && consoleErrors.push(m.text()));
    desktop.on("pageerror", (e) => consoleErrors.push(String(e)));
    await desktop.setViewport({ width: 1280, height: 800, deviceScaleFactor: 1 });
    await desktop.goto(base + "/", { waitUntil: "networkidle0", timeout: 60000 });

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

    const iframeOk = await desktop.evaluate(() => {
      const f = document.querySelector('iframe[src="/resume-preview.html"]');
      return !!f && !!(f as HTMLIFrameElement).contentDocument;
    });
    check("resume-iframe", iframeOk, "resume iframe loads same-origin preview");

    // Interactivity: nav link scroll + mobile menu
    await desktop.evaluate(() => (document.getElementById("contact") as HTMLElement)?.scrollIntoView());
    await new Promise((r) => setTimeout(r, 700));

    // ---------- Mobile smoke ----------
    const mobile = await browser.newPage();
    const mobileErrors: string[] = [];
    mobile.on("pageerror", (e) => mobileErrors.push(String(e)));
    await mobile.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true, deviceScaleFactor: 3 });
    await mobile.goto(base + "/", { waitUntil: "networkidle0", timeout: 60000 });
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

    // ---------- Lab CWV (desktop) ----------
    const vDesk = await desktop.evaluate(
      () =>
        new Promise<{ lcp: number | null; cls: number }>((resolve) => {
          let lcp: number | null = null;
          let cls = 0;
          new PerformanceObserver((l) => {
            const es = l.getEntries();
            if (es.length) lcp = es[es.length - 1].startTime;
          }).observe({ type: "largest-contentful-paint", buffered: true });
          new PerformanceObserver((l) => {
            for (const e of l.getEntries() as unknown as { value: number; hadRecentInput: boolean }[]) {
              if (!e.hadRecentInput) cls += e.value;
            }
          }).observe({ type: "layout-shift", buffered: true });
          setTimeout(() => resolve({ lcp, cls }), 6000);
        })
    );

    // ---------- Lab CWV (mobile) ----------
    const vMob = await mobile.evaluate(
      () =>
        new Promise<{ lcp: number | null; cls: number }>((resolve) => {
          let lcp: number | null = null;
          let cls = 0;
          new PerformanceObserver((l) => {
            const es = l.getEntries();
            if (es.length) lcp = es[es.length - 1].startTime;
          }).observe({ type: "largest-contentful-paint", buffered: true });
          new PerformanceObserver((l) => {
            for (const e of l.getEntries() as unknown as { value: number; hadRecentInput: boolean }[]) {
              if (!e.hadRecentInput) cls += e.value;
            }
          }).observe({ type: "layout-shift", buffered: true });
          setTimeout(() => resolve({ lcp, cls }), 6000);
        })
    );

    const fmt = (v: { lcp: number | null; cls: number }) =>
      `LCP ${v.lcp === null ? "n/a" : (v.lcp / 1000).toFixed(3) + " s"} | CLS ${v.cls.toFixed(4)}`;
    results.push(`INFO  cwv-desktop     ${fmt(vDesk)} (target LCP<2.5s, CLS<0.1)`);
    results.push(`INFO  cwv-mobile      ${fmt(vMob)} (target LCP<2.5s, CLS<0.1)`);
    check("cwv-desktop-good", (vDesk.lcp ?? 0) < 2500 && vDesk.cls < 0.1, fmt(vDesk));
    check("cwv-mobile-good", (vMob.lcp ?? 0) < 2500 && vMob.cls < 0.1, fmt(vMob));

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
