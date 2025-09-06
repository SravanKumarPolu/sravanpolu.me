import React, { Suspense, lazy, ComponentType } from 'react';
import SkeletonLoader, { SkeletonHero, SkeletonCard, SkeletonProjectCard } from './SkeletonLoader';
import SectionErrorBoundary from './SectionErrorBoundary';

// Lazy load sections
const LazyHero = lazy(() => import('../sections/Hero'));
const LazyWork = lazy(() => import('../sections/Work'));
const LazyAnalytics = lazy(() => import('../sections/DataAnalytics'));
const LazySkills = lazy(() => import('../components/SkillsShowcase'));
const LazyTestimonials = lazy(() => import('../components/Testimonials'));
const LazyContact = lazy(() => import('../components/ContactForm'));
const LazyResume = lazy(() => import('../sections/Resume'));
const LazyFooter = lazy(() => import('../sections/Footer'));

interface LazySectionProps {
  sectionName: string;
  fallback?: React.ReactNode;
}

const getSkeletonForSection = (sectionName: string): React.ReactNode => {
  switch (sectionName.toLowerCase()) {
    case 'hero':
      return <SkeletonHero />;
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
    case 'analytics':
      return (
        <section className="py-20 bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-neutral-900 dark:to-neutral-800">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <SkeletonLoader variant="rectangular" height={40} width={300} className="mx-auto mb-4 rounded-lg" />
              <SkeletonLoader variant="rectangular" height={20} width={500} className="mx-auto rounded-lg" />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
              <SkeletonLoader variant="rectangular" height={400} className="rounded-xl" />
              <SkeletonLoader variant="rectangular" height={400} className="rounded-xl" />
            </div>
            <div className="space-y-8">
              <SkeletonLoader variant="rectangular" height={350} className="rounded-xl" />
              <SkeletonLoader variant="rectangular" height={400} className="rounded-xl" />
            </div>
          </div>
        </section>
      );
    case 'resume':
      return (
        <section className="relative py-20 px-6 sm:px-10 md:px-16 lg:px-24 xl:px-32 bg-gradient-to-br from-purple-700 via-pink-500 to-red-400 text-white overflow-hidden">
          <div className="card w-full max-w-5xl mx-auto shadow-2xl bg-base-100 rounded-xl overflow-hidden">
            <div className="px-4 pt-6">
              <SkeletonLoader variant="rectangular" height={500} className="w-full rounded-lg" />
            </div>
            <div className="card-body flex flex-col justify-center items-center gap-6 py-8">
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
    case 'footer':
      return (
        <footer className="bg-neutral py-16 w-full min-h-screen items-center justify-center">
          <div className="card bg-base-100 shadow-xl border border-gray-300 w-full max-w-screen-xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-8 sm:py-10 rounded-xl sm:rounded-2xl">
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

const LazySection: React.FC<LazySectionProps> = ({ sectionName, fallback }) => {
  const getLazyComponent = (): ComponentType => {
    switch (sectionName.toLowerCase()) {
      case 'hero':
        return LazyHero;
      case 'work':
        return LazyWork;
      case 'analytics':
        return LazyAnalytics;
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

  return (
    <SectionErrorBoundary sectionName={sectionName}>
      <Suspense fallback={skeletonFallback}>
        <LazyComponent />
      </Suspense>
    </SectionErrorBoundary>
  );
};

export default LazySection;
