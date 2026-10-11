/**
 * Clean-URL in-page navigation helpers.
 *
 * The portfolio is a single-page app whose sections (#home, #about, #work, …)
 * are reachable via in-page anchors. Native browser behaviour for
 * `<a href="#about">` adds `#about` to the address bar — we want the URL to
 * stay `https://sravanpolu.com/` (or `http://localhost:3000/`) after every
 * normal click, while still smooth-scrolling to the target section.
 *
 * `scrollToSection` does both: it prevents the default hash navigation and
 * uses `Element.scrollIntoView({behavior:'smooth'})` for the visible scroll,
 * then strips any pre-existing hash from the address bar via the History API.
 *
 * The `href="#section"` attribute is intentionally kept on the anchor in the
 * DOM — it provides SEO semantics, screen-reader context, and a no-JS
 * progressive-enhancement fallback (a plain hash jump) if JavaScript fails.
 *
 * History API usage: `history.replaceState(null, '', pathname + search)`
 * replaces the current history entry's URL in place. It does NOT push a new
 * entry, so the browser Back button doesn't land on a "previous URL with the
 * same page" — it goes back to the actual previous site the visitor came from.
 * `replaceState` also doesn't trigger a `hashchange` or `popstate` event,
 * so it won't re-trigger any scroll handlers.
 */

/**
 * Smooth-scroll to a section by id, without touching `location.hash`.
 *
 * - Calls `e.preventDefault()` so the browser does not perform its native
 *   hash-anchor navigation (which would add `#section` to the URL).
 * - Uses `Element.scrollIntoView({behavior:'smooth', block:'start'})` for
 *   the visible scroll, identical to the browser's native hash jump.
 * - If a hash fragment is already present in the URL (e.g. the user
 *   previously loaded `https://sravanpolu.com/#about`), it is removed
 *   via `history.replaceState` so the address bar returns to the clean
 *   root URL. `pathname` and `search` are preserved.
 *
 * Returns `true` if the target section existed and was scrolled to,
 * `false` otherwise (caller may let the event default proceed as a
 * progressive-enhancement fallback).
 */
export function scrollToSection(
  e: React.MouseEvent<HTMLAnchorElement> | React.MouseEvent,
  sectionId: string,
): boolean {
  const target = document.getElementById(sectionId);
  if (!target) {
    // Target doesn't exist — let the native anchor do its thing
    // (progressive-enhancement fallback for unknown sections).
    return false;
  }

  e.preventDefault();
  target.scrollIntoView({ behavior: "smooth", block: "start" });

  // Strip any existing hash from the URL without creating a new history
  // entry. `replaceState` is silent (no hashchange / popstate events).
  if (window.location.hash) {
    const cleanUrl =
      window.location.pathname + window.location.search;
    try {
      window.history.replaceState(null, "", cleanUrl || "./");
    } catch {
      // replaceState can throw on cross-origin or file:// origins — silently
      // ignore; the visible scroll still happened.
    }
  }

  return true;
}

/**
 * Smooth-scroll to the top of the page (used by the logo / "Home" click).
 *
 * Same clean-URL contract as `scrollToSection`: `preventDefault` stops the
 * native `#home` jump, `window.scrollTo({top:0, behavior:'smooth'})` does
 * the visible scroll, and any pre-existing hash is removed via
 * `history.replaceState`.
 */
export function scrollToTop(
  e: React.MouseEvent<HTMLAnchorElement> | React.MouseEvent,
): void {
  e.preventDefault();
  window.scrollTo({ top: 0, behavior: "smooth" });

  if (window.location.hash) {
    const cleanUrl = window.location.pathname + window.location.search;
    try {
      window.history.replaceState(null, "", cleanUrl || "./");
    } catch {
      // ignore — visible scroll still happened
    }
  }
}

/**
 * On initial page load, if the URL contains a `#section` fragment that
 * matches a real section id, smooth-scroll to it. This supports manually
 * entered fragment URLs (e.g. `https://sravanpolu.com/#about` shared by
 * a user) while still leaving the URL clean after the scroll settles.
 *
 * Called once from `src/index.tsx` after React mounts. If the fragment
 * doesn't match a real section, the browser's default behaviour (no scroll)
 * is preserved; the URL is left untouched so the user can see what they
 * typed.
 *
 * The hash is NOT proactively removed on initial load — that would be
 * surprising for a user who just pasted a deep link and is expecting to
 * see `#about` in the URL. The hash is removed only on the first normal
 * navigation click (via `scrollToSection` / `scrollToTop` above).
 */
export function handleInitialFragment(): void {
  const hash = window.location.hash.replace(/^#/, "");
  if (!hash) return;

  // Defer slightly so React mount + lazy-section hydration has a chance to
  // bring the target section into the DOM (LazySection mounts below-the-fold
  // sections on IntersectionObserver).
  window.setTimeout(() => {
    const target = document.getElementById(hash);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, 300);
}
