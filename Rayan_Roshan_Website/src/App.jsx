import React, { useState, useEffect } from 'react';
import './App.css';
import Sidebar from './Sidebar/Sidebar';
import profileImage from './assets/profile-image.JPG';


function App() {
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
    <div className="App">
      <Sidebar />
      <h1 className="title">Rayan Roshan</h1>
      <div id="intro">{introText}</div>
      <img className="profile-image" src={profileImage} alt="profile" />
    </div>
  );
}

export default App;
