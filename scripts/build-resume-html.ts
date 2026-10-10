import { readFileSync } from "fs";
import path from "path";
import type {
  ResumeEducation,
  ResumeExperience,
  ResumeProject,
} from "../src/constants/resume-data";
import {
  resumeEducation,
  resumeExperience,
  resumeProductionProjects,
  resumeProfile,
  resumeSkillGroups,
  resumeSummary,
} from "../src/constants/resume-data";

/**
 * Single-column resume layout.
 * Design reference: the uploaded single-column resume PDF (letter page, centered
 * header, full-width sections, one skill category per line, Noto Serif typeface).
 * Fonts are embedded as base64 data URIs so the build renders identically on any
 * machine, with no system-font or network dependency.
 */

const fontsDir = path.resolve(__dirname, "fonts");

function fontDataUri(fileName: string): string {
  const buffer = readFileSync(path.join(fontsDir, fileName));
  return `data:font/ttf;base64,${buffer.toString("base64")}`;
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/**
 * Uppercase a display string while keeping parenthesized fragments verbatim,
 * e.g. "Full-Stack Developer (MERN + DevOps)" -> "FULL-STACK DEVELOPER (MERN + DevOps)".
 */
function displayUpper(text: string): string {
  return text.replace(/(\([^)]*\))|[^()]+/g, (match, paren: string) =>
    paren ? paren : match.toUpperCase()
  );
}

/** Status suffix shown after a project name, matching the reference ("NexCartis (Beta)"). */
function statusSuffix(status: ResumeProject["status"]): string {
  return status === "beta" ? " (Beta)" : "";
}

function renderSkillGroups(): string {
  return resumeSkillGroups
    .map(
      (g) =>
        `<p class="skill-line"><strong>${escapeHtml(g.label)}:</strong> ${g.skills
          .map((s) => escapeHtml(s))
          .join(", ")}</p>`
    )
    .join("");
}

function renderExperience(items: ResumeExperience[]): string {
  return items
    .map(
      (job) => `
    <article class="entry">
      <p class="entry-head"><strong>${escapeHtml(job.role)}</strong>  |  ${escapeHtml(
        job.company
      )} · ${escapeHtml(job.location)}  |  ${escapeHtml(job.start)}–${escapeHtml(job.end)}</p>
      <ul>
        ${job.bullets.map((b) => `<li>${escapeHtml(b)}</li>`).join("\n        ")}
      </ul>
    </article>`
    )
    .join("");
}

function renderProjects(items: ResumeProject[]): string {
  return items
    .map(
      (p) => `
    <article class="entry project">
      <p class="entry-head"><strong>${escapeHtml(p.name)}${statusSuffix(
        p.status
      )}</strong>  |  ${escapeHtml(p.linkLabel ?? p.link)}</p>
      <p class="desc">${escapeHtml(p.description)}  Tech: ${p.tags
        .map((t) => escapeHtml(t))
        .join(", ")}.</p>
    </article>`
    )
    .join("");
}

function renderEducation(items: ResumeEducation[]): string {
  if (items.length === 0) return "";
  return items
    .map(
      (e) =>
        `<p class="edu-line">${escapeHtml(e.degree)}  |  ${escapeHtml(
          e.school
        )}  |  ${escapeHtml(e.year)}</p>`
    )
    .join("");
}

export function buildResumeHtml(): string {
  const { name, title, tagline, location, email, website } = resumeProfile;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="robots" content="noindex" />
  <title>${escapeHtml(name)} — Resume</title>
  <style>
    @font-face {
      font-family: "Noto Serif";
      src: url("${fontDataUri("NotoSerif-Regular.ttf")}") format("truetype");
      font-weight: 400;
      font-style: normal;
    }
    @font-face {
      font-family: "Noto Serif";
      src: url("${fontDataUri("NotoSerif-Bold.ttf")}") format("truetype");
      font-weight: 700;
      font-style: normal;
    }
    @page { size: letter; margin: 0.567in 0.73in 0.5in 0.73in; }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: "Noto Serif", "Times New Roman", serif;
      font-size: 9pt;
      color: #242D3A;
      background: #fff;
      line-height: 1.567;
    }
    header { text-align: center; margin-bottom: 12.9pt; }
    h1 {
      font-size: 18pt;
      font-weight: 700;
      color: #133148;
      line-height: 1.3;
    }
    .title-line {
      font-size: 9.5pt;
      font-weight: 700;
      color: #194C6F;
      line-height: 1.36;
      margin-top: 7.8pt;
      white-space: pre-wrap;
    }
    .contact {
      font-size: 8.5pt;
      color: #242D3A;
      line-height: 1.36;
      margin-top: 5.8pt;
      white-space: pre-wrap;
    }
    section { margin-bottom: 10.9pt; }
    h2 {
      font-size: 9pt;
      font-weight: 700;
      color: #194C6F;
      line-height: 1.567;
      padding-bottom: 0;
      border-bottom: 0.75pt solid #B9CCD9;
      margin-bottom: 2.95pt;
    }
    /* Sections that open with a 9.5pt entry headline need a touch more space below the rule. */
    section.entries h2 { margin-bottom: 4.45pt; }
    .summary { color: #242D3A; }
    .skill-line {
      font-size: 8pt;
      line-height: 1.36;
      margin-bottom: 1.5pt;
      white-space: pre-wrap;
    }
    .skill-line:last-child { margin-bottom: 0; }
    .entry { margin-bottom: 4.2pt; }
    .entry:last-child { margin-bottom: 0; }
    .project { margin-bottom: 5.5pt; }
    .project:last-child { margin-bottom: 0; }
    .entry-head {
      font-size: 8.5pt;
      line-height: 1.565;
      white-space: pre-wrap;
    }
    .entry-head strong { font-size: 9.5pt; font-weight: 700; }
    ul {
      margin: 2.4pt 0 0 0;
      padding: 0;
      list-style: none;
    }
    li {
      position: relative;
      padding-left: 13pt;
      line-height: 1.567;
    }
    /* Round bullet matching the reference: ~3.4pt dot, aligned to the reference ink position. */
    li::before {
      content: "";
      position: absolute;
      left: 5.46pt;
      top: 4.6pt;
      width: 3.4pt;
      height: 3.4pt;
      border-radius: 50%;
      background: #242D3A;
    }
    .project .desc {
      font-size: 8.5pt;
      line-height: 1.565;
      margin-top: 1.8pt;
      white-space: pre-wrap;
    }
    .edu-line { line-height: 1.567; white-space: pre-wrap; }
  </style>
</head>
<body>
  <header>
    <h1>${escapeHtml(displayUpper(name))}</h1>
    <p class="title-line">${escapeHtml(displayUpper(title))}  |  ${escapeHtml(displayUpper(tagline))}</p>
    <p class="contact">${escapeHtml(location)}   |   ${escapeHtml(email)}   |   ${escapeHtml(website)}</p>
  </header>

  <section>
    <h2>PROFESSIONAL SUMMARY</h2>
    <p class="summary">${escapeHtml(resumeSummary)}</p>
  </section>

  <section>
    <h2>TECHNICAL SKILLS</h2>
    ${renderSkillGroups()}
  </section>

  <section class="entries">
    <h2>EXPERIENCE</h2>
    ${renderExperience(resumeExperience)}
  </section>

  <section class="entries">
    <h2>SELECTED PROJECTS</h2>
    ${renderProjects(resumeProductionProjects)}
  </section>

  <section>
    <h2>EDUCATION</h2>
    ${renderEducation(resumeEducation)}
  </section>
</body>
</html>`;
}
