import React from 'react';
import { motion } from 'framer-motion';
import Name_title from '../Components/Name_title/Name_title';
import Sidebar from '../Components/Sidebar/Sidebar.jsx';
import Copyright_title from '../Components/Copyright_title/Copyright_title.jsx';
import '../Pages_CSS/Projects.css';
import '../Components/Projects_component/Project.css';
import PropertyImage from '../assets/property-image.jpg';
import multimodalImage from '../assets/multimodal video analysis.png';
function Projects() {
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
    </div>    <h2 className='Projects-title'>Projects</h2>    <div className='projects-wrapper'>
      <div className='project-container'>
        <img className = "project-image" src={PropertyImage} alt="Related image of project." />
        <p className='project_name'>Property Recommendation Software</p>
        <p className='project-role'>Software Engineer</p>        <p className='project-description'>This project is a Python-based property recommendation tool that uses feature similarity to identify the top k comparable properties to a given subject property. It reads property data from a JSON file and outputs the most similar properties using a distance-based algorithm.</p>
        <div className='project-buttons'>
          <a className = "project-github" href="https://github.com/Rayan-Roshan21/Property-Recommendation-System" target="_blank" rel="noopener noreferrer">View on GitHub</a>
          <a className = "project-linkedin" href="https://www.linkedin.com/posts/rayan-roshan-21_property-recommendation-software-activity-7111234567890123456-abcdefg" target="_blank" rel="noopener noreferrer">View on LinkedIn</a>
        </div>
      </div>      <div className='project-container'>
        <img className = "project-image" src={multimodalImage} alt="Related image of project." />
        <p className='project_name'>Multimodal Video Analysis</p>
        <p className='project-role'>Software Engineer/Project Manager</p>
        <p className='project-description'>A powerful AI-driven web application that lets you chat with YouTube videos, generate smart timestamps, and search for specific scenes using natural language. Worked with two other software engineering residents from Headstarter.</p>
        <div className='project-buttons'>
          <a className = "project-github" href="https://github.com/razzacktiger/Multimodal-video-analysis-deployed" target="_blank" rel="noopener noreferrer">View on GitHub</a>
        </div>
      </div>
      <div className='project-container'>
        <img className = "project-image" src={multimodalImage} alt="Related image of project." />
        <p className='project_name'> Immigrant Families and Child Care Inequality in the GTA</p>
        <p className='project-role'>Student Researcher</p>
        <p className='project-description'>Analyzed child care accessibility for over 700,000 immigrant families across 663 GTA regions using Python, revealing infrastructure gaps in areas like Brampton and Mississauga and presenting policy recommendations to Statistics Canada competition. In collaboration with my partner Ian Macwan.</p>
        <div className='project-buttons'>
          <a className = "project-google-docs" href="https://docs.google.com/document/d/1wDk_c1n9sb-IAN295CwN3162BCbKSOUX04ZgxMZ2ins/edit?usp=sharing" target="_blank" rel="noopener noreferrer">View on Google Docs</a>
        </div>
      </div>
    </div>
    </motion.div>
  );
}
export default Projects;