import React from 'react';
import { motion } from 'framer-motion';
import Sidebar from '@/Components/Sidebar/Sidebar.jsx';
import '@/Pages_CSS/Contact.css';
import ContactButtons from '@/Components/Contact_Buttons/contact_buttons.jsx';
import Copyright from '@/Components/Copyright_title/Copyright_title.jsx';

function Contacts() {
  return (
    <motion.div
      className="contact-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Sidebar />

      {/* ── HERO — Dark ── */}
      <section className="contact-hero section-dark">
        <div className="contact-hero__inner section-container">
          <p className="contact-hero__eyebrow">Let's Talk</p>
          <h1 className="contact-hero__heading">
            Get in Touch
          </h1>
          <p className="contact-hero__sub">
            Have a question, project idea, or just want to say hello?
            I'd love to hear from you.
          </p>
        </div>
      </section>

      {/* ── CONTACT CONTENT — Light ── */}
      <motion.section
        className="contact-content-section section-light"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
      <div className="contact-content-section__inner">
          <div className="contact-grid">

            {/* Left: Info */}
            <div className="contact-info">
              <p className="contact-info__label">Ways to Reach Me</p>
              <h2 className="contact-info__heading">Let's Connect</h2>
              <p className="contact-info__body">
                Feel free to reach out through email or schedule a call.
                I'm always open to discussing new opportunities and ideas.
              </p>

              <div className="contact-social-row">
                <a
                  href="https://www.linkedin.com/in/rayan-roshan/"
                  className="contact-social-link"
                  target="_blank"
                  rel="noopener noreferrer"
                  id="contact-linkedin-link"
                  aria-label="LinkedIn Profile"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
                    <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z"/>
                  </svg>
                  LinkedIn
                </a>
                <a
                  href="https://github.com/Rayan-Roshan21"
                  className="contact-social-link"
                  target="_blank"
                  rel="noopener noreferrer"
                  id="contact-github-link"
                  aria-label="GitHub Profile"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
                    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8"/>
                  </svg>
                  GitHub
                </a>
              </div>
            </div>

            {/* Right: Contact Actions */}
            <div className="contact-actions-card">
              <ContactButtons />
            </div>
          </div>

          {/* ── Quick Info Strip ── */}
          <motion.div
            className="contact-quick-info"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, ease: 'easeOut', delay: 0.15 }}
          >
            <div className="contact-quick-item">
              <span className="contact-quick-label">Response Time</span>
              <span className="contact-quick-value">Within 24 hours</span>
            </div>
            <div className="contact-quick-divider" aria-hidden="true" />
            <div className="contact-quick-item">
              <span className="contact-quick-label">Timezone</span>
              <span className="contact-quick-value">EST — Toronto, ON</span>
            </div>
            <div className="contact-quick-divider" aria-hidden="true" />
            <div className="contact-quick-item">
              <span className="contact-quick-label">Open To</span>
              <span className="contact-quick-value">Internships · Collabs · Coffee Chats</span>
            </div>
          </motion.div>
        </div>
      </motion.section>

      <Copyright isVisible={true} />
    </motion.div>
  );
}

export default Contacts;