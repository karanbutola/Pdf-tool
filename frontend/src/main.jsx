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
        primary: {
            main: '#667eea',
            light: '#8b9ef7',
            dark: '#4a5dc7',
        },
        secondary: {
            main: '#764ba2',
            light: '#9a6fc9',
            dark: '#533471',
        },
        success: {
            main: '#4facfe',
        },
        warning: {
            main: '#fa709a',
        },
        error: {
            main: '#f5576c',
        },
        background: {
            default: 'transparent',
            paper: 'rgba(255, 255, 255, 0.95)',
        },
    },
    typography: {
        fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
        h1: {
            fontWeight: 800,
            letterSpacing: '-0.02em',
        },
        h2: {
            fontWeight: 700,
            letterSpacing: '-0.01em',
        },
        h3: {
            fontWeight: 700,
        },
        h4: {
            fontWeight: 600,
        },
        button: {
            fontWeight: 600,
            letterSpacing: '0.02em',
        },
    },
    shape: {
        borderRadius: 16,
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: 'none',
                    borderRadius: 12,
                    padding: '10px 24px',
                    fontSize: '1rem',
                    fontWeight: 600,
                    boxShadow: 'none',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    '&:hover': {
                        boxShadow: '0 8px 24px rgba(102, 126, 234, 0.4)',
                        transform: 'translateY(-2px)',
                    },
                },
                contained: {
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    '&:hover': {
                        background: 'linear-gradient(135deg, #764ba2 0%, #667eea 100%)',
                    },
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: 20,
                    boxShadow: '0 8px 32px rgba(31, 38, 135, 0.15)',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: '0 12px 48px rgba(31, 38, 135, 0.25)',
                    },
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    borderRadius: 20,
                    backgroundImage: 'none',
                },
            },
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    '& .MuiOutlinedInput-root': {
                        borderRadius: 12,
                        transition: 'all 0.3s ease',
                        '&:hover': {
                            boxShadow: '0 4px 12px rgba(102, 126, 234, 0.15)',
                        },
                        '&.Mui-focused': {
                            boxShadow: '0 4px 20px rgba(102, 126, 234, 0.3)',
                        },
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
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            color: '#fff',
                            borderRadius: '12px',
                            padding: '16px',
                            fontSize: '14px',
                            fontWeight: 500,
                            boxShadow: '0 8px 24px rgba(102, 126, 234, 0.4)',
                        },
                        success: {
                            duration: 3000,
                            style: {
                                background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                            },
                        },
                        error: {
                            duration: 4000,
                            style: {
                                background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                            },
                        },
                    }}
                />
            </ThemeProvider>
        </BrowserRouter>
    </React.StrictMode>
);
