import React, { useState, useRef, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
import CalendlyBox from '@/Components/Calendly_box/calendly_box';
import emailjs from '@emailjs/browser';
import Modal from './Modal.jsx';
import './contact_buttons.css';

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

emailjs.init({ publicKey: PUBLIC_KEY });

export default function ContactButtons() {
    const [showCalendar, setShowCalendar] = useState(false);
    const [showMessageModal, setShowMessageModal] = useState(false);
    const [status, setStatus] = useState('');
    const [loading, setLoading] = useState(false);
    const form = useRef();

    // Each sheet scales out of its own button.
    const messageBtnRef = useRef(null);
    const calendlyBtnRef = useRef(null);

    const closeMessageModal = useCallback(() => {
        setShowMessageModal(false);
        setStatus('');
    }, []);

    const closeCalendar = useCallback(() => setShowCalendar(false), []);

    const sendEmail = (e) => {
        e.preventDefault();
        setLoading(true);
        setStatus('');

        const formData = new FormData(form.current);
        const templateParams = {
            name: formData.get('name'),
            email: formData.get('email'),
            title: formData.get('title'),
            message: formData.get('message'),
        };

        emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams)
            .then(
                () => {
                    setStatus('success');
                    setLoading(false);
                    form.current.reset();
                    // Hold the confirmation long enough to read, then
                    // dismiss. Unmounting is a single state change; the
                    // exit spring owns the animation.
                    setTimeout(closeMessageModal, 2000);
                },
                (error) => {
                    console.error('EmailJS error:', error?.text || error);
                    setStatus('error');
                    setLoading(false);
                }
            );
    };

    return (
        <>
            <div className="contact-buttons-wrapper">
                <button
                    ref={messageBtnRef}
                    className="contact-btn contact-btn--primary pressable pressable--subtle"
                    onClick={() => { setShowMessageModal(true); setStatus(''); }}
                >
                    <span className="btn-icon" aria-hidden="true">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                            <polyline points="22,6 12,13 2,6"/>
                        </svg>
                    </span>
                    <span className="btn-text">Message Me</span>
                </button>
                <button
                    ref={calendlyBtnRef}
                    className="contact-btn contact-btn--secondary pressable pressable--subtle"
                    onClick={() => setShowCalendar(true)}
                >
                    <span className="btn-icon" aria-hidden="true">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                            <line x1="16" y1="2" x2="16" y2="6"/>
                            <line x1="8" y1="2" x2="8" y2="6"/>
                            <line x1="3" y1="10" x2="21" y2="10"/>
                        </svg>
                    </span>
                    <span className="btn-text">Schedule Call</span>
                </button>
            </div>

            <AnimatePresence>
                {showMessageModal && (
                    <Modal
                        key="message"
                        open
                        onClose={closeMessageModal}
                        title="Send a Message"
                        originRef={messageBtnRef}
                        className="message-modal"
                    >
                        <div className="modal-content message-content">
                            <form ref={form} onSubmit={sendEmail} className="message-form">
                                <div className="form-group">
                                    <label htmlFor="name">Your Name</label>
                                    <input type="text" id="name" name="name" placeholder="John Doe" required />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email">Your Email</label>
                                    <input type="email" id="email" name="email" placeholder="john@example.com" required />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="title">Subject</label>
                                    <input type="text" id="title" name="title" placeholder="What's this about?" required />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="message">Message</label>
                                    <textarea id="message" name="message" placeholder="Your message here..." required rows={5} />
                                </div>
                                <button type="submit" className="submit-btn pressable" disabled={loading}>
                                    {loading ? 'Sending…' : 'Send Message'}
                                </button>
                                {status === 'success' && (
                                    <div className="form-status success" role="status">
                                        ✓ Message sent successfully!
                                    </div>
                                )}
                                {status === 'error' && (
                                    <div className="form-status error" role="alert">
                                        ✗ Failed to send. Please try again.
                                    </div>
                                )}
                            </form>
                        </div>
                    </Modal>
                )}

                {showCalendar && (
                    <Modal
                        key="calendly"
                        open
                        onClose={closeCalendar}
                        title="Schedule a Meeting"
                        originRef={calendlyBtnRef}
                        className="calendly-modal"
                    >
                        <div className="modal-content calendly-content">
                            <CalendlyBox />
                        </div>
                    </Modal>
                )}
            </AnimatePresence>
        </>
    );
}
