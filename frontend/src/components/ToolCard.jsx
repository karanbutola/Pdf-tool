import { Card, CardContent, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ToolCard = ({ title, description, icon, path }) => {
    const navigate = useNavigate();

    return (
        <Card
            className="glass-card neon-border scale-in"
            onClick={() => navigate(path)}
            sx={{
                height: '100%',
                background: 'rgba(0, 0, 0, 0.4)',
                backdropFilter: 'blur(10px)', // Reduced blur for performance
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '20px',
                position: 'relative',
                overflow: 'hidden',
                cursor: 'pointer',
                transition: 'all 0.2s ease-out', // Faster transition
                '&:hover': {
                    transform: 'translateY(-4px)', // Reduced movement
                    borderColor: '#00d9ff',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5), 0 0 0 1px #00d9ff', // Simplified shadow
                },
            }}
        >
            <CardContent sx={{ p: 4, height: '100%', display: 'flex', flexDirection: 'column' }}>
                {/* Glowing Icon Badge */}
                <Box
                    className="icon-badge"
                    sx={{
                        width: 72,
                        height: 72,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '2rem',
                        background: 'rgba(0, 217, 255, 0.1)', // Simplified background
                        border: '2px solid rgba(0, 217, 255, 0.3)',
                        borderRadius: '50%',
                        mb: 3,
                        position: 'relative',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                            borderColor: '#00d9ff',
                            boxShadow: '0 0 20px rgba(0, 217, 255, 0.4)',
                        },
                    }}
                >
                    {icon}
                </Box>

                {/* Title */}
                <Typography
                    variant="h6"
                    sx={{
                        fontFamily: '"Space Grotesk", sans-serif',
                        fontWeight: 700,
                        fontSize: '1.25rem',
                        letterSpacing: '0.5px',
                        color: '#ffffff',
                        mb: 1.5,
                    }}
                >
                    {title}
                </Typography>

                {/* Description */}
                <Typography
                    variant="body2"
                    sx={{
                        color: '#d7d7d7',
                        lineHeight: 1.6,
                        fontSize: '0.95rem',
                        fontWeight: 400,
                        flexGrow: 1,
                    }}
                >
                    {description}
                </Typography>

                {/* Arrow Indicator */}
                <Box
                    sx={{
                        mt: 3,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                        color: '#00d9ff',
                        fontSize: '0.9rem',
                        fontWeight: 600,
                        opacity: 0,
                        transform: 'translateX(-10px)',
                        transition: 'all 0.2s ease',
                        '.glass-card:hover &': {
                            opacity: 1,
                            transform: 'translateX(0)',
                        },
                    }}
                >
                    OPEN TOOL <span>→</span>
                </Box>
            </CardContent>
        </Card>
    );
};

export default ToolCard;
