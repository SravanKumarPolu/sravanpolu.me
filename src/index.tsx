import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

/**
 * Startup strategy for the Puppeteer-prerendered production build.
 *
 * build/index.html ships the fully-rendered page inside #root (produced by
 * scripts/prerender.ts), so users see the real content before JavaScript
 * boots; crawlers and no-JS clients get that HTML as-is.
 *
 * hydrateRoot() is deliberately NOT used: the prerendered DOM is captured at a
 * 1280px viewport while Nav/Resume/Link render structurally different trees
 * on other breakpoints (useMediaQuery), so hydration would structurally
 * mismatch on every non-desktop device and fall back to a full client render
 * with console errors — worse than a clean createRoot render.
 *
 * createRoot() replaces the prerendered DOM at the first commit, but that
 * commit now paints the real Nav + Hero directly:
 *   - the Hero is bundled eagerly (see src/components/LazySection.tsx), so no
 *     Suspense skeleton ever replaces the visible content, and
 *   - every other section is IntersectionObserver-gated, so their skeletons
 *     only ever paint below the fold.
 * The result: no visible flash, no duplicated DOM, no hydration warnings, and
 * the prerendered HTML keeps its SEO value untouched.
 */
const container = document.getElementById('root') as HTMLElement;

/**
 * Before React replaces the prerendered DOM, record each section's rendered
 * height at THIS viewport. LazySection uses these as min-height reservations
 * for not-yet-mounted sections, so swapping a skeleton for real content never
 * shifts the page — even when a visitor jumps straight to a mid-page section
 * (nav click / anchor link) while chunks are still loading. Without this,
 * teleport-scrolling during load accumulated CLS ≈ 1.0 in the lab.
 */
if (container.hasChildNodes()) {
  const heights: Record<string, number> = {};
  document
    .querySelectorAll<HTMLElement>('main#main-content > section[id]')
    .forEach((el) => {
      heights[el.id] = Math.round(el.getBoundingClientRect().height);
    });
  (window as unknown as { __prerenderSectionHeights?: Record<string, number> }).__prerenderSectionHeights =
    heights;
}

ReactDOM.createRoot(container).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Web Vitals are measured in-app by useWebVitals (hooks/usePerformanceMonitor).
