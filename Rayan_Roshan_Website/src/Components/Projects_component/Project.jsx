import PropertyImage from '../../assets/property-image.jpg'; // Importing an image for the project
import '../Projects_component/Project.css';
function Project(props) {
    return (
        <div className='projects-wrapper'>
            <div className='project-container'>
                <img className = "project-image" src={PropertyImage} alt="Related image of project." />
                <p className='project_name'>{props.name}</p>
                <p className='project-role'>{props.role}</p>
                <p className='project-description'>{props.description}</p>
                <a className = "project-github" href={props.github} target="_blank" rel="noopener noreferrer">View on GitHub</a>
            </div>
        </div>
    );
}

export default Project;