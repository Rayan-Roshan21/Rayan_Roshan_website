import React from 'react';
import '../Projects_component/Project.css'; // Assuming you have a CSS file for styling
function Project(props) {
    return (
        <div className='project-container'>
            <p>{props.name}</p>
            <p>{props.description}</p>
            <p>{props.technologies}</p>
            <p>{props.link}</p>
            <p>{props.image}</p>
            <p>{props.github}</p>
            <p>{props.year}</p>
            <p>{props.status}</p>
        </div>
    );
}

export default Project;