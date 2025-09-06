import { useInView } from 'react-intersection-observer';

export const useScrollAnimation = (threshold: number = 0.1, triggerOnce: boolean = true) => {
  const { ref, inView } = useInView({
    threshold,
    triggerOnce
  });

  return { ref, inView };
};
