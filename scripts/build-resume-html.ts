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

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function renderExperience(items: ResumeExperience[]): string {
  return items
    .map(
      (job) => `
    <article class="entry">
      <div class="entry-head">
        <h3>${escapeHtml(job.role)}</h3>
        <span class="dates">${escapeHtml(job.start)} – ${escapeHtml(job.end)}</span>
      </div>
      <p class="meta">${escapeHtml(job.company)} · ${escapeHtml(job.location)}</p>
      <ul>
        ${job.bullets.map((b) => `<li>${escapeHtml(b)}</li>`).join("")}
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
      <div class="entry-head">
        <h3>${escapeHtml(p.name)}</h3>
        <a class="link" href="${escapeHtml(p.link)}">${escapeHtml(p.link.replace(/^https?:\/\//, ""))}</a>
      </div>
      <p class="desc">${escapeHtml(p.description)}</p>
      <p class="tags">${p.tags.map((t) => escapeHtml(t)).join(" · ")}</p>
    </article>`
    )
    .join("");
}

function renderEducation(items: ResumeEducation[]): string {
  if (items.length === 0) return "";
  return `
  <section>
    <h2>Education</h2>
    ${items
      .map(
        (e) => `
    <article class="entry">
      <div class="entry-head">
        <h3>${escapeHtml(e.degree)}</h3>
        <span class="dates">${escapeHtml(e.year)}</span>
      </div>
      <p class="meta">${escapeHtml(e.school)}${e.details ? ` · ${escapeHtml(e.details)}` : ""}</p>
    </article>`
      )
      .join("")}
  </section>`;
}

export function buildResumeHtml(): string {
  const { name, title, tagline, location, email, website, linkedIn, github, yearsExperience } =
    resumeProfile;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>${escapeHtml(name)} — Resume</title>
  <style>
    @page { size: letter; margin: 0.55in 0.6in; }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: "Segoe UI", Calibri, Arial, sans-serif;
      font-size: 10.5pt;
      line-height: 1.35;
      color: #111;
      background: #fff;
    }
    header { border-bottom: 2px solid #0e7490; padding-bottom: 10px; margin-bottom: 14px; }
    h1 { font-size: 22pt; font-weight: 700; letter-spacing: -0.02em; }
    .subtitle { font-size: 11.5pt; color: #0e7490; font-weight: 600; margin-top: 2px; }
    .tagline { font-size: 10pt; color: #444; margin-top: 4px; }
    .contact {
      margin-top: 8px;
      font-size: 9.5pt;
      color: #333;
      display: flex;
      flex-wrap: wrap;
      gap: 6px 14px;
    }
    .contact a { color: #0e7490; text-decoration: none; }
    section { margin-bottom: 14px; }
    h2 {
      font-size: 11pt;
      text-transform: uppercase;
      letter-spacing: 0.06em;
      color: #0e7490;
      border-bottom: 1px solid #d1d5db;
      padding-bottom: 3px;
      margin-bottom: 8px;
    }
    .summary { color: #222; }
    .skills-grid {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 8px 12px;
    }
    .skill-group strong { display: block; font-size: 9.5pt; margin-bottom: 2px; }
    .skill-group span { font-size: 9.5pt; color: #333; }
    .entry { margin-bottom: 10px; }
    .entry-head {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      gap: 12px;
    }
    .entry h3 { font-size: 10.5pt; font-weight: 700; }
    .dates { font-size: 9.5pt; color: #555; white-space: nowrap; }
    .meta { font-size: 9.5pt; color: #444; margin: 2px 0 4px; }
    ul { margin-left: 18px; }
    li { margin-bottom: 3px; color: #222; }
    .project .link { font-size: 9pt; color: #0e7490; text-decoration: none; }
    .desc { font-size: 9.5pt; margin: 2px 0; }
    .tags { font-size: 9pt; color: #555; }
    .footnote {
      margin-top: 12px;
      font-size: 8.5pt;
      color: #666;
      text-align: center;
    }
  </style>
</head>
<body>
  <header>
    <h1>${escapeHtml(name)}</h1>
    <p class="subtitle">${escapeHtml(title)} · ${escapeHtml(yearsExperience)} years</p>
    <p class="tagline">${escapeHtml(tagline)}</p>
    <div class="contact">
      <span>${escapeHtml(location)}</span>
      <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a>
      <a href="${escapeHtml(website)}">${escapeHtml(website.replace(/^https?:\/\//, ""))}</a>
      <a href="${escapeHtml(linkedIn)}">LinkedIn</a>
      <a href="${escapeHtml(github)}">GitHub</a>
    </div>
  </header>

  <section>
    <h2>Summary</h2>
    <p class="summary">${escapeHtml(resumeSummary)}</p>
  </section>

  <section>
    <h2>Skills</h2>
    <div class="skills-grid">
      ${resumeSkillGroups
        .map(
          (g) => `
      <div class="skill-group">
        <strong>${escapeHtml(g.label)}</strong>
        <span>${g.skills.map((s) => escapeHtml(s)).join(", ")}</span>
      </div>`
        )
        .join("")}
    </div>
  </section>

  <section>
    <h2>Experience</h2>
    ${renderExperience(resumeExperience)}
  </section>

  <section>
    <h2>Selected production projects</h2>
    ${renderProjects(resumeProductionProjects)}
  </section>

  ${renderEducation(resumeEducation)}

  <p class="footnote">Full portfolio: ${escapeHtml(website)}</p>
</body>
</html>`;
}
