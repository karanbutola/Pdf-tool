import { useState, useEffect } from 'react';
import {
    Container,
    Paper,
    Typography,
    Box,
    Grid,
    Card,
    CardContent,
} from '@mui/material';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import toast from 'react-hot-toast';

const Profile = () => {
    const { user } = useAuth();
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        try {
            const response = await api.get('/user/stats');
            setStats(response.data.data);
        } catch (error) {
            console.error('Fetch stats error:', error);
            toast.error('Failed to load statistics');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container maxWidth="lg" className="py-8">
            <Paper className="p-6 rounded-xl mb-6">
                <Typography variant="h4" className="font-bold mb-4">
                    👤 Profile
                </Typography>

                <Box className="mb-6">
                    <Typography variant="body1" className="mb-2">
                        <strong>Name:</strong> {user?.name}
                    </Typography>
                    <Typography variant="body1" className="mb-2">
                        <strong>Email:</strong> {user?.email}
                    </Typography>
                    <Typography variant="body1">
                        <strong>Role:</strong> {user?.role}
                    </Typography>
                </Box>
            </Paper>

            <Paper className="p-6 rounded-xl">
                <Typography variant="h5" className="font-bold mb-4">
                    📈 Statistics
                </Typography>

                {loading ? (
                    <Typography>Loading statistics...</Typography>
                ) : stats ? (
                    <>
                        <Grid container spacing={3} className="mb-6">
                            <Grid item xs={12} md={4}>
                                <Card className="bg-blue-50">
                                    <CardContent>
                                        <Typography variant="h3" className="font-bold text-blue-600">
                                            {stats.totalOperations}
                                        </Typography>
                                        <Typography variant="body1" color="text.secondary">
                                            Total Operations
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        </Grid>

                        {stats.operationStats && stats.operationStats.length > 0 && (
                            <Box>
                                <Typography variant="h6" className="font-bold mb-3">
                                    Operations Breakdown
                                </Typography>
                                <Grid container spacing={2}>
                                    {stats.operationStats.map((stat) => (
                                        <Grid item xs={12} sm={6} md={4} key={stat._id}>
                                            <Card>
                                                <CardContent>
                                                    <Typography variant="h5" className="font-bold">
                                                        {stat.count}
                                                    </Typography>
                                                    <Typography variant="body2" color="text.secondary">
                                                        {stat._id}
                                                    </Typography>
                                                </CardContent>
                                            </Card>
                                        </Grid>
                                    ))}
                                </Grid>
                            </Box>
                        )}
                    </>
                ) : (
                    <Typography color="text.secondary">No statistics available</Typography>
                )}
            </Paper>
        </Container>
    );
};

export default Profile;
