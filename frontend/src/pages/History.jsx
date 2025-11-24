import { useState, useEffect } from 'react';
import {
    Container,
    Paper,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Chip,
    Box,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Pagination,
} from '@mui/material';
import { format } from 'date-fns';
import api from '../services/api';
import toast from 'react-hot-toast';

const History = () => {
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [filter, setFilter] = useState('all');

    useEffect(() => {
        fetchHistory();
    }, [page, filter]);

    const fetchHistory = async () => {
        try {
            const params = { page, limit: 10 };
            if (filter !== 'all') {
                params.operation = filter;
            }

            const response = await api.get('/user/history', { params });
            setHistory(response.data.data);
            setTotalPages(response.data.totalPages);
        } catch (error) {
            console.error('Fetch history error:', error);
            toast.error('Failed to load history');
        } finally {
            setLoading(false);
        }
    };

    const getOperationColor = (operation) => {
        const colors = {
            compress: 'primary',
            merge: 'secondary',
            split: 'warning',
            'image-to-pdf': 'success',
            'pdf-to-image': 'info',
            rotate: 'default',
            extract: 'error',
        };
        return colors[operation] || 'default';
    };

    const formatFileSize = (bytes) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
    };

    return (
        <Container maxWidth="lg" className="py-8">
            <Paper className="p-6 rounded-xl">
                <Box className="flex justify-between items-center mb-6">
                    <Typography variant="h4" className="font-bold">
                        📊 Operation History
                    </Typography>

                    <FormControl sx={{ minWidth: 200 }}>
                        <InputLabel>Filter by Operation</InputLabel>
                        <Select
                            value={filter}
                            label="Filter by Operation"
                            onChange={(e) => {
                                setFilter(e.target.value);
                                setPage(1);
                            }}
                        >
                            <MenuItem value="all">All Operations</MenuItem>
                            <MenuItem value="compress">Compress</MenuItem>
                            <MenuItem value="merge">Merge</MenuItem>
                            <MenuItem value="split">Split</MenuItem>
                            <MenuItem value="image-to-pdf">Image to PDF</MenuItem>
                            <MenuItem value="pdf-to-image">PDF to Image</MenuItem>
                            <MenuItem value="rotate">Rotate</MenuItem>
                            <MenuItem value="extract">Extract</MenuItem>
                        </Select>
                    </FormControl>
                </Box>

                {loading ? (
                    <Typography className="text-center py-8">Loading...</Typography>
                ) : history.length === 0 ? (
                    <Typography className="text-center py-8" color="text.secondary">
                        No history found
                    </Typography>
                ) : (
                    <>
                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Operation</TableCell>
                                        <TableCell>File Name</TableCell>
                                        <TableCell>Input Size</TableCell>
                                        <TableCell>Output Size</TableCell>
                                        <TableCell>Status</TableCell>
                                        <TableCell>Date</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {history.map((item) => (
                                        <TableRow key={item._id}>
                                            <TableCell>
                                                <Chip
                                                    label={item.operation}
                                                    color={getOperationColor(item.operation)}
                                                    size="small"
                                                />
                                            </TableCell>
                                            <TableCell>{item.fileName}</TableCell>
                                            <TableCell>{formatFileSize(item.fileSize)}</TableCell>
                                            <TableCell>
                                                {item.outputFileSize ? formatFileSize(item.outputFileSize) : '-'}
                                            </TableCell>
                                            <TableCell>
                                                <Chip
                                                    label={item.status}
                                                    color={item.status === 'success' ? 'success' : 'error'}
                                                    size="small"
                                                />
                                            </TableCell>
                                            <TableCell>
                                                {format(new Date(item.createdAt), 'MMM dd, yyyy HH:mm')}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>

                        <Box className="flex justify-center mt-4">
                            <Pagination
                                count={totalPages}
                                page={page}
                                onChange={(e, value) => setPage(value)}
                                color="primary"
                            />
                        </Box>
                    </>
                )}
            </Paper>
        </Container>
    );
};

export default History;
