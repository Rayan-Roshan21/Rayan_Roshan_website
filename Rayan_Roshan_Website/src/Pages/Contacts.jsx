import React from 'react';
import { motion } from 'framer-motion';
import Name_title from '../Components/Name_title/Name_title';
import Sidebar from '../Components/Sidebar/Sidebar.jsx';
import '../Pages_CSS/Contact.css';

function Contacts() {
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
    <h2 className='contact-title'>Contact me!</h2>
    </motion.div>
  );
}
export default Contacts;