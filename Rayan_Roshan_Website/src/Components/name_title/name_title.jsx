import './name_title.css'
import { Link, useLocation } from 'react-router-dom';
function Name_title() {
    const location = useLocation();
    const isHome = location.pathname === '/';
    return (
        <Link to="/" className={`title ${!isHome ? 'title-alt' : ''}`}>
            <h1 className="title">Rayan Roshan<span className="blink" style={{ animation: 'blink 1s steps(1, end) infinite' }}>_</span></h1>
        </Link>
    );
}
export default Name_title;