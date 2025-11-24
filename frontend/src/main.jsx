import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Toaster } from 'react-hot-toast';
import App from './App';
import './index.css';

const theme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#00f0ff',
            light: '#66f3ff',
            dark: '#00a6b3',
        },
        secondary: {
            main: '#b829ff',
            light: '#d066ff',
            dark: '#8000b3',
        },
        background: {
            default: '#0a0e27',
            paper: 'rgba(255, 255, 255, 0.05)',
        },
        text: {
            primary: '#ffffff',
            secondary: 'rgba(255, 255, 255, 0.7)',
        },
    },
    typography: {
        fontFamily: '"Inter", "Roboto", sans-serif',
        h1: {
            fontFamily: '"Orbitron", sans-serif',
            fontWeight: 900,
        },
        h2: {
            fontFamily: '"Orbitron", sans-serif',
            fontWeight: 800,
        },
        h3: {
            fontFamily: '"Orbitron", sans-serif',
            fontWeight: 700,
        },
        h4: {
            fontFamily: '"Orbitron", sans-serif',
            fontWeight: 700,
        },
        h5: {
            fontFamily: '"Orbitron", sans-serif',
            fontWeight: 600,
        },
        h6: {
            fontFamily: '"Orbitron", sans-serif',
            fontWeight: 600,
        },
        button: {
            fontFamily: '"Orbitron", sans-serif',
            fontWeight: 700,
            letterSpacing: '1px',
        },
    },
    shape: {
        borderRadius: 16,
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                body: {
                    scrollbarColor: '#00f0ff #0f1629',
                    '&::-webkit-scrollbar, & *::-webkit-scrollbar': {
                        width: 12,
                        height: 12,
                    },
                    '&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb': {
                        borderRadius: 10,
                        background: 'linear-gradient(180deg, #00f0ff, #b829ff)',
                        border: '2px solid #0f1629',
                    },
                    '&::-webkit-scrollbar-track, & *::-webkit-scrollbar-track': {
                        borderRadius: 10,
                        background: '#0f1629',
                    },
                },
            },
        },
    },
});

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <BrowserRouter>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <App />
                <Toaster
                    position="top-right"
                    toastOptions={{
                        duration: 3000,
                        style: {
                            background: 'linear-gradient(135deg, rgba(0, 240, 255, 0.9) 0%, rgba(184, 41, 255, 0.9) 100%)',
                            color: '#fff',
                            borderRadius: '12px',
                            padding: '16px',
                            fontSize: '14px',
                            fontWeight: 600,
                            fontFamily: '"Orbitron", sans-serif',
                            border: '1px solid rgba(0, 240, 255, 0.3)',
                            boxShadow: '0 8px 32px rgba(0, 240, 255, 0.4)',
                        },
                        success: {
                            duration: 3000,
                            style: {
                                background: 'linear-gradient(135deg, rgba(0, 240, 255, 0.9), rgba(0, 200, 150, 0.9))',
                            },
                        },
                        error: {
                            duration: 4000,
                            style: {
                                background: 'linear-gradient(135deg, rgba(255, 0, 110, 0.9), rgba(255, 100, 100, 0.9))',
                            },
                        },
                    }}
                />
            </ThemeProvider>
        </BrowserRouter>
    </React.StrictMode>
);
