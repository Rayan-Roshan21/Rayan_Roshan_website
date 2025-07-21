import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import './contact_box.css';

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

const ContactBox = () => {
  const form = useRef();
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus('');
    emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, form.current, PUBLIC_KEY)
      .then(
        () => {
          setStatus('Message sent successfully!');
          setLoading(false);
          form.current.reset();
        },
        (error) => {
          setStatus('Failed to send message. Please try again.');
          setLoading(false);
        }
      );
  };

  return (
    <div className="contact-box">
      <form ref={form} onSubmit={sendEmail} className="contact-form">
        <input type="text" name="name" placeholder="Your Name" required />
        <input type="email" name="email" placeholder="Your Email" required />
        <input type="text" name="title" placeholder="Subject" required />
        <textarea name="message" placeholder="Your Message" required rows={5} />
        <button type="submit" disabled={loading}>{loading ? 'Sending...' : 'Send Message'}</button>
        {status && <div className="form-status">{status}</div>}
      </form>
    </div>
  );
};

export default ContactBox;