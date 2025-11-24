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
} from '@mui/material';
import { Download } from '@mui/icons-material';
import FileUpload from '../../components/FileUpload';
import api from '../../services/api';
import toast from 'react-hot-toast';

const ExtractPages = () => {
    const [file, setFile] = useState(null);
    const [pages, setPages] = useState('');
    const [loading, setLoading] = useState(false);

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
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `extracted-${file.name}`);
            document.body.appendChild(link);
            link.click();
            link.remove();

            toast.success('Pages extracted successfully!');
            setFile(null);
            setPages('');
        } catch (error) {
            console.error('Extract error:', error);
            toast.error(error.response?.data?.message || 'Failed to extract pages');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container maxWidth="md" className="py-8">
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
                    </Box>
                )}
            </Paper>
        </Container>
    );
};

export default ExtractPages;
