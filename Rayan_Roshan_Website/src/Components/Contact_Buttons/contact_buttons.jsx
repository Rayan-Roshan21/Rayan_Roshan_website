import React, { useState } from 'react';
import CalendlyBox from '@/Components/Calendly_box/calendly_box';
import './contact_buttons.css';

export default function ContactButtons() {
    const [showCalendar, setShowCalendar] = useState(false);

    const handleMessageClick = () => {
        window.location.href = 'mailto:2006rayanroshan@gmail.com';
    };

    const handleCalendlyClick = () => {
        setShowCalendar(true);
    };

    const closeModal = () => {
        setShowCalendar(false);
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
            
            {/* Calendly Modal */}
            {showCalendar && (
                <div className="modal-overlay" onClick={closeModal}>
                    <div className="modal-container" onClick={(e) => e.stopPropagation()}>
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