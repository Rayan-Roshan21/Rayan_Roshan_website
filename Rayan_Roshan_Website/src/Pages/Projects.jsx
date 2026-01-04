import React from 'react';
import { motion } from 'framer-motion';
import Name_title from '@/Components/name_title/name_title.jsx';
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
import { useScrollToBottom } from '@/hooks/useScrollToBottom';

function Projects() {
  const isAtBottom = useScrollToBottom();
  return (
    <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -30 }}
        transition={{ duration: 0.5 }}
    >
    <div>
      <Sidebar />
      <Name_title />
    </div>    
    <h2 className='Projects-title'>Projects</h2>    
    <div className='projects-wrapper'>
      <div className='project-container'>
        <img className = "project-image" src={AICustomerImage} alt="Related image of project." />
        <p className='project_name'>AI Customer Support Agent</p>
        <p className='project-role'>Software Engineer</p>
        <p className='project-description'>Real-time voice and text AI assistant with live transcription and mode switching. Uses Pinecone vector embeddings and Gemini API for context-aware, multi-modal customer support interactions.</p>
        <div className='project-buttons'>
          <a className = "project-github" href="https://github.com/razzacktiger/Customer-Support-Agent-" target="_blank" rel="noopener noreferrer">View on GitHub</a>
        </div>
      </div>
      <div className='project-container'>
        <img className = "project-image" src={PropertyImage} alt="Related image of project." />
        <p className='project_name'>Property Recommendation Software</p>
        <p className='project-role'>Software Engineer</p>        
        <p className='project-description'>Python-based tool leveraging feature similarity algorithms, distance-based matching, and statistical analysis to identify comparable properties and provide accurate market recommendations for real estate decisions.</p>
        <div className='project-buttons'>
          <a className = "project-github" href="https://github.com/Rayan-Roshan21/Property-Recommendation-System" target="_blank" rel="noopener noreferrer">View on GitHub</a>
          <a className = "project-linkedin" href="https://www.linkedin.com/feed/update/urn:li:activity:7333915404685254658/" target="_blank" rel="noopener noreferrer">View on LinkedIn</a>
        </div>
      </div>
            
      <div className='project-container'>
        <img className = "project-image" src={multimodalImage} alt="Related image of project." />
        <p className='project_name'>Multimodal Video Analysis</p>
        <p className='project-role'>Software Engineer/Project Manager</p>
        <p className='project-description'>AI-driven application enabling natural language conversations with YouTube videos. Generates precise timestamps and scene searches using NLP and computer vision technologies for enhanced video discovery.</p>
        <div className='project-buttons'>
          <a className = "project-github" href="https://github.com/razzacktiger/Multimodal-video-analysis-deployed" target="_blank" rel="noopener noreferrer">View on GitHub</a>
           <a className = "project-linkedin" href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">View on LinkedIn</a>
        </div>
      </div>
      <div className='project-container'>
        <img className = "project-image" src={medicalFormImage} alt="Related image of project." />
        <p className='project_name'>Automate the Prior Authorization (PA) Form Filling Workflow</p>
        <p className='project-role'>Software Engineer</p>
        <p className='project-description'>AI system that extracts healthcare information from medical records and automatically completes Prior Authorization forms. Improves accuracy while reducing administrative burden in healthcare workflows.</p>
        <div className='project-buttons'>
          <a className = "project-github" href="https://github.com/Rayan-Roshan21/mandolin-project" target="_blank" rel="noopener noreferrer">View on GitHub</a>
        </div>
      </div>
      
      <div className='project-container'>
        <img className = "project-image" src={torontoImage} alt="Related image of project." />
        <p className='project_name'>Immigrant Families and Child Care Inequality in the GTA</p>
        <p className='project-role'>Student Researcher</p>
        <p className='project-description'>Research analysis of child care accessibility and affordability for 700,000+ immigrant families across the Greater Toronto Area. Identified infrastructure gaps and informed evidence-based policy recommendations.</p>
        <div className='project-buttons'>
          <a className = "project-google-docs" href="https://docs.google.com/document/d/1wDk_c1n9sb-IAN295CwN3162BCbKSOUX04ZgxMZ2ins/edit?usp=sharing" target="_blank" rel="noopener noreferrer">View on Google Docs</a>
        </div>
      </div>
      <div className='project-container'>
        <img className = "project-image" src={Askcents} alt="Related image of project." />
        <p className='project_name'>AskCents</p>
        <p className='project-role'>Founder & Software Engineer</p>
        <p className='project-description'>Personal finance platform featuring an AI chatbot advisor, gamified rewards center, and comprehensive money management tools to improve financial literacy and user engagement.</p>
        <div className='project-buttons'>
         <a className = "project-github" href="https://github.com/Rayan-Roshan21/AskCents" target="_blank" rel="noopener noreferrer">View on GitHub</a>
        </div>
      </div>
      <div className='project-container'>
        <img className = "project-image" src={Yapp} alt="Related image of project." />
        <p className='project_name'>Yapp</p>
        <p className='project-role'>Co-Founder & Software Engineer</p>
        <p className='project-description'>Real-time social platform for Toronto Metropolitan University students featuring instant messaging, event coordination, and community engagement tools for enhanced campus life connectivity.</p>
        <div className='project-buttons'>
         <a className = "project-linkedin" href="https://yap-mu.vercel.app/" target="_blank" rel="noopener noreferrer">Try it out!</a>
        </div>
      </div>
    </div>
    <Copyright_title isVisible={isAtBottom} />
    </motion.div>
  );
}
export default Projects;