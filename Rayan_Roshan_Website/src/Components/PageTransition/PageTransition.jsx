import React, { createContext, useContext, useState, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import './PageTransition.css';

const PAGE_NAMES = {
  '/': 'Home',
  '/about': 'About',
  '/projects': 'Projects',
  '/contact': 'Contact',
};

const TransitionCtx = createContext(null);

export function TransitionProvider({ children }) {
  const navigate = useNavigate();
  const [state, setState] = useState({ visible: false, label: '' });

  const navigateTo = useCallback(async (path, label) => {
    setState({ visible: true, label: label || PAGE_NAMES[path] || '' });
    await new Promise(r => setTimeout(r, 500));
    navigate(path);
    await new Promise(r => setTimeout(r, 50));
    setState({ visible: false, label: '' });
  }, [navigate]);

  return (
    <TransitionCtx.Provider value={{ navigateTo }}>
      {children}
      <AnimatePresence>
        {state.visible && (
          <motion.div
            className="pt-overlay"
            initial={{ y: '100%' }}
            animate={{ y: '0%' }}
            exit={{ y: '-100%' }}
            transition={{ duration: 0.45, ease: [0.76, 0, 0.24, 1] }}
          >
            <motion.p
              className="pt-label"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ delay: 0.15, duration: 0.25, ease: 'easeOut' }}
            >
              {state.label}
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </TransitionCtx.Provider>
  );
}

export function TransitionLink({ to, children, className, onClick, label, id, ...rest }) {
  const ctx = useContext(TransitionCtx);
  const location = useLocation();

  const handleClick = (e) => {
    e.preventDefault();
    if (location.pathname === to) return;
    onClick?.();
    ctx.navigateTo(to, label);
  };

  return (
    <a href={to} className={className} id={id} onClick={handleClick} {...rest}>
      {children}
    </a>
  );
}
