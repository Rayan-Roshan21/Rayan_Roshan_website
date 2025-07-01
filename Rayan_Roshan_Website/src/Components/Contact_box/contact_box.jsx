import React from 'react';

function ContactBox() {
  return (
    <div className="contact-box">
      <form>
        <input className = 'name-box' type="text" placeholder="Your Name" required />
        <input className = 'email-box' type="email" placeholder="Your Email" required />
        <textarea className = 'message' placeholder="Your Message" required></textarea>
        <button className = 'message-button' type="submit">Send Message</button>
      </form>
    </div>
  );
}

export default ContactBox;