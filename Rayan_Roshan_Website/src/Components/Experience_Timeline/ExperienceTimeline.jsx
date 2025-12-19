import React, { useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './ExperienceTimeline.css';

const ExperienceTimeline = () => {
  // Resume experiences (projects excluded)
  const experiences = [
    {
      date: '2026-05',
      title: 'Incoming ServiceNow Intern',
      company: 'Ernst & Young · Toronto, ON',
      summary: 'Configured and tested ServiceNow modules; supported proposals with documentation.',
      tags: ['ServiceNow', 'Consulting']
    },
    {
      date: '2025-07',
      title: 'Project Experience Lead',
      company: 'TMU BYTE · Toronto, ON',
      summary: 'Designed AI/ML roadmaps; mentored 10+ contributors; delivered showcase-ready outcomes.',
      tags: ['AI/ML', 'Leadership']
    },
    {
      date: '2025-04',
      title: 'Software Engineering Resident',
      company: 'Headstarter · Remote',
      summary: 'Built 4+ ML/AI/full-stack projects; JS/TS/Python on Vercel; LLM chaining & fine-tuning.',
      tags: ['JavaScript', 'TypeScript', 'Python']
    },
    {
      date: '2024-07',
      title: 'Entrepreneurship Fellow',
      company: 'DMZ & IBZ · Toronto, ON',
      summary: 'Scaled Univ with grants/credits; improved architecture with industry mentorship.',
      tags: ['Startups', 'Azure', 'Architecture']
    },
    {
      date: '2023-04',
      title: 'Founder & iOS Developer',
      company: 'Univ · Toronto, ON',
      summary: 'Built admissions platform (Swift, Firebase, Gemini AI, Azure); shipped MVP in <4 months.',
      tags: ['Swift', 'Firebase', 'AI']
    }
  ];

  const sorted = useMemo(
    () => [...experiences].sort((a, b) => new Date(a.date) - new Date(b.date)),
    [experiences]
  );

  const todayYear = new Date().getFullYear();

  const scrollerRef = useRef(null);

  const scrollByCards = (dir) => {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.querySelector('.timeline-card');
    const amount = card ? card.offsetWidth + 24 : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * amount, behavior: 'smooth' });
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 24, scale: 0.97 },
    visible: { opacity: 1, y: 0, scale: 1 },
  };

  return (
    <div className="timeline-root" aria-label="Experience timeline">
      <div className="timeline-header">
        <span className="timeline-range">Timeline</span>
        <div className="timeline-controls">
          <button className="timeline-btn" onClick={() => scrollByCards(-1)} aria-label="Scroll left">←</button>
          <button className="timeline-btn" onClick={() => scrollByCards(1)} aria-label="Scroll right">→</button>
        </div>
      </div>

      <div className="timeline-track" aria-hidden="true" />

      <div className="timeline-scroller" ref={scrollerRef}>
        <AnimatePresence initial={false} mode="popLayout">
          {sorted.map((exp, idx) => {
            const date = new Date(exp.date + '-01');
            const label = date.toLocaleDateString(undefined, { month: 'short', year: 'numeric' });
            const isPresent = date.getFullYear() === todayYear && exp.date.includes(String(todayYear));
            return (
              <motion.article
                className="timeline-card"
                key={`${exp.title}-${idx}`}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                whileHover={{ scale: 1.025 }}
                transition={{ duration: 0.28, ease: 'easeOut' }}
              >
                <div className="card-date">{label}</div>
                <h3 className="card-title">{exp.title}</h3>
                <div className="card-company">{exp.company}</div>
                <p className="card-summary">{exp.summary}</p>
                {exp.tags?.length ? (
                  <ul className="card-tags">
                    {exp.tags.map((t, i) => (
                      <li key={i} className="tag">{t}</li>
                    ))}
            <div className="timeline-track" aria-hidden="true" />
                  </ul>
                ) : null}
                {isPresent && (
                  <div className="timeline-present">
                    <span className="present-dot" />
                    <span className="present-label">Present</span>
                  </div>
                )}
              </motion.article>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ExperienceTimeline;