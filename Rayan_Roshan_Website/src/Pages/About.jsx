import React from 'react';
import Sidebar from '../Components/Sidebar/Sidebar.jsx';
import '../Pages_CSS/About.css';
import { motion } from 'framer-motion';
import Copyright from '../Components/Copyright_title/Copyright_title.jsx'
import Name_title from '../Components/Name_title/Name_title.jsx';
import Image_slideshow from '../Components/Image_carousel/Image_slideshow.jsx';
import Down_arrow from '../Components/Down_arrow/Down_arrow.jsx';
import GridFour from '../Components/Grid_Four/Grid_Four.jsx'; 

function About() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.5 }}
    >
      <div className="page-container">
        <Sidebar />
        <Name_title />
        <h2 className='about-title'>About</h2>
        <div className="about-main-content">
          <div className="about-left">
            <h2 className='Subtitle'>Who am I</h2>
            <p className="about-me-paragraph">A Computer science student passionate about solving real-world problems through technology. Experienced in mobile app development with Swift and Firebase, with strong interests in AI, data science, and entrepreneurship. Driven to turn ideas into scalable products and constantly seeking new challenges to grow.</p>
          </div>
          <div className="about-right">
            <Image_slideshow />
          </div>
        </div>
        <Down_arrow />
        <div>
          <GridFour />
        </div>
      </div>
    </motion.div>
  );
}

export default About;
