import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <AppBar
            position="sticky"
            elevation={0}
            sx={{
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(20px)',
                borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
                boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
            }}
        >
            <Toolbar className="container mx-auto">
                <Box className="flex items-center gap-3 flex-grow">
                    <Box
                        className="w-10 h-10 rounded-xl flex items-center justify-center text-2xl"
                        sx={{
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            boxShadow: '0 4px 12px rgba(102, 126, 234, 0.4)',
                        }}
                    >
                        📄
                    </Box>
                    <Typography
                        variant="h6"
                        component={Link}
                        to="/"
                        className="font-bold cursor-pointer no-underline"
                        sx={{
                            textDecoration: 'none',
                            color: 'white',
                            fontWeight: 800,
                            letterSpacing: '-0.01em',
                        }}
                    >
                        PDF Tool
                    </Typography>
                </Box>

                <Box className="flex items-center gap-2">
                    <Button
                        color="inherit"
                        component={Link}
                        to="/"
                        sx={{
                            color: 'white',
                            '&:hover': {
                                background: 'rgba(255, 255, 255, 0.1)',
                            },
                        }}
                    >
                        Tools
                    </Button>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
