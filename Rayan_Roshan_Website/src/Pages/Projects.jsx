import React from 'react';
import { motion } from 'framer-motion';
import Name_title from '../Components/Name_title/Name_title';
import Sidebar from '../Components/Sidebar/Sidebar.jsx';
import Copyright_title from '../Components/Copyright_title/Copyright_title.jsx';
import '../Pages_CSS/Projects.css';
import '../Components/Projects_component/Project.css';
import PropertyImage from '../assets/property-image.jpg';
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
        <p className='project-role'>Software Developer</p>
        <p className='project-description'>This project is a Python-based property recommendation tool that uses feature similarity to identify the top k comparable properties to a given subject property. It reads property data from a JSON file and outputs the most similar properties using a distance-based algorithm.</p>
        <a className = "project-github" href="https://github.com/Rayan-Roshan21/Property-Recommendation-System" target="_blank" rel="noopener noreferrer">View on GitHub</a>
      </div>
      <div className='project-container'>
        <img className = "project-image" src={PropertyImage} alt="Related image of project." />
        <p className='project_name'>Hehe</p>
        <p className='project-role'>Software Developer</p>
        <p className='project-description'>This project is a Python-based property recommendation tool that uses feature similarity to identify the top k comparable properties to a given subject property. It reads property data from a JSON file and outputs the most similar properties using a distance-based algorithm.</p>
        <a className = "project-github" href="https://github.com/Rayan-Roshan21/Property-Recommendation-System" target="_blank" rel="noopener noreferrer">View on GitHub</a>
      </div>
    </div>
    </motion.div>
  );
}
export default Projects;