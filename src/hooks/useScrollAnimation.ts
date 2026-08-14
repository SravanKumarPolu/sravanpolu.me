import { useRef, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

interface UseScrollAnimationReturn {
  ref: React.RefObject<HTMLDivElement>;
  inView: boolean;
  entry: IntersectionObserverEntry | undefined;
}

export const useScrollAnimation = (
  threshold: number = 0.1,
  triggerOnce: boolean = true
): UseScrollAnimationReturn => {
  const ref = useRef<HTMLDivElement>(null);
  const { ref: inViewRef, inView, entry } = useInView({
    threshold,
    triggerOnce,
    rootMargin: '0px 0px -50px 0px',
  });

  // Combine refs
  useEffect(() => {
    if (ref.current) {
      inViewRef(ref.current);
    }
  }, [inViewRef]);

  return { ref, inView, entry };
};
