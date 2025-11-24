import { Card, CardContent, CardActionArea, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const gradients = {
    primary: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    secondary: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    success: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    warning: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    info: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)',
    error: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a6f 100%)',
};

const ToolCard = ({ title, description, icon, path, color = 'primary' }) => {
    const navigate = useNavigate();

    return (
        <Card
            className="h-full hover-lift scale-in"
            sx={{
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(20px)',
                borderRadius: 5,
                border: '1px solid rgba(255, 255, 255, 0.3)',
                boxShadow: '0 8px 32px rgba(31, 38, 135, 0.15)',
                position: 'relative',
                overflow: 'hidden',
                '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '4px',
                    background: gradients[color] || gradients.primary,
                },
                '&:hover': {
                    transform: 'translateY(-8px) scale(1.02)',
                    boxShadow: '0 20px 60px rgba(31, 38, 135, 0.3)',
                },
            }}
        >
            <CardActionArea onClick={() => navigate(path)} className="h-full p-6">
                <CardContent className="p-0">
                    <Box
                        className="flex items-center justify-center mb-4"
                        sx={{
                            width: 64,
                            height: 64,
                            borderRadius: 4,
                            background: gradients[color] || gradients.primary,
                            fontSize: '2rem',
                            boxShadow: '0 8px 24px rgba(102, 126, 234, 0.3)',
                        }}
                    >
                        {icon}
                    </Box>
                    <Typography
                        variant="h6"
                        component="h3"
                        className="font-bold mb-2"
                        sx={{
                            fontWeight: 700,
                            color: '#1a1a1a',
                        }}
                    >
                        {title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                        {description}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
};

export default ToolCard;
