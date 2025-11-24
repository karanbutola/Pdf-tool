import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Box, Typography, Paper } from '@mui/material';
import { CloudUpload } from '@mui/icons-material';

const FileUpload = ({ onFilesSelected, accept, multiple = false, maxSize = 50 * 1024 * 1024 }) => {
    const onDrop = useCallback((acceptedFiles) => {
        onFilesSelected(acceptedFiles);
    }, [onFilesSelected]);

    const { getRootProps, getInputProps, isDragActive, fileRejections } = useDropzone({
        onDrop,
        accept,
        multiple,
        maxSize,
    });

    return (
        <Paper
            {...getRootProps()}
            elevation={0}
            className={`upload-zone scale-in ${isDragActive ? 'active' : ''}`}
            sx={{
                cursor: 'pointer',
                position: 'relative',
                overflow: 'hidden',
            }}
        >
            <input {...getInputProps()} />
            <Box className="text-center relative z-10">
                {/* Upload Icon */}
                <Box
                    sx={{
                        width: 80,
                        height: 80,
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 2rem',
                        background: isDragActive
                            ? 'rgba(0, 217, 255, 0.2)'
                            : 'rgba(255, 255, 255, 0.05)',
                        border: `2px solid ${isDragActive ? '#00d9ff' : 'rgba(255, 255, 255, 0.1)'}`,
                        transition: 'all 0.3s ease',
                    }}
                >
                    <CloudUpload
                        sx={{
                            fontSize: 40,
                            color: isDragActive ? '#00d9ff' : '#9ca3af',
                            transition: 'all 0.3s ease',
                        }}
                    />
                </Box>

                {/* Text Content */}
                {isDragActive ? (
                    <Typography
                        variant="h5"
                        sx={{
                            color: '#00d9ff',
                            fontFamily: '"Space Grotesk", sans-serif',
                            fontWeight: 700,
                            letterSpacing: '1px',
                        }}
                    >
                        DROP FILES NOW
                    </Typography>
                ) : (
                    <>
                        <Typography
                            variant="h5"
                            sx={{
                                fontFamily: '"Space Grotesk", sans-serif',
                                fontWeight: 600,
                                color: '#ffffff',
                                mb: 1,
                            }}
                        >
                            Click to upload or drag and drop
                        </Typography>
                        <Typography
                            variant="body1"
                            sx={{
                                color: '#9ca3af',
                                mb: 4,
                            }}
                        >
                            {multiple ? 'Upload multiple PDF files' : 'Upload a PDF file'}
                        </Typography>

                        {/* Info Badge */}
                        <Box
                            sx={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: 2,
                                px: 3,
                                py: 1,
                                borderRadius: '50px',
                                background: 'rgba(255, 255, 255, 0.05)',
                                border: '1px solid rgba(255, 255, 255, 0.1)',
                            }}
                        >
                            <Typography
                                variant="caption"
                                sx={{
                                    color: '#d7d7d7',
                                    fontFamily: '"Inter", sans-serif',
                                    fontWeight: 500,
                                    fontSize: '0.8rem',
                                }}
                            >
                                MAX SIZE: {Math.round(maxSize / 1024 / 1024)}MB
                            </Typography>
                        </Box>
                    </>
                )}

                {/* Error Message */}
                {fileRejections.length > 0 && (
                    <Typography
                        variant="body2"
                        sx={{
                            color: '#ef4444',
                            fontWeight: 600,
                            mt: 3,
                            background: 'rgba(239, 68, 68, 0.1)',
                            py: 1,
                            px: 2,
                            borderRadius: '8px',
                            display: 'inline-block',
                        }}
                    >
                        ⚠️ Invalid file type or size exceeded
                    </Typography>
                )}
            </Box>
        </Paper>
    );
};

export default FileUpload;
