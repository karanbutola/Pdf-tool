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
        <Box
            className="min-h-screen page-transition"
            sx={{
                py: 6,
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            }}
        >
            <Container maxWidth="md">
                <Paper
                    className="p-8 scale-in"
                    elevation={0}
                    sx={{
                        borderRadius: 5,
                        background: 'rgba(255, 255, 255, 0.95)',
                        backdropFilter: 'blur(20px)',
                        boxShadow: '0 20px 60px rgba(31, 38, 135, 0.3)',
                    }}
                >
                    <Box className="text-center mb-6">
                        <Box
                            sx={{
                                width: 80,
                                height: 80,
                                borderRadius: 4,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                margin: '0 auto 1.5rem',
                                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                boxShadow: '0 8px 24px rgba(102, 126, 234, 0.4)',
                                fontSize: '2.5rem',
                            }}
                        >
                            🗜️
                        </Box>
                        <Typography
                            variant="h4"
                            className="font-bold mb-2"
                            sx={{
                                fontWeight: 800,
                                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                            }}
                        >
                            Compress PDF
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                            Reduce PDF file size while maintaining quality
                        </Typography>
                    </Box>

                    <FileUpload
                        onFilesSelected={handleFileSelect}
                        accept={{ 'application/pdf': ['.pdf'] }}
                        multiple={false}
                    />

                    {file && (
                        <Box className="mt-6 fade-in">
                            <Chip
                                label={`${file.name} • ${(file.size / 1024 / 1024).toFixed(2)} MB`}
                                onDelete={() => setFile(null)}
                                sx={{
                                    mb: 3,
                                    px: 2,
                                    py: 3,
                                    fontSize: '0.95rem',
                                    fontWeight: 500,
                                    background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)',
                                    border: '1px solid rgba(102, 126, 234, 0.2)',
                                    '& .MuiChip-deleteIcon': {
                                        color: '#667eea',
                                    },
                                }}
                            />

                            <FormControl fullWidth className="mb-4">
                                <InputLabel>Compression Quality</InputLabel>
                                <Select
                                    value={resolution}
                                    label="Compression Quality"
                                    onChange={(e) => setResolution(e.target.value)}
                                    sx={{
                                        borderRadius: 3,
                                        '&:hover': {
                                            boxShadow: '0 4px 12px rgba(102, 126, 234, 0.15)',
                                        },
                                    }}
                                >
                                    <MenuItem value="screen">
                                        <Box>
                                            <Typography variant="body1" fontWeight={600}>Screen (72 DPI)</Typography>
                                            <Typography variant="caption" color="text.secondary">Smallest size • Best for viewing</Typography>
                                        </Box>
                                    </MenuItem>
                                    <MenuItem value="ebook">
                                        <Box>
                                            <Typography variant="body1" fontWeight={600}>eBook (150 DPI)</Typography>
                                            <Typography variant="caption" color="text.secondary">Recommended • Balanced quality</Typography>
                                        </Box>
                                    </MenuItem>
                                    <MenuItem value="printer">
                                        <Box>
                                            <Typography variant="body1" fontWeight={600}>Printer (300 DPI)</Typography>
                                            <Typography variant="caption" color="text.secondary">High quality • For printing</Typography>
                                        </Box>
                                    </MenuItem>
                                    <MenuItem value="prepress">
                                        <Box>
                                            <Typography variant="body1" fontWeight={600}>Prepress (300 DPI)</Typography>
                                            <Typography variant="caption" color="text.secondary">Best quality • Largest size</Typography>
                                        </Box>
                                    </MenuItem>
                                </Select>
                            </FormControl>

                            {loading && (
                                <Box className="mb-4">
                                    <LinearProgress
                                        sx={{
                                            height: 8,
                                            borderRadius: 4,
                                            background: 'rgba(102, 126, 234, 0.1)',
                                            '& .MuiLinearProgress-bar': {
                                                background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)',
                                                borderRadius: 4,
                                            },
                                        }}
                                    />
                                    <Typography variant="caption" color="text.secondary" className="mt-2 block text-center">
                                        Compressing your PDF...
                                    </Typography>
                                </Box>
                            )}

                            <Button
                                variant="contained"
                                size="large"
                                fullWidth
                                onClick={handleCompress}
                                disabled={loading}
                                startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <Download />}
                                sx={{
                                    py: 1.5,
                                    fontSize: '1.1rem',
                                    fontWeight: 600,
                                    borderRadius: 3,
                                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                    boxShadow: '0 8px 24px rgba(102, 126, 234, 0.4)',
                                    '&:hover': {
                                        background: 'linear-gradient(135deg, #764ba2 0%, #667eea 100%)',
                                        boxShadow: '0 12px 32px rgba(102, 126, 234, 0.5)',
                                        transform: 'translateY(-2px)',
                                    },
                                    '&:disabled': {
                                        background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.5) 0%, rgba(118, 75, 162, 0.5) 100%)',
                                    },
                                }}
                            >
                                {loading ? 'Compressing...' : 'Compress PDF'}
                            </Button>
                        </Box>
                    )}
                </Paper>
            </Container>
        </Box>
    );
};

export default CompressPDF;
