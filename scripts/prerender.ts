/**
 * Pre-renders the production build so crawlers and no-JS browsers get the
 * fully rendered portfolio HTML instead of an empty root div.
 *
 * Runs after `craco build`: serves build/ locally, scrolls through the page to
 * trigger scroll animations and lazy images, then writes the captured DOM back
 * to build/index.html. The SPA still boots normally for real users.
 */
import { existsSync } from "fs";
import { readFile, writeFile } from "fs/promises";
import path from "path";
import http from "http";
import type { Server } from "http";
import puppeteer from "puppeteer";

const rootDir = path.resolve(__dirname, "..");
const buildDir = path.join(rootDir, "build");
const indexPath = path.join(buildDir, "index.html");

const MIME: Record<string, string> = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".pdf": "application/pdf",
  ".xml": "application/xml",
  ".txt": "text/plain; charset=utf-8",
};

function startServer(): Promise<Server> {
  return new Promise((resolve) => {
    const server = http.createServer((req, res) => {
      const urlPath = decodeURIComponent((req.url || "/").split("?")[0]);
      const safePath = path.normalize(urlPath).replace(/^(\.\.[\/\\])+/, "");
      let filePath = path.join(buildDir, safePath);
      if (!existsSync(filePath) || safePath.endsWith("/")) {
        filePath = path.join(buildDir, "index.html");
      }
      const ext = path.extname(filePath).toLowerCase();
      readFile(filePath)
        .then((data) => {
          res.writeHead(200, { "Content-Type": MIME[ext] || "application/octet-stream" });
          res.end(data);
        })
        .catch(() => {
          res.writeHead(404);
          res.end("Not found");
        });
    });
    server.listen(0, "127.0.0.1", () => resolve(server));
  });
}

function getChromeExecutablePath(): string | undefined {
  const configuredPath = process.env.PUPPETEER_EXECUTABLE_PATH || process.env.CHROME_PATH;
  if (configuredPath && existsSync(configuredPath)) return configuredPath;
  if (process.platform === "darwin") {
    const macPath = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
    if (existsSync(macPath)) return macPath;
  }
  if (process.platform === "linux") {
    return [
      "/usr/local/bin/chromium",
      "/usr/bin/google-chrome",
      "/usr/bin/google-chrome-stable",
      "/usr/bin/chromium-browser",
      "/usr/bin/chromium",
    ].find((p) => existsSync(p));
  }
  return undefined;
}

async function main(): Promise<void> {
  if (!existsSync(indexPath)) {
    console.error(`Prerender skipped: ${indexPath} not found. Run the build first.`);
    process.exit(1);
  }

  const server = await startServer();
  const port = (server.address() as { port: number }).port;
  const url = `http://127.0.0.1:${port}/`;

  const executablePath = getChromeExecutablePath();
  const browser = await puppeteer.launch({
    headless: true,
    ...(executablePath ? { executablePath } : {}),
    args: ["--no-sandbox", "--disable-dev-shm-usage"],
  });

  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 800 });

    const consoleErrors: string[] = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") consoleErrors.push(msg.text());
    });

    await page.goto(url, { waitUntil: "networkidle0", timeout: 60000 });
    console.log("Page loaded, waiting for #work...");
    await page.waitForSelector("#work", { timeout: 30000 });
    console.log("#work found, waiting for #flagship-heading...");
    await page.waitForSelector("#flagship-heading", { timeout: 30000 });
    console.log("#flagship-heading found");
    await page.waitForFunction(
      () => document.fonts && document.fonts.ready instanceof Promise,
      { timeout: 10000 }
    ).catch(() => undefined);

    // Scroll through the whole page to trigger scroll-reveal animations.
    const scrollHeight = await page.evaluate(() => document.body.scrollHeight);
    for (let y = 0; y <= scrollHeight; y += 600) {
      await page.evaluate((pos) => window.scrollTo(0, pos), y);
      await new Promise((r) => setTimeout(r, 150));
    }
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await new Promise((r) => setTimeout(r, 1200));

    // Force remaining lazy images to load before capture.
    // First record which images are natively eager (e.g. the LCP hero image) —
    // after capture we restore loading="lazy" on everything else so real
    // browsers defer below-fold images. The <img src> stays in the raw HTML,
    // so crawlers still see every image.
    const nativelyEagerSrcs = await page.evaluate(() =>
      Array.from(document.querySelectorAll('img[loading="eager"]')).map(
        (img) => (img as HTMLImageElement).currentSrc
      )
    );
    await page.evaluate(() => {
      document.querySelectorAll('img[loading="lazy"]').forEach((img) => {
        (img as HTMLImageElement).loading = "eager";
      });
    });
    await new Promise((r) => setTimeout(r, 2000));

    // Restore native lazy loading now that every image is fetched — the
    // serialized HTML then ships loading="lazy" for below-fold images while
    // the fetched state keeps this prerender session intact.
    await page.evaluate((eagerSrcs: string[]) => {
      document.querySelectorAll('img[loading="eager"]').forEach((img) => {
        const el = img as HTMLImageElement;
        if (!eagerSrcs.includes(el.currentSrc)) {
          el.loading = "lazy";
        }
      });
    }, nativelyEagerSrcs);

    // Reveal anything still hidden by scroll-triggered entrance animations so
    // crawlers and no-JS clients receive fully visible content.
    await page.evaluate(() => {
      document.querySelectorAll("*").forEach((el) => {
        const style = (el as HTMLElement).style;
        if (style.opacity && parseFloat(style.opacity) < 1) {
          style.opacity = "1";
        }
      });
    });
    await new Promise((r) => setTimeout(r, 300));

    await page.evaluate(() => window.scrollTo(0, 0));
    await new Promise((r) => setTimeout(r, 300));

    const html = await page.evaluate(
      () => "<!DOCTYPE html>\n" + document.documentElement.outerHTML
    );

    // The non-blocking Google Fonts link is declared `media="print"` with
    // `onload="this.media='all'"`. By capture time the browser has already
    // flipped media to "all", and that state gets serialized — shipping a
    // render-blocking stylesheet in the deployed HTML. Restore the original
    // non-blocking form (browsers defer media="print" stylesheets for first
    // paint; the onload handler re-enables it; the <noscript> fallback covers
    // non-JS clients).
    let output = html;
    const fontLinkPattern = /(<link\b[^>]*fonts\.googleapis\.com[^>]*?\bmedia=)"all"/i;
    if (fontLinkPattern.test(output)) {
      output = output.replace(fontLinkPattern, '$1"print"');
      console.log("Restored non-blocking font loading (media=\"print\") in prerendered HTML");
    } else {
      console.warn(
        "Warning: expected non-blocking Google Fonts link not found in captured HTML."
      );
    }

    await writeFile(indexPath, output, "utf8");

    if (consoleErrors.length > 0) {
      console.warn("Prerender console errors:", consoleErrors);
    }
    console.log(`Pre-rendered ${indexPath} (${(output.length / 1024).toFixed(1)} KB)`);
  } finally {
    await browser.close();
    server.close();
  }
}

main().catch((err) => {
  console.error("Prerender failed:", err);
  process.exit(1);
});
