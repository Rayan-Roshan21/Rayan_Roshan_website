import './Copyright_title.css';
import { motion } from 'framer-motion';

function Copyright_title({ isVisible = true }) {
    return (
        <motion.footer
            className="copyright-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: isVisible ? 1 : 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            style={{ 
                pointerEvents: isVisible ? 'auto' : 'none',
                display: isVisible ? 'flex' : 'none'
            }}
        >
            <p className="Copyright-title">&copy; 2026 Rayan Roshan. All rights reserved.</p>
        </motion.footer>
    );
}

export default Copyright_title;