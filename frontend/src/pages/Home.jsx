import { Container, Typography, Grid, TextField, Box, InputAdornment, Paper } from '@mui/material';
import { Search } from '@mui/icons-material';
import { useState } from 'react';
import ToolCard from '../components/ToolCard';

const Home = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const tools = [
        {
            title: 'Compress',
            description: 'Reduce file size while maintaining quality with advanced compression',
            icon: '🗜️',
            path: '/tools/compress',
        },
        {
            title: 'Merge',
            description: 'Combine multiple PDFs into a single unified document',
            icon: '🔗',
            path: '/tools/merge',
        },
        {
            title: 'Image → PDF',
            description: 'Convert images to professional PDF documents instantly',
            icon: '🖼️',
            path: '/tools/image-to-pdf',
        },
        {
            title: 'PDF → Image',
            description: 'Extract pages as high-quality image files',
            icon: '📸',
            path: '/tools/pdf-to-image',
        },
        {
            title: 'Rotate',
            description: 'Adjust page orientation with precision control',
            icon: '🔄',
            path: '/tools/rotate',
        },
        {
            title: 'Extract',
            description: 'Pull specific pages from your PDF documents',
            icon: '📄',
            path: '/tools/extract',
        },
        {
            title: 'Split',
            description: 'Divide PDFs into multiple separate files',
            icon: '✂️',
            path: '/tools/split',
        },
    ];

    const filteredTools = tools.filter(tool =>
        tool.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tool.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <Box className="cyber-grid" sx={{ minHeight: '100vh', py: 8 }}>
            <Container maxWidth="lg">
                {/* Hero Section */}
                <Box className="text-center mb-12 fade-in-up">
                    {/* Floating Badge */}
                    <Box
                        className="inline-flex items-center gap-2 px-4 py-2 mb-6"
                        sx={{
                            background: 'linear-gradient(135deg, rgba(0, 240, 255, 0.1), rgba(184, 41, 255, 0.1))',
                            border: '1px solid rgba(0, 240, 255, 0.3)',
                            borderRadius: '50px',
                            backdropFilter: 'blur(10px)',
                        }}
                    >
                        <Box
                            sx={{
                                width: 8,
                                height: 8,
                                borderRadius: '50%',
                                background: '#00f0ff',
                                boxShadow: '0 0 10px #00f0ff',
                                animation: 'pulse 2s ease-in-out infinite',
                            }}
                        />
                        <Typography
                            variant="caption"
                            sx={{
                                color: '#00f0ff',
                                fontFamily: '"Orbitron", sans-serif',
                                fontWeight: 600,
                                letterSpacing: '2px',
                                fontSize: '0.75rem',
                            }}
                        >
                            PROFESSIONAL PDF POWERHOUSE
                        </Typography>
                    </Box>

                    {/* Main Title */}
                    <Typography
                        variant="h1"
                        className="text-gradient"
                        sx={{
                            fontFamily: '"Orbitron", sans-serif',
                            fontWeight: 900,
                            fontSize: { xs: '2.5rem', md: '4rem' },
                            letterSpacing: '3px',
                            mb: 3,
                            textShadow: '0 0 40px rgba(0, 240, 255, 0.5)',
                        }}
                    >
                        PDF TOOLKIT
                    </Typography>

                    {/* Subtitle */}
                    <Typography
                        variant="h6"
                        sx={{
                            color: 'rgba(255, 255, 255, 0.7)',
                            fontWeight: 400,
                            maxWidth: '700px',
                            margin: '0 auto 3rem',
                            lineHeight: 1.8,
                            fontSize: '1.1rem',
                        }}
                    >
                        Transform, optimize, and manipulate your PDF documents with cutting-edge tools designed for professionals
                    </Typography>

                    {/* Search Bar */}
                    <Paper
                        elevation={0}
                        sx={{
                            maxWidth: 600,
                            margin: '0 auto',
                            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.02))',
                            backdropFilter: 'blur(20px)',
                            borderRadius: '16px',
                            border: '1px solid rgba(0, 240, 255, 0.2)',
                            overflow: 'hidden',
                            transition: 'all 0.3s ease',
                            '&:hover': {
                                borderColor: '#00f0ff',
                                boxShadow: '0 0 30px rgba(0, 240, 255, 0.3)',
                            },
                        }}
                    >
                        <TextField
                            fullWidth
                            variant="outlined"
                            placeholder="Search tools..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Search sx={{ color: '#00f0ff', fontSize: '1.5rem' }} />
                                    </InputAdornment>
                                ),
                                sx: {
                                    '& fieldset': { border: 'none' },
                                    fontSize: '1.1rem',
                                    color: '#fff',
                                    fontFamily: '"Inter", sans-serif',
                                    '& input::placeholder': {
                                        color: 'rgba(255, 255, 255, 0.5)',
                                    },
                                },
                            }}
                        />
                    </Paper>
                </Box>

                {/* Tools Grid */}
                <Grid container spacing={4}>
                    {filteredTools.map((tool, index) => (
                        <Grid
                            item
                            xs={12}
                            sm={6}
                            md={4}
                            key={index}
                            sx={{
                                animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`,
                            }}
                        >
                            <ToolCard {...tool} />
                        </Grid>
                    ))}
                </Grid>

                {/* No Results */}
                {filteredTools.length === 0 && (
                    <Box className="text-center py-20">
                        <Typography
                            variant="h5"
                            sx={{
                                color: 'rgba(255, 255, 255, 0.5)',
                                fontFamily: '"Orbitron", sans-serif',
                                fontWeight: 600,
                            }}
                        >
                            No tools found matching "{searchTerm}"
                        </Typography>
                    </Box>
                )}

                {/* Decorative Elements */}
                <Box
                    sx={{
                        position: 'fixed',
                        top: '20%',
                        right: '-100px',
                        width: '300px',
                        height: '300px',
                        borderRadius: '50%',
                        background: 'radial-gradient(circle, rgba(0, 240, 255, 0.1) 0%, transparent 70%)',
                        filter: 'blur(60px)',
                        pointerEvents: 'none',
                        zIndex: 0,
                    }}
                />
                <Box
                    sx={{
                        position: 'fixed',
                        bottom: '10%',
                        left: '-100px',
                        width: '400px',
                        height: '400px',
                        borderRadius: '50%',
                        background: 'radial-gradient(circle, rgba(184, 41, 255, 0.1) 0%, transparent 70%)',
                        filter: 'blur(80px)',
                        pointerEvents: 'none',
                        zIndex: 0,
                    }}
                />
            </Container>
        </Box>
    );
};

export default Home;
