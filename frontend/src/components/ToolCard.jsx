import { Card, CardContent, CardActionArea, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ToolCard = ({ title, description, icon, path }) => {
    const navigate = useNavigate();

    return (
        <Card
            className="glass-card neon-border scale-in"
            sx={{
                height: '100%',
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%)',
                backdropFilter: 'blur(20px) saturate(180%)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '24px',
                position: 'relative',
                overflow: 'hidden',
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: '-100%',
                    width: '100%',
                    height: '100%',
                    background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent)',
                    transition: 'left 0.5s',
                },
                '&:hover::before': {
                    left: '100%',
                },
                '&:hover': {
                    transform: 'translateY(-12px) scale(1.03)',
                    borderColor: '#00f0ff',
                    boxShadow: '0 20px 60px rgba(0, 240, 255, 0.3), 0 0 40px rgba(0, 240, 255, 0.2)',
                },
            }}
        >
            <CardActionArea
                onClick={() => navigate(path)}
                sx={{
                    height: '100%',
                    p: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    justifyContent: 'flex-start',
                }}
            >
                <CardContent sx={{ p: 0, width: '100%' }}>
                    {/* Icon Container */}
                    <Box
                        className="tool-icon"
                        sx={{
                            width: 80,
                            height: 80,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '2.5rem',
                            background: 'linear-gradient(135deg, rgba(0, 240, 255, 0.1), rgba(184, 41, 255, 0.1))',
                            borderRadius: '20px',
                            border: '1px solid rgba(0, 240, 255, 0.2)',
                            mb: 3,
                            position: 'relative',
                            transition: 'all 0.4s ease',
                            '&::before': {
                                content: '""',
                                position: 'absolute',
                                inset: '-4px',
                                background: 'linear-gradient(45deg, #00f0ff, #b829ff)',
                                borderRadius: '22px',
                                opacity: 0,
                                zIndex: -1,
                                filter: 'blur(10px)',
                                transition: 'opacity 0.3s',
                            },
                            '&:hover::before': {
                                opacity: 0.6,
                            },
                        }}
                    >
                        {icon}
                    </Box>

                    {/* Title */}
                    <Typography
                        variant="h6"
                        sx={{
                            fontFamily: '"Orbitron", sans-serif',
                            fontWeight: 700,
                            fontSize: '1.1rem',
                            letterSpacing: '1px',
                            color: '#fff',
                            mb: 1.5,
                            textTransform: 'uppercase',
                        }}
                    >
                        {title}
                    </Typography>

                    {/* Description */}
                    <Typography
                        variant="body2"
                        sx={{
                            color: 'rgba(255, 255, 255, 0.7)',
                            lineHeight: 1.6,
                            fontSize: '0.9rem',
                        }}
                    >
                        {description}
                    </Typography>

                    {/* Decorative Line */}
                    <Box
                        sx={{
                            mt: 3,
                            height: '2px',
                            width: '60px',
                            background: 'linear-gradient(90deg, #00f0ff, transparent)',
                            borderRadius: '2px',
                        }}
                    />
                </CardContent>
            </CardActionArea>
        </Card>
    );
};

export default ToolCard;
