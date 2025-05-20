import React, { useState, useEffect } from 'react';
import '../Pages_CSS/Home.css';
import Sidebar from '../Components/Sidebar/Sidebar';
import profileImage from '../assets/profile-image.JPG';
import Tooltip from '../Components/Information_bar/Tooltip';
import { motion } from 'framer-motion';
import Copyright from '../Components/Copyright_title/Copyright_title'
import Name_title from '../Components/name_title/name_title';
function Home() {
  const [introText, setIntroText] = useState('');
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [texts, setTexts] = useState([]);

  // Set up the messages based on time
  useEffect(() => {
    const baseTexts = [
      "Welcome to my website!",
      "I'm a computer science student at TMU.",
      "Check out my projects and LinkedIn profile!",
      "Keep it simple. Make it work."
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
    }, isDeleting ? 50 : (isComplete ? 1500 : 100));

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
      <div>
        <img className="profile-image" src={profileImage} alt="profile-image" />
        <Tooltip />
      </div>
      <div>
        <Copyright />
      </div>
      </div>
    </motion.div>
);

}

export default Home;
