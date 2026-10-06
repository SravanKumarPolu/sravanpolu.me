# 🧑‍💻 SravanKumar Polu – Developer Portfolio

Welcome to my personal developer portfolio built with modern web technologies to showcase my skills, projects, and professional background. This site reflects my journey, featuring real-time, responsive, and interactive web solutions.

🌐 Live Site: [https://sravanpolu.com/](https://sravanpolu.com/)

---

## 🚀 Tech Stack

| Tech              | Description                                       |
| ----------------- | ------------------------------------------------- |
| **React.js**      | Component-based UI framework for modern SPAs.     |
| **Tailwind CSS**  | Utility-first CSS for fast and responsive design. |
| **Framer Motion** | Smooth, elegant animations and transitions.       |
| **useMediaQuery** | Custom React hook for responsive behavior.        |

---

## 📁 Project Structure

---

## 🔎 Sections Overview

### 1. 🔝 **Header (Navigation)**

- Sticky navigation bar
- Responsive design
- Active link tracking using `IntersectionObserver`

### 2. 📦 **Body**

#### a. 🦸 Hero (Home)

- Animated intro with profile image
- Typewriter effect for dynamic titles
- Call-to-action buttons

#### b. 💼 Work

- Projects categorized by language/technology
- Carousel-based navigation (slide by stack)
- Hover tooltips and animated transitions

#### c. 📄 Resume

- Live resume preview using `iframe`
- Buttons for viewing, downloading, and contacting
- PDF is generated from `src/constants/resume-data.ts` (see **Resume PDF** below)

### Resume PDF

Content lives in `src/constants/resume-data.ts` (experience, education, production projects). Regenerate the file served at `/Resume.pdf`:

```bash
pnpm install
pnpm exec puppeteer browsers install chrome   # first time only
pnpm run build:resume
```

`pnpm run build` runs `build:resume` automatically before the production bundle. Edit `resume-data.ts` when you add jobs, degrees, or new production apps (keep projects aligned with `portfolio.ts`). Open `public/resume-preview.html` in a browser to tweak layout before regenerating the PDF.

### 3. 📞 **Footer (Contact Me)**

- Social media links with tooltips and animations
- Email and LinkedIn info
- Copyright

---

## 🛠️ Project Categories & Focus

| Tech           | Focus Area                                                            |
| -------------- | --------------------------------------------------------------------- |
| **CSS**        | Responsive grid, flexbox, animations, and layout precision            |
| **React**      | Component structure, hooks (`useState`, `useEffect`, `useMediaQuery`) |
| **TypeScript** | Type safety, cleaner props, early bug detection                       |

---

## 📌 Features

- ✨ Modern design with smooth animations
- 💡 Fully responsive (mobile to desktop)
- ⚡️ Performance optimized
- 🎯 Scroll tracking for navigation highlight
- 🖼️ Interactive project previews

---

## Documentation Guide

Development and testing documentation lives in [`docs/`](docs/); historical internal
notes are archived in [`docs/internal/`](docs/internal/).

### Getting Started
- [docs/TESTING_GUIDE.md](docs/TESTING_GUIDE.md) - Unit testing, integration tests, and test coverage

### Design & UI
- [docs/DESIGN_SYSTEM_DOCUMENTATION.md](docs/DESIGN_SYSTEM_DOCUMENTATION.md) - Color system, typography, components

---

## Contact

If you like what you see or want to collaborate:

- [sravanpolu.me@gmail.com](mailto:sravanpolu.me@gmail.com)
- [LinkedIn](https://www.linkedin.com/in/SravanPolu)
- [GitHub](https://github.com/SravanKumarPolu)

---

Built by SravanKumar Polu
