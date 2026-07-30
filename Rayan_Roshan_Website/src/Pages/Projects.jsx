import React from 'react';
import { motion } from 'framer-motion';
import Sidebar from '@/Components/Sidebar/Sidebar.jsx';
import Copyright_title from '@/Components/Copyright_title/Copyright_title.jsx';
import '@/Pages_CSS/Projects.css';
import '@/Components/Projects_component/Project.css';
import PropertyImage from '@/assets/property-image.jpg';
import multimodalImage from '@/assets/multimodal video analysis.png';
import torontoImage from '@/assets/toronto-photo.jpg';
import medicalFormImage from '@/assets/medical_form.jpg';
import AICustomerImage from '@/assets/aiagentimage.jpg';
import Askcents from '@/assets/askcents.png';
import Yapp from '@/assets/yapp.png';
import art_museum from '@/assets/art_meseum.jpg';
import univ from '@/assets/univ.png';
import scotiabank from '@/assets/scotiabank.jpg';
import llmrouter from '@/assets/llm-router.jpg';
import tmuTechWeek from '@/assets/tmu_tech_week.png';
import byteSite from '@/assets/byte_site.png';
import bchByteWorkshop from '@/assets/bch_byte_workshop.jpeg';

const projects = [
  {
    image: byteSite,
    alt: 'BYTE TMU AI club website',
    imageBg: 'dark', // white logo on a transparent PNG — needs a dark backdrop
    name: 'BYTE TMU AI Club Website',
    role: 'Software Engineer',
    description: 'Official site for BYTE, Toronto Metropolitan University\'s student-run open-source AI club. A React and TypeScript single-page app showcasing the team, events, and projects, with a RAG-powered chatbot that answers questions about the club from an internal knowledge base.',
    links: [
      { label: 'Visit Website ›', href: 'https://tmubyte.com', type: 'primary' },
      { label: 'GitHub ›', href: 'https://github.com/BYTE-TMU/BYTE_site', type: 'secondary' },
    ],
  },
  {
    image: bchByteWorkshop,
    alt: 'BCH x BYTE workshop curriculum site',
    name: 'BCH x BYTE: Build a Project from Scratch Using AI',
    role: 'Web Developer & Curriculum Author',
    description: 'Self-paced curriculum site for a hands-on workshop that takes students from a vague idea to a live, deployed product with no coding experience required. Five sections covering AI-powered scoping, rapid prototyping, and parallel no-code and code build paths.',
    links: [
      { label: 'Start the Curriculum ›', href: 'https://byte-tmu.github.io/BCH-X-BYTE-Workshop/', type: 'primary' },
      { label: 'GitHub ›', href: 'https://github.com/BYTE-TMU/BCH-X-BYTE-Workshop', type: 'secondary' },
    ],
  },
  {
    image: Yapp,
    alt: 'Yapp social platform',
    name: 'Yapp',
    role: 'Co-Founder & Software Engineer',
    description: 'Real-time social platform for Toronto Metropolitan University students featuring instant messaging, event coordination, and community engagement tools for enhanced campus life connectivity.',
    links: [
      { label: 'Get Involved›', href: 'https://www.torontomu.ca/cs/current-undergraduate-students/student-life/', type: 'primary' },
      { label: 'Website ›', href: 'https://yapp-mu.com', type: 'secondary' },
    ],
  },
  {
    image: tmuTechWeek,
    alt: 'TMU Tech Week',
    name: 'TMU Tech Week',
    role: 'Web Developer & Project Lead',
    description: 'Led infrastructure build for TMU\'s flagship tech event—integrated Boardy to connect students with startups and shipped directly to production under a tight deadline. Result: 2,000+ page views and 1,000+ unique visitors in 7 days with zero outages.',
    links: [
      { label: 'Visit Website ›', href: 'https://www.tmutechweek.com', type: 'primary' },
      { label: 'GitHub ›', href: 'https://github.com/BYTE-TMU/Tmu_Tech_Week_Website', type: 'secondary' },
    ],
  },
  {
    image: AICustomerImage,
    alt: 'AI Customer Support Agent',
    name: 'AI Customer Support Agent',
    role: 'Software Engineer',
    description: 'Real-time voice and text AI assistant with live transcription and mode switching. Uses Pinecone vector embeddings and Gemini API for context-aware, multi-modal customer support interactions.',
    links: [
      { label: 'Pitch Deck ›', href: 'https://www.canva.com/design/DAGs_7HWn98/9iVL7aUQEPx3BtbD5VUSpQ/view', type: 'primary' },
      { label: 'GitHub ›', href: 'https://github.com/razzacktiger/Customer-Support-Agent-', type: 'secondary' },
    ],
  },
  {
    image: PropertyImage,
    alt: 'Property Recommendation Software',
    name: 'Property Recommendation Software',
    role: 'Software Engineer',
    description: 'Python-based tool leveraging feature similarity algorithms, distance-based matching, and statistical analysis to identify comparable properties and provide accurate market recommendations.',
    links: [
      { label: 'GitHub ›', href: 'https://github.com/Rayan-Roshan21/Property-Recommendation-System', type: 'secondary' },
      { label: 'LinkedIn ›', href: 'https://www.linkedin.com/feed/update/urn:li:activity:7333915404685254658/', type: 'secondary' },
      { label: 'Pitch Deck ›', href: 'https://www.canva.com/design/DAGnq21Q--w/lliWqqZTqjbpImYEwg7Neg/view', type: 'secondary' },
    ],
  },
  {
    image: multimodalImage,
    alt: 'Multimodal Video Analysis',
    name: 'Multimodal Video Analysis',
    role: 'Software Engineer / Project Manager',
    description: 'AI-driven application enabling natural language conversations with YouTube videos. Generates precise timestamps and scene searches using NLP and computer vision for enhanced video discovery.',
    links: [
      { label: 'GitHub ›', href: 'https://github.com/razzacktiger/Multimodal-video-analysis-deployed', type: 'secondary' },
      { label: 'LinkedIn ›', href: 'https://www.linkedin.com', type: 'secondary' },
    ],
  },
  {
    image: medicalFormImage,
    alt: 'Prior Authorization Automation',
    name: 'Prior Authorization Form Automation',
    role: 'Software Engineer',
    description: 'AI system that extracts healthcare information from medical records and automatically completes Prior Authorization forms. Improves accuracy while reducing administrative burden in healthcare workflows.',
    links: [
      { label: 'GitHub ›', href: 'https://github.com/Rayan-Roshan21/mandolin-project', type: 'secondary' },
      { label: 'Pitch Deck ›', href: 'https://canva.link/895kypqwnla3vv7', type: 'secondary' },
    ],
  },
  {
    image: torontoImage,
    alt: 'Immigrant Families Research',
    name: 'Immigrant Families & Child Care Inequality in the GTA',
    role: 'Student Researcher',
    description: 'Research analysis of child care accessibility and affordability for 700,000+ immigrant families across the Greater Toronto Area. Identified infrastructure gaps and informed evidence-based policy recommendations.',
    links: [
      { label: 'Read Paper ›', href: 'https://docs.google.com/document/d/1wDk_c1n9sb-IAN295CwN3162BCbKSOUX04ZgxMZ2ins/edit', type: 'primary' },
      { label: 'Pitch Deck ›', href: 'https://www.canva.com/design/DAGnq21Q--w/lliWqqZTqjbpImYEwg7Neg/view', type: 'secondary' },
    ],
  },
  {
    image: Askcents,
    alt: 'AskCents',
    name: 'AskCents',
    role: 'Founder & Software Engineer',
    description: 'Personal finance platform featuring an AI chatbot advisor, gamified rewards center, and comprehensive money management tools to improve financial literacy and user engagement.',
    links: [
      { label: 'GitHub ›', href: 'https://github.com/Rayan-Roshan21/AskCents', type: 'secondary' },
    ],
  },
  {
    image: art_museum,
    alt: 'Image Style Transfer App',
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
    image: univ,
    alt: 'Univ app',
    name: 'Univ',
    role: 'Founder & Software Engineer',
    description: 'Introducing Univ, the ultimate app for simplifying the post-secondary admissions process — personalized school recommendations, detailed institution info, and step-by-step application guidance.',
    links: [
      { label: 'LinkedIn Post ›', href: 'https://www.linkedin.com/posts/rayan-roshan_startup-entrepreneurship-dmz-activity-7236719626095620096-730g', type: 'secondary' },
    ],
  },
  {
    image: scotiabank,
    alt: 'Scotia Redlight hackathon project',
    name: 'Scotia Redlight — Think Before You Spend',
    role: 'Participant at S:\\HACKS 2025 · 3rd Place Winner',
    description: '3rd place winner at Scotiabank S:\\HACKS 2025. AI spending companion using strategic friction to help Gen-Z transform impulse buys into intentional financial decisions.',
    links: [
      { label: 'View on Canva ›', href: 'https://www.canva.com/design/DAGw6V-hyyI/Cl_WavQn9wgv2QHNL_-_cQ/view', type: 'primary' },
      { label: 'LinkedIn Post ›', href: 'https://www.linkedin.com/posts/rayan-roshan_hackathon-innovation-fintech-activity-7365737257841909761-3yHG', type: 'secondary' },
    ],
  },
  {
    image: llmrouter,
    alt: 'LLM Router',
    name: 'An LLM Router',
    role: 'Software Engineer',
    description: 'Combines Google Gemini\'s AI analysis with deterministic scoring across 35+ models from live leaderboards, ensuring you always get the optimal model for your specific needs.',
    links: [
      { label: 'GitHub ›', href: 'https://github.com/razzacktiger/LLM-Router', type: 'secondary' },
      { label: 'NPM Package ›', href: 'https://www.npmjs.com/package/smart-llm-router', type: 'primary' },
      { label: 'Pitch Deck ›', href: 'https://www.canva.com/design/DAGvi9DbXNE/7rnwEmvNEzt2fGyeFBoe1A/view', type: 'secondary' },
    ],
  },
];

function Projects() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
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
          <div className="projects-wrapper">
            {projects.map((project, idx) => (
              <motion.div
                key={idx}
                className="project-container"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.5, ease: 'easeOut', delay: (idx % 3) * 0.1 }}
              >
                <img
                  className={`project-image${project.imageBg ? ` project-image--${project.imageBg}` : ''}`}
                  src={project.image}
                  alt={project.alt}
                  loading={idx > 3 ? 'lazy' : 'eager'}
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

      <Copyright_title isVisible={true} />
    </motion.div>
  );
}

export default Projects;