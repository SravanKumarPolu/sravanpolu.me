import { existsSync } from "fs";
import { mkdir, writeFile } from "fs/promises";
import path from "path";
import puppeteer from "puppeteer";
import { buildResumeHtml } from "./build-resume-html";

const rootDir = path.resolve(__dirname, "..");
const publicDir = path.join(rootDir, "public");
const outputPdf = path.join(publicDir, "Resume.pdf");
const previewHtml = path.join(publicDir, "resume-preview.html");

function getChromeExecutablePath(): string | undefined {
  const configuredPath = process.env.PUPPETEER_EXECUTABLE_PATH || process.env.CHROME_PATH;
  if (configuredPath && existsSync(configuredPath)) {
    return configuredPath;
  }

  if (process.platform === "darwin") {
    const macPath = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
    if (existsSync(macPath)) {
      return macPath;
    }
  }

  if (process.platform === "linux") {
    const linuxPaths = [
      "/usr/local/bin/chromium",
      "/usr/bin/google-chrome",
      "/usr/bin/google-chrome-stable",
      "/usr/bin/chromium-browser",
      "/usr/bin/chromium",
    ];
    return linuxPaths.find((p) => existsSync(p));
  }

  if (process.platform === "win32") {
    const winPaths = [
      process.env.PROGRAMFILES + "\\Google\\Chrome\\Application\\chrome.exe",
      process.env["PROGRAMFILES(X86)"] + "\\Google\\Chrome\\Application\\chrome.exe",
    ].filter(Boolean) as string[];
    return winPaths.find((p) => existsSync(p));
  }

  return undefined;
}

async function main(): Promise<void> {
  const html = buildResumeHtml();

  await mkdir(publicDir, { recursive: true });
  await writeFile(previewHtml, html, "utf8");

  const executablePath = getChromeExecutablePath();
  const browser = await puppeteer.launch({
    headless: true,
    ...(executablePath ? { executablePath } : {}),
  });
  try {
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: "networkidle0" });
    // Ensure the embedded base64 fonts are fully loaded before printing.
    await page.evaluateHandle("document.fonts.ready");
    await page.pdf({
      path: outputPdf,
      format: "letter",
      printBackground: true,
      margin: { top: "0.567in", right: "0.73in", bottom: "0.5in", left: "0.73in" },
    });
  } finally {
    await browser.close();
  }

  console.log(`Wrote ${outputPdf}`);
  console.log(`Preview HTML: ${previewHtml}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
