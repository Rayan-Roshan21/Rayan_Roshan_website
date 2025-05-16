import React from 'react';
import Sidebar from '../Sidebar/Sidebar';
import '../Pages_CSS/About.css';
import { motion } from 'framer-motion';

function About() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.5 }}
    >
      <Sidebar />
      <h1 className="name">Rayan Roshan</h1>
      <h2 className='about-title'>About</h2>
    </motion.div>
  );
}

export default About;
