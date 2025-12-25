import React, { useState } from 'react';
import './Sidebar.css';
import {Link} from 'react-router-dom'
import { useScrollDirection } from '@/hooks/useScrollDirection';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const isScrollingUp = useScrollDirection();

  return (
    <>
      {/* Horizontal Menu for Larger Screens */}
      <nav className={`horizontal-nav ${!isScrollingUp ? 'hide' : 'show'}`}>
        <ul>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/projects">Projects</Link></li>
          <li><Link to="/contact">Contact</Link></li>
        </ul>
      </nav>

      {/* Hamburger Menu for Mobile Screens */}
      <div className={`menu-toggle ${!isScrollingUp && !isOpen ? 'hide' : 'show'}`} onClick={() => setIsOpen(true)}>
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
