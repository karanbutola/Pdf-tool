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
            className="scale-in"
            sx={{
                p: 6,
                border: '2px dashed',
                borderColor: isDragActive ? '#667eea' : 'rgba(102, 126, 234, 0.3)',
                borderRadius: 5,
                cursor: 'pointer',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                background: isDragActive
                    ? 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)'
                    : 'rgba(255, 255, 255, 0.5)',
                backdropFilter: 'blur(10px)',
                '&:hover': {
                    borderColor: '#667eea',
                    background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.05) 0%, rgba(118, 75, 162, 0.05) 100%)',
                    transform: 'translateY(-4px)',
                    boxShadow: '0 12px 40px rgba(102, 126, 234, 0.2)',
                },
            }}
        >
            <input {...getInputProps()} />
            <Box className="text-center">
                <Box
                    className={isDragActive ? 'float' : ''}
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
                        transition: 'all 0.3s ease',
                    }}
                >
                    <CloudUpload sx={{ fontSize: 40, color: 'white' }} />
                </Box>

                {isDragActive ? (
                    <Typography
                        variant="h6"
                        sx={{
                            color: '#667eea',
                            fontWeight: 600,
                        }}
                    >
                        Drop the files here...
                    </Typography>
                ) : (
                    <>
                        <Typography
                            variant="h6"
                            className="mb-2"
                            sx={{
                                fontWeight: 600,
                                color: '#1a1a1a',
                            }}
                        >
                            Drag & drop files here
                        </Typography>
                        <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ mb: 1 }}
                        >
                            or click to browse
                        </Typography>
                        <Box
                            sx={{
                                display: 'inline-block',
                                px: 3,
                                py: 1,
                                borderRadius: 3,
                                background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)',
                                mt: 2,
                            }}
                        >
                            <Typography
                                variant="caption"
                                sx={{
                                    color: '#667eea',
                                    fontWeight: 600,
                                }}
                            >
                                {multiple ? 'Multiple files supported' : 'Single file only'} • Max {Math.round(maxSize / 1024 / 1024)}MB
                            </Typography>
                        </Box>
                    </>
                )}

                {fileRejections.length > 0 && (
                    <Typography
                        variant="body2"
                        className="mt-3"
                        sx={{
                            color: '#f5576c',
                            fontWeight: 500,
                        }}
                    >
                        ⚠️ Some files were rejected. Check file type and size.
                    </Typography>
                )}
            </Box>
        </Paper>
    );
};

export default FileUpload;
