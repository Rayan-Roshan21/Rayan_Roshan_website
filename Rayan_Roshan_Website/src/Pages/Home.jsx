import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '@/Pages_CSS/Home.css';
import Sidebar from '@/Components/Sidebar/Sidebar.jsx';
import profileImage from '@/assets/profile-image.JPG';
import Tooltip from '@/Components/Information_bar/Tooltip.jsx';
import { motion } from 'framer-motion';
import Copyright from '@/Components/Copyright_title/Copyright_title.jsx';
import Name_title from '@/Components/Name_title/name_title.jsx';
import { useScrollToBottom } from '@/hooks/useScrollToBottom';
function Home() {
  const [introText, setIntroText] = useState('');
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [texts, setTexts] = useState([]);
  const isAtBottom = useScrollToBottom();

  // Set up the messages based on time
  useEffect(() => {
    const baseTexts = [
      "Welcome to my website!",
      "I'm a 2nd year computer science student at TMU.",
      "Check out my projects and LinkedIn profile!",
      "Keep it simple. Make it work. Make impact."
    ];

    const hour = new Date().getHours();
    let greeting = "Good evening.";

    if (hour >= 5 && hour < 12) greeting = "Good morning.";
    else if (hour >= 12 && hour < 17) greeting = "Good afternoon.";

    baseTexts[0] = `${greeting} ${baseTexts[0]}`;
    setTexts(baseTexts);
  }, []);

  useEffect(() => {
    if (texts.length === 0) return;

    const current = texts[textIndex];
    const isComplete = charIndex === current.length;

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setIntroText(current.substring(0, charIndex + 1));
        setCharIndex((prev) => prev + 1);
        if (isComplete) {
          setIsDeleting(true);
        }
      } else {
        setIntroText(current.substring(0, charIndex - 1));
        setCharIndex((prev) => prev - 1);
        if (charIndex === 0) {
          setIsDeleting(false);
          setTextIndex((prev) => (prev + 1) % texts.length);
        }
      }
    }, isDeleting ? 30 : (isComplete ? 1500 : 90));

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, textIndex, texts]);

  return (
    <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -30 }}
        transition={{ duration: 0.5 }}
    >
      <div className="App">
        <Sidebar />
        <Name_title />
        <div id="intro">{introText}</div>
        <div className="profile-section">
          <img className="profile-image" src={profileImage} alt="profile-image" />
          <Tooltip className="desktop-social-links" />
        </div>
        <div className="social-links-row">
          <Tooltip className="home-social-links" />
        </div>
        
        {/* Mobile CTA Buttons */}
        <div className="mobile-cta-section">
          <Link to="/projects" className="mobile-cta-btn mobile-cta-primary">
            View Projects
          </Link>
          <Link to="/contacts" className="mobile-cta-btn mobile-cta-secondary">
            Contact Me
          </Link>
        </div>
        
        {/* Mobile Stats Row */}
        <div className="mobile-stats-row">
          <div className="mobile-stat">
            <span className="stat-number">7+</span>
            <span className="stat-label">Projects</span>
          </div>
          <div className="mobile-stat-divider"></div>
          <div className="mobile-stat">
            <span className="stat-number">3</span>
            <span className="stat-label">Awards</span>
          </div>
          <div className="mobile-stat-divider"></div>
          <div className="mobile-stat">
            <span className="stat-number">2</span>
            <span className="stat-label">Fellowships</span>
          </div>
        </div>
      </div>
      <Copyright isVisible={isAtBottom} />
    </motion.div>
);

}

export default Home;
