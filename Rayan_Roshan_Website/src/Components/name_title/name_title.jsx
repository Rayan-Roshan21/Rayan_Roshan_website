import '../Name_title/Name_title.css'
import { Link, useLocation } from 'react-router-dom';
function Name_title() {
    const location = useLocation();
    const isHome = location.pathname === '/';
    return (
        <Link to="/" className={`title ${!isHome ? 'title-alt' : ''}`}>
            <h1 className="title">Rayan Roshan</h1>
        </Link>

    );
}
export default Name_title;