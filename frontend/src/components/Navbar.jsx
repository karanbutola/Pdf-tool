import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <AppBar
            position="sticky"
            elevation={0}
            sx={{
                background: 'linear-gradient(135deg, rgba(10, 14, 39, 0.95) 0%, rgba(15, 22, 41, 0.95) 100%)',
                backdropFilter: 'blur(20px) saturate(180%)',
                borderBottom: '1px solid rgba(0, 240, 255, 0.2)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.37), 0 0 20px rgba(0, 240, 255, 0.1)',
            }}
        >
            <Toolbar className="container mx-auto py-2">
                <Box className="flex items-center gap-4 flex-grow">
                    {/* Logo with Neon Glow */}
                    <Box
                        className="relative"
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 2,
                        }}
                    >
                        <Box
                            sx={{
                                width: 48,
                                height: 48,
                                borderRadius: '12px',
                                background: 'linear-gradient(135deg, rgba(0, 240, 255, 0.2), rgba(184, 41, 255, 0.2))',
                                border: '1px solid rgba(0, 240, 255, 0.3)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '1.5rem',
                                position: 'relative',
                                '&::before': {
                                    content: '""',
                                    position: 'absolute',
                                    inset: '-4px',
                                    background: 'linear-gradient(45deg, #00f0ff, #b829ff)',
                                    borderRadius: '14px',
                                    opacity: 0.3,
                                    filter: 'blur(8px)',
                                    zIndex: -1,
                                },
                            }}
                        >
                            📄
                        </Box>
                        <Typography
                            variant="h5"
                            component={Link}
                            to="/"
                            sx={{
                                textDecoration: 'none',
                                fontFamily: '"Orbitron", sans-serif',
                                fontWeight: 800,
                                fontSize: '1.5rem',
                                letterSpacing: '2px',
                                background: 'linear-gradient(135deg, #00f0ff 0%, #b829ff 100%)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                textShadow: '0 0 30px rgba(0, 240, 255, 0.5)',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease',
                                '&:hover': {
                                    filter: 'brightness(1.2)',
                                },
                            }}
                        >
                            PDF TOOLKIT
                        </Typography>
                    </Box>
                </Box>

                {/* Navigation */}
                <Box className="flex items-center gap-3">
                    <Button
                        component={Link}
                        to="/"
                        sx={{
                            color: '#fff',
                            fontFamily: '"Orbitron", sans-serif',
                            fontWeight: 600,
                            fontSize: '0.85rem',
                            letterSpacing: '1px',
                            padding: '8px 20px',
                            borderRadius: '10px',
                            position: 'relative',
                            overflow: 'hidden',
                            '&::before': {
                                content: '""',
                                position: 'absolute',
                                inset: 0,
                                background: 'linear-gradient(135deg, rgba(0, 240, 255, 0.1), rgba(184, 41, 255, 0.1))',
                                opacity: 0,
                                transition: 'opacity 0.3s',
                            },
                            '&:hover::before': {
                                opacity: 1,
                            },
                            '&:hover': {
                                boxShadow: '0 0 20px rgba(0, 240, 255, 0.3)',
                            },
                        }}
                    >
                        TOOLS
                    </Button>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
