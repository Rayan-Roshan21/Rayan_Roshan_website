import React from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import Sidebar from '@/Components/Sidebar/Sidebar.jsx';
import { usePageMotion } from '@/context/PageTransitionContext';
import '@/Pages_CSS/About.css';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import Copyright from '@/Components/Copyright_title/Copyright_title.jsx';
import Image_slideshow from '@/Components/Image_carousel/Image_slideshow.jsx';
import GridFour from '@/Components/Grid_Four/Grid_Four.jsx';
import ExperienceTimeline from '@/Components/Experience_Timeline/ExperienceTimeline.jsx';

/* ============================================================
   ABOUT
   ------------------------------------------------------------
   The three sections are routes, not component state.

   As useState they answered none of the wayfinding questions:
   the URL never changed, so Back left the page entirely instead
   of stepping between sections, "Experience" could not be linked
   to or bookmarked, a refresh silently dropped you back on
   section one, and the tabs could not be opened in a new tab.

   Section one is /about rather than /about/who-i-am so the page
   has one canonical address instead of two that render the same
   thing.
   ============================================================ */

const SECTIONS = [
  { slug: null, path: '/about', label: 'Who I Am' },
  { slug: 'skills', path: '/about/skills', label: 'Skills & Tools' },
  { slug: 'experience', path: '/about/experience', label: 'Experience' },
];

function About() {
  const pageMotion = usePageMotion();
  const reduced = useReducedMotion();
  const { section: slug } = useParams();

  const index = SECTIONS.findIndex((s) => s.slug === (slug ?? null));

  // An unknown slug is a dead end. Send it to the canonical address,
  // replacing the bad entry so Back does not bounce into it again.
  if (index === -1) return <Navigate to="/about" replace />;

  const prev = index > 0 ? SECTIONS[index - 1] : null;
  const next = index < SECTIONS.length - 1 ? SECTIONS[index + 1] : null;

  // Swap motion, shared by all three sections.
  const swap = {
    initial: reduced ? { opacity: 0 } : { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    exit: reduced ? { opacity: 0 } : { opacity: 0, y: -16 },
    transition: reduced
      ? { duration: 0.15 }
      : { type: 'spring', bounce: 0, duration: 0.35 },
  };

  // Reveal motion for the light half of each section.
  const reveal = (amount) => ({
    initial: reduced ? { opacity: 0 } : { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount },
    transition: reduced
      ? { duration: 0.2 }
      : { type: 'spring', bounce: 0, duration: 0.5 },
  });

  return (
    <motion.div {...pageMotion}>
      <Sidebar />

      {/* ── Section navigation ──────────────────────────────────
          Links, not buttons: they change the address, so they
          should support middle-click, cmd-click and "copy link"
          like every other navigation on the site.
          ─────────────────────────────────────────────────────── */}
      <nav className="about-tab-bar" aria-label="About sections">
        <div className="about-tab-bar__inner">
          {SECTIONS.map(({ path, label }, i) => (
            <Link
              key={path}
              to={path}
              id={`about-tab-${i + 1}`}
              className={`about-tab pressable ${i === index ? 'about-tab--active' : ''}`}
              aria-current={i === index ? 'page' : undefined}
            >
              {label}
            </Link>
          ))}
        </div>
      </nav>

      <AnimatePresence mode="wait">
        {/* ── SECTION 1: Who Am I ── */}
        {index === 0 && (
          <motion.div key="who" {...swap}>
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
            <motion.section
              className="about-section section-light about-facts"
              {...reveal(0.2)}
            >
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
            </motion.section>
          </motion.div>
        )}

        {/* ── SECTION 2: Skills ── */}
        {index === 1 && (
          <motion.div key="skills" {...swap}>
            {/* Dark hero intro */}
            <section className="about-section section-dark about-skills-hero">
              <div className="about-skills-hero__inner section-container">
                <p className="about-eyebrow">Skills &amp; Tools</p>
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
            <motion.section
              className="about-section section-light about-skills-grid"
              {...reveal(0.15)}
            >
              <div className="about-skills-grid__inner section-container-wide">
                <GridFour />
              </div>
            </motion.section>
          </motion.div>
        )}

        {/* ── SECTION 3: Experience ── */}
        {index === 2 && (
          <motion.div key="experience" {...swap}>
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
            <motion.section
              className="about-section section-light about-timeline"
              {...reveal(0.15)}
            >
              <div className="about-timeline__inner section-container-wide">
                <ExperienceTimeline />
              </div>
            </motion.section>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Previous / next. Rendered as links where a destination
          exists and as an inert spacer where it does not — a
          disabled link is not a real thing, and an anchor with no
          href is invisible to keyboard users anyway. */}
      <div className="about-section-nav">
        <div className="about-section-nav__inner">
          {prev ? (
            <Link
              id="about-prev-btn"
              to={prev.path}
              className="about-section-nav__btn pressable"
              rel="prev"
            >
              ← {prev.label}
            </Link>
          ) : (
            <span className="about-section-nav__spacer" aria-hidden="true" />
          )}

          <span className="about-section-nav__counter">
            {index + 1} / {SECTIONS.length}
          </span>

          {next ? (
            <Link
              id="about-next-btn"
              to={next.path}
              className="about-section-nav__btn about-section-nav__btn--right pressable"
              rel="next"
            >
              {next.label} →
            </Link>
          ) : (
            <span className="about-section-nav__spacer" aria-hidden="true" />
          )}
        </div>
      </div>

      <Copyright isVisible={true} dark={index !== 1} />
    </motion.div>
  );
}

export default About;
