import { Container, Typography, Grid, TextField, Box, InputAdornment, Paper } from '@mui/material';
import { Search } from '@mui/icons-material';
import { useState } from 'react';
import ToolCard from '../components/ToolCard';

const Home = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const tools = [
        {
            title: 'Compress PDF',
            description: 'Reduce PDF file size while maintaining quality',
            icon: '🗜️',
            path: '/tools/compress',
            color: 'primary',
            tags: ['compress', 'reduce', 'size', 'optimize']
        },
        {
            title: 'Merge PDFs',
            description: 'Combine multiple PDF files into one document',
            icon: '🔗',
            path: '/tools/merge',
            color: 'secondary',
            tags: ['merge', 'combine', 'join', 'unite']
        },
        {
            title: 'Image to PDF',
            description: 'Convert images (JPG, PNG, etc.) to PDF format',
            icon: '🖼️',
            path: '/tools/image-to-pdf',
            color: 'success',
            tags: ['image', 'convert', 'jpg', 'png', 'photo']
        },
        {
            title: 'PDF to Image',
            description: 'Extract PDF pages as image files',
            icon: '📸',
            path: '/tools/pdf-to-image',
            color: 'warning',
            tags: ['extract', 'image', 'convert', 'export']
        },
        {
            title: 'Rotate PDF',
            description: 'Rotate pages in your PDF document',
            icon: '🔄',
            path: '/tools/rotate',
            color: 'info',
            tags: ['rotate', 'turn', 'orientation']
        },
        {
            title: 'Extract Pages',
            description: 'Extract specific pages from PDF',
            icon: '📄',
            path: '/tools/extract',
            color: 'error',
            tags: ['extract', 'pages', 'select', 'remove']
        },
        {
            title: 'Split PDF',
            description: 'Split PDF into multiple documents',
            icon: '✂️',
            path: '/tools/split',
            color: 'primary',
            tags: ['split', 'divide', 'separate']
        },
    ];

    const filteredTools = tools.filter(tool =>
        tool.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tool.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tool.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return (
        <Box className="min-h-screen page-transition" sx={{ py: 6 }}>
            <Container maxWidth="lg">
                <Box className="text-center mb-12 fade-in">
                    <Box
                        className="inline-block mb-4 px-6 py-2 rounded-full"
                        sx={{
                            background: 'rgba(255, 255, 255, 0.2)',
                            backdropFilter: 'blur(10px)',
                            border: '1px solid rgba(255, 255, 255, 0.3)',
                        }}
                    >
                        <Typography
                            variant="caption"
                            sx={{
                                color: 'white',
                                fontWeight: 600,
                                letterSpacing: '0.05em',
                                textTransform: 'uppercase',
                            }}
                        >
                            ✨ All-in-One PDF Solution
                        </Typography>
                    </Box>

                    <Typography
                        variant="h2"
                        component="h1"
                        className="font-bold mb-4"
                        sx={{
                            color: 'white',
                            fontWeight: 800,
                            fontSize: { xs: '2.5rem', md: '3.5rem' },
                            letterSpacing: '-0.02em',
                            textShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
                        }}
                    >
                        PDF Tools Made Simple
                    </Typography>

                    <Typography
                        variant="h6"
                        className="mb-8"
                        sx={{
                            color: 'rgba(255, 255, 255, 0.9)',
                            fontWeight: 400,
                            maxWidth: '600px',
                            margin: '0 auto 2rem',
                        }}
                    >
                        Compress, merge, split, convert, and more - all for free
                    </Typography>

                    <Paper
                        elevation={0}
                        sx={{
                            maxWidth: 600,
                            margin: '0 auto',
                            background: 'rgba(255, 255, 255, 0.95)',
                            backdropFilter: 'blur(20px)',
                            borderRadius: 4,
                            border: '1px solid rgba(255, 255, 255, 0.3)',
                            boxShadow: '0 8px 32px rgba(31, 38, 135, 0.2)',
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
                                        <Search sx={{ color: '#667eea' }} />
                                    </InputAdornment>
                                ),
                                sx: {
                                    '& fieldset': { border: 'none' },
                                    fontSize: '1.1rem',
                                },
                            }}
                        />
                    </Paper>
                </Box>

                <Grid container spacing={4}>
                    {filteredTools.map((tool, index) => (
                        <Grid
                            item
                            xs={12}
                            sm={6}
                            md={4}
                            key={index}
                            sx={{
                                animation: `fadeIn 0.6s ease-out ${index * 0.1}s both`,
                            }}
                        >
                            <ToolCard {...tool} />
                        </Grid>
                    ))}
                </Grid>

                {filteredTools.length === 0 && (
                    <Box className="text-center py-20">
                        <Typography
                            variant="h5"
                            sx={{
                                color: 'white',
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
