import React, { useEffect, useState } from 'react';
import './Sidebar.css';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { usePageTransition } from '@/context/PageTransitionContext';
import { spring, project, shouldCommit } from '@/lib/motion';

const DRAWER_WIDTH = 320;

const LINKS = [
  { to: '/about', label: 'About' },
  { to: '/projects', label: 'Projects' },
  { to: '/contact', label: 'Contact' },
];

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { navigateTo } = usePageTransition();
  const reduced = useReducedMotion();

  const handleNav = (e, path, label) => {
    e.preventDefault();
    setIsOpen(false);
    navigateTo(path, label, location.pathname);
  };

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  // Add scrolled class for the scroll edge effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  // Escape closes the drawer — never trap the user.
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => { if (e.key === 'Escape') setIsOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen]);

  // Crossing to the desktop breakpoint hides the drawer via CSS but
  // would leave body scroll locked. Close it properly instead.
  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 768px)');
    const onChange = (e) => { if (e.matches) setIsOpen(false); };
    desktop.addEventListener('change', onChange);
    return () => desktop.removeEventListener('change', onChange);
  }, []);

  // Prefix match, so "About" stays marked as the current section
  // while the user is on /about/skills or /about/experience. "/" is
  // matched exactly, since every path is prefixed by it.
  const isActive = (path) =>
    path === '/'
      ? location.pathname === '/'
      : location.pathname === path || location.pathname.startsWith(`${path}/`);

  /**
   * Release handler for the drawer drag.
   *
   * The decision to dismiss is driven by the velocity *sign*, not by
   * how far the drawer happens to have travelled: a fast flick right
   * closes it even from 20px in, which is how a real panel behaves.
   * Only when the release is slow does distance decide.
   *
   * The projected resting point (Apple's scroll-deceleration curve)
   * is what gets compared to the halfway mark, so a throw lands where
   * the gesture was actually heading.
   */
  const handleDragEnd = (_event, info) => {
    const velocity = info.velocity.x;
    const projectedX = info.offset.x + project(velocity);

    if (shouldCommit(projectedX, velocity, DRAWER_WIDTH / 2, 400)) {
      setIsOpen(false);
    }
    // Otherwise the spring below pulls it home from wherever it is,
    // carrying the release velocity so there is no seam.
  };

  return (
    <>
      {/* Translucent navigation bar */}
      <nav className={`apple-nav ${scrolled ? 'apple-nav--scrolled' : ''}`} role="navigation" aria-label="Main navigation">
        <div className="apple-nav__inner">

          <Link
            to="/"
            className="apple-nav__logo pressable"
            aria-label="Rayan Roshan — Home"
            onClick={(e) => handleNav(e, '/', 'Home')}
          >
            Rayan Roshan
          </Link>

          <ul className="apple-nav__links" role="list">
            {LINKS.map(({ to, label }) => (
              <li key={to}>
                <Link
                  to={to}
                  className={`apple-nav__link pressable ${isActive(to) ? 'apple-nav__link--active' : ''}`}
                  aria-current={isActive(to) ? 'page' : undefined}
                  onClick={(e) => handleNav(e, to, label)}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>

          <button
            className={`apple-nav__hamburger ${isOpen ? 'apple-nav__hamburger--open' : ''}`}
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isOpen}
          >
            <span className="apple-nav__hamburger-bar" />
            <span className="apple-nav__hamburger-bar" />
            <span className="apple-nav__hamburger-bar" />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Scrim. Dims to focus, and is itself tappable to dismiss. */}
            <motion.div
              key="overlay"
              className="apple-mobile-overlay"
              onClick={() => setIsOpen(false)}
              aria-hidden="true"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
            />

            {/* Drawer.
                Enters from the right and leaves to the right — the same
                path in both directions, so it returns to where it came
                from rather than vanishing somewhere unrelated.

                Spring rather than a CSS transition because a spring can
                be grabbed mid-flight: the drag below re-targets it from
                its current on-screen position instead of jumping. */}
            <motion.div
              key="drawer"
              className="apple-mobile-menu"
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={reduced ? { duration: 0.2, ease: 'easeOut' } : spring.sheet}
              drag={reduced ? false : 'x'}
              dragDirectionLock
              /* Rightward drag tracks the finger 1:1; leftward is
                 rubber-banded rather than hard-stopped, so the edge
                 reads as resistance instead of a frozen interface. */
              dragConstraints={{ left: 0, right: DRAWER_WIDTH }}
              dragElastic={{ left: 0.08, right: 0 }}
              dragMomentum={false}
              onDragEnd={handleDragEnd}
            >
              <div className="apple-mobile-menu__grabber" aria-hidden="true" />

              <ul className="apple-mobile-menu__links" role="list">
                {LINKS.map(({ to, label }) => (
                  <li key={to}>
                    <Link
                      to={to}
                      className={`apple-mobile-menu__link ${isActive(to) ? 'apple-mobile-menu__link--active' : ''}`}
                      aria-current={isActive(to) ? 'page' : undefined}
                      onClick={(e) => handleNav(e, to, label)}
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar;
