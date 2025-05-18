import React from 'react';
import Sidebar from '../Sidebar/Sidebar';
import '../Pages_CSS/About.css';
import { motion } from 'framer-motion';
import Copyright from '../Copyright_title/Copyright_title'

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
      <div>
        <h2 className='Subtitle'>Who am I</h2>
         <p class = "about-me-paragraph">Computer science student passionate about solving real-world problems through technology. Experienced in mobile app development with Swift and Firebase, with strong interests in AI, data science, and entrepreneurship. Driven to turn ideas into scalable products and constantly seeking new challenges to grow.</p>
      </div>
      <div>
        <Copyright />
      </div>
    </motion.div>
  );
}

export default About;
