import React, { useEffect, useState } from 'react';
import './Sidebar.css';
import { Link, useLocation } from 'react-router-dom'
import { useScrollDirection } from '@/hooks/useScrollDirection';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [canHideOnScroll, setCanHideOnScroll] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const location = useLocation();
  const isScrollingUp = useScrollDirection();

  useEffect(() => {
    const scrollableThreshold = (() => {
      switch (location.pathname) {
        case '/about':
          return 120;
        case '/projects':
          return 160;
        case '/contact':
          return 140;
        default:
          return 140;
      }
    })();

    const updateScrollAbility = () => {
      const scrollableSpace = document.documentElement.scrollHeight - window.innerHeight;
      setCanHideOnScroll(scrollableSpace > scrollableThreshold);
    };

    updateScrollAbility();
    window.addEventListener('resize', updateScrollAbility);
    return () => window.removeEventListener('resize', updateScrollAbility);
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY || window.pageYOffset || 0);

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  const hideScrollTrigger = (() => {
    switch (location.pathname) {
      case '/about':
        return 120;
      case '/projects':
        return 140;
      case '/contact':
        return 120;
      default:
        return 120;
    }
  })();

  const shouldHideNav = canHideOnScroll && scrollY > hideScrollTrigger;

  return (
    <>
      {/* Horizontal Menu for Larger Screens */}
      <nav className={`horizontal-nav ${shouldHideNav ? 'hide' : 'show'}`}>
        <ul>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/projects">Projects</Link></li>
          <li><Link to="/contact">Contact</Link></li>
        </ul>
      </nav>

      {/* Hamburger Menu for Mobile Screens */}
      <div className={`menu-toggle ${shouldHideNav && !isOpen ? 'hide' : 'show'}`} onClick={() => setIsOpen(true)}>
        ☰
      </div>

      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="close-btn" onClick={() => setIsOpen(false)}>&times;</div>
        <h2 className='menu-title'>Menu</h2>
        <ul>
          <li><Link to="/about" onClick={() => setIsOpen(false)}>About</Link></li>
          <li><Link to="/projects" onClick={() => setIsOpen(false)}>Projects</Link></li>
          <li><Link to="/contact" onClick={() => setIsOpen(false)}>Contact</Link></li>
        </ul>

      </div>

      {isOpen && <div className="overlay" onClick={() => setIsOpen(false)} />}
    </>
  );
};

export default Sidebar;
