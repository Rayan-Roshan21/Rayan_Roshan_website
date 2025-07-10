import React from 'react';
import { motion } from 'framer-motion';
import Name_title from '@/Components/Name_title/name_title.jsx';
import Sidebar from '@/Components/Sidebar/Sidebar.jsx';
import '@/Pages_CSS/Contact.css';
import ContactButtons from '@/Components/Contact_Buttons/contact_buttons.jsx';
import Tooltip from '@/Components/Information_bar/Tooltip.jsx';

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
    <h2 className='contact-title'>Contact me</h2>  
    <div>
       <h2 className='reach-out-subtitle'>Reach out!</h2>
      <p className = 'sub-paragraph'>If you have any questions or just want to say hello, feel free to reach out!</p>
    </div>
    <div>
      <ContactButtons />
      <div style={{ display: 'flex', justifyContent: 'flex-start', marginTop: '-5px', marginLeft: '1198px' }}>
        <Tooltip large />
      </div>
    </div>

    </motion.div>
  );
}
export default Contacts;