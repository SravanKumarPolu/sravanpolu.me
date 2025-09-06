import { useEffect, useRef } from 'react';

export const useFocusRestore = () => {
  const previousFocusRef = useRef<HTMLElement | null>(null);

  const saveFocus = () => {
    previousFocusRef.current = document.activeElement as HTMLElement;
  };

  const restoreFocus = () => {
    if (previousFocusRef.current) {
      previousFocusRef.current.focus();
      previousFocusRef.current = null;
    }
  };

  useEffect(() => {
    return () => {
      restoreFocus();
    };
  }, []);

  return { saveFocus, restoreFocus };
};
