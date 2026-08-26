import { useMemo, useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import './ExperienceTimeline.css';

const ExperienceTimeline = () => {
  // Resume experiences (projects excluded). endDate: null means ongoing —
  // that flag drives the "Present" badge instead of inferring it from
  // array position, which broke once more than one entry had passed.
  const experiences = [
    {
      date: '2025-07',
      endDate: null,
      title: 'VP of Technology',
      company: 'TMU BYTE · Toronto, ON',
      summary: 'Set technical direction for TMU\'s student-run open-source AI club — architecture decisions, project roadmaps, and engineering standards across the team. Mentoring 10+ contributors through code reviews and technical workshops.',
      tags: ['AI/ML', 'Leadership'],
      accentColor: '#00b4d8'
    },
    {
      date: '2026-05',
      endDate: '2026-08',
      title: 'Technology Consulting Intern | ServiceNow Group',
      company: 'EY · Toronto, ON',
      summary: 'Built AI Lens, an LLM-powered triage tool grounded in knowledge base retrieval to minimize unsourced outputs. Shipped two Copilot agents used by 12,000+ consultants firm-wide. Supported ServiceNow module configuration, testing, and proposal documentation for the practice.',
      tags: ['LLM', 'ServiceNow', 'Consulting'],
      accentColor: '#003781'
    },
    {
      date: '2025-12',
      endDate: '2026-01',
      title: 'Project Experience Lead & Web Developer',
      company: 'TMU Tech Week · Toronto, ON',
      summary: 'Designed and developed a production web platform for TMU Tech Week, enhancing user engagement. Built responsive front-end components using JavaScript, React.js, HTML, and CSS for event discovery. Collaborated with strategic teams to gather requirements and deliver features on time.',
      tags: ['JavaScript', 'React.js', 'Web Development'],
      accentColor: '#0071e3'
    },
    {
      date: '2025-01',
      endDate: null,
      title: 'Co-Founder & Full-Stack Engineer',
      company: 'Yapp · Toronto, ON',
      summary: 'Building a campus discovery platform for TMU students on React, Flask, and MongoDB, with a Railway backend tuned for persistent processes. Implemented passwordless email OTP auth verified against short-lived JWTs. Reached 500+ users and 3,700+ views in the first two weeks, with recognition from TMU\'s CS department.',
      tags: ['React', 'Flask', 'MongoDB'],
      accentColor: '#8338ec'
    },
    {
      date: '2024-08',
      endDate: '2025-06',
      title: 'Project Experience Lead',
      company: 'TMU BYTE · Toronto, ON',
      summary: 'Led AI/ML project initiatives by designing comprehensive technical roadmaps and architectures. Mentored a team of 10+ contributors through code reviews, technical workshops, and agile development practices. Delivered multiple showcase-ready machine learning applications with production-grade quality.',
      tags: ['AI/ML', 'Leadership'],
      accentColor: '#00b4d8'
    },
    {
      date: '2025-04',
      endDate: '2025-06',
      title: 'Software Engineering Resident',
      company: 'Headstarter · Remote',
      summary: 'Developed 4+ production-ready ML/AI and full-stack projects using JavaScript, TypeScript, and Python. Deployed scalable applications on Vercel with focus on performance optimization. Implemented advanced LLM chaining techniques and fine-tuned models for specific use cases, gaining hands-on experience with modern AI development workflows.',
      tags: ['JavaScript', 'TypeScript', 'Python'],
      accentColor: '#06d6a0'
    },
    {
      date: '2024-07',
      endDate: '2024-08',
      title: 'Entrepreneurship Fellow',
      company: 'DMZ & IBZ · Toronto, ON',
      summary: 'Participated in startup accelerator program where I scaled Univ by securing grants and cloud credits. Worked closely with industry mentors to refine technical architecture, implement scalable infrastructure on Azure, and develop go-to-market strategies. Gained valuable insights into building and scaling technology startups.',
      tags: ['Startups', 'Azure', 'Architecture'],
      accentColor: '#f77f00'
    },
    {
      date: '2023-04',
      endDate: '2024-08',
      title: 'Founder & iOS Developer',
      company: 'Univ · Toronto, ON',
      summary: 'Founded and developed a comprehensive college admissions platform from the ground up. Built the iOS application using Swift with Firebase backend, integrated Gemini AI for personalized recommendations, and deployed scalable services on Azure. Shipped MVP to production in under 4 months, secured $5,000 in Azure credits via Microsoft Startup Founder Hub, and grew a database of 50+ institutions.',
      tags: ['Swift', 'Firebase', 'AI'],
      accentColor: '#e63946'
    }
  ];

  // Sort in reverse chronological order (newest first)
  const sorted = useMemo(
    () => [...experiences].sort((a, b) => new Date(b.date) - new Date(a.date)),
    []
  );

  const today = new Date();

  // Scroll-animated timeline line
  const timelineRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ['start 85%', 'end 15%']
  });
  const lineScaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  // Active card tracking — highlight card closest to viewport center
  const [activeIdx, setActiveIdx] = useState(null);
  const cardRefs = useRef([]);

  useEffect(() => {
    const handleScroll = () => {
      const center = window.innerHeight / 2;
      let bestIdx = null;
      let bestDist = Infinity;
      cardRefs.current.forEach((ref, i) => {
        if (!ref) return;
        const rect = ref.getBoundingClientRect();
        const cardCenter = (rect.top + rect.bottom) / 2;
        const dist = Math.abs(cardCenter - center);
        if (dist < bestDist) {
          bestDist = dist;
          bestIdx = i;
        }
      });
      setActiveIdx(bestIdx);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="timeline-root" aria-label="Experience timeline">
      <div className="timeline-header">
        <h2 className="timeline-range">Experience Timeline</h2>
      </div>

      <ul className="timeline" ref={timelineRef}>
        <motion.div
          className="timeline-line"
          style={{ scaleY: lineScaleY }}
        />
        {sorted.map((exp, idx) => {
          const [y, m] = exp.date.split('-').map(Number);
          const date = new Date(y, m - 1, 1);
          const label = date.toLocaleDateString(undefined, { month: 'short', year: 'numeric' });
          const isFuture = date > today;
          const isPresent = !isFuture && exp.endDate === null;
          const direction = idx % 2 === 0 ? 'direction-l' : 'direction-r';
          const isActive = activeIdx === null || activeIdx === idx;

          return (
            <motion.li
              key={`${exp.title}-${idx}`}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.1, ease: 'easeOut' }}
            >
              <div className={direction}>
                <motion.article
                  ref={el => cardRefs.current[idx] = el}
                  className="timeline-card"
                  style={{ borderTop: `3px solid ${exp.accentColor}` }}
                  animate={{ opacity: isActive ? 1 : 0.35 }}
                  whileHover={{ scale: 1.02, boxShadow: '0 4px 16px rgba(0,0,0,0.12)', opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="card-date">{label}</div>
                  <h3 className="card-title">{exp.title}</h3>
                  <div className="card-company">{exp.company}</div>
                  <p className="card-summary">{exp.summary}</p>
                  {exp.tags?.length ? (
                    <ul className="card-tags">
                      {exp.tags.map((t, i) => (
                        <li key={i} className="tag" style={{ color: exp.accentColor }}>{t}</li>
                      ))}
                    </ul>
                  ) : null}
                  {isFuture && (
                    <div className="timeline-present">
                      <span className="present-dot upcoming-dot" />
                      <span className="present-label">Upcoming</span>
                    </div>
                  )}
                  {isPresent && (
                    <div className="timeline-present">
                      <span className="present-dot" />
                      <span className="present-label">Present</span>
                    </div>
                  )}
                </motion.article>
              </div>
            </motion.li>
          );
        })}
      </ul>
    </div>
  );
};

export default ExperienceTimeline;
