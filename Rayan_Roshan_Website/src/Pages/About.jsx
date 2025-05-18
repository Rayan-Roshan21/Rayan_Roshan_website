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
         <p class = "paragraph">I'm a computer science student passionate about building innovative software and solving real-world problems through technology. I have experience in mobile app development, with a focus on Swift and Firebase, and enjoy exploring new technologies in the fields of AI and data science. As an entrepreneur, I love turning ideas into scalable products and am always looking for new challenges to learn and grow.</p>
      </div>
      <div>
        
      </div>
      <div>
        <Copyright />
      </div>
    </motion.div>
  );
}

export default About;
