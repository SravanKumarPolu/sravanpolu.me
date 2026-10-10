/**
 * Post-mount interaction & regression verification.
 *
 * verify-build.ts checks the static/prerendered state; this script proves the
 * React application actually takes over from the prerendered DOM and stays
 * fully interactive:
 *   1) React mount detection (react container key on #root)
 *   2) No duplicate DOM after mount (single h1/title/JSON-LD, one of each section)
 *   3) Prerendered h1 content === mounted h1 content (no content swap/flicker)
 *   4) Navigation clicks scroll (event handlers work — desktop + mobile menu)
 *   5) Hero CTA, resume download link, contact affordances
 *   6) Accessibility basics survive the mount (skip link, alt coverage)
 *   7) Console/page errors after a full interaction session: 0
 *   8) Long-task count during the session (INP proxy, informational)
 */
import http from "http";
import { existsSync } from "fs";
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
      fsp.readFile(filePath).then((data) => {
        res.writeHead(200, { "Content-Type": MIME[ext] || "application/octet-stream" });
        res.end(data);
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
  return [
    "/usr/local/bin/chromium",
    "/usr/bin/google-chrome",
    "/usr/bin/chromium-browser",
    "/usr/bin/chromium",
  ]
    .map((p) => (existsSync(p) ? p : undefined))
    .find(Boolean);
}

const SECTION_IDS = ["home", "about", "services", "work", "resume", "skills", "testimonials", "contact", "footer"];

async function main(): Promise<void> {
  const { server, port } = await startServer();
  const base = `http://127.0.0.1:${port}`;
  const results: string[] = [];
  const failures: string[] = [];
  const check = (name: string, ok: boolean, detail: string) => {
    results.push(`${ok ? "PASS" : "FAIL"}  ${name}  ${detail}`);
    if (!ok) failures.push(name);
  };

  const browser = await puppeteer.launch({
    headless: true,
    ...(getChrome() ? { executablePath: getChrome() } : {}),
    args: ["--no-sandbox", "--disable-dev-shm-usage"],
  });

  try {
    // ---------- Raw (pre-JS) reference values ----------
    const raw = await (await fetch(`${base}/`)).text();
    const rawH1 = raw.match(/<h1[^>]*>([\s\S]*?)<\/h1>/)?.[1]?.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim() || "";

    // ---------- Desktop: mount + interactions ----------
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 800 });
    const consoleErrors: string[] = [];
    const pageErrors: string[] = [];
    page.on("console", (m) => m.type() === "error" && consoleErrors.push(m.text()));
    page.on("pageerror", (e) => pageErrors.push(String(e)));
    await page.evaluateOnNewDocument(() => {
      (window as unknown as { __longTasks: number }).__longTasks = 0;
      try {
        new PerformanceObserver((list) => {
          (window as unknown as { __longTasks: number }).__longTasks += list.getEntries().length;
        }).observe({ entryTypes: ["longtask"] });
      } catch {
        /* PerformanceObserver support varies */
      }
    });

    await page.goto(base + "/", { waitUntil: "networkidle0", timeout: 60000 });

    // React 18 sets a __reactContainer$… internal key on the container once mounted.
    const mounted = await page.waitForFunction(
      () =>
        !!document.getElementById("root") &&
        Object.keys(document.getElementById("root")!).some((k) => k.startsWith("__reactContainer")),
      { timeout: 15000 }
    );
    check("desktop-react-mounted", !!mounted, "#root carries a React 18 container key (client render took over)");
    await new Promise((r) => setTimeout(r, 500)); // let post-mount effects settle

    const dom = await page.evaluate((ids: string[]) => {
      const h1s = document.querySelectorAll("h1");
      const h1 = h1s[0]?.textContent?.replace(/\s+/g, " ").trim() || "";
      return {
        h1Count: h1s.length,
        h1,
        titleCount: document.querySelectorAll("title").length,
        jsonLdCount: document.querySelectorAll('script[type="application/ld+json"]').length,
        sectionCounts: Object.fromEntries(ids.map((id) => [id, document.querySelectorAll(`#${id}`).length])),
        navLinkCount: document.querySelectorAll('nav a[href^="#"]').length,
        imgsMissingAlt: Array.from(document.images).filter((i) => !i.hasAttribute("alt")).length,
        imgsBroken: Array.from(document.images).filter((i) => i.complete && i.naturalWidth === 0).length,
        skipLink: !!document.querySelector('a[href="#main-content"]'),
        resumeBtn: !!document.querySelector('nav a[aria-label="Download resume PDF"]'),
        contactMailto: document.querySelectorAll('#contact a[href^="mailto:"]').length,
        contactForm: !!document.querySelector("#contact form"),
      };
    }, SECTION_IDS);

    check("desktop-h1-single", dom.h1Count === 1, `exactly one <h1> after mount (found ${dom.h1Count})`);
    check(
      "desktop-h1-content-stable",
      dom.h1.length > 0 && dom.h1 === rawH1,
      `prerendered and mounted h1 text match: "${dom.h1.slice(0, 60)}"`
    );
    check("desktop-title-single", dom.titleCount === 1, `exactly one <title> after mount (${dom.titleCount})`);
    check("desktop-jsonld-single", dom.jsonLdCount === 1, `exactly one JSON-LD block after mount (${dom.jsonLdCount})`);
    const dupSections = Object.entries(dom.sectionCounts).filter(([, n]) => (n as number) !== 1);
    check(
      "desktop-no-duplicate-sections",
      dupSections.length === 0,
      dupSections.length === 0 ? "all 9 sections present exactly once" : `duplicated: ${dupSections.map(([id, n]) => `${id}×${n}`).join(", ")}`
    );
    check("desktop-nav-links", dom.navLinkCount >= 7, `${dom.navLinkCount} in-page nav anchors rendered`);
    check("desktop-images-alt", dom.imgsMissingAlt === 0, `all <img> have alt (${dom.imgsMissingAlt} missing)`);
    check("desktop-images-loaded", dom.imgsBroken === 0, `${dom.imgsBroken} broken images after load`);
    check("desktop-skip-link", dom.skipLink, "skip-to-content link present after mount");
    check("desktop-resume-button", dom.resumeBtn, "resume download button rendered in nav");
    check(
      "desktop-contact-affordance",
      dom.contactMailto > 0 || dom.contactForm,
      `mailto links: ${dom.contactMailto}, form: ${dom.contactForm}`
    );

    // Nav click → smooth scroll (proves React handlers are attached post-mount)
    await page.click('nav a[href="#about"]');
    await new Promise((r) => setTimeout(r, 1400));
    const aboutTop = await page.evaluate(() => document.getElementById("about")!.getBoundingClientRect().top);
    check("desktop-nav-click-scrolls", aboutTop < 160, `clicking "About" scrolled it near the top (top=${Math.round(aboutTop)}px)`);

    // Hero CTA → #work (find the button by its label — position-independent)
    await page.evaluate(() => window.scrollTo(0, 0));
    await new Promise((r) => setTimeout(r, 400));
    await page.evaluate(() => {
      const btn = Array.from(document.querySelectorAll<HTMLButtonElement>("main button")).find((b) =>
        b.textContent?.includes("View Featured Work")
      );
      if (!btn) throw new Error('Hero CTA "View Featured Work" not found');
      btn.click();
    });
    await new Promise((r) => setTimeout(r, 1400));
    const workTop = await page.evaluate(() => document.getElementById("work")!.getBoundingClientRect().top);
    check("desktop-hero-cta-scrolls", workTop < 160, `hero CTA scrolled #work near the top (top=${Math.round(workTop)}px)`);

    const resumePdf = await fetch(`${base}/Resume.pdf`);
    check("desktop-resume-pdf", resumePdf.status === 200 && (await resumePdf.arrayBuffer()).byteLength > 10000, "/Resume.pdf serves (>10 KB)");

    const longTasks = await page.evaluate(() => (window as unknown as { __longTasks: number }).__longTasks);
    results.push(`INFO  desktop-long-tasks  ${longTasks} long tasks (>50ms) during session (INP proxy)`);
    check(
      "desktop-no-console-errors",
      consoleErrors.length === 0 && pageErrors.length === 0,
      `${consoleErrors.length} console errors, ${pageErrors.length} page errors`
    );
    await page.close();

    // ---------- Mobile: hamburger menu ----------
    const m = await browser.newPage();
    await m.setViewport({ width: 375, height: 667 });
    const mErrors: string[] = [];
    m.on("pageerror", (e) => mErrors.push(String(e)));
    await m.goto(base + "/", { waitUntil: "networkidle0", timeout: 60000 });
    await m.waitForFunction(
      () =>
        !!document.getElementById("root") &&
        Object.keys(document.getElementById("root")!).some((k) => k.startsWith("__reactContainer")),
      { timeout: 15000 }
    );

    const burger = 'nav button[aria-controls="mobile-menu"]';
    await m.click(burger);
    await m.waitForSelector("#mobile-menu", { timeout: 5000 });
    check("mobile-menu-opens", true, "hamburger opens the mobile menu after mount");

    await m.keyboard.press("Escape");
    await new Promise((r) => setTimeout(r, 400));
    const menuAfterEsc = await m.evaluate(() => !document.getElementById("mobile-menu"));
    check("mobile-menu-escape-closes", menuAfterEsc, "Escape closes the mobile menu");

    await m.click(burger);
    await m.waitForSelector("#mobile-menu", { timeout: 5000 });
    await m.click('#mobile-menu a[href="#work"]');
    await new Promise((r) => setTimeout(r, 1400));
    const mobileState = await m.evaluate(() => ({
      menuGone: !document.getElementById("mobile-menu"),
      workTop: document.getElementById("work")!.getBoundingClientRect().top,
    }));
    check(
      "mobile-menu-link-navigates",
      mobileState.menuGone && mobileState.workTop < 160,
      `menu closes and #work scrolled into view (menuGone=${mobileState.menuGone}, top=${Math.round(mobileState.workTop)}px)`
    );
    check("mobile-no-page-errors", mErrors.length === 0, `${mErrors.length} page errors on mobile`);
    await m.close();

    console.log("\n===== INTERACTION RESULTS =====");
    results.forEach((r) => console.log(r));
    console.log(
      `\n${failures.length === 0 ? "ALL INTERACTION CHECKS PASSED" : `${failures.length} FAILURES: ${failures.join(", ")}`}`
    );
    if (failures.length > 0) process.exit(1);
  } finally {
    await browser.close();
    server.close();
  }
}

main().catch((err) => {
  console.error("Interaction verification failed:", err);
  process.exit(1);
});
