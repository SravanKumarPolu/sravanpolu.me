import { useRef, useCallback } from 'react';

interface UseMagneticOptions {
  strength?: number;
  enabled?: boolean;
}

interface UseMagneticReturn {
  ref: React.RefObject<HTMLDivElement>;
  handleMouseMove: (e: React.MouseEvent) => void;
  handleMouseLeave: () => void;
}

export const useMagnetic = (options: UseMagneticOptions = {}): UseMagneticReturn => {
  const { strength = 0.1, enabled = true } = options;
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!enabled || !ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const deltaX = (e.clientX - centerX) * strength;
    const deltaY = (e.clientY - centerY) * strength;

    ref.current.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
  }, [strength, enabled]);

  const handleMouseLeave = useCallback(() => {
    if (!enabled || !ref.current) return;
    
    ref.current.style.transform = 'translate(0px, 0px)';
  }, [enabled]);

  return {
    ref,
    handleMouseMove,
    handleMouseLeave
  };
};