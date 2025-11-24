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
            main: '#3b82f6', // Electric Blue
        },
        secondary: {
            main: '#8b5cf6', // Violet
        },
        background: {
            default: '#020617', // Deep Space Blue (matches CSS)
            paper: '#0f172a',   // Dark Slate
        },
        text: {
            primary: '#ffffff',
            secondary: '#94a3b8',
        },
    },
    typography: {
        fontFamily: '"Outfit", "Inter", sans-serif',
        h1: { fontFamily: '"Space Grotesk", sans-serif', fontWeight: 700 },
        h2: { fontFamily: '"Space Grotesk", sans-serif', fontWeight: 700 },
        h3: { fontFamily: '"Space Grotesk", sans-serif', fontWeight: 700 },
        h4: { fontFamily: '"Space Grotesk", sans-serif', fontWeight: 700 },
        h5: { fontFamily: '"Space Grotesk", sans-serif', fontWeight: 600 },
        h6: { fontFamily: '"Space Grotesk", sans-serif', fontWeight: 600 },
        button: { fontFamily: '"Space Grotesk", sans-serif', fontWeight: 600, textTransform: 'none' },
    },
    shape: {
        borderRadius: 16,
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                body: {
                    backgroundColor: '#020617',
                    backgroundImage: 'none', // Let CSS handle the gradients
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: '12px',
                    padding: '10px 24px',
                    fontSize: '1rem',
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
                        style: {
                            background: '#1e293b',
                            color: '#fff',
                            border: '1px solid rgba(255,255,255,0.1)',
                        },
                    }}
                />
            </ThemeProvider>
        </BrowserRouter>
    </React.StrictMode>
);
