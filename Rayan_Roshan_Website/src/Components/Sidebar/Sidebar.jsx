import React, { useEffect, useState } from 'react';
import './Sidebar.css';
import { useLocation } from 'react-router-dom';
import { TransitionLink } from '@/Components/PageTransition/PageTransition';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  // Add scrolled class for nav shadow
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* Apple Glass Navigation Bar */}
      <nav className={`apple-nav ${scrolled ? 'apple-nav--scrolled' : ''}`} role="navigation" aria-label="Main navigation">
        <div className="apple-nav__inner">

          {/* Logo / Name — left side */}
          <TransitionLink to="/" className="apple-nav__logo" aria-label="Rayan Roshan — Home">
            Rayan Roshan
          </TransitionLink>

          {/* Desktop Links — right side */}
          <ul className="apple-nav__links" role="list">
            <li>
              <TransitionLink
                to="/about"
                className={`apple-nav__link ${isActive('/about') ? 'apple-nav__link--active' : ''}`}
              >
                About
              </TransitionLink>
            </li>
            <li>
              <TransitionLink
                to="/projects"
                className={`apple-nav__link ${isActive('/projects') ? 'apple-nav__link--active' : ''}`}
              >
                Projects
              </TransitionLink>
            </li>
            <li>
              <TransitionLink
                to="/contact"
                className={`apple-nav__link ${isActive('/contact') ? 'apple-nav__link--active' : ''}`}
              >
                Contact
              </TransitionLink>
            </li>
          </ul>

          {/* Mobile Hamburger */}
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

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="apple-mobile-overlay"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile Menu Drawer */}
      <div
        className={`apple-mobile-menu ${isOpen ? 'apple-mobile-menu--open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
      >
        <div className="apple-mobile-menu__header">
        </div>

        <ul className="apple-mobile-menu__links" role="list">
          <li>
            <TransitionLink
              to="/about"
              className={`apple-mobile-menu__link ${isActive('/about') ? 'apple-mobile-menu__link--active' : ''}`}
              onClick={() => setIsOpen(false)}
            >
              About
            </TransitionLink>
          </li>
          <li>
            <TransitionLink
              to="/projects"
              className={`apple-mobile-menu__link ${isActive('/projects') ? 'apple-mobile-menu__link--active' : ''}`}
              onClick={() => setIsOpen(false)}
            >
              Projects
            </TransitionLink>
          </li>
          <li>
            <TransitionLink
              to="/contact"
              className={`apple-mobile-menu__link ${isActive('/contact') ? 'apple-mobile-menu__link--active' : ''}`}
              onClick={() => setIsOpen(false)}
            >
              Contact
            </TransitionLink>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
