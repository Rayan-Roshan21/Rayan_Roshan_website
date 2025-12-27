import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import './ExperienceTimeline.css';

const ExperienceTimeline = () => {
  // Resume experiences (projects excluded)
  const experiences = [
    {
      date: '2026-05',
      title: 'Incoming ServiceNow Intern',
      company: 'Ernst & Young · Toronto, ON',
      summary: 'Selected for a consulting internship focused on ServiceNow platform development. Will be configuring and testing ServiceNow modules, supporting client proposals with technical documentation, and collaborating with cross-functional teams to deliver enterprise solutions.',
      tags: ['ServiceNow', 'Consulting']
    },
    {
      date: '2025-07',
      title: 'Project Experience Lead',
      company: 'TMU BYTE · Toronto, ON',
      summary: 'Leading AI/ML project initiatives by designing comprehensive technical roadmaps and architectures. Mentoring a team of 10+ contributors through code reviews, technical workshops, and agile development practices. Successfully delivered multiple showcase-ready machine learning applications with production-grade quality.',
      tags: ['AI/ML', 'Leadership']
    },
    {
      date: '2025-04',
      title: 'Software Engineering Resident',
      company: 'Headstarter · Remote',
      summary: 'Developed 4+ production-ready ML/AI and full-stack projects using JavaScript, TypeScript, and Python. Deployed scalable applications on Vercel with focus on performance optimization. Implemented advanced LLM chaining techniques and fine-tuned models for specific use cases, gaining hands-on experience with modern AI development workflows.',
      tags: ['JavaScript', 'TypeScript', 'Python']
    },
    {
      date: '2024-07',
      title: 'Entrepreneurship Fellow',
      company: 'DMZ & IBZ · Toronto, ON',
      summary: 'Participated in startup accelerator program where I scaled Univ by securing grants and cloud credits. Worked closely with industry mentors to refine technical architecture, implement scalable infrastructure on Azure, and develop go-to-market strategies. Gained valuable insights into building and scaling technology startups.',
      tags: ['Startups', 'Azure', 'Architecture']
    },
    {
      date: '2023-04',
      title: 'Founder & iOS Developer',
      company: 'Univ · Toronto, ON',
      summary: 'Founded and developed a comprehensive college admissions platform from the ground up. Built the iOS application using Swift with Firebase backend, integrated Gemini AI for personalized recommendations, and deployed scalable services on Azure. Successfully shipped MVP to production in under 4 months, managing the entire product lifecycle from concept to launch.',
      tags: ['Swift', 'Firebase', 'AI']
    }
  ];

  // Sort in reverse chronological order (newest first)
  const sorted = useMemo(
    () => [...experiences].sort((a, b) => new Date(b.date) - new Date(a.date)),
    [experiences]
  );

  const todayYear = new Date().getFullYear();
  const todayMonth = new Date().getMonth();

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="timeline-root" aria-label="Experience timeline">
      <div className="timeline-header">
        <h2 className="timeline-range">Experience Timeline</h2>
      </div>

      <ul className="timeline">
        {sorted.map((exp, idx) => {
          const date = new Date(exp.date + '-01');
          const label = date.toLocaleDateString(undefined, { month: 'short', year: 'numeric' });
          const isPresent = date.getFullYear() === todayYear && date.getMonth() >= todayMonth;
          const direction = idx % 2 === 0 ? 'direction-l' : 'direction-r';

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
                  className="timeline-card"
                  whileHover={{ scale: 1.02, boxShadow: '0 4px 16px rgba(0,0,0,0.12)' }}
                  transition={{ duration: 0.2 }}
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
                    </ul>
                  ) : null}
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