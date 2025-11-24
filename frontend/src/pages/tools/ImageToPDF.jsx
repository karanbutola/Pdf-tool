import { useState } from 'react';
import {
    Container,
    Paper,
    Typography,
    Button,
    Box,
    List,
    ListItem,
    ListItemText,
    IconButton,
    CircularProgress,
} from '@mui/material';
import { Download, Delete } from '@mui/icons-material';
import FileUpload from '../../components/FileUpload';
import api from '../../services/api';
import toast from 'react-hot-toast';

const ImageToPDF = () => {
    const [files, setFiles] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleFileSelect = (newFiles) => {
        setFiles([...files, ...newFiles]);
        toast.success(`${newFiles.length} image(s) added`);
    };

    const handleRemoveFile = (index) => {
        const newFiles = files.filter((_, i) => i !== index);
        setFiles(newFiles);
    };

    const handleConvert = async () => {
        if (files.length === 0) {
            toast.error('Please select at least one image');
            return;
        }

        setLoading(true);
        const formData = new FormData();
        files.forEach((file) => {
            formData.append('files', file);
        });

        try {
            const response = await api.post('/pdf/image-to-pdf', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
                responseType: 'blob',
            });

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'images-to-pdf.pdf');
            document.body.appendChild(link);
            link.click();
            link.remove();

            toast.success('Images converted to PDF successfully!');
            setFiles([]);
        } catch (error) {
            console.error('Convert error:', error);
            toast.error(error.response?.data?.message || 'Failed to convert images');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container maxWidth="md" className="py-8">
            <Paper className="p-6 rounded-xl">
                <Typography variant="h4" className="font-bold mb-2">
                    🖼️ Image to PDF
                </Typography>
                <Typography variant="body1" color="text.secondary" className="mb-6">
                    Convert images (JPG, PNG, GIF, WebP) to PDF format
                </Typography>

                <FileUpload
                    onFilesSelected={handleFileSelect}
                    accept={{
                        'image/jpeg': ['.jpg', '.jpeg'],
                        'image/png': ['.png'],
                        'image/gif': ['.gif'],
                        'image/webp': ['.webp'],
                    }}
                    multiple={true}
                />

                {files.length > 0 && (
                    <Box className="mt-4">
                        <Typography variant="h6" className="mb-2">
                            Selected Images ({files.length})
                        </Typography>
                        <List>
                            {files.map((file, index) => (
                                <ListItem
                                    key={index}
                                    secondaryAction={
                                        <IconButton edge="end" onClick={() => handleRemoveFile(index)}>
                                            <Delete />
                                        </IconButton>
                                    }
                                    className="bg-gray-50 mb-2 rounded"
                                >
                                    <ListItemText
                                        primary={file.name}
                                        secondary={`${(file.size / 1024 / 1024).toFixed(2)} MB`}
                                    />
                                </ListItem>
                            ))}
                        </List>

                        <Button
                            variant="contained"
                            size="large"
                            fullWidth
                            onClick={handleConvert}
                            disabled={loading}
                            startIcon={loading ? <CircularProgress size={20} /> : <Download />}
                            className="mt-4"
                        >
                            {loading ? 'Converting...' : `Convert ${files.length} Image(s) to PDF`}
                        </Button>
                    </Box>
                )}
            </Paper>
        </Container>
    );
};

export default ImageToPDF;
