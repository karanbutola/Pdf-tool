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
import { Download, Delete, DragIndicator } from '@mui/icons-material';
import FileUpload from '../../components/FileUpload';
import api from '../../services/api';
import toast from 'react-hot-toast';

const MergePDF = () => {
    const [files, setFiles] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleFileSelect = (newFiles) => {
        setFiles([...files, ...newFiles]);
        toast.success(`${newFiles.length} file(s) added`);
    };

    const handleRemoveFile = (index) => {
        const newFiles = files.filter((_, i) => i !== index);
        setFiles(newFiles);
    };

    const handleMerge = async () => {
        if (files.length < 2) {
            toast.error('Please select at least 2 PDF files');
            return;
        }

        setLoading(true);
        const formData = new FormData();
        files.forEach((file) => {
            formData.append('files', file);
        });

        try {
            const response = await api.post('/pdf/merge', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
                responseType: 'blob',
            });

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'merged.pdf');
            document.body.appendChild(link);
            link.click();
            link.remove();

            toast.success('PDFs merged successfully!');
            setFiles([]);
        } catch (error) {
            console.error('Merge error:', error);
            toast.error(error.response?.data?.message || 'Failed to merge PDFs');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container maxWidth="md" className="py-8">
            <Paper className="p-6 rounded-xl">
                <Typography variant="h4" className="font-bold mb-2">
                    🔗 Merge PDFs
                </Typography>
                <Typography variant="body1" color="text.secondary" className="mb-6">
                    Combine multiple PDF files into one document
                </Typography>

                <FileUpload
                    onFilesSelected={handleFileSelect}
                    accept={{ 'application/pdf': ['.pdf'] }}
                    multiple={true}
                />

                {files.length > 0 && (
                    <Box className="mt-4">
                        <Typography variant="h6" className="mb-2">
                            Selected Files ({files.length})
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
                                    <DragIndicator className="mr-2 text-gray-400" />
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
                            onClick={handleMerge}
                            disabled={loading || files.length < 2}
                            startIcon={loading ? <CircularProgress size={20} /> : <Download />}
                            className="mt-4"
                        >
                            {loading ? 'Merging...' : `Merge ${files.length} PDFs`}
                        </Button>
                    </Box>
                )}
            </Paper>
        </Container>
    );
};

export default MergePDF;
