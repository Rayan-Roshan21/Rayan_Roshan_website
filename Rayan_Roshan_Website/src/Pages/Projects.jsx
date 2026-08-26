import React, { useMemo, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import Sidebar from '@/Components/Sidebar/Sidebar.jsx';
import Img from '@/Components/Img/Img.jsx';
import { usePageMotion } from '@/context/PageTransitionContext';
import CopyrightTitle from '@/Components/CopyrightTitle/CopyrightTitle.jsx';
import '@/Pages_CSS/Projects.css';
import '@/Components/Projects_component/Project.css';

// Strongest evidence first: real users and a published package before
// pitch decks. Category drives the filter row below.
const projects = [
  {
    image: 'yapp',
    alt: 'Yapp campus discovery platform',
    category: 'Full-Stack',
    name: 'Yapp',
    role: 'Co-Founder & Full-Stack Engineer',
    description: 'A campus discovery platform for TMU students, built on React, Flask, and MongoDB with a Railway backend tuned for persistent processes. Implemented passwordless email OTP auth verified against short-lived JWTs. Reached 500+ users and 3,700+ views in the first two weeks, with recognition from TMU\'s CS department. Currently building Stripe-backed ticketing for the TMU Cyber Summit.',
    links: [
      { label: 'Website ›', href: 'https://yapp-mu.com', type: 'primary' },
      { label: 'Get Involved ›', href: 'https://www.torontomu.ca/cs/current-undergraduate-students/student-life/', type: 'secondary' },
    ],
  },
  {
    image: 'llm-router',
    alt: 'LLM Router',
    category: 'AI',
    name: 'An LLM Router',
    role: 'Software Engineer',
    description: 'Combines Google Gemini\'s AI analysis with deterministic scoring across 35+ models from live leaderboards to recommend the optimal model for a given task. Published as an NPM package. Built with a small team; I owned the model routing logic.',
    links: [
      { label: 'NPM Package ›', href: 'https://www.npmjs.com/package/smart-llm-router', type: 'primary' },
      { label: 'GitHub ›', href: 'https://github.com/razzacktiger/LLM-Router', type: 'secondary' },
      { label: 'Pitch Deck ›', href: 'https://www.canva.com/design/DAGvi9DbXNE/7rnwEmvNEzt2fGyeFBoe1A/view', type: 'secondary' },
    ],
  },
  {
    image: 'tmu_tech_week',
    alt: 'TMU Tech Week',
    category: 'Full-Stack',
    name: 'TMU Tech Week',
    role: 'Web Developer & Project Lead',
    description: 'Led infrastructure build for TMU\'s flagship tech event—integrated Boardy to connect students with startups and shipped directly to production under a tight deadline. Result: 2,000+ page views and 1,000+ unique visitors in 7 days with zero outages.',
    links: [
      { label: 'Visit Website ›', href: 'https://www.tmutechweek.com', type: 'primary' },
      { label: 'GitHub ›', href: 'https://github.com/BYTE-TMU/Tmu_Tech_Week_Website', type: 'secondary' },
    ],
  },
  {
    image: 'aiagentimage',
    alt: 'AI Customer Support Agent',
    category: 'AI',
    name: 'AI Customer Support Agent',
    role: 'Software Engineer',
    description: 'Real-time voice and text AI assistant with live transcription and mode switching. Uses Pinecone vector embeddings and the Gemini API for context-aware, multimodal support, achieving approximately 95% transcription accuracy. Built with a small team; I owned the retrieval pipeline and response generation.',
    links: [
      { label: 'GitHub ›', href: 'https://github.com/razzacktiger/Customer-Support-Agent-', type: 'primary' },
      { label: 'Pitch Deck ›', href: 'https://www.canva.com/design/DAGs_7HWn98/9iVL7aUQEPx3BtbD5VUSpQ/view', type: 'secondary' },
    ],
  },
  {
    image: 'byte_site',
    alt: 'BYTE TMU AI club website',
    imageBg: 'dark', // white logo on a transparent PNG — needs a dark backdrop
    category: 'Full-Stack',
    name: 'BYTE TMU AI Club Website',
    role: 'Software Engineer',
    description: 'Official site for BYTE, Toronto Metropolitan University\'s student-run open-source AI club. A React and TypeScript single-page app showcasing the team, events, and projects, with a RAG-powered chatbot that answers questions about the club from an internal knowledge base.',
    links: [
      { label: 'Visit Website ›', href: 'https://tmubyte.com', type: 'primary' },
      { label: 'GitHub ›', href: 'https://github.com/BYTE-TMU/BYTE_site', type: 'secondary' },
    ],
  },
  {
    image: 'medical_form',
    alt: 'Prior Authorization Automation',
    category: 'AI',
    name: 'Prior Authorization Form Automation',
    role: 'Software Engineer',
    description: 'AI system that extracts healthcare information from medical records and automatically completes Prior Authorization forms. Improves accuracy while reducing administrative burden in healthcare workflows.',
    links: [
      { label: 'GitHub ›', href: 'https://github.com/Rayan-Roshan21/mandolin-project', type: 'primary' },
      { label: 'Pitch Deck ›', href: 'https://canva.link/895kypqwnla3vv7', type: 'secondary' },
    ],
  },
  {
    image: 'art_meseum',
    alt: 'Image Style Transfer App',
    category: 'AI',
    name: 'Image Style Transfer App',
    role: 'Software Engineer',
    description: 'Turn ordinary photos into extraordinary masterpieces using AI neural style transfer, running seamlessly in the browser with WebAssembly and ONNX Runtime.',
    links: [
      { label: 'Try it out ›', href: 'https://imagestyletransfer.vercel.app/', type: 'primary' },
      { label: 'GitHub ›', href: 'https://github.com/Rayan-Roshan21/AI-Style-Transfer', type: 'secondary' },
      { label: 'Pitch Deck ›', href: 'https://www.canva.com/design/DAGxkfIu1-k/k49DSteIEngQ51fTVxr6Eg/view', type: 'secondary' },
    ],
  },
  {
    image: 'scotiabank',
    alt: 'Scotia Redlight hackathon project',
    category: 'AI',
    name: 'Scotia Redlight — Think Before You Spend',
    role: 'Participant at S:\\HACKS 2025 · 3rd Place Winner',
    description: '3rd place winner at Scotiabank S:\\HACKS 2025. AI spending companion using strategic friction to help Gen-Z transform impulse buys into intentional financial decisions.',
    links: [
      { label: 'View on Canva ›', href: 'https://www.canva.com/design/DAGw6V-hyyI/Cl_WavQn9wgv2QHNL_-_cQ/view', type: 'primary' },
      { label: 'LinkedIn Post ›', href: 'https://www.linkedin.com/posts/rayan-roshan_hackathon-innovation-fintech-activity-7365737257841909761-3yHG', type: 'secondary' },
    ],
  },
  {
    image: 'askcents',
    alt: 'AskCents',
    category: 'AI',
    name: 'AskCents',
    role: 'Founder & Software Engineer',
    description: 'Personal finance platform with an AI chatbot advisor, a gamified rewards center, and money management tools — built solo end-to-end on React, Node.js, and Gemini AI.',
    links: [
      { label: 'GitHub ›', href: 'https://github.com/Rayan-Roshan21/AskCents', type: 'primary' },
    ],
  },
  {
    image: 'multimodal video analysis',
    alt: 'Multimodal Video Analysis',
    category: 'AI',
    name: 'Multimodal Video Analysis',
    role: 'Software Engineer / Project Manager',
    description: 'AI-driven application enabling natural language conversations with YouTube videos. Generates precise timestamps and scene searches using NLP and computer vision. Built with a small team; I worked on the multimodal pipeline as engineer and project manager.',
    links: [
      { label: 'GitHub ›', href: 'https://github.com/razzacktiger/Multimodal-video-analysis-deployed', type: 'primary' },
    ],
  },
  {
    image: 'property-image',
    alt: 'Property Recommendation Software',
    category: 'AI',
    name: 'Property Recommendation Software',
    role: 'Software Engineer',
    description: 'Python-based tool leveraging feature similarity algorithms, distance-based matching, and statistical analysis to identify comparable properties and provide accurate market recommendations.',
    links: [
      { label: 'GitHub ›', href: 'https://github.com/Rayan-Roshan21/Property-Recommendation-System', type: 'primary' },
      { label: 'LinkedIn ›', href: 'https://www.linkedin.com/feed/update/urn:li:activity:7333915404685254658/', type: 'secondary' },
    ],
  },
  {
    image: 'bch_byte_workshop',
    alt: 'BCH x BYTE workshop curriculum site',
    category: 'Full-Stack',
    name: 'BCH x BYTE: Build a Project from Scratch Using AI',
    role: 'Web Developer & Curriculum Author',
    description: 'Self-paced curriculum site for a hands-on workshop that takes students from a vague idea to a live, deployed product with no coding experience required. Five sections covering AI-powered scoping, rapid prototyping, and parallel no-code and code build paths.',
    links: [
      { label: 'Start the Curriculum ›', href: 'https://byte-tmu.github.io/BCH-X-BYTE-Workshop/', type: 'primary' },
      { label: 'GitHub ›', href: 'https://github.com/BYTE-TMU/BCH-X-BYTE-Workshop', type: 'secondary' },
    ],
  },
  {
    image: 'univ',
    alt: 'Univ app',
    category: 'Full-Stack',
    name: 'Univ',
    role: 'Founder & Software Engineer',
    description: 'An iOS app simplifying the post-secondary admissions process with personalized school recommendations, institution info, and step-by-step application guidance. Shipped MVP to production in under 4 months; scaled through DMZ and Innovation Boost Zone with $5,000 in Azure credits and a database of 50+ institutions.',
    links: [
      { label: 'LinkedIn Post ›', href: 'https://www.linkedin.com/posts/rayan-roshan_startup-entrepreneurship-dmz-activity-7236719626095620096-730g', type: 'secondary' },
    ],
  },
  {
    image: 'toronto-photo',
    alt: 'Immigrant Families Research',
    category: 'Research',
    name: 'Immigrant Families & Child Care Inequality in the GTA',
    role: 'Student Researcher',
    description: 'Research analysis of child care accessibility and affordability for 700,000+ immigrant families across the Greater Toronto Area. Identified infrastructure gaps and informed evidence-based policy recommendations.',
    links: [
      { label: 'Read Paper ›', href: 'https://docs.google.com/document/d/1wDk_c1n9sb-IAN295CwN3162BCbKSOUX04ZgxMZ2ins/preview', type: 'primary' },
    ],
  },
];

const FILTERS = ['All', 'AI', 'Full-Stack', 'Research'];

function Projects() {
  const pageMotion = usePageMotion();
  const reduced = useReducedMotion();
  const [filter, setFilter] = useState('All');

  const visible = useMemo(
    () => (filter === 'All' ? projects : projects.filter((p) => p.category === filter)),
    [filter]
  );

  return (
    <motion.div {...pageMotion}>
      <title>Projects | Rayan Roshan</title>
      <meta name="description" content="AI systems, full-stack products, and research by Rayan Roshan — across React, Python, Swift, and LLM infrastructure." />

      <Sidebar />

      {/* ── HERO ── */}
      <section className="projects-hero section-dark">
        <div className="projects-hero__inner section-container">
          <p className="projects-hero__eyebrow">Portfolio</p>
          <h1 className="projects-hero__heading">Projects</h1>
          <p className="projects-hero__sub">
            A selection of work across AI, full-stack engineering, and research.
          </p>
        </div>
      </section>

      {/* ── GRID ── */}
      <section className="projects-grid-section section-light">
        <div className="projects-grid-section__inner">
          <div className="projects-filter-row" role="group" aria-label="Filter projects by category">
            {FILTERS.map((f) => (
              <button
                key={f}
                type="button"
                className={`projects-filter-btn pressable ${filter === f ? 'projects-filter-btn--active' : ''}`}
                aria-pressed={filter === f}
                onClick={() => setFilter(f)}
              >
                {f}
              </button>
            ))}
          </div>

          <div className="projects-wrapper">
            {visible.map((project) => (
              <motion.div
                key={project.name}
                className="project-container pressable pressable--subtle"
                layout
                initial={reduced ? { opacity: 0 } : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={
                  reduced
                    ? { duration: 0.2, ease: 'easeOut' }
                    : { type: 'spring', bounce: 0, duration: 0.5 }
                }
              >
                <Img
                  className={`project-image${project.imageBg ? ` project-image--${project.imageBg}` : ''}`}
                  name={project.image}
                  alt={project.alt}
                  loading="lazy"
                  sizes="(max-width: 900px) 100vw, 560px"
                />
                <p className="project_name">{project.name}</p>
                <p className="project-role">{project.role}</p>
                <p className="project-description">{project.description}</p>
                <div className="project-buttons">
                  {project.links.map((link, li) => (
                    <a
                      key={li}
                      className={`project-link project-link--${link.type}`}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CopyrightTitle isVisible={true} />
    </motion.div>
  );
}

export default Projects;
