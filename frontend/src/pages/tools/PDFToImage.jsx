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
} from '@mui/material';
import { Download } from '@mui/icons-material';
import FileUpload from '../../components/FileUpload';
import api from '../../services/api';
import toast from 'react-hot-toast';

const PDFToImage = () => {
    const [file, setFile] = useState(null);
    const [format, setFormat] = useState('png');
    const [loading, setLoading] = useState(false);

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
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `pdf-images.zip`);
            document.body.appendChild(link);
            link.click();
            link.remove();

            toast.success('PDF converted to images successfully!');
            setFile(null);
        } catch (error) {
            console.error('Convert error:', error);
            toast.error(error.response?.data?.message || 'Failed to convert PDF');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container maxWidth="md" className="py-8">
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
                    </Box>
                )}
            </Paper>
        </Container>
    );
};

export default PDFToImage;
