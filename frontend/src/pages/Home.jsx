import { Container, Typography, Grid, TextField, Box, InputAdornment } from '@mui/material';
import { Search } from '@mui/icons-material';
import { useState } from 'react';
import ToolCard from '../components/ToolCard';

const Home = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const tools = [
        {
            title: 'Merge PDFs',
            description: 'Combine multiple PDF documents into a single unified file.',
            icon: '🔗',
            path: '/tools/merge',
        },
        {
            title: 'Image to PDF',
            description: 'Convert JPG, PNG, and other image formats to professional PDFs.',
            icon: '🖼️',
            path: '/tools/image-to-pdf',
        },
        {
            title: 'PDF to Image',
            description: 'Extract pages from your PDF as high-quality image files.',
            icon: '📸',
            path: '/tools/pdf-to-image',
        },
        {
            title: 'Rotate Pages',
            description: 'Permanently rotate PDF pages to portrait or landscape orientation.',
            icon: '🔄',
            path: '/tools/rotate',
        },
        {
            title: 'Extract Pages',
            description: 'Create a new PDF containing only specific pages from the original.',
            icon: '📄',
            path: '/tools/extract',
        },
        {
            title: 'Split PDF',
            description: 'Separate one PDF file into multiple documents by page ranges.',
            icon: '✂️',
            path: '/tools/split',
        },
    ];

    const filteredTools = tools.filter(tool =>
        tool.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tool.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <Box sx={{ minHeight: '100vh', py: 8 }}>
            <Container maxWidth="xl" sx={{ px: { xs: 3, md: 6 } }}>
                {/* Hero Section */}
                <Box className="text-center mb-16 fade-in">
                    {/* Badge */}
                    <Box
                        className="inline-flex items-center gap-2 px-4 py-1.5 mb-8"
                        sx={{
                            background: 'rgba(0, 217, 255, 0.1)',
                            border: '1px solid rgba(0, 217, 255, 0.3)',
                            borderRadius: '50px',
                        }}
                    >
                        <Box
                            sx={{
                                width: 6,
                                height: 6,
                                borderRadius: '50%',
                                background: '#00d9ff',
                                boxShadow: '0 0 10px #00d9ff',
                                animation: 'pulse 2s ease-in-out infinite',
                            }}
                        />
                        <Typography
                            variant="caption"
                            sx={{
                                color: '#00d9ff',
                                fontFamily: '"Space Grotesk", sans-serif',
                                fontWeight: 600,
                                letterSpacing: '1px',
                                fontSize: '0.75rem',
                                textTransform: 'uppercase',
                            }}
                        >
                            Professional PDF Suite
                        </Typography>
                    </Box>

                    {/* Main Title */}
                    <Typography
                        variant="h1"
                        sx={{
                            fontFamily: '"Space Grotesk", sans-serif',
                            fontWeight: 700,
                            fontSize: { xs: '3rem', md: '4.5rem' },
                            letterSpacing: '-1px',
                            mb: 3,
                            color: '#ffffff',
                            lineHeight: 1.1,
                        }}
                    >
                        Master Your <span className="text-gradient">Documents</span>
                    </Typography>

                    {/* Subtitle */}
                    <Typography
                        variant="h6"
                        sx={{
                            color: '#9ca3af',
                            fontWeight: 400,
                            maxWidth: '600px',
                            margin: '0 auto 4rem',
                            lineHeight: 1.6,
                            fontSize: '1.25rem',
                        }}
                    >
                        Powerful, secure, and free tools to manipulate PDF files directly in your browser. No registration required.
                    </Typography>

                    {/* Search Bar */}
                    <Box sx={{ maxWidth: 600, margin: '0 auto', position: 'relative' }}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            placeholder="Search for a tool..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Search sx={{ color: '#00d9ff', fontSize: '1.5rem' }} />
                                    </InputAdornment>
                                ),
                                sx: {
                                    background: 'rgba(0, 0, 0, 0.6)',
                                    backdropFilter: 'blur(10px)',
                                    borderRadius: '16px',
                                    border: '2px solid rgba(255, 255, 255, 0.1)',
                                    color: '#ffffff',
                                    fontSize: '1.1rem',
                                    padding: '8px 16px',
                                    transition: 'all 0.3s ease',
                                    '& fieldset': { border: 'none' },
                                    '&:hover': {
                                        borderColor: '#00d9ff',
                                        boxShadow: '0 0 30px rgba(0, 217, 255, 0.2)',
                                    },
                                    '&.Mui-focused': {
                                        borderColor: '#00d9ff',
                                        boxShadow: '0 0 40px rgba(0, 217, 255, 0.3)',
                                    },
                                    '& input::placeholder': {
                                        color: '#6b7280',
                                        opacity: 1,
                                    },
                                },
                            }}
                        />
                    </Box>
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
                                animation: `fadeIn 0.5s ease-out ${index * 0.1}s both`,
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
                                color: '#6b7280',
                                fontFamily: '"Space Grotesk", sans-serif',
                                fontWeight: 600,
                            }}
                        >
                            No tools found matching "{searchTerm}"
                        </Typography>
                    </Box>
                )}
            </Container>
        </Box>
    );
};

export default Home;
