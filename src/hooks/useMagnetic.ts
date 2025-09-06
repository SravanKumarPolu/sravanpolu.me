import { useRef, useCallback } from 'react';

export const useMagnetic = (strength: number = 0.3) => {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      ref.current.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
    }
  }, [strength]);

  const handleMouseLeave = useCallback(() => {
    if (ref.current) {
      ref.current.style.transform = 'translate(0px, 0px)';
    }
  }, []);

  return { ref, handleMouseMove, handleMouseLeave };
};
