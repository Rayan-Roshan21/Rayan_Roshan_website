import React, { useState, useEffect, useRef } from 'react';
import { TransitionLink } from '@/Components/PageTransition/PageTransition';
import '@/Pages_CSS/Home.css';
import Sidebar from '@/Components/Sidebar/Sidebar.jsx';
import profileImage from '@/assets/profile-image.JPG';
import { motion, useInView } from 'framer-motion';
import Copyright from '@/Components/Copyright_title/Copyright_title.jsx';

// Count-up animation for stats
function AnimatedCounter({ value }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [display, setDisplay] = useState('0');

  useEffect(() => {
    if (!isInView) return;
    if (value === '∞') { setDisplay('∞'); return; }
    const numStr = value.replace(/\D/g, '');
    const suffix = value.replace(/\d/g, '');
    const target = parseInt(numStr, 10);
    if (isNaN(target)) { setDisplay(value); return; }

    const duration = 1400;
    let startTime = null;
    const step = (ts) => {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(eased * target);
      setDisplay(current + (progress >= 1 ? suffix : ''));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [isInView, value]);

  return <span ref={ref}>{display}</span>;
}

const TECH_PILLS = ['React', 'Python', 'FastAPI', 'TypeScript', 'OpenAI', 'Node.js'];

const FEATURED = [
  {
    num: '01',
    name: 'Yapp',
    desc: 'Social platform for student communities — built and shipped as co-founder.',
    to: '/projects',
  },
  {
    num: '02',
    name: 'AI Voice Agent',
    desc: 'Real-time customer support with voice, RAG pipeline, and Pinecone retrieval.',
    to: '/projects',
  },
  {
    num: '03',
    name: 'Prior Auth Automation',
    desc: 'Cuts clinical admin time for healthcare providers using document AI.',
    to: '/projects',
  },
];

function Home() {
  const [introText, setIntroText] = useState('');
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [texts, setTexts] = useState([]);

  useEffect(() => {
    const baseTexts = [
      "Building AI systems that make an impact.",
      "CS student. Builder. Founder.",
      "Keep it simple. Make it work. Make impact.",
      "Voice agents, healthcare AI, recommendation systems."
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
        if (isComplete) setIsDeleting(true);
      } else {
        setIntroText(current.substring(0, charIndex - 1));
        setCharIndex((prev) => prev - 1);
        if (charIndex === 0) {
          setIsDeleting(false);
          setTextIndex((prev) => (prev + 1) % texts.length);
        }
      }
    }, isDeleting ? 25 : (isComplete ? 1800 : 75));

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, textIndex, texts]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Sidebar />

      {/* ── HERO SECTION ── */}
      <section className="home-hero section-dark">
        <div className="home-hero__orb home-hero__orb--1" aria-hidden="true" />
        <div className="home-hero__orb home-hero__orb--2" aria-hidden="true" />

        <div className="home-hero__inner">

          {/* Left — Text content */}
          <div className="home-hero__content">
            <p className="home-hero__eyebrow">Toronto Metropolitan University · CS</p>

            <h1 className="home-hero__name">Rayan Roshan</h1>

            <p className="home-hero__subtitle">
              Computer Science student building AI systems,<br />
              voice agents, and scalable products.
            </p>

            <p className="home-hero__typewriter" aria-live="polite">
              {introText}<span className="home-hero__cursor" aria-hidden="true">|</span>
            </p>

            {/* Tech stack pills */}
            <div className="home-hero__pills" aria-label="Tech stack">
              {TECH_PILLS.map((pill) => (
                <span key={pill} className="home-tech-pill">{pill}</span>
              ))}
            </div>

            {/* CTAs */}
            <div className="home-hero__ctas">
              <TransitionLink to="/projects" className="home-cta-pill home-cta-pill--outline" id="hero-cta-projects">
                View Projects ›
              </TransitionLink>
              <TransitionLink to="/contact" className="home-cta-pill home-cta-pill--blue" id="hero-cta-contact">
                Get in Touch
              </TransitionLink>
            </div>
          </div>

          {/* Right — Profile image */}
          <div className="home-hero__image-wrap">
            <img
              className="home-hero__image"
              src={profileImage}
              alt="Rayan Roshan"
            />
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="home-hero__scroll" aria-hidden="true">
          <span className="home-hero__scroll-dot" />
        </div>
      </section>

      {/* ── STATS SECTION ── */}
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
              <span className="home-stat__number"><AnimatedCounter value="12+" /></span>
              <span className="home-stat__label">Projects Shipped</span>
            </div>
            <div className="home-stat__divider" aria-hidden="true" />
            <div className="home-stat__item">
              <span className="home-stat__number"><AnimatedCounter value="3+" /></span>
              <span className="home-stat__label">Awards Won</span>
            </div>
            <div className="home-stat__divider" aria-hidden="true" />
            <div className="home-stat__item">
              <span className="home-stat__number"><AnimatedCounter value="2" /></span>
              <span className="home-stat__label">Fellowships</span>
            </div>
            <div className="home-stat__divider" aria-hidden="true" />
            <div className="home-stat__item">
              <span className="home-stat__number"><AnimatedCounter value="∞" /></span>
              <span className="home-stat__label">Curiosity</span>
            </div>
          </div>
        </div>
      </motion.section>

      {/* ── FEATURED WORK ── */}
      <motion.section
        className="home-featured section-dark"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <div className="home-featured__inner section-container">
          <p className="home-featured__label">Selected Work</p>
          <div className="home-featured__grid">
            {FEATURED.map((project, i) => (
              <motion.div
                key={project.num}
                className="home-feat-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: 'easeOut' }}
              >
                <span className="home-feat-card__num">{project.num}</span>
                <h3 className="home-feat-card__name">{project.name}</h3>
                <p className="home-feat-card__desc">{project.desc}</p>
                <TransitionLink to={project.to} className="home-feat-card__link">View project ›</TransitionLink>
              </motion.div>
            ))}
          </div>
          <div className="home-featured__footer">
            <TransitionLink to="/projects" className="home-learn-more" id="home-featured-all">
              See all projects ›
            </TransitionLink>
          </div>
        </div>
      </motion.section>

      {/* ── ABOUT TEASER ── */}
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
            I build production-ready systems — voice agents that handle real calls, automation
            that cuts clinical admin time, and recommendation engines that actually convert.
            My focus: shipping things that work.
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

      <Copyright isVisible={true} dark />
    </motion.div>
  );
}

export default Home;
