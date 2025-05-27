import React from 'react';
import { motion } from 'framer-motion';
import Name_title from '../Components/Name_title/Name_title';
import Sidebar from '../Components/Sidebar/Sidebar.jsx';
import Copyright_title from '../Components/Copyright_title/Copyright_title.jsx';
import '../Pages_CSS/Projects.css';
import Project from '../Components/Projects_component/Project.jsx'; // Assuming you have a Project component to import
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
    </div>
    <h2 className='Projects-title'>Projects</h2>
    <div>
      <Project name = "Property Recommendation Software"/>
    </div>
    </motion.div>
  );
}
export default Projects;