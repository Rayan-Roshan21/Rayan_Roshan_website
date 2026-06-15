import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { usePageTransition } from '@/context/PageTransitionContext';

const PAGE_LABELS = {
  '/': 'Home',
  '/about': 'About',
  '/projects': 'Projects',
  '/contact': 'Contact',
};

export default function TransitionLink({ to, children, className, id, style }) {
  const { navigateTo } = usePageTransition();
  const location = useLocation();
  const label = PAGE_LABELS[to] ?? to;

  const handleClick = (e) => {
    e.preventDefault();
    navigateTo(to, label, location.pathname);
  };

  return (
    <Link to={to} className={className} id={id} style={style} onClick={handleClick}>
      {children}
    </Link>
  );
}
