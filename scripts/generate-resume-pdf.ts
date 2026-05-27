import { mkdir, writeFile } from "fs/promises";
import path from "path";
import puppeteer from "puppeteer";
import { buildResumeHtml } from "./build-resume-html";

const rootDir = path.resolve(__dirname, "..");
const publicDir = path.join(rootDir, "public");
const outputPdf = path.join(publicDir, "Resume.pdf");
const previewHtml = path.join(publicDir, "resume-preview.html");

async function main(): Promise<void> {
  const html = buildResumeHtml();

  await mkdir(publicDir, { recursive: true });
  await writeFile(previewHtml, html, "utf8");

  const browser = await puppeteer.launch({ headless: true });
  try {
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: "networkidle0" });
    await page.pdf({
      path: outputPdf,
      format: "letter",
      printBackground: true,
      margin: { top: "0.55in", right: "0.6in", bottom: "0.55in", left: "0.6in" },
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
