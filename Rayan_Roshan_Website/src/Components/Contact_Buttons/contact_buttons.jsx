import React, { useState, useRef } from 'react';
import CalendlyBox from '@/Components/Calendly_box/calendly_box';
import emailjs from '@emailjs/browser';
import './contact_buttons.css';

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

export default function ContactButtons() {
    const [showCalendar, setShowCalendar] = useState(false);
    const [showMessageModal, setShowMessageModal] = useState(false);
    const [isClosing, setIsClosing] = useState(false);
    const [status, setStatus] = useState('');
    const [loading, setLoading] = useState(false);
    const form = useRef();

    const handleMessageClick = () => {
        setShowMessageModal(true);
        setStatus('');
    };

    const handleCalendlyClick = () => {
        setShowCalendar(true);
    };

    const closeModal = () => {
        setIsClosing(true);
        setTimeout(() => {
            setShowCalendar(false);
            setIsClosing(false);
        }, 300);
    };

    const closeMessageModal = () => {
        setIsClosing(true);
        setTimeout(() => {
            setShowMessageModal(false);
            setStatus('');
            setIsClosing(false);
        }, 300);
    };

    const sendEmail = (e) => {
        e.preventDefault();
        setLoading(true);
        setStatus('');
        
        emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, form.current, PUBLIC_KEY)
            .then(
                () => {
                    setStatus('success');
                    setLoading(false);
                    form.current.reset();
                    // Auto-close after 2 seconds on success
                    setTimeout(() => {
                        setIsClosing(true);
                        setTimeout(() => {
                            setShowMessageModal(false);
                            setStatus('');
                            setIsClosing(false);
                        }, 300);
                    }, 2000);
                },
                (error) => {
                    console.error('EmailJS error:', error);
                    setStatus('error');
                    setLoading(false);
                }
            );
    };

    return (
        <>
            <div className="contact-buttons-wrapper">
                <button className="contact-btn" onClick={handleMessageClick}>
                    <span className="btn-icon">📧</span>
                    <span className="btn-text">Message Me</span>
                </button>
                <button className="contact-btn" onClick={handleCalendlyClick}>
                    <span className="btn-icon">📅</span>
                    <span className="btn-text">Schedule Call</span>
                </button>
            </div>
            
            {/* Message Modal */}
            {showMessageModal && (
                <div className={`modal-overlay ${isClosing ? 'closing' : ''}`} onClick={closeMessageModal}>
                    <div className={`modal-container message-modal ${isClosing ? 'closing' : ''}`} onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h3 className="modal-title">Send a Message</h3>
                            <button className="modal-close-btn" onClick={closeMessageModal}>
                                ✕
                            </button>
                        </div>
                        <div className="modal-content message-content">
                            <form ref={form} onSubmit={sendEmail} className="message-form">
                                <div className="form-group">
                                    <label htmlFor="name">Your Name</label>
                                    <input 
                                        type="text" 
                                        id="name"
                                        name="name" 
                                        placeholder="John Doe" 
                                        required 
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email">Your Email</label>
                                    <input 
                                        type="email" 
                                        id="email"
                                        name="email" 
                                        placeholder="john@example.com" 
                                        required 
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="title">Subject</label>
                                    <input 
                                        type="text" 
                                        id="title"
                                        name="title" 
                                        placeholder="What's this about?" 
                                        required 
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="message">Message</label>
                                    <textarea 
                                        id="message"
                                        name="message" 
                                        placeholder="Your message here..." 
                                        required 
                                        rows={5} 
                                    />
                                </div>
                                <button 
                                    type="submit" 
                                    className="submit-btn"
                                    disabled={loading}
                                >
                                    {loading ? 'Sending...' : 'Send Message'}
                                </button>
                                {status === 'success' && (
                                    <div className="form-status success">
                                        ✓ Message sent successfully!
                                    </div>
                                )}
                                {status === 'error' && (
                                    <div className="form-status error">
                                        ✗ Failed to send. Please try again.
                                    </div>
                                )}
                            </form>
                        </div>
                    </div>
                </div>
            )}

            {/* Calendly Modal */}
            {showCalendar && (
                <div className={`modal-overlay ${isClosing ? 'closing' : ''}`} onClick={closeModal}>
                    <div className={`modal-container ${isClosing ? 'closing' : ''}`} onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h3 className="modal-title">Schedule a Meeting</h3>
                            <button className="modal-close-btn" onClick={closeModal}>
                                ✕
                            </button>
                        </div>
                        <div className="modal-content">
                            <CalendlyBox />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}