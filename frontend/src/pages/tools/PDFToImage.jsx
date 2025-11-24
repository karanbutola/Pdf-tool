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
    Grid,
} from '@mui/material';
import { Download } from '@mui/icons-material';
import FileUpload from '../../components/FileUpload';
import { SidebarAd, DisplayAd } from '../../components/AdSense';
import api from '../../services/api';
import toast from 'react-hot-toast';

const PDFToImage = () => {
    const [file, setFile] = useState(null);
    const [format, setFormat] = useState('png');
    const [loading, setLoading] = useState(false);
    const [convertedFile, setConvertedFile] = useState(null);

    const handleFileSelect = (files) => {
        if (files.length > 0) {
            setFile(files[0]);
            toast.success('File selected successfully');
        }
    };

    const handleConvert = async () => {
        if (!file) {
            toast.error('Please select a PDF file');
            return;
        }

        setLoading(true);
        const formData = new FormData();
        formData.append('file', file);
        formData.append('format', format);

        try {
            const response = await api.post('/pdf/pdf-to-image', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
                responseType: 'blob',
            });

            const url = window.URL.createObjectURL(new Blob([response.data]));
            setConvertedFile(url);
            toast.success('PDF converted to images successfully!');
        } catch (error) {
            console.error('Convert error:', error);
            toast.error(error.response?.data?.message || 'Failed to convert PDF');
        } finally {
            setLoading(false);
        }
    };

    const handleDownload = () => {
        if (convertedFile) {
            const link = document.createElement('a');
            link.href = convertedFile;
            link.setAttribute('download', 'pdf-images.zip');
            document.body.appendChild(link);
            link.click();
            link.remove();
            setFile(null);
            setConvertedFile(null);
        }
    };

    return (
        <Container maxWidth="xl" className="py-8">
            <Grid container spacing={3}>
                <Grid item xs={12} md={8}>
                    <Paper className="p-6 rounded-xl">
                        <Typography variant="h4" className="font-bold mb-2">
                            📸 PDF to Image
                        </Typography>
                        <Typography variant="body1" color="text.secondary" className="mb-6">
                            Extract PDF pages as image files (PNG or JPG)
                        </Typography>

                        <FileUpload
                            onFilesSelected={handleFileSelect}
                            accept={{ 'application/pdf': ['.pdf'] }}
                            multiple={false}
                        />

                        {file && (
                            <Box className="mt-4">
                                <Chip
                                    label={`${file.name} (${(file.size / 1024 / 1024).toFixed(2)} MB)`}
                                    onDelete={() => setFile(null)}
                                    color="primary"
                                    className="mb-4"
                                />

                                <FormControl fullWidth className="mb-4">
                                    <InputLabel>Output Format</InputLabel>
                                    <Select
                                        value={format}
                                        label="Output Format"
                                        onChange={(e) => setFormat(e.target.value)}
                                    >
                                        <MenuItem value="png">PNG (Lossless)</MenuItem>
                                        <MenuItem value="jpg">JPG (Smaller size)</MenuItem>
                                    </Select>
                                </FormControl>

                                {!convertedFile && (
                                    <Button
                                        variant="contained"
                                        size="large"
                                        fullWidth
                                        onClick={handleConvert}
                                        disabled={loading}
                                        startIcon={loading ? <CircularProgress size={20} /> : <Download />}
                                    >
                                        {loading ? 'Converting...' : 'Convert to Images'}
                                    </Button>
                                )}

                                {convertedFile && (
                                    <Box className="mt-4">
                                        <DisplayAd slot="1234567895" />
                                        <Button
                                            variant="contained"
                                            size="large"
                                            fullWidth
                                            onClick={handleDownload}
                                            startIcon={<Download />}
                                            sx={{
                                                background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
                                                '&:hover': {
                                                    background: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)',
                                                },
                                            }}
                                        >
                                            Download Images
                                        </Button>
                                    </Box>
                                )}
                            </Box>
                        )}
                    </Paper>
                </Grid>
                <Grid item xs={12} md={4}>
                    <SidebarAd slot="9876543215" />
                </Grid>
            </Grid>
        </Container>
    );
};

export default PDFToImage;
