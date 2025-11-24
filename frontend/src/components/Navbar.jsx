import { AppBar, Toolbar, Typography, Box } from '@mui/material';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <AppBar
            position="sticky"
            elevation={0}
            sx={{
                background: 'rgba(0, 0, 0, 0.8)',
                backdropFilter: 'blur(20px) saturate(180%)',
                borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                boxShadow: '0 4px 24px rgba(0, 0, 0, 0.5)',
            }}
        >
            <Toolbar sx={{ py: 2, maxWidth: '1400px', width: '100%', mx: 'auto', px: 3 }}>
                <Box className="flex items-center gap-4 flex-grow">
                    {/* Logo */}
                    <Box
                        component={Link}
                        to="/"
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 2,
                            textDecoration: 'none',
                        }}
                    >
                        <Box
                            sx={{
                                width: 44,
                                height: 44,
                                borderRadius: '12px',
                                background: 'linear-gradient(135deg, rgba(0, 217, 255, 0.2), rgba(168, 85, 247, 0.2))',
                                border: '2px solid rgba(0, 217, 255, 0.4)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '1.3rem',
                                position: 'relative',
                                transition: 'all 0.3s ease',
                                '&::before': {
                                    content: '""',
                                    position: 'absolute',
                                    inset: '-4px',
                                    background: 'linear-gradient(135deg, #00d9ff, #a855f7)',
                                    borderRadius: '14px',
                                    opacity: 0,
                                    filter: 'blur(8px)',
                                    zIndex: -1,
                                    transition: 'opacity 0.3s',
                                },
                                '&:hover::before': {
                                    opacity: 0.6,
                                },
                                '&:hover': {
                                    transform: 'scale(1.05)',
                                    borderColor: '#00d9ff',
                                },
                            }}
                        >
                            📄
                        </Box>
                        <Typography
                            variant="h6"
                            sx={{
                                fontFamily: '"Space Grotesk", sans-serif',
                                fontWeight: 700,
                                fontSize: '1.25rem',
                                letterSpacing: '0.5px',
                                color: '#ffffff',
                                transition: 'all 0.3s ease',
                                '&:hover': {
                                    color: '#00d9ff',
                                },
                            }}
                        >
                            PDF TOOLKIT
                        </Typography>
                    </Box>
                </Box>

                {/* Status Badge */}
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                        px: 2.5,
                        py: 1,
                        background: 'rgba(0, 217, 255, 0.1)',
                        border: '1px solid rgba(0, 217, 255, 0.3)',
                        borderRadius: '50px',
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        letterSpacing: '1px',
                        textTransform: 'uppercase',
                        color: '#00d9ff',
                    }}
                >
                    <Box
                        sx={{
                            width: 6,
                            height: 6,
                            background: '#00d9ff',
                            borderRadius: '50%',
                            boxShadow: '0 0 10px #00d9ff',
                            animation: 'pulse 2s ease-in-out infinite',
                        }}
                    />
                    ONLINE
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
