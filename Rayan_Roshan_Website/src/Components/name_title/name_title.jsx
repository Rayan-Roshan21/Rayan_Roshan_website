import './name_title.css'
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

function Name_title() {
    const location = useLocation();
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const handleScroll = () => {
            // Hide the logo once the user scrolls past the top of the page
            const currentY = window.scrollY || window.pageYOffset || 0;
            setIsVisible(currentY < 32);
        };

        handleScroll();
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [location.pathname]);

    const isHome = location.pathname === '/';
    const titleClass = `title ${!isHome ? 'title-alt' : ''} ${!isVisible ? 'title-hidden' : ''}`.trim();

    return (
        <Link to="/" className={titleClass}>
            <h1 className="title">Rayan Roshan<span className="blink" style={{ animation: 'blink 1s steps(1, end) infinite' }}>_</span></h1>
        </Link>
    );
}

export default Name_title;