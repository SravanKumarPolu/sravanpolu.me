import http from "http";
import { existsSync } from "fs";
import path from "path";
import fsp from "fs/promises";
import puppeteer from "puppeteer";

const buildDir = path.resolve(__dirname, "..", "build");
const MIME: Record<string, string> = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".png": "image/png", ".jpg": "image/jpeg", ".svg": "image/svg+xml", ".ico": "image/x-icon", ".pdf": "application/pdf", ".xml": "application/xml", ".txt": "text/plain", ".webp": "image/webp" };

function startServer() {
  return new Promise<{ server: http.Server; port: number }>((resolve) => {
    const server = http.createServer((req, res) => {
      const urlPath = decodeURIComponent((req.url || "/").split("?")[0]);
      const safePath = path.normalize(urlPath).replace(/^(\.\.[\/\\])+/, "");
      let filePath = path.join(buildDir, safePath);
      if (safePath === "/" || safePath.endsWith("/") || !existsSync(filePath)) filePath = path.join(buildDir, "index.html");
      if (!existsSync(filePath)) { res.writeHead(404).end("Not found"); return; }
      const ext = path.extname(filePath).toLowerCase();
      fsp.readFile(filePath).then((data) => {
        res.writeHead(200, { "Content-Type": MIME[ext] || "application/octet-stream" });
        res.end(data);
      }).catch(() => res.writeHead(404).end("Not found"));
    });
    server.listen(0, "127.0.0.1", () => resolve({ server, port: (server.address() as { port: number }).port }));
  });
}

const SOURCE = `
(function () {
  window.__diag = { lcp: [], cls: 0, err: [], imgLoads: [], mutations: 0, imgMutations: 0, visibilityChanges: [] };
  function desc(el) {
    if (!el) return "<none>";
    var id = el.id ? "#" + el.id : "";
    var cls = (el.className && typeof el.className === "string") ? "." + el.className.split(/\\s+/).filter(Boolean).slice(0,3).join(".") : "";
    var t = el.tagName.toLowerCase();
    var u = el.currentSrc || el.src || el.href || "";
    var tx = (el.textContent && el.textContent.trim()) ? el.textContent.trim().slice(0, 60) : "";
    return t + id + cls + (u ? " url=" + String(u).slice(0,80) : "") + (tx ? " text=\\"" + tx + "\\"" : "");
  }
  try {
    new PerformanceObserver(function (list) {
      var es = list.getEntries();
      if (!es) return;
      for (var i = 0; i < es.length; i++) {
        var e = es[i];
        window.__diag.lcp.push({ startTime: e.startTime, size: e.size, tag: desc(e.element), url: e.url });
      }
    }).observe({ type: "largest-contentful-paint", buffered: true });
  } catch (e) { window.__diag.err.push("lcp:" + e); }
  try {
    new PerformanceObserver(function (list) {
      var es = list.getEntries();
      if (!es) return;
      for (var i = 0; i < es.length; i++) {
        if (!es[i].hadRecentInput) window.__diag.cls += es[i].value;
      }
    }).observe({ type: "layout-shift", buffered: true });
  } catch (e) {}
  // Track img element loads
  document.addEventListener("load", function (e) {
    var t = e.target;
    if (t && t.tagName === "IMG") {
      window.__diag.imgLoads.push({ time: performance.now(), src: String(t.currentSrc || t.src).slice(0, 100), w: t.naturalWidth, h: t.naturalHeight });
    }
  }, true);
  // Track DOM mutations on img elements
  var obs = new MutationObserver(function (muts) {
    for (var i = 0; i < muts.length; i++) {
      window.__diag.mutations++;
      for (var j = 0; j < muts[i].addedNodes.length; j++) {
        var n = muts[i].addedNodes[j];
        if (n.nodeName === "IMG") {
          window.__diag.imgMutations++;
          window.__diag.imgLoads.push({ time: performance.now(), src: String(n.src || n.currentSrc).slice(0, 100), added: true });
        }
      }
    }
  });
  obs.observe(document.documentElement, { childList: true, subtree: true });
  // Track visibility changes (React hydration might hide/show things)
  document.addEventListener("visibilitychange", function () {
    window.__diag.visibilityChanges.push({ time: performance.now(), state: document.visibilityState });
  });
})();
`;

