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
    Grid,
} from '@mui/material';
import { Download } from '@mui/icons-material';
import FileUpload from '../../components/FileUpload';
import { SidebarAd, DisplayAd } from '../../components/AdSense';
import api from '../../services/api';
import toast from 'react-hot-toast';

const RotatePDF = () => {
    const [file, setFile] = useState(null);
    const [angle, setAngle] = useState(90);
    const [pages, setPages] = useState('all');
    const [loading, setLoading] = useState(false);
    const [rotatedFile, setRotatedFile] = useState(null);

    const handleFileSelect = (files) => {
        if (files.length > 0) {
            setFile(files[0]);
            toast.success('File selected successfully');
        }
    };

    const handleRotate = async () => {
        if (!file) {
            toast.error('Please select a PDF file');
            return;
        }

        setLoading(true);
        const formData = new FormData();
        formData.append('file', file);
        formData.append('angle', angle);
        formData.append('pages', pages);

        try {
            const response = await api.post('/pdf/rotate', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
                responseType: 'blob',
            });

            const url = window.URL.createObjectURL(new Blob([response.data]));
            setRotatedFile(url);
            toast.success('PDF rotated successfully!');
        } catch (error) {
            console.error('Rotate error:', error);
            toast.error(error.response?.data?.message || 'Failed to rotate PDF');
        } finally {
            setLoading(false);
        }
    };

    const handleDownload = () => {
        if (rotatedFile) {
            const link = document.createElement('a');
            link.href = rotatedFile;
            link.setAttribute('download', `rotated-${file.name}`);
            document.body.appendChild(link);
            link.click();
            link.remove();
            setFile(null);
            setRotatedFile(null);
        }
    };

    return (
        <Container maxWidth="xl" className="py-8">
            <Grid container spacing={3}>
                <Grid item xs={12} md={8}>
                    <Paper className="p-6 rounded-xl">
                        <Typography variant="h4" className="font-bold mb-2">
                            🔄 Rotate PDF
                        </Typography>
                        <Typography variant="body1" color="text.secondary" className="mb-6">
                            Rotate pages in your PDF document
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
                                    <InputLabel>Rotation Angle</InputLabel>
                                    <Select
                                        value={angle}
                                        label="Rotation Angle"
                                        onChange={(e) => setAngle(e.target.value)}
                                    >
                                        <MenuItem value={90}>90° Clockwise</MenuItem>
                                        <MenuItem value={180}>180°</MenuItem>
                                        <MenuItem value={270}>270° (90° Counter-clockwise)</MenuItem>
                                    </Select>
                                </FormControl>

                                <TextField
                                    fullWidth
                                    label="Pages to Rotate"
                                    value={pages}
                                    onChange={(e) => setPages(e.target.value)}
                                    helperText="Enter 'all' or specific pages (e.g., '1,3,5')"
                                    className="mb-4"
                                />

                                {!rotatedFile && (
                                    <Button
                                        variant="contained"
                                        size="large"
                                        fullWidth
                                        onClick={handleRotate}
                                        disabled={loading}
                                        startIcon={loading ? <CircularProgress size={20} /> : <Download />}
                                    >
                                        {loading ? 'Rotating...' : 'Rotate PDF'}
                                    </Button>
                                )}

                                {rotatedFile && (
                                    <Box className="mt-4">
                                        <DisplayAd slot="1234567892" />
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
                                            Download Rotated PDF
                                        </Button>
                                    </Box>
                                )}
                            </Box>
                        )}
                    </Paper>
                </Grid>
                <Grid item xs={12} md={4}>
                    <SidebarAd slot="9876543212" />
                </Grid>
            </Grid>
        </Container>
    );
};

export default RotatePDF;
