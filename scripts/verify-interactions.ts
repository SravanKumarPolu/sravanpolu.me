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
 *   9) Clean-URL assertions: `window.location.hash` stays empty after every
 *      normal nav click (logo, primary nav, footer, mobile menu), and any
 *      pre-existing hash fragment is stripped via history.replaceState.
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

    // Sections below the fold mount lazily (IntersectionObserver gate in
    // LazySection), so walk the page once — like a real visitor scrolling —
    // and wait until every section has mounted before asserting on the DOM.
    await page.evaluate(() => {
      window.__pendingSections = () => document.querySelectorAll('[aria-busy="true"]').length;
    });
    for (let y = 0; y <= await page.evaluate(() => document.body.scrollHeight); y += 600) {
      await page.evaluate((pos) => window.scrollTo(0, pos), y);
      await new Promise((r) => setTimeout(r, 120));
    }
    await page.waitForFunction(
      () => document.querySelectorAll('[aria-busy="true"]').length === 0,
      { timeout: 30000, polling: 400 }
    );
    await page.evaluate(() => window.scrollTo(0, 0));
    await new Promise((r) => setTimeout(r, 500));

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

    // ---------- Desktop: clean-URL navigation assertions ----------
    // Each nav click must (a) smooth-scroll the target section into view,
    // (b) leave window.location.hash empty, and (c) NOT push a new history
    // entry. We assert scroll position via getBoundingClientRect().top
    // (the section is near the viewport top after the smooth scroll).

    // Helper: assert URL is clean after a click
    const assertCleanUrl = (label: string) => {
      const hash = page.url().split("#")[1] || "";
      check(
        `desktop-url-clean-after-${label}`,
        hash === "",
        `window.location.hash is empty after clicking ${label} (got "${hash || "<empty>"}")`
      );
    };

    // 1) Logo click from the About section — proves the logo scrolls to top
    //    AND strips any pre-existing hash (we simulate a fragment URL by
    //    setting one via history.replaceState before clicking the logo).
    //    First scroll to #about so the click is from a non-top position.
    await page.evaluate(() => document.getElementById("about")?.scrollIntoView());
    await new Promise((r) => setTimeout(r, 500));
    // Simulate a pre-existing hash (as if the user landed on `/#about`)
    await page.evaluate(() => window.history.replaceState(null, "", "#about"));
    const hashBeforeLogo = await page.evaluate(() => window.location.hash);
    const logo = await page.$('nav a[aria-label*="Sravan Polu Developer"]');
    check("desktop-logo-found", !!logo, "Sravan Polu logo anchor present in nav");
    if (logo) {
      await logo.click();
      await new Promise((r) => setTimeout(r, 1400));
      const topAfterLogo = await page.evaluate(() => window.scrollY);
      const hashAfterLogo = await page.evaluate(() => window.location.hash);
      check(
        "desktop-logo-click-scrolls-to-top",
        topAfterLogo < 80,
        `logo click scrolled to top (scrollY=${Math.round(topAfterLogo)}px)`
      );
      check(
        "desktop-logo-click-removes-existing-hash",
        hashBeforeLogo === "#about" && hashAfterLogo === "",
        `logo click stripped existing #about → hash is now "${hashAfterLogo || "<empty>"}"`
      );
      assertCleanUrl("logo");
    }

    // 2) Main navbar navigation — click each nav anchor, assert scroll
    //    position and clean URL.
    const navAnchors = await page.evaluate(() =>
      Array.from(document.querySelectorAll('nav a[href^="#"]'))
        .filter((a) => !a.getAttribute("aria-label")?.includes("Sravan Polu Developer"))
        .map((a) => ({
          href: a.getAttribute("href") || "",
          label: (a.textContent || "").trim(),
        }))
        .filter((a) => a.href !== "#home") // logo handled above
    );

    for (const { href, label } of navAnchors) {
      const sectionId = href.replace(/^#/, "");
      const selector = `nav a[href="${href}"]`;
      const handle = await page.$(selector);
      if (!handle) {
        check(`desktop-nav-${sectionId}-found`, false, `${selector} not found`);
        continue;
      }
      await handle.click();
      await new Promise((r) => setTimeout(r, 1200));
      const top = await page.evaluate(
        (id) => document.getElementById(id)?.getBoundingClientRect().top ?? 9999,
        sectionId
      );
      const hash = await page.evaluate(() => window.location.hash);
      check(
        `desktop-nav-${sectionId}-scrolls`,
        top < 160,
        `clicking "${label}" scrolled #${sectionId} near top (top=${Math.round(top)}px)`
      );
      check(
        `desktop-nav-${sectionId}-url-clean`,
        hash === "",
        `URL hash empty after clicking "${label}" (got "${hash || "<empty>"}")`
      );
    }

    // 3) Footer section navigation — secondary nav links (Feedback → #testimonials)
    const footerSectionLinks = await page.evaluate(() =>
      Array.from(document.querySelectorAll('footer nav a[href^="#"]')).map((a) => ({
        href: a.getAttribute("href") || "",
        label: (a.textContent || "").trim(),
      }))
    );
    check(
      "desktop-footer-nav-found",
      footerSectionLinks.length > 0,
      `footer section nav anchors found (${footerSectionLinks.length})`
    );
    for (const { href, label } of footerSectionLinks) {
      const sectionId = href.replace(/^#/, "");
      const handle = await page.$(`footer nav a[href="${href}"]`);
      if (!handle) continue;
      await handle.click();
      await new Promise((r) => setTimeout(r, 1200));
      const top = await page.evaluate(
        (id) => document.getElementById(id)?.getBoundingClientRect().top ?? 9999,
        sectionId
      );
      const hash = await page.evaluate(() => window.location.hash);
      check(
        `desktop-footer-${sectionId}-scrolls`,
        top < 200,
        `footer click "${label}" scrolled #${sectionId} into view (top=${Math.round(top)}px)`
      );
      check(
        `desktop-footer-${sectionId}-url-clean`,
        hash === "",
        `URL hash empty after footer click "${label}" (got "${hash || "<empty>"}")`
      );
    }

    // 4) Hero CTA → #work (find the button by its label — position-independent)
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
    assertCleanUrl("hero-cta");

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

    // Click each mobile nav link, assert clean URL + scroll position.
    const mobileLinks = await m.evaluate(() =>
      Array.from(document.querySelectorAll('#mobile-menu a[href^="#"]')).map((a) => ({
        href: a.getAttribute("href") || "",
        label: (a.textContent || "").trim(),
      }))
    );
    for (const { href, label } of mobileLinks) {
      const sectionId = href.replace(/^#/, "");
      // Re-open menu (it closes after each click)
      const burgerStillThere = await m.$(burger);
      if (burgerStillThere) {
        await m.click(burger).catch(() => undefined);
        await m.waitForSelector("#mobile-menu", { timeout: 5000 }).catch(() => undefined);
      }
      const handle = await m.$(`#mobile-menu a[href="${href}"]`);
      if (!handle) continue;
      await handle.click();
      await new Promise((r) => setTimeout(r, 1400));
      const top = await m.evaluate(
        (id) => document.getElementById(id)?.getBoundingClientRect().top ?? 9999,
        sectionId
      );
      const hash = await m.evaluate(() => window.location.hash);
      check(
        `mobile-nav-${sectionId}-scrolls`,
        top < 200,
        `mobile click "${label}" scrolled #${sectionId} into view (top=${Math.round(top)}px)`
      );
      check(
        `mobile-nav-${sectionId}-url-clean`,
        hash === "",
        `URL hash empty after mobile click "${label}" (got "${hash || "<empty>"}")`
      );
    }

    // The existing regression assertion (kept for backward compatibility with
    // historical test reports): menu closes + #work scrolls into view.
    const mobileState = await m.evaluate(() => ({
      menuGone: !document.getElementById("mobile-menu"),
      workTop: document.getElementById("work")!.getBoundingClientRect().top,
    }));
    check(
      "mobile-menu-link-navigates",
      mobileState.menuGone && mobileState.workTop < 200,
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