async function main() {
  const { server, port } = await startServer();
  const base = `http://127.0.0.1:${port}`;
  const browser = await puppeteer.launch({
    headless: true,
    executablePath: process.env.PUPPETEER_EXECUTABLE_PATH,
    args: ["--no-sandbox", "--disable-dev-shm-usage"],
  });

  for (const cpu of [1, 4, 8, 16]) {
    console.log(`\n========== CPU throttle = ${cpu}x ==========`);
    // Replicate EXACTLY verify-build.ts scroll behavior, but with our observer registered early.
    const page = await browser.newPage();
    await page.evaluateOnNewDocument(SOURCE);
    const client = await page.target().createCDPSession();
    if (cpu > 1) await client.send("Emulation.setCPUThrottlingRate", { rate: cpu });
    await page.setViewport({ width: 1280, height: 800, deviceScaleFactor: 1 });
    const consoleErrors: string[] = [];
    page.on("console", (m) => m.type() === "error" && consoleErrors.push(m.text()));
    page.on("pageerror", (e) => consoleErrors.push(String(e)));
    await page.goto(base + "/", { waitUntil: "networkidle0", timeout: 120000 });

    await page.evaluate(() => document.getElementById("resume")?.scrollIntoView());
    try {
      await page.waitForSelector('iframe[src="/resume-preview.html"]', { timeout: 30000 });
      await new Promise((r) => setTimeout(r, 500));
    } catch {}
    await page.evaluate(() => document.getElementById("contact")?.scrollIntoView());
    await new Promise((r) => setTimeout(r, 700));

    await new Promise((r) => setTimeout(r, 6000));

    const snap = await page.evaluate(() => {
      const d = (window as any).__diag || { lcp: [], cls: 0, err: ["no __diag"] };
      const nav = performance.getEntriesByType("navigation")[0] as any;
      const fcp = performance.getEntriesByType("paint").find((p: any) => p.name === "first-contentful-paint") as any;
      const last = d.lcp.length ? d.lcp[d.lcp.length - 1] : null;
      return {
        ttfb: nav ? nav.responseStart : null,
        domContentLoaded: nav ? nav.domContentLoadedEventEnd : null,
        loadEvent: nav ? nav.loadEventEnd : null,
        fcp: fcp ? fcp.startTime : null,
        lcp: last ? last.startTime : null,
        lcpSize: last ? last.size : null,
        lcpTag: last ? last.tag : null,
        allLcp: d.lcp,
        cls: d.cls,
        err: d.err,
        imgLoads: d.imgLoads,
        imgMutations: d.imgMutations,
        mutations: d.mutations,
        visibilityChanges: d.visibilityChanges,
      };
    });

    console.log(`  TTFB             : ${snap.ttfb?.toFixed(0)} ms`);
    console.log(`  FCP              : ${snap.fcp?.toFixed(0)} ms`);
    console.log(`  DOMContentLoaded : ${snap.domContentLoaded?.toFixed(0)} ms`);
    console.log(`  loadEvent        : ${snap.loadEvent?.toFixed(0)} ms`);
    console.log(`  LCP              : ${snap.lcp === null ? "n/a" : (snap.lcp / 1000).toFixed(3) + " s"}`);
    console.log(`  LCP size         : ${snap.lcpSize} px²`);
    console.log(`  LCP element      : ${snap.lcpTag}`);
    console.log(`  CLS              : ${snap.cls.toFixed(4)}`);
    console.log(`  Mutations / IMG  : ${snap.mutations} / ${snap.imgMutations}`);
    console.log(`  LCP entries (${snap.allLcp.length}):`);
    snap.allLcp.forEach((e: any, i: number) => {
      console.log(`    [${i}] t=${(e.startTime / 1000).toFixed(3)}s size=${e.size} el=${e.tag.slice(0, 80)}`);
    });
    console.log(`  IMG load events (first 6):`);
    snap.imgLoads.slice(0, 6).forEach((e: any, i: number) => {
      console.log(`    [${i}] t=${(e.time / 1000).toFixed(3)}s w=${e.w} h=${e.h} ${e.added ? "ADDED " : ""}${e.src.split("/").pop()}`);
    });
    await page.close();
  }

  await browser.close();
  server.close();
}

main().catch((e) => { console.error(e); process.exit(1); });
