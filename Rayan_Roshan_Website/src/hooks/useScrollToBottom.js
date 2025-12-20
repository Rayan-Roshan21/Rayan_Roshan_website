import { useState, useEffect } from 'react';

/**
 * Custom hook to detect if user has scrolled to the bottom of the page.
 * Returns true when scrolled within threshold pixels of the bottom.
 * @param {number} threshold - Distance in pixels from bottom to consider "at bottom" (default: 100)
 * @returns {boolean} - True if at bottom of page, false otherwise
 */
export const useScrollToBottom = (threshold = 100) => {
  const [isAtBottom, setIsAtBottom] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight;
      const windowHeight = window.innerHeight;
      const distanceFromBottom = docHeight - (scrollTop + windowHeight);

      setIsAtBottom(distanceFromBottom < threshold);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [threshold]);

  return isAtBottom;
};
