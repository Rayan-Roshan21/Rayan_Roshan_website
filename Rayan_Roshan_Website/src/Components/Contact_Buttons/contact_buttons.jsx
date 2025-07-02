import * as React from 'react';
import { useState } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import CalendlyBox from '../Calendly_box/calendly_box';

export default function ContactButtons() {
    const [showCalendar, setShowCalendar] = useState(false);

    const handleMessageClick = () => {
        // Add your message functionality here
        window.location.href = 'mailto:your-email@example.com';
    };

    const handleCalendlyClick = () => {
        // Toggle calendar visibility
        setShowCalendar(!showCalendar);
    };

    return (
        <>
        <Box sx={{
            display: 'flex',
            position: 'relative',
            gap: 2,
            marginLeft: '1000px',
            marginTop: '-250px',
            padding: 2,
            paddingTop: 0,
            '& .MuiButton-root': {
                fontSize: '1.1rem',
                fontWeight: 600,
                padding: '16px 32px',
                color: 'black',
                border: '2px solid #333',
                borderRadius: '12px',
                backgroundColor: 'white',
                transition: 'all 0.3s ease',
                textTransform: 'none',
                letterSpacing: '0.5px',
                '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: '0 12px 40px rgba(0, 0, 0, 0.2)',
                    backgroundColor: '#f8f9ff',
                },
            }
        }}>
            <Button onClick={handleMessageClick}>
                📧 Send Message
            </Button>
            <Button onClick={handleCalendlyClick}>
                📅 {showCalendar ? 'Hide Calendar' : 'Schedule Call'}
            </Button>
        </Box>
        
        {/* Conditional Calendar */}
        {showCalendar && (
            <Box sx={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 1000,
            }}>
                <Box sx={{
                    width: '80%',
                    height: '80%',
                    backgroundColor: 'white',
                    borderRadius: '12px',
                    position: 'relative',
                    overflow: 'hidden',
                }}>
                    <Button 
                        onClick={() => setShowCalendar(false)}
                        sx={{
                            position: 'absolute',
                            top: 10,
                            right: 10,
                            zIndex: 1001,
                            backgroundColor: '#ff4444',
                            color: 'white',
                            '&:hover': {
                                backgroundColor: '#cc3333',
                            }
                        }}
                    >
                        ✕ Close
                    </Button>
                    <CalendlyBox />
                </Box>
            </Box>
        )}
        </>
    );
}