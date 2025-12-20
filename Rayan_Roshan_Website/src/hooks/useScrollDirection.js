import { useState, useEffect } from 'react';

/**
 * Custom hook to detect scroll direction (up or down)
 * Returns false when scrolling down, true when scrolling up
 * @param {number} threshold - Minimum scroll distance to register direction change (default: 5)
 * @returns {boolean} - True if scrolling up, false if scrolling down
 */
export const useScrollDirection = (threshold = 5) => {
  const [scrollDirection, setScrollDirection] = useState(true); // true = up, false = down
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (Math.abs(currentScrollY - lastScrollY) >= threshold) {
        setScrollDirection(currentScrollY < lastScrollY); // true if scrolling up
        setLastScrollY(currentScrollY);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY, threshold]);

  return scrollDirection;
};
