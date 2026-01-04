import React from 'react';
import { motion } from 'framer-motion';
import Name_title from '@/Components/name_title/name_title.jsx';
import Sidebar from '@/Components/Sidebar/Sidebar.jsx';
import '@/Pages_CSS/Contact.css';
import ContactButtons from '@/Components/Contact_Buttons/contact_buttons.jsx';
import Tooltip from '@/Components/Information_bar/Tooltip.jsx';
import Copyright from '@/Components/Copyright_title/Copyright_title.jsx';
import { useScrollToBottom } from '@/hooks/useScrollToBottom';

function Contacts() {
  const isAtBottom = useScrollToBottom();
  
  return (
    <motion.div
      className="contact-page"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.5 }}
    >
      <Sidebar />
      <Name_title />

      <main className="contact-main">
        <section className="contact-hero">
          <h1 className="contact-heading">Get in Touch</h1>
          <p className="contact-subtext">
            Have a question, project idea, or just want to say hello? 
            I'd love to hear from you!
          </p>
        </section>

        <section className="contact-content">
          <div className="contact-info">
            <h2 className="info-title">Let's Connect</h2>
            <p className="info-description">
              Feel free to reach out through email or schedule a call. 
              I'm always open to discussing new opportunities and ideas.
            </p>
            <div className="social-links">
              <Tooltip large />
            </div>
          </div>

          <div className="contact-actions-card">
            <ContactButtons />
          </div>
        </section>
      </main>

      <Copyright isVisible={isAtBottom} />
    </motion.div>
  );
}

export default Contacts;