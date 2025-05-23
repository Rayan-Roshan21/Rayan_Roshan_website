import React from 'react';
import Sidebar from '../Components/Sidebar/Sidebar';
import '../Pages_CSS/About.css';
import { motion } from 'framer-motion';
import Copyright from '../Components/Copyright_title/Copyright_title'
import Name_title from '../Components/name_title/name_title';
import Image_slideshow from '../Components/Image_carousel/Image_slideshow';
import Down_arrow from '../Components/Down_arrow/Down_arrow';
import GridFour from '../Components/Grid_Four/Grid_Four'; 

function About() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.5 }}
    >
      <Sidebar />
      <Name_title />
      <h2 className='about-title'>About</h2>
      <div>
        <h2 className='Subtitle'>Who am I</h2>
         <p class = "about-me-paragraph">A Computer science student passionate about solving real-world problems through technology. Experienced in mobile app development with Swift and Firebase, with strong interests in AI, data science, and entrepreneurship. Driven to turn ideas into scalable products and constantly seeking new challenges to grow.</p>
      </div>
      <div>
        <Image_slideshow />
      </div>
      <GridFour />
      <div>
        <Down_arrow />
        <Copyright />
      </div>
    </motion.div>
  );
}

export default About;
