import React from 'react';
import { motion } from 'framer-motion';
import Name_title from '@/Components/Name_title/name_title.jsx';
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
        <p className='project-description'>Real-time voice and text AI assistant with live transcription, mode switching, and context-aware responses using Pinecone vector embeddings and Gemini API for intelligent, multi-modal customer support interactions.</p>
        <div className='project-buttons'>
          <a className = "project-github" href="https://github.com/razzacktiger/Customer-Support-Agent-" target="_blank" rel="noopener noreferrer">View on GitHub</a>
        </div>
      </div>
      <div className='project-container'>
        <img className = "project-image" src={PropertyImage} alt="Related image of project." />
        <p className='project_name'>Property Recommendation Software</p>
        <p className='project-role'>Software Engineer</p>        
        <p className='project-description'>Python-based tool that identifies comparable properties using feature similarity algorithms, distance-based matching, and statistical analysis to provide accurate market recommendations.</p>
        <div className='project-buttons'>
          <a className = "project-github" href="https://github.com/Rayan-Roshan21/Property-Recommendation-System" target="_blank" rel="noopener noreferrer">View on GitHub</a>
          <a className = "project-linkedin" href="https://www.linkedin.com/feed/update/urn:li:activity:7333915404685254658/" target="_blank" rel="noopener noreferrer">View on LinkedIn</a>
        </div>
      </div>
            
      <div className='project-container'>
        <img className = "project-image" src={multimodalImage} alt="Related image of project." />
        <p className='project_name'>Multimodal Video Analysis</p>
        <p className='project-role'>Software Engineer/Project Manager</p>
        <p className='project-description'>AI-driven app for chatting with YouTube videos, generating precise timestamps, and searching scenes using natural language processing and computer vision technologies.</p>
        <div className='project-buttons'>
          <a className = "project-github" href="https://github.com/razzacktiger/Multimodal-video-analysis-deployed" target="_blank" rel="noopener noreferrer">View on GitHub</a>
           <a className = "project-linkedin" href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">View on LinkedIn</a>
        </div>
      </div>
      <div className='project-container'>
        <img className = "project-image" src={medicalFormImage} alt="Related image of project." />
        <p className='project_name'>Automate the Prior Authorization (PA) Form Filling Workflow</p>
        <p className='project-role'>Software Engineer</p>
        <p className='project-description'>AI system that intelligently extracts healthcare information from medical records and automatically fills Prior Authorization forms with improved accuracy, reducing administrative burden.</p>
        <div className='project-buttons'>
          <a className = "project-github" href="https://github.com/Rayan-Roshan21/mandolin-project" target="_blank" rel="noopener noreferrer">View on GitHub</a>
        </div>
      </div>
      
      <div className='project-container'>
        <img className = "project-image" src={torontoImage} alt="Related image of project." />
        <p className='project_name'>Immigrant Families and Child Care Inequality in the GTA</p>
        <p className='project-role'>Student Researcher</p>
        <p className='project-description'>Comprehensive research project analyzing child care accessibility and affordability for 700,000+ immigrant families across Greater Toronto Area regions, revealing critical infrastructure gaps and informing evidence-based policy recommendations.</p>
        <div className='project-buttons'>
          <a className = "project-google-docs" href="https://docs.google.com/document/d/1wDk_c1n9sb-IAN295CwN3162BCbKSOUX04ZgxMZ2ins/edit?usp=sharing" target="_blank" rel="noopener noreferrer">View on Google Docs</a>
        </div>
      </div>
      <div className='project-container'>
        <img className = "project-image" src={Askcents} alt="Related image of project." />
        <p className='project_name'>AskCents</p>
        <p className='project-role'>Founder & Software Engineer</p>
        <p className='project-description'>Personal finance coach platform featuring an AI chatbot advisor, gamified rewards center, and comprehensive money management tools for financial literacy.</p>
        <div className='project-buttons'>
         <a className = "project-github" href="https://github.com/Rayan-Roshan21/AskCents" target="_blank" rel="noopener noreferrer">View on GitHub</a>
        </div>
      </div>
      <div className='project-container'>
        <img className = "project-image" src={Yapp} alt="Related image of project." />
        <p className='project_name'>Yapp</p>
        <p className='project-role'>Co-Founder & Software Engineer</p>
        <p className='project-description'>Real-time social platform for Toronto Metropolitan University students featuring instant messaging, event coordination, and community engagement features for campus life.</p>
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