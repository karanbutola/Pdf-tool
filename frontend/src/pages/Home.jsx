import { Container, Typography, Grid, TextField, Box, InputAdornment } from '@mui/material';
import { Search } from '@mui/icons-material';
import { useState } from 'react';
import ToolCard from '../components/ToolCard';
import { InFeedAd } from '../components/AdSense';

const Home = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const tools = [
        // { title: 'Compress PDF', description: 'Reduce file size while maintaining quality using GPU acceleration.', icon: '📉', path: '/tools/compress' },
        { title: 'Merge PDFs', description: 'Combine multiple PDF documents into a single unified file.', icon: '🔗', path: '/tools/merge' },
        { title: 'Image to PDF', description: 'Convert JPG, PNG, and other image formats to professional PDFs.', icon: '🖼️', path: '/tools/image-to-pdf' },
        { title: 'PDF to Image', description: 'Extract pages from your PDF as high-quality image files.', icon: '📸', path: '/tools/pdf-to-image' },
        { title: 'Rotate Pages', description: 'Permanently rotate PDF pages to portrait or landscape orientation.', icon: '🔄', path: '/tools/rotate' },
        { title: 'Extract Pages', description: 'Create a new PDF containing only specific pages from the original.', icon: '📄', path: '/tools/extract' },
        { title: 'Split PDF', description: 'Separate one PDF file into multiple documents by page ranges.', icon: '✂️', path: '/tools/split' },
    ];

    const filteredTools = tools.filter(tool =>
        tool.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tool.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <Box sx={{ minHeight: '100vh', py: { xs: 8, md: 12 } }}>
            <Container maxWidth="xl" sx={{ px: { xs: 3, md: 6 } }}>
                {/* Hero Section */}
                <Box className="text-center mb-20 fade-in-up">
                    {/* Main Title */}
                    <Typography
                        variant="h1"
                        sx={{
                            fontFamily: '"Space Grotesk", sans-serif',
                            fontWeight: 800,
                            fontSize: { xs: '3.5rem', md: '5.5rem' },
                            letterSpacing: '-2px',
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
                            color: '#94a3b8',
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
                            placeholder="Search for a tool (e.g., Merge, Split)..."
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                            className="search-bar"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Search sx={{ color: '#3b82f6', fontSize: '1.5rem' }} />
                                    </InputAdornment>
                                ),
                                sx: {
                                    borderRadius: '16px',
                                    color: '#ffffff',
                                    fontSize: '1.1rem',
                                    padding: '8px 16px',
                                    '& fieldset': { border: 'none' },
                                    '& input::placeholder': { color: '#64748b', opacity: 1 },
                                },
                            }}
                        />
                    </Box>
                </Box>
                {/* Tools Grid */}
                <Grid container spacing={4}>
                    {filteredTools.map((tool, index) => (
                        <>
                            <Grid
                                item
                                xs={12}
                                sm={6}
                                md={4}
                                key={index}
                                sx={{ animation: `fadeInUp 0.5s ease-out ${index * 0.1}s both` }}
                            >
                                <ToolCard {...tool} />
                            </Grid>
                            {/* In-feed ads after 3rd and 6th tool cards */}
                            {(index === 2 || index === 5) && filteredTools.length > index + 1 && (
                                <Grid item xs={12} sm={6} md={4} key={`ad-${index}`}>
                                    <InFeedAd slot={index === 2 ? "1234567896" : "1234567897"} />
                                </Grid>
                            )}
                        </>
                    ))}
                </Grid>
                {/* No Results */}
                {filteredTools.length === 0 && (
                    <Box className="text-center py-20">
                        <Typography variant="h5" sx={{ color: '#64748b', fontFamily: '"Space Grotesk", sans-serif', fontWeight: 600 }}>
                            No tools found matching "{searchTerm}"
                        </Typography>
                    </Box>
                )}
            </Container>
        </Box>
    );
};

export default Home;
