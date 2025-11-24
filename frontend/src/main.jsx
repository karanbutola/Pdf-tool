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
            main: '#00d9ff',
            light: '#60e6ff',
            dark: '#009bb3',
        },
        secondary: {
            main: '#a855f7',
            light: '#c084fc',
            dark: '#7e22ce',
        },
        background: {
            default: '#0a0a0f',
            paper: '#111118',
        },
        text: {
            primary: '#ffffff',
            secondary: '#d7d7d7',
        },
    },
    typography: {
        fontFamily: '"Inter", sans-serif',
        h1: {
            fontFamily: '"Space Grotesk", sans-serif',
            fontWeight: 700,
        },
        h2: {
            fontFamily: '"Space Grotesk", sans-serif',
            fontWeight: 700,
        },
        h3: {
            fontFamily: '"Space Grotesk", sans-serif',
            fontWeight: 700,
        },
        h4: {
            fontFamily: '"Space Grotesk", sans-serif',
            fontWeight: 700,
        },
        h5: {
            fontFamily: '"Space Grotesk", sans-serif',
            fontWeight: 600,
        },
        h6: {
            fontFamily: '"Space Grotesk", sans-serif',
            fontWeight: 600,
        },
        button: {
            fontFamily: '"Space Grotesk", sans-serif',
            fontWeight: 600,
            letterSpacing: '0.5px',
        },
    },
    shape: {
        borderRadius: 16,
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                body: {
                    scrollbarColor: '#374151 #111118',
                    '&::-webkit-scrollbar, & *::-webkit-scrollbar': {
                        width: 10,
                        height: 10,
                    },
                    '&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb': {
                        borderRadius: 10,
                        background: '#374151',
                        border: '2px solid #111118',
                    },
                    '&::-webkit-scrollbar-track, & *::-webkit-scrollbar-track': {
                        borderRadius: 10,
                        background: '#111118',
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
                            background: '#1f2937',
                            color: '#fff',
                            borderRadius: '12px',
                            padding: '16px',
                            fontSize: '14px',
                            fontWeight: 500,
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5)',
                        },
                        success: {
                            iconTheme: {
                                primary: '#00d9ff',
                                secondary: '#fff',
                            },
                        },
                        error: {
                            iconTheme: {
                                primary: '#ef4444',
                                secondary: '#fff',
                            },
                        },
                    }}
                />
            </ThemeProvider>
        </BrowserRouter>
    </React.StrictMode>
);
