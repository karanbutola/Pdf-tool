import { Card, CardContent, CardActionArea, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ToolCard = ({ title, description, icon, path }) => {
    const navigate = useNavigate();

    return (
        <Card
            className="glass-card neon-border scale-in"
            sx={{
                height: '100%',
                background: 'rgba(0, 0, 0, 0.4)',
                backdropFilter: 'blur(20px) saturate(180%)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '20px',
                position: 'relative',
                overflow: 'hidden',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                '&:hover': {
                    transform: 'translateY(-8px)',
                    borderColor: '#00d9ff',
                    boxShadow: '0 12px 48px rgba(0, 0, 0, 0.8), 0 0 0 1px #00d9ff, 0 0 40px rgba(0, 217, 255, 0.2)',
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
                            background: 'linear-gradient(135deg, rgba(0, 217, 255, 0.15), rgba(168, 85, 247, 0.15))',
                            border: '2px solid rgba(0, 217, 255, 0.3)',
                            borderRadius: '50%',
                            mb: 3,
                            position: 'relative',
                            transition: 'all 0.3s ease',
                            '&::before': {
                                content: '""',
                                position: 'absolute',
                                inset: '-8px',
                                background: 'linear-gradient(135deg, #00d9ff, #a855f7)',
                                borderRadius: '50%',
                                opacity: 0,
                                filter: 'blur(12px)',
                                zIndex: -1,
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
                            transition: 'all 0.3s ease',
                            '.glass-card:hover &': {
                                opacity: 1,
                                transform: 'translateX(0)',
                            },
                        }}
                    >
                        OPEN TOOL <span>→</span>
                    </Box>
                </CardContent>
            </CardActionArea>
        </Card>
    );
};

export default ToolCard;
