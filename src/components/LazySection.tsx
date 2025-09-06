import React, { Suspense, lazy, ComponentType } from 'react';
import SkeletonLoader, { SkeletonHero, SkeletonCard, SkeletonProjectCard } from './SkeletonLoader';
import SectionErrorBoundary from './SectionErrorBoundary';

// Lazy load sections
const LazyHero = lazy(() => import('../sections/Hero'));
const LazyWork = lazy(() => import('../sections/Work'));
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
