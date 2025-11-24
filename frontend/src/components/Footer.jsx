import { Box, Container, Typography, Link, IconButton } from '@mui/material';
import { GitHub, Twitter, Coffee } from '@mui/icons-material';

const Footer = () => {
    return (
        <Box
            component="footer"
            sx={{
                py: 6,
                px: 2,
                mt: 'auto',
                backgroundColor: 'rgba(15, 23, 42, 0.6)',
                backdropFilter: 'blur(20px)',
                borderTop: '1px solid rgba(255, 255, 255, 0.05)',
            }}
        >
            <Container maxWidth="lg">
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: { xs: 'column', md: 'row' },
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        gap: 4,
                    }}
                >
                    {/* Brand & Copyright */}
                    <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
                        <Typography
                            variant="h6"
                            sx={{
                                fontFamily: '"Space Grotesk", sans-serif',
                                fontWeight: 700,
                                color: '#fff',
                                mb: 1,
                            }}
                        >
                            PDF TOOLKIT
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#94a3b8' }}>
                            © {new Date().getFullYear()} PDF Toolkit. All rights reserved.
                        </Typography>
                    </Box>

                    {/* Buy Me a Coffee Section */}
                    <Box sx={{ textAlign: { xs: 'center', md: 'right' } }}>
                        <Typography
                            variant="body2"
                            sx={{
                                color: '#94a3b8',
                                mb: 1.5,
                                fontStyle: 'italic',
                                maxWidth: '300px'
                            }}
                        >
                            "Built with passion to simplify your work. Your contribution keeps this project alive."
                        </Typography>
                        <Box
                            component="a"
                            href="https://buymeacoffee.com/rekhugopir"
                            target="_blank"
                            rel="noopener noreferrer"
                            sx={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: 1.5,
                                px: 3,
                                py: 1.5,
                                backgroundColor: '#FFDD00',
                                color: '#000000',
                                borderRadius: '50px',
                                textDecoration: 'none',
                                fontWeight: 600,
                                fontFamily: '"Space Grotesk", sans-serif',
                                transition: 'transform 0.2s, box-shadow 0.2s',
                                '&:hover': {
                                    transform: 'translateY(-2px)',
                                    boxShadow: '0 4px 12px rgba(255, 221, 0, 0.3)',
                                },
                            }}
                        >
                            <Coffee sx={{ fontSize: 20 }} />
                            <span>Buy me a coffee</span>
                        </Box>
                    </Box>

                    {/* Social Links */}
                    <Box sx={{ display: 'flex', gap: 1 }}>
                        <IconButton
                            href="#"
                            sx={{ color: '#94a3b8', '&:hover': { color: '#fff' } }}
                        >
                            <GitHub />
                        </IconButton>
                        <IconButton
                            href="#"
                            sx={{ color: '#94a3b8', '&:hover': { color: '#1DA1F2' } }}
                        >
                            <Twitter />
                        </IconButton>
                    </Box>
                </Box>
            </Container>
        </Box>
    );
};

export default Footer;
