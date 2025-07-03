import React from 'react';
import { motion } from 'framer-motion';
import Name_title from '../Components/Name_title/Name_title.jsx';
import Sidebar from '../Components/Sidebar/Sidebar.jsx';
import ContactBox from '../Components/Contact_box/contact_box.jsx';
import '../Pages_CSS/Contact.css';
import ContactButtons from '../Components/Contact_Buttons/contact_buttons.jsx';
import calendly_link from '../Components/Calendly_box/calendly_box.jsx';

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
    </div>

    <div>
      <calendly_link />
    </div>

    </motion.div>
  );
}
export default Contacts;