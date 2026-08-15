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
    return ["/usr/bin/google-chrome", "/usr/bin/chromium-browser", "/usr/bin/chromium"].find((p) =>
      existsSync(p)
    );
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
    console.log("#work found, waiting for #production-heading...");
    await page.waitForSelector("#production-heading", { timeout: 30000 });
    console.log("#production-heading found");
    await page.waitForFunction(
      () => document.fonts && document.fonts.ready instanceof Promise,
      { timeout: 10000 }
    ).catch(() => undefined);

    // Scroll through the whole page to trigger scroll-reveal animations.
    const scrollHeight = await page.evaluate(() => document.body.scrollHeight);
    for (let y = 0; y <= scrollHeight; y += 600) {
      await page.evaluate((pos) => window.scrollTo(0, pos), y);
      await new Promise((r) => setTimeout(r, 100));
    }
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await new Promise((r) => setTimeout(r, 800));

    // Force remaining lazy images to load before capture.
    await page.evaluate(() => {
      document.querySelectorAll('img[loading="lazy"]').forEach((img) => {
        (img as HTMLImageElement).loading = "eager";
      });
    });
    await new Promise((r) => setTimeout(r, 2000));

    await page.evaluate(() => window.scrollTo(0, 0));
    await new Promise((r) => setTimeout(r, 300));

    const html = await page.evaluate(
      () => "<!DOCTYPE html>\n" + document.documentElement.outerHTML
    );
    await writeFile(indexPath, html, "utf8");

    if (consoleErrors.length > 0) {
      console.warn("Prerender console errors:", consoleErrors);
    }
    console.log(`Pre-rendered ${indexPath} (${(html.length / 1024).toFixed(1)} KB)`);
  } finally {
    await browser.close();
    server.close();
  }
}

main().catch((err) => {
  console.error("Prerender failed:", err);
  process.exit(1);
});
