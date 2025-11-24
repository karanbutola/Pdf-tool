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
                position: 'relative',
                background: isDragActive
                    ? 'linear-gradient(135deg, rgba(0, 240, 255, 0.1) 0%, rgba(184, 41, 255, 0.1) 100%)'
                    : 'linear-gradient(135deg, rgba(0, 240, 255, 0.05) 0%, rgba(184, 41, 255, 0.05) 100%)',
                border: `2px dashed ${isDragActive ? '#00f0ff' : 'rgba(0, 240, 255, 0.3)'}`,
                borderRadius: '20px',
                padding: '60px 40px',
                cursor: 'pointer',
                transition: 'all 0.4s ease',
                backdropFilter: 'blur(10px)',
                '&::before': {
                    content: '""',
                    position: 'absolute',
                    inset: '-2px',
                    background: 'linear-gradient(45deg, #00f0ff, #b829ff)',
                    borderRadius: '20px',
                    opacity: isDragActive ? 0.3 : 0,
                    zIndex: -1,
                    transition: 'opacity 0.3s',
                },
                '&:hover': {
                    borderColor: '#00f0ff',
                    background: 'linear-gradient(135deg, rgba(0, 240, 255, 0.1) 0%, rgba(184, 41, 255, 0.1) 100%)',
                    boxShadow: '0 0 40px rgba(0, 240, 255, 0.2)',
                },
            }}
        >
            <input {...getInputProps()} />
            <Box className="text-center">
                {/* Upload Icon */}
                <Box
                    className={isDragActive ? 'float' : ''}
                    sx={{
                        width: 100,
                        height: 100,
                        borderRadius: '20px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 2rem',
                        background: 'linear-gradient(135deg, rgba(0, 240, 255, 0.2), rgba(184, 41, 255, 0.2))',
                        border: '2px solid rgba(0, 240, 255, 0.3)',
                        position: 'relative',
                        transition: 'all 0.3s ease',
                        '&::before': {
                            content: '""',
                            position: 'absolute',
                            inset: '-6px',
                            background: 'linear-gradient(45deg, #00f0ff, #b829ff)',
                            borderRadius: '22px',
                            opacity: isDragActive ? 0.5 : 0,
                            zIndex: -1,
                            filter: 'blur(15px)',
                            transition: 'opacity 0.3s',
                        },
                    }}
                >
                    <CloudUpload sx={{ fontSize: 50, color: '#00f0ff' }} />
                </Box>

                {/* Text Content */}
                {isDragActive ? (
                    <Typography
                        variant="h5"
                        sx={{
                            color: '#00f0ff',
                            fontFamily: '"Orbitron", sans-serif',
                            fontWeight: 700,
                            letterSpacing: '2px',
                            textShadow: '0 0 20px rgba(0, 240, 255, 0.5)',
                        }}
                    >
                        DROP FILES HERE
                    </Typography>
                ) : (
                    <>
                        <Typography
                            variant="h6"
                            className="mb-3"
                            sx={{
                                fontFamily: '"Orbitron", sans-serif',
                                fontWeight: 600,
                                color: '#fff',
                                letterSpacing: '1px',
                                mb: 2,
                            }}
                        >
                            DRAG & DROP FILES
                        </Typography>
                        <Typography
                            variant="body2"
                            sx={{
                                color: 'rgba(255, 255, 255, 0.6)',
                                mb: 3,
                                fontSize: '0.95rem',
                            }}
                        >
                            or click to browse
                        </Typography>

                        {/* Info Badge */}
                        <Box
                            sx={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: 2,
                                px: 4,
                                py: 1.5,
                                borderRadius: '50px',
                                background: 'linear-gradient(135deg, rgba(0, 240, 255, 0.1), rgba(184, 41, 255, 0.1))',
                                border: '1px solid rgba(0, 240, 255, 0.2)',
                                mt: 2,
                            }}
                        >
                            <Typography
                                variant="caption"
                                sx={{
                                    color: '#00f0ff',
                                    fontFamily: '"Orbitron", sans-serif',
                                    fontWeight: 600,
                                    fontSize: '0.75rem',
                                    letterSpacing: '1px',
                                }}
                            >
                                {multiple ? 'MULTIPLE FILES' : 'SINGLE FILE'} • MAX {Math.round(maxSize / 1024 / 1024)}MB
                            </Typography>
                        </Box>
                    </>
                )}

                {/* Error Message */}
                {fileRejections.length > 0 && (
                    <Typography
                        variant="body2"
                        className="mt-4"
                        sx={{
                            color: '#ff006e',
                            fontWeight: 600,
                            fontSize: '0.9rem',
                            mt: 3,
                        }}
                    >
                        ⚠️ FILE REJECTED - CHECK TYPE & SIZE
                    </Typography>
                )}
            </Box>
        </Paper>
    );
};

export default FileUpload;
