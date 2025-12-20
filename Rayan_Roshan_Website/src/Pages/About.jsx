import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '@/Components/Sidebar/Sidebar.jsx';
import '@/Pages_CSS/About.css';
import { motion, AnimatePresence } from 'framer-motion';
import Copyright from '@/Components/Copyright_title/Copyright_title.jsx';
import Name_title from '@/Components/Name_title/name_title.jsx';
import Image_slideshow from '@/Components/Image_carousel/Image_slideshow.jsx';
import GridFour from '@/Components/Grid_Four/Grid_Four.jsx'; 
import ExperienceTimeline from '@/Components/Experience_Timeline/ExperienceTimeline.jsx';
import { useScrollToBottom } from '@/hooks/useScrollToBottom';

function About() {
  const [currentSection, setCurrentSection] = useState(1);
  const isAtBottom = useScrollToBottom();

  const goToNextSection = () => {
    setCurrentSection((prev) => (prev < 3 ? prev + 1 : prev));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goToPreviousSection = () => {
    setCurrentSection((prev) => (prev > 1 ? prev - 1 : prev));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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
        
        {/* Page Title */}
        <h2 className='about-title'>About</h2>

        {/* Section Indicators */}
        <div className="section-indicators">
          <button 
            className={`indicator ${currentSection === 1 ? 'active' : ''}`}
            onClick={goToPreviousSection}
            aria-label="Go to Who am I section"
          />
          <button 
            className={`indicator ${currentSection === 2 ? 'active' : ''}`}
            onClick={goToNextSection}
            aria-label="Go to Skills section"
          />
          <button 
            className={`indicator ${currentSection === 3 ? 'active' : ''}`}
            onClick={goToNextSection}
            aria-label="Go to Experience section"
          />
        </div>

        <AnimatePresence mode="wait">
          {currentSection === 1 && (
            <motion.div
              key="section1"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.4 }}
            >
              {/* Who Am I Section */}
              <section className="about-section who-am-i-section">
                <div className="about-main-content">
                  <div className="about-left">
                    <h2 className='section-subtitle'>Who am I</h2>
                    <p className="about-me-paragraph">
                      Computer Science student building real solutions with Swift, Firebase, and AI. 
                      Passionate about turning ideas into scalable products. I love exploring new technologies 
                      and frameworks to create meaningful applications that solve real-world problems. 
                      My focus is on clean code, user experience, and continuous learning in the ever-evolving 
                      tech landscape.
                    </p>
                  </div>
                  <div className="about-right">
                    <Image_slideshow />
                  </div>
                </div>
              </section>
            </motion.div>
          )}

          {currentSection === 2 && (
            <motion.div
              key="section2"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4 }}
            >
              {/* Skills Section Header */}
              <section className="about-section skills-header-section">
                <h2 className="section-subtitle skills-title">My Skills & Tools</h2>
                <p className="section-description">
                  Here's a breakdown of the technical skills, soft skills, and tools I use to build meaningful products
                </p>
              </section>

              {/* Skills Grid */}
              <section className="about-section skills-section">
                <GridFour />
              </section>
            </motion.div>
          )}
          {currentSection === 3 && (
            <motion.div
              key="section3"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4 }}
            >
              {/* Experience Section Header */}
              <section className="about-section skills-header-section">
                <h2 className="section-subtitle skills-title">My Experience</h2>
                <p className="section-description">
                  A horizontal timeline of roles and projects from 2024 to present.
                </p>
              </section>

              {/* Experience Timeline */}
              <section className="about-section skills-section">
                <ExperienceTimeline />
              </section>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Copyright shown only at bottom */}
        <Copyright isVisible={isAtBottom} />
      </div>
    </motion.div>
  );
}

export default About;
