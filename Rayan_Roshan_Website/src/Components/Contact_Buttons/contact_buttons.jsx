import * as React from 'react';
import { useState } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import CalendlyBox from '@/Components/Calendly_box/calendly_box';

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
            flexDirection: 'column',
            alignItems: 'center',
            gap: 3,
            width: '100%',
            maxWidth: 420,
            margin: '0 auto',
            padding: 1,
            fontFamily: 'var(--font-sans)',
            '& .MuiButton-root': {
                width: '100%',
                fontSize: '1.1rem',
                fontWeight: 600,
                fontFamily: 'var(--font-sans)',
                padding: '16px 0',
                color: '#111',
                border: '2px solid #222',
                borderRadius: '12px',
                backgroundColor: '#fff',
                transition: 'all 0.25s ease',
                textTransform: 'none',
                letterSpacing: '0.2px',
                '&:hover': {
                    transform: 'translateY(-1px)',
                    boxShadow: '0 10px 28px rgba(0, 0, 0, 0.15)',
                    backgroundColor: '#f7f9ff',
                },
            }
        }}>
            <Button onClick={handleMessageClick}>
                📧 Message Me
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
                    width: { xs: '92%', sm: '88%', md: '80%' },
                    height: { xs: '80%', sm: '84%', md: '80%' },
                    backgroundColor: 'white',
                    borderRadius: '12px',
                    position: 'relative',
                    overflow: 'hidden',
                    fontFamily: 'var(--font-sans)',
                }}>
                    <Button 
                        onClick={() => setShowCalendar(false)}
                        sx={{
                            position: 'absolute',
                            top: 10,
                            right: 10,
                            zIndex: 1001,
                            backgroundColor: '#ff4d4d',
                            color: 'white',
                            fontFamily: 'var(--font-sans)',
                            '&:hover': {
                                backgroundColor: '#d63b3b',
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