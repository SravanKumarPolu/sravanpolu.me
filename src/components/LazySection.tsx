import React, { Suspense, lazy, ComponentType, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import SkeletonLoader, { SkeletonHero, SkeletonCard, SkeletonProjectCard } from './SkeletonLoader';
import SectionErrorBoundary from './SectionErrorBoundary';
// The Hero is bundled eagerly (not code-split): it is the above-the-fold LCP
// section, so making it wait for a separate chunk download after main.js adds
// a serial network round-trip to the LCP chain. Every other section stays
// code-split and intersection-gated below.
import Hero from '../sections/Hero';

// Lazy load sections (Hero is eager — see import above)
const LazyAbout = lazy(() => import('../sections/About'));
const LazyWork = lazy(() => import('../sections/Work'));
const LazySkills = lazy(() => import('../components/SkillsShowcase'));
const LazyServices = lazy(() => import('../components/Services'));
const LazyTestimonials = lazy(() => import('../components/Testimonials'));
const LazyContact = lazy(() => import('../components/ContactSection'));
const LazyResume = lazy(() => import('../sections/Resume'));
const LazyFooter = lazy(() => import('../sections/Footer'));

/**
 * Below-fold sections mount only when they approach the viewport.
 *
 * React.lazy alone splits the code but still downloads, parses and renders
 * EVERY section during initial page load — the "lazy" sections were costing
 * the whole page's JS on boot and pushing every section image into the
 * initial network contention. Intersection-gating means a cold load only
 * fetches/renders what is (nearly) visible; the rest streams in as the
 * visitor scrolls.
 *
 * rootMargin 800px keeps loading comfortably ahead of the scroll position so
 * sections are ready before they become visible (no visible pop-in, and any
 * skeleton→content height change happens off-screen so CLS stays 0).
 * scripts/prerender.ts scrolls the full page, so the prerendered HTML and the
 * no-JS/crawler view still contain every section.
 */
const SECTION_PRELOAD_MARGIN = '800px 0px';

interface LazySectionProps {
  sectionName: string;
  fallback?: React.ReactNode;
}

const getSkeletonForSection = (sectionName: string): React.ReactNode => {
  switch (sectionName.toLowerCase()) {
    case 'hero':
      return <SkeletonHero />;
    case 'about':
      return (
        <section className="py-20 bg-neutral-950">
          <div className="container mx-auto px-6 max-w-4xl space-y-4">
            <SkeletonLoader variant="rectangular" height={32} width={200} className="rounded-lg" />
            <SkeletonLoader variant="rectangular" height={120} className="rounded-lg" />
          </div>
        </section>
      );
    case 'work':
      return (
        <section className="py-20 px-6 md:px-12 lg:px-20 xl:px-32 bg-gray-950 text-white">
          <div className="flex flex-col lg:flex-row items-start justify-center gap-12">
            <div className="hidden lg:flex flex-col items-center gap-6 lg:w-1/4">
              <SkeletonCard className="w-full" />
            </div>
            <div className="flex-1 flex flex-col items-center w-full">
              <div className="w-full max-w-4xl">
                <div className="p-6 sm:p-8 md:p-10 lg:p-12 bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl">
                  <SkeletonProjectCard />
                </div>
              </div>
            </div>
          </div>
        </section>
      );
    case 'resume':
      return (
        <section className="relative py-20 px-6 sm:px-10 md:px-16 lg:px-24 xl:px-32 bg-gradient-to-br from-purple-700 via-pink-500 to-red-400 text-white overflow-hidden">
          <div className="w-full max-w-5xl mx-auto shadow-2xl bg-neutral-900 rounded-xl overflow-hidden">
            <div className="px-4 pt-6">
              <SkeletonLoader variant="rectangular" height={500} className="w-full rounded-lg" />
            </div>
            <div className="flex flex-col justify-center items-center gap-6 py-8">
              <div className="flex flex-wrap justify-center items-center gap-6">
                {Array.from({ length: 3 }).map((_, index) => (
                  <SkeletonLoader key={index} variant="rectangular" width={150} height={48} className="rounded-lg" />
                ))}
              </div>
            </div>
          </div>
        </section>
      );
    case 'skills':
      return (
        <section className="py-20 bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <SkeletonLoader variant="rectangular" height={40} width={300} className="mx-auto mb-4 rounded-lg" />
              <SkeletonLoader variant="rectangular" height={20} width={500} className="mx-auto rounded-lg" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, index) => (
                <SkeletonLoader key={index} variant="rectangular" height={120} className="rounded-xl" />
              ))}
            </div>
          </div>
        </section>
      );
    case 'testimonials':
      return (
        <section className="py-20 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <SkeletonLoader variant="rectangular" height={40} width={300} className="mx-auto mb-4 rounded-lg" />
              <SkeletonLoader variant="rectangular" height={20} width={500} className="mx-auto rounded-lg" />
            </div>
            <div className="max-w-4xl mx-auto">
              <SkeletonLoader variant="rectangular" height={300} className="rounded-2xl" />
            </div>
          </div>
        </section>
      );
    case 'contact':
      return (
        <section className="py-16 sm:py-20 md:py-24 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <SkeletonLoader variant="rectangular" height={40} width={300} className="mx-auto mb-4 rounded-lg" />
              <SkeletonLoader variant="rectangular" height={20} width={500} className="mx-auto rounded-lg" />
            </div>
            <div className="max-w-2xl mx-auto">
              <SkeletonLoader variant="rectangular" height={500} className="rounded-xl" />
            </div>
          </div>
        </section>
      );
    case 'services':
      return (
        <section className="py-16 sm:py-20 md:py-24 bg-neutral-950">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <SkeletonLoader variant="rectangular" height={40} width={300} className="mx-auto mb-4 rounded-lg" />
              <SkeletonLoader variant="rectangular" height={20} width={500} className="mx-auto rounded-lg" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto">
              {Array.from({ length: 6 }).map((_, index) => (
                <SkeletonCard key={index} />
              ))}
            </div>
          </div>
        </section>
      );
    case 'footer':
      return (
        <footer className="bg-neutral py-16 w-full min-h-screen items-center justify-center">
          <div className="bg-neutral-900 shadow-xl border border-gray-300 w-full max-w-screen-xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-8 sm:py-10 rounded-xl sm:rounded-2xl">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 place-items-center">
              <SkeletonCard />
              <SkeletonCard />
            </div>
          </div>
        </footer>
      );
    default:
      return <SkeletonCard />;
  }
};

/**
 * Fires `onMounted` when the real section content has committed to the DOM.
 * Rendered next to the lazy component INSIDE the Suspense boundary, so the
 * callback only runs after the chunk has loaded and mounted — not while the
 * skeleton fallback is showing.
 */
const SectionMountedProbe: React.FC<{ onMounted: () => void }> = ({ onMounted }) => {
  useEffect(() => {
    onMounted();
  }, [onMounted]);
  return null;
};

/**
 * Sections whose React tree is structurally different below a breakpoint
 * (useMediaQuery) cannot use the prerendered height as a reservation: the
 * prerendered DOM was captured at a 1280px viewport, so below that breakpoint
 * the captured markup reflows to a different height than the component that
 * actually mounts. For those sections the reservation is only applied when the
 * component's own media query matches the prerendered layout.
 */
const PIN_GUARDS: Record<string, string> = {
  resume: '(min-width: 768px)', // src/sections/Resume.tsx renders an iframe layout only on desktop
};

const LazySection: React.FC<LazySectionProps> = ({ sectionName, fallback }) => {
  const getLazyComponent = (): ComponentType | null => {
    switch (sectionName.toLowerCase()) {
      case 'hero':
        return null; // eager — see static import above
      case 'about':
        return LazyAbout;
      case 'services':
        return LazyServices;
      case 'work':
        return LazyWork;
      case 'skills':
        return LazySkills;
      case 'testimonials':
        return LazyTestimonials;
      case 'contact':
        return LazyContact;
      case 'resume':
        return LazyResume;
      case 'footer':
        return LazyFooter;
      default:
        throw new Error(`Unknown section: ${sectionName}`);
    }
  };

  const LazyComponent = getLazyComponent();
  const skeletonFallback = fallback || getSkeletonForSection(sectionName);

  // Intersection-gate every non-hero section's mount (see comment above).
  const { ref, inView } = useInView({
    rootMargin: SECTION_PRELOAD_MARGIN,
    triggerOnce: true,
    initialInView: false,
  });

  // Height reservation: index.tsx measured each section's true rendered height
  // from the prerendered DOM (at this exact viewport) before React took over.
  // While a section shows a skeleton — both before it enters the preload margin
  // AND while its chunk loads after entering it — the gate wrapper is pinned to
  // exactly that height (skeletons are clipped with overflow:hidden; several
  // skeleton layouts are TALLER than the real section, e.g. the footer skeleton
  // is min-h-screen). Mounting real content swaps an equal-height box in, so
  // anchor/nav jumps during initial load cause no layout shift. The pin drops
  // once the real content has mounted (SectionMountedProbe), letting the
  // section define its own height from then on.
  const [contentMounted, setContentMounted] = React.useState(false);
  const handleContentMounted = React.useCallback(() => setContentMounted(true), []);
  const prerenderHeights = (window as unknown as {
    __prerenderSectionHeights?: Record<string, number>;
  }).__prerenderSectionHeights;
  const sectionId = sectionName.toLowerCase();
  const reservedHeight = prerenderHeights?.[sectionId];
  const pinGuard = PIN_GUARDS[sectionId];
  const pinAllowed =
    typeof reservedHeight === 'number' &&
    (!pinGuard || window.matchMedia(pinGuard).matches);
  const showSkeleton = !inView || !contentMounted;
  const gateStyle =
    showSkeleton && pinAllowed
      ? { height: reservedHeight, overflow: 'hidden' as const }
      : undefined;

  return (
    <SectionErrorBoundary sectionName={sectionName}>
      {sectionId === 'hero' ? (
        <Hero />
      ) : (
        <div ref={ref} style={gateStyle}>
          {inView && LazyComponent ? (
            <Suspense fallback={skeletonFallback}>
              <>
                <LazyComponent />
                <SectionMountedProbe onMounted={handleContentMounted} />
              </>
            </Suspense>
          ) : (
            <div aria-busy="true">{skeletonFallback}</div>
          )}
        </div>
      )}
    </SectionErrorBoundary>
  );
};

export default LazySection;
