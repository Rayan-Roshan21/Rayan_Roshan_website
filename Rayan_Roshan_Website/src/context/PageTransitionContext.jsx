import React, { createContext, useContext, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const PageTransitionContext = createContext(null);

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

export function PageTransitionProvider({ children }) {
  const [overlay, setOverlay] = useState({ show: false, label: '' });
  const navigate = useNavigate();

  const navigateTo = useCallback(
    async (path, label, currentPath) => {
      if (path === currentPath) return;

      setOverlay({ show: true, label });
      await sleep(750); // overlay fades in (350ms) + hold
      navigate(path);
      await sleep(150); // new page mounts behind overlay
      setOverlay({ show: false, label });
    },
    [navigate]
  );

  return (
    <PageTransitionContext.Provider value={{ navigateTo }}>
      {children}
      <AnimatePresence>
        {overlay.show && (
          <motion.div
            key="page-transition-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            style={{
              position: 'fixed',
              inset: 0,
              background: '#000',
              zIndex: 9999,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              pointerEvents: 'none',
            }}
          >
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.12, duration: 0.35, ease: 'easeOut' }}
              style={{
                color: '#fff',
                fontSize: '1.1rem',
                fontWeight: 500,
                letterSpacing: '0.25em',
                textTransform: 'uppercase',
                fontFamily: 'inherit',
              }}
            >
              {overlay.label}
            </motion.span>
          </motion.div>
        )}
      </AnimatePresence>
    </PageTransitionContext.Provider>
  );
}

export const usePageTransition = () => useContext(PageTransitionContext);
