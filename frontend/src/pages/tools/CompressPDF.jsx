import { useState } from 'react';
import {
    Container,
    Paper,
    Typography,
    Button,
    Box,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    CircularProgress,
    Chip,
    LinearProgress,
} from '@mui/material';
import { Download, CheckCircle } from '@mui/icons-material';
import FileUpload from '../../components/FileUpload';
import api from '../../services/api';
import toast from 'react-hot-toast';

const CompressPDF = () => {
    const [file, setFile] = useState(null);
    const [resolution, setResolution] = useState('ebook');
    const [loading, setLoading] = useState(false);

    const handleFileSelect = (files) => {
        if (files.length > 0) {
            setFile(files[0]);
            toast.success('File selected successfully');
        }
    };

    const handleCompress = async () => {
        if (!file) {
            toast.error('Please select a PDF file');
            return;
        }

        setLoading(true);
        const formData = new FormData();
        formData.append('file', file);
        formData.append('resolution', resolution);

        try {
            const response = await api.post('/pdf/compress', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
                responseType: 'blob',
            });

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `compressed-${file.name}`);
            document.body.appendChild(link);
            link.click();
            link.remove();

            toast.success('PDF compressed successfully!');
            setFile(null);
        } catch (error) {
            console.error('Compress error:', error);
            toast.error(error.response?.data?.message || 'Failed to compress PDF');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box className="cyber-grid" sx={{ minHeight: '100vh', py: 8 }}>
            <Container maxWidth="md">
                <Paper
                    className="glass-panel scale-in"
                    elevation={0}
                    sx={{
                        p: 6,
                        borderRadius: '24px',
                        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%)',
                        backdropFilter: 'blur(20px) saturate(180%)',
                        border: '1px solid rgba(0, 240, 255, 0.2)',
                        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3), 0 0 40px rgba(0, 240, 255, 0.1)',
                    }}
                >
                    {/* Header */}
                    <Box className="text-center mb-6">
                        <Box
                            sx={{
                                width: 100,
                                height: 100,
                                borderRadius: '20px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                margin: '0 auto 2rem',
                                background: 'linear-gradient(135deg, rgba(0, 240, 255, 0.2), rgba(184, 41, 255, 0.2))',
                                border: '2px solid rgba(0, 240, 255, 0.3)',
                                fontSize: '3rem',
                                position: 'relative',
                                '&::before': {
                                    content: '""',
                                    position: 'absolute',
                                    inset: '-6px',
                                    background: 'linear-gradient(45deg, #00f0ff, #b829ff)',
                                    borderRadius: '22px',
                                    opacity: 0.4,
                                    zIndex: -1,
                                    filter: 'blur(15px)',
                                },
                            }}
                        >
                            🗜️
                        </Box>
                        <Typography
                            variant="h4"
                            className="text-gradient mb-2"
                            sx={{
                                fontFamily: '"Orbitron", sans-serif',
                                fontWeight: 800,
                                letterSpacing: '2px',
                            }}
                        >
                            COMPRESS PDF
                        </Typography>
                        <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                            Reduce file size while maintaining quality
                        </Typography>
                    </Box>

                    <FileUpload
                        onFilesSelected={handleFileSelect}
                        accept={{ 'application/pdf': ['.pdf'] }}
                        multiple={false}
                    />

                    {file && (
                        <Box className="mt-6 fade-in-up">
                            {/* File Chip */}
                            <Chip
                                label={`${file.name} • ${(file.size / 1024 / 1024).toFixed(2)} MB`}
                                onDelete={() => setFile(null)}
                                sx={{
                                    mb: 4,
                                    px: 3,
                                    py: 3.5,
                                    fontSize: '0.95rem',
                                    fontWeight: 600,
                                    background: 'linear-gradient(135deg, rgba(0, 240, 255, 0.1), rgba(184, 41, 255, 0.1))',
                                    border: '1px solid rgba(0, 240, 255, 0.3)',
                                    color: '#fff',
                                    fontFamily: '"Orbitron", sans-serif',
                                    '& .MuiChip-deleteIcon': {
                                        color: '#00f0ff',
                                        '&:hover': {
                                            color: '#ff006e',
                                        },
                                    },
                                }}
                            />

                            {/* Quality Selector */}
                            <FormControl fullWidth className="mb-4">
                                <InputLabel sx={{ color: 'rgba(255, 255, 255, 0.7)', fontFamily: '"Orbitron", sans-serif' }}>
                                    COMPRESSION QUALITY
                                </InputLabel>
                                <Select
                                    value={resolution}
                                    label="COMPRESSION QUALITY"
                                    onChange={(e) => setResolution(e.target.value)}
                                    sx={{
                                        borderRadius: '12px',
                                        background: 'rgba(255, 255, 255, 0.03)',
                                        border: '1px solid rgba(0, 240, 255, 0.2)',
                                        color: '#fff',
                                        fontFamily: '"Orbitron", sans-serif',
                                        '& .MuiOutlinedInput-notchedOutline': {
                                            border: 'none',
                                        },
                                        '&:hover': {
                                            borderColor: '#00f0ff',
                                            boxShadow: '0 0 20px rgba(0, 240, 255, 0.2)',
                                        },
                                    }}
                                >
                                    <MenuItem value="screen">SCREEN (72 DPI) - Smallest</MenuItem>
                                    <MenuItem value="ebook">EBOOK (150 DPI) - Recommended</MenuItem>
                                    <MenuItem value="printer">PRINTER (300 DPI) - High Quality</MenuItem>
                                    <MenuItem value="prepress">PREPRESS (300 DPI) - Best Quality</MenuItem>
                                </Select>
                            </FormControl>

                            {/* Progress Bar */}
                            {loading && (
                                <Box className="mb-4">
                                    <Box className="progress-bar">
                                        <Box
                                            className="progress-fill"
                                            sx={{ width: '100%' }}
                                        />
                                    </Box>
                                    <Typography
                                        variant="caption"
                                        sx={{
                                            color: '#00f0ff',
                                            fontFamily: '"Orbitron", sans-serif',
                                            display: 'block',
                                            textAlign: 'center',
                                            mt: 2,
                                            letterSpacing: '1px',
                                        }}
                                    >
                                        COMPRESSING PDF...
                                    </Typography>
                                </Box>
                            )}

                            {/* Action Button */}
                            <Button
                                fullWidth
                                onClick={handleCompress}
                                disabled={loading}
                                className="btn-futuristic ripple"
                                startIcon={loading ? <CircularProgress size={20} sx={{ color: '#0a0e27' }} /> : <Download />}
                                sx={{
                                    py: 2,
                                    fontSize: '1rem',
                                    fontFamily: '"Orbitron", sans-serif',
                                    fontWeight: 700,
                                    letterSpacing: '2px',
                                }}
                            >
                                {loading ? 'PROCESSING...' : 'COMPRESS PDF'}
                            </Button>
                        </Box>
                    )}
                </Paper>
            </Container>
        </Box>
    );
};

export default CompressPDF;
