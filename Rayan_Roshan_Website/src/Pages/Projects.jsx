import React from 'react';
import Name_title from '../Components/Name_title/Name_title';
import Sidebar from '../Components/Sidebar/Sidebar.jsx';
import Copyright_title from '../Components/Copyright_title/Copyright_title.jsx';
import '../Pages_CSS/Projects.css';
function Projects() {
  return (
    <>
    <div>
      <Sidebar />
      <Name_title />
    </div>
    <h2 className='Projects-title'>Projects</h2>
    </>
  );
}
export default Projects;