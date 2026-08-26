import React, { useState, useEffect } from 'react';
import '@/Pages_CSS/Home.css';
import Sidebar from '@/Components/Sidebar/Sidebar.jsx';
import Img from '@/Components/Img/Img.jsx';
import { motion, useReducedMotion } from 'framer-motion';
import Copyright from '@/Components/CopyrightTitle/CopyrightTitle.jsx';
import TransitionLink from '@/Components/TransitionLink/TransitionLink.jsx';
import { usePageMotion } from '@/context/PageTransitionContext';

function Home() {
  const pageMotion = usePageMotion();
  const reduced = useReducedMotion();

  const [introText, setIntroText] = useState('');
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [texts, setTexts] = useState([]);

  // Set up the messages based on time. The last entry is the resting
  // line the typewriter settles on — see the effect below.
  useEffect(() => {
    const baseTexts = [
      "Building AI systems that make an impact.",
      "Voice agents, healthcare AI, recommendation systems.",
      "Keep it simple. Make it work. Make impact.",
      "CS student. Builder. Founder."
    ];

    const hour = new Date().getHours();
    let greeting = "Good evening.";
    if (hour >= 5 && hour < 12) greeting = "Good morning.";
    else if (hour >= 12 && hour < 17) greeting = "Good afternoon.";

    baseTexts[0] = `${greeting} ${baseTexts[0]}`;
    setTexts(baseTexts);
  }, []);

  // The typewriter cycles through every line but the last, then types
  // the last line once and leaves it — perpetual motion above the fold
  // competes with everything else on the page for attention. Under
  // reduced motion both the cycle and the settle-typing are skipped and
  // the first line is simply shown.
  const restIndex = texts.length - 1;
  const settled = texts.length > 0 && textIndex >= restIndex;

  useEffect(() => {
    if (texts.length === 0) return;
    if (reduced) {
      setIntroText(texts[0]);
      return;
    }

    if (settled) {
      const restText = texts[restIndex];
      if (charIndex >= restText.length) return; // fully typed — stay put
      const timeout = setTimeout(() => {
        setIntroText(restText.substring(0, charIndex + 1));
        setCharIndex((prev) => prev + 1);
      }, 75);
      return () => clearTimeout(timeout);
    }

    const current = texts[textIndex];
    const isComplete = charIndex === current.length;

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setIntroText(current.substring(0, charIndex + 1));
        setCharIndex((prev) => prev + 1);
        if (isComplete) setIsDeleting(true);
      } else {
        setIntroText(current.substring(0, charIndex - 1));
        setCharIndex((prev) => prev - 1);
        if (charIndex === 0) {
          setIsDeleting(false);
          setTextIndex((prev) => prev + 1);
        }
      }
    }, isDeleting ? 25 : (isComplete ? 1800 : 75));

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, textIndex, texts, reduced, settled, restIndex]);

  return (
    <motion.div {...pageMotion}>
      <title>Rayan Roshan</title>
      <meta name="description" content="Rayan Roshan — Computer Science co-op student at TMU building AI systems, voice agents, and scalable products." />

      <Sidebar />

      {/* ── HERO SECTION — Black ── */}
      <section className="home-hero section-dark">
        <div className="home-hero__inner">

          {/* Left — Text content */}
          <div className="home-hero__content">
            <p className="home-hero__eyebrow">Toronto Metropolitan University · CS</p>

            <h1 className="home-hero__name">Rayan Roshan</h1>

            <p className="home-hero__subtitle">
              Third-year CS co-op student at TMU. I build full-stack products<br />
              and applied AI systems.
            </p>

            {/* Typewriter — the animated node is hidden from assistive tech
                since it mutates continuously; the first line is rendered
                once, statically, in a visually-hidden sibling so the
                content itself still reaches a screen reader. */}
            <p className="home-hero__typewriter" aria-hidden="true">
              {introText}
              {!reduced && <span className="home-hero__cursor" aria-hidden="true">|</span>}
            </p>
            <p className="visually-hidden">{texts[0]}</p>

            {/* CTAs */}
            <div className="home-hero__ctas">
              <TransitionLink to="/projects" className="home-cta-pill home-cta-pill--outline pressable" id="hero-cta-projects">
                View Projects ›
              </TransitionLink>
              <TransitionLink to="/contact" className="home-cta-pill home-cta-pill--blue pressable" id="hero-cta-contact">
                Get in Touch
              </TransitionLink>
            </div>
          </div>

          {/* Right — Profile image */}
          <div className="home-hero__image-wrap">
            <Img
              className="home-hero__image"
              name="profile-image"
              alt="Rayan Roshan"
              loading="eager"
              fetchPriority="high"
              sizes="(max-width: 900px) 50vw, 360px"
            />
          </div>
        </div>
      </section>

      {/* ── STATS SECTION — Light Gray ── */}
      <motion.section
        className="home-stats section-light"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <div className="home-stats__inner section-container">
          <div className="home-stats__grid">
            <div className="home-stat__item">
              <span className="home-stat__number">1,500+</span>
              <span className="home-stat__label">Users Reached</span>
            </div>
            <div className="home-stat__divider" aria-hidden="true" />
            <div className="home-stat__item">
              <span className="home-stat__number">13</span>
              <span className="home-stat__label">Engineers Led</span>
            </div>
            <div className="home-stat__divider" aria-hidden="true" />
            <div className="home-stat__item">
              <span className="home-stat__number">6</span>
              <span className="home-stat__label">Awards &amp; Grants</span>
            </div>
            <div className="home-stat__divider" aria-hidden="true" />
            <div className="home-stat__item">
              <span className="home-stat__number">3</span>
              <span className="home-stat__label">Years Shipping</span>
            </div>
          </div>
        </div>
      </motion.section>

      {/* ── ABOUT TEASER — Black ── */}
      <motion.section
        className="home-about section-dark"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <div className="home-about__inner section-container">
          <p className="home-about__label">Who I Am</p>
          <h2 className="home-about__heading">
            Building the future,<br />one system at a time.
          </h2>
          <p className="home-about__body">
            In a world where everyone has access to the same AI models, execution is the moat.
            I build production-ready systems — voice agents that handle real calls and automation
            that cuts clinical admin time. My focus: shipping things that work.
          </p>
          <div className="home-about__links">
            <TransitionLink to="/about" className="home-learn-more" id="home-learn-more-about">
              Learn more ›
            </TransitionLink>
            <TransitionLink to="/projects" className="home-learn-more" id="home-learn-more-projects">
              See my projects ›
            </TransitionLink>
          </div>
        </div>
      </motion.section>

      {/* Footer */}
      <Copyright isVisible={true} dark />
    </motion.div>
  );
}

export default Home;
