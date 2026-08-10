import React, { createContext, useContext, useCallback, useLayoutEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useReducedMotion } from 'framer-motion';

/* ============================================================
   PAGE TRANSITION
   ------------------------------------------------------------
   Navigation is immediate. There is no overlay to wait behind
   and no artificial delay on the input path — the route changes
   on the same tick as the click, and the incoming page fades up
   underneath the user's finger.

   The previous implementation held every navigation for 900ms
   (350ms overlay fade + hold, then a further 150ms mount wait).
   That is exactly the kind of latency that makes directness
   "fall off a cliff": the interface stopped responding to the
   user and started narrating to them.
   ============================================================ */

const PageTransitionContext = createContext(null);

export function PageTransitionProvider({ children }) {
  const navigate = useNavigate();

  const navigateTo = useCallback(
    (path, _label, currentPath) => {
      if (path === currentPath) return;
      navigate(path);
    },
    [navigate]
  );

  return (
    <PageTransitionContext.Provider value={{ navigateTo }}>
      <ScrollToTop />
      {children}
    </PageTransitionContext.Provider>
  );
}

/**
 * Reset scroll on route change.
 *
 * The old black overlay incidentally hid the fact that nothing did
 * this — navigating from halfway down Projects used to land halfway
 * down Contact. With the overlay gone that would be visible, so the
 * reset is now explicit. It is instant, not smooth: a smooth scroll
 * here would be another animation the user has to wait out.
 */
function ScrollToTop() {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    const toTop = () => window.scrollTo({ top: 0, left: 0, behavior: 'instant' });

    // Once before paint, and once more on the next frame: the
    // outgoing page is still in the tree during the first pass, so
    // the document is taller than it is about to be and the browser
    // nudges scroll as it collapses.
    toTop();
    const raf = requestAnimationFrame(toTop);
    return () => cancelAnimationFrame(raf);
  }, [pathname]);

  return null;
}

export const usePageTransition = () => useContext(PageTransitionContext);

/**
 * Page enter animation. Opacity plus a few pixels of upward drift,
 * which hints in the direction the content is arriving from rather
 * than interpolating blindly.
 *
 * There is no exit animation on purpose: an exit would delay the
 * incoming page's mount by its own duration under AnimatePresence's
 * "wait" mode. The outgoing page leaves instantly; the new one is
 * on screen and interactive immediately, then settles.
 */
export function usePageMotion() {
  const reduced = useReducedMotion();

  if (reduced) {
    return {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      transition: { duration: 0.2, ease: 'easeOut' },
    };
  }

  return {
    initial: { opacity: 0, y: 8 },
    animate: { opacity: 1, y: 0 },
    transition: { type: 'spring', bounce: 0, duration: 0.4 },
  };
}
