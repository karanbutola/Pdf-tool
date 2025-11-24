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
    TextField,
    CircularProgress,
    Chip,
} from '@mui/material';
import { Download } from '@mui/icons-material';
import FileUpload from '../../components/FileUpload';
import api from '../../services/api';
import toast from 'react-hot-toast';

const SplitPDF = () => {
    const [file, setFile] = useState(null);
    const [mode, setMode] = useState('pages');
    const [value, setValue] = useState('1');
    const [loading, setLoading] = useState(false);

    const handleFileSelect = (files) => {
        if (files.length > 0) {
            setFile(files[0]);
            toast.success('File selected successfully');
        }
    };

    const handleSplit = async () => {
        if (!file) {
            toast.error('Please select a PDF file');
            return;
        }

        setLoading(true);
        const formData = new FormData();
        formData.append('file', file);
        formData.append('mode', mode);
        formData.append('value', value);

        try {
            const response = await api.post('/pdf/split', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
                responseType: 'blob',
            });

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `split-pdf.zip`);
            document.body.appendChild(link);
            link.click();
            link.remove();

            toast.success('PDF split successfully!');
            setFile(null);
        } catch (error) {
            console.error('Split error:', error);
            toast.error(error.response?.data?.message || 'Failed to split PDF');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container maxWidth="md" className="py-8">
            <Paper className="p-6 rounded-xl">
                <Typography variant="h4" className="font-bold mb-2">
                    ✂️ Split PDF
                </Typography>
                <Typography variant="body1" color="text.secondary" className="mb-6">
                    Split PDF into multiple documents
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
                            <InputLabel>Split Mode</InputLabel>
                            <Select
                                value={mode}
                                label="Split Mode"
                                onChange={(e) => setMode(e.target.value)}
                            >
                                <MenuItem value="pages">Pages per file</MenuItem>
                                <MenuItem value="ranges">Custom ranges</MenuItem>
                            </Select>
                        </FormControl>

                        {mode === 'pages' ? (
                            <TextField
                                fullWidth
                                type="number"
                                label="Pages per file"
                                value={value}
                                onChange={(e) => setValue(e.target.value)}
                                helperText="Number of pages in each split file"
                                className="mb-4"
                                inputProps={{ min: 1 }}
                            />
                        ) : (
                            <TextField
                                fullWidth
                                label="Page Ranges"
                                value={value}
                                onChange={(e) => setValue(e.target.value)}
                                placeholder="e.g., 1-3,4-6,7-10"
                                helperText="Enter page ranges separated by commas"
                                className="mb-4"
                            />
                        )}

                        <Button
                            variant="contained"
                            size="large"
                            fullWidth
                            onClick={handleSplit}
                            disabled={loading}
                            startIcon={loading ? <CircularProgress size={20} /> : <Download />}
                        >
                            {loading ? 'Splitting...' : 'Split PDF'}
                        </Button>
                    </Box>
                )}
            </Paper>
        </Container>
    );
};

export default SplitPDF;
