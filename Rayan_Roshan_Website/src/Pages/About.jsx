import React, { useState } from 'react';
import Sidebar from '@/Components/Sidebar/Sidebar.jsx';
import '@/Pages_CSS/About.css';
import { motion, AnimatePresence } from 'framer-motion';
import Copyright from '@/Components/Copyright_title/Copyright_title.jsx';
import Image_slideshow from '@/Components/Image_carousel/Image_slideshow.jsx';
import GridFour from '@/Components/Grid_Four/Grid_Four.jsx';
import ExperienceTimeline from '@/Components/Experience_Timeline/ExperienceTimeline.jsx';

function About() {
  const [currentSection, setCurrentSection] = useState(1);

  const goToSection = (n) => {
    setCurrentSection(n);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goNext = () => { if (currentSection < 3) goToSection(currentSection + 1); };
  const goPrev = () => { if (currentSection > 1) goToSection(currentSection - 1); };

  const sectionLabels = ['Who I Am', 'Skills & Tools', 'Experience'];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Sidebar />

      {/* ── Section Tab Navigation ── */}
      <div className="about-tab-bar">
        <div className="about-tab-bar__inner">
          {sectionLabels.map((label, i) => (
            <button
              key={i}
              id={`about-tab-${i + 1}`}
              className={`about-tab ${currentSection === i + 1 ? 'about-tab--active' : ''}`}
              onClick={() => goToSection(i + 1)}
              aria-selected={currentSection === i + 1}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {/* ── SECTION 1: Who Am I ── */}
        {currentSection === 1 && (
          <motion.div
            key="section1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            {/* Dark hero */}
            <section className="about-section section-dark about-who-hero">
              <div className="about-who-hero__inner">
                <div className="about-who-hero__text">
                  <p className="about-eyebrow">Who I Am</p>
                  <h1 className="about-hero__heading">
                    CS student.<br />Builder.<br />Founder.
                  </h1>
                  <p className="about-hero__body">
                    Computer Science student at Toronto Metropolitan University building
                    AI systems and scalable products. I create end-to-end solutions
                    spanning voice agents, healthcare automation, video analysis, and
                    recommendation systems using Gemini, OpenAI, Python, Swift, React,
                    Firebase, and more. My focus is on reliability and user value.
                  </p>
                </div>
                <div className="about-who-hero__visual">
                  <Image_slideshow />
                </div>
              </div>
            </section>

            {/* Light section — quick facts */}
            <section className="about-section section-light about-facts">
              <div className="about-facts__inner section-container-wide">
                <p className="about-eyebrow about-eyebrow--dark">Quick Facts</p>
                <div className="about-facts__grid">
                  {[
                    { label: 'University', value: 'Toronto Metropolitan University' },
                    { label: 'Program', value: 'B.Sc. Computer Science' },
                    { label: 'Year', value: '2nd Year' },
                    { label: 'Based in', value: 'Toronto, Ontario, Canada' },
                    { label: 'Focus', value: 'AI Systems + Full-Stack' },
                    { label: 'Available', value: 'Internships & Collabs' },
                  ].map((fact) => (
                    <div key={fact.label} className="about-fact__item">
                      <span className="about-fact__label">{fact.label}</span>
                      <span className="about-fact__value">{fact.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </motion.div>
        )}

        {/* ── SECTION 2: Skills ── */}
        {currentSection === 2 && (
          <motion.div
            key="section2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            {/* Dark hero intro */}
            <section className="about-section section-dark about-skills-hero">
              <div className="about-skills-hero__inner section-container">
                <p className="about-eyebrow">Skills & Tools</p>
                <h1 className="about-hero__heading">
                  The stack I build with.
                </h1>
                <p className="about-hero__body">
                  A breakdown of the technical skills, soft skills, and tools I use
                  to build meaningful products.
                </p>
              </div>
            </section>

            {/* Light section — Grid */}
            <section className="about-section section-light about-skills-grid">
              <div className="about-skills-grid__inner section-container-wide">
                <GridFour />
              </div>
            </section>
          </motion.div>
        )}

        {/* ── SECTION 3: Experience ── */}
        {currentSection === 3 && (
          <motion.div
            key="section3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            {/* Dark hero intro */}
            <section className="about-section section-dark about-exp-hero">
              <div className="about-exp-hero__inner section-container">
                <p className="about-eyebrow">Experience</p>
                <h1 className="about-hero__heading">
                  A timeline of work.
                </h1>
                <p className="about-hero__body">
                  Roles and projects from 2024 to present — shipped fast, learned faster.
                </p>
              </div>
            </section>

            {/* Light section — Timeline */}
            <section className="about-section section-light about-timeline">
              <div className="about-timeline__inner section-container-wide">
                <ExperienceTimeline />
              </div>
            </section>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Section nav arrows */}
      <div className="about-section-nav">
        <div className="about-section-nav__inner">
          <button
            id="about-prev-btn"
            className="about-section-nav__btn"
            onClick={goPrev}
            disabled={currentSection === 1}
            aria-label="Previous section"
          >
            ← {currentSection > 1 ? sectionLabels[currentSection - 2] : ''}
          </button>
          <span className="about-section-nav__counter">
            {currentSection} / 3
          </span>
          <button
            id="about-next-btn"
            className="about-section-nav__btn about-section-nav__btn--right"
            onClick={goNext}
            disabled={currentSection === 3}
            aria-label="Next section"
          >
            {currentSection < 3 ? sectionLabels[currentSection] : ''} →
          </button>
        </div>
      </div>

      <Copyright isVisible={true} dark={currentSection !== 2} />
    </motion.div>
  );
}

export default About;
