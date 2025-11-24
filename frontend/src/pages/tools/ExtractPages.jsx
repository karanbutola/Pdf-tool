import { useState } from 'react';
import {
    Container,
    Paper,
    Typography,
    Button,
    Box,
    TextField,
    CircularProgress,
    Chip,
    Grid,
} from '@mui/material';
import { Download } from '@mui/icons-material';
import FileUpload from '../../components/FileUpload';
import { SidebarAd, DisplayAd } from '../../components/AdSense';
import api from '../../services/api';
import toast from 'react-hot-toast';

const ExtractPages = () => {
    const [file, setFile] = useState(null);
    const [pages, setPages] = useState('');
    const [loading, setLoading] = useState(false);
    const [extractedFile, setExtractedFile] = useState(null);

    const handleFileSelect = (files) => {
        if (files.length > 0) {
            setFile(files[0]);
            toast.success('File selected successfully');
        }
    };

    const handleExtract = async () => {
        if (!file) {
            toast.error('Please select a PDF file');
            return;
        }

        if (!pages.trim()) {
            toast.error('Please specify pages to extract');
            return;
        }

        setLoading(true);
        const formData = new FormData();
        formData.append('file', file);
        formData.append('pages', pages);

        try {
            const response = await api.post('/pdf/extract', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
                responseType: 'blob',
            });

            const url = window.URL.createObjectURL(new Blob([response.data]));
            setExtractedFile(url);
            toast.success('Pages extracted successfully!');
        } catch (error) {
            console.error('Extract error:', error);
            toast.error(error.response?.data?.message || 'Failed to extract pages');
        } finally {
            setLoading(false);
        }
    };

    const handleDownload = () => {
        if (extractedFile) {
            const link = document.createElement('a');
            link.href = extractedFile;
            link.setAttribute('download', `extracted-${file.name}`);
            document.body.appendChild(link);
            link.click();
            link.remove();
            setFile(null);
            setPages('');
            setExtractedFile(null);
        }
    };

    return (
        <Container maxWidth="xl" className="py-8">
            <Grid container spacing={3}>
                <Grid item xs={12} md={8}>
                    <Paper className="p-6 rounded-xl">
                        <Typography variant="h4" className="font-bold mb-2">
                            📄 Extract Pages
                        </Typography>
                        <Typography variant="body1" color="text.secondary" className="mb-6">
                            Extract specific pages from your PDF document
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

                                <TextField
                                    fullWidth
                                    label="Pages to Extract"
                                    value={pages}
                                    onChange={(e) => setPages(e.target.value)}
                                    placeholder="e.g., 1,3,5-7,10"
                                    helperText="Enter page numbers or ranges (e.g., '1,3,5-7,10')"
                                    className="mb-4"
                                />

                                <Box className="bg-blue-50 p-4 rounded mb-4">
                                    <Typography variant="body2" className="font-semibold mb-2">
                                        Examples:
                                    </Typography>
                                    <Typography variant="body2">• Single page: 5</Typography>
                                    <Typography variant="body2">• Multiple pages: 1,3,5</Typography>
                                    <Typography variant="body2">• Page range: 1-5</Typography>
                                    <Typography variant="body2">• Combined: 1,3,5-7,10</Typography>
                                </Box>

                                {!extractedFile && (
                                    <Button
                                        variant="contained"
                                        size="large"
                                        fullWidth
                                        onClick={handleExtract}
                                        disabled={loading || !pages.trim()}
                                        startIcon={loading ? <CircularProgress size={20} /> : <Download />}
                                    >
                                        {loading ? 'Extracting...' : 'Extract Pages'}
                                    </Button>
                                )}

                                {extractedFile && (
                                    <Box className="mt-4">
                                        <DisplayAd slot="1234567893" />
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
                                            Download Extracted Pages
                                        </Button>
                                    </Box>
                                )}
                            </Box>
                        )}
                    </Paper>
                </Grid>
                <Grid item xs={12} md={4}>
                    <SidebarAd slot="9876543213" />
                </Grid>
            </Grid>
        </Container>
    );
};

export default ExtractPages;
