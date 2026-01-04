import './name_title.css'
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

function Name_title() {
    const location = useLocation();
    const [isVisible, setIsVisible] = useState(true);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        // Check if we're on mobile
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 767);
        };
        
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    useEffect(() => {
        // Skip scroll-based visibility on mobile
        if (isMobile) {
            setIsVisible(true);
            return;
        }

        const handleScroll = () => {
            // Hide the logo once the user scrolls past the top of the page
            const currentY = window.scrollY || window.pageYOffset || 0;
            setIsVisible(currentY < 32);
        };

        handleScroll();
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [location.pathname, isMobile]);

    const isHome = location.pathname === '/';
    const titleClass = `title ${!isHome ? 'title-alt' : ''} ${!isVisible && !isMobile ? 'title-hidden' : ''}`.trim();

    return (
        <Link to="/" className={titleClass}>
            <h1>Rayan Roshan_</h1>
        </Link>
    );
}

export default Name_title;