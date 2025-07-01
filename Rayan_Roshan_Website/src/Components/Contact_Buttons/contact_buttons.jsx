import * as React from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Box from '@mui/material/Box';

export default function ContactButtons() {
    const handleMessageClick = () => {
        // Add your message functionality here
        window.location.href = 'mailto:your-email@example.com';
    };

    const handleCalendlyClick = () => {
        // Add your Calendly link here
        window.open('https://calendly.com/your-profile', '_blank');
    };

    return (
        <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: 3,
            gap: 3, // Space between buttons
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
                    borderColor: '#667eea',
                    backgroundColor: '#f8f9ff',
                },
            }
        }}>
            <Button onClick={handleMessageClick}>
                📧 Send Message
            </Button>
            <Button onClick={handleCalendlyClick}>
                📅 Schedule Call
            </Button>
        </Box>
    );
}