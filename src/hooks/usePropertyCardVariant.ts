import { useState, useEffect } from 'react';

export type PropertyCardVariant = 'compact' | 'full';

export function usePropertyCardVariant(
  breakpoint: number = 1024,
  variant?: PropertyCardVariant,
): PropertyCardVariant {
  const [isLargeScreen, setIsLargeScreen] = useState(false);

  useEffect(() => {
    if (variant) {
      return;
    }

    const checkScreenSize = () => setIsLargeScreen(window.innerWidth >= breakpoint);
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, [breakpoint, variant]);

  if (variant) {
    return variant;
  }

  return isLargeScreen ? 'full' : 'compact';
}

