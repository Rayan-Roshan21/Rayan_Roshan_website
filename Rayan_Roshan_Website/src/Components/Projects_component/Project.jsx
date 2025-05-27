import PropertyImage from '../../assets/property-image.jpg'; // Importing an image for the project
import '../Projects_component/Project.css';
function Project(props) {
    return (
        <>
        <div className='project-container'>
            <img className = "project-image" src={PropertyImage} alt="Images of properties" />
            <p className='project_name'>{props.name}</p>
            <p className='project-description'>{props.description}</p>
            <p>{props.github}</p>
        </div>
       </>
    );
}

export default Project;