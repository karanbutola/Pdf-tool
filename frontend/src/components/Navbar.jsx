import { AppBar, Toolbar, Typography, Button, IconButton, Menu, MenuItem, Box, Avatar } from '@mui/material';
import { AccountCircle, Logout, Person } from '@mui/icons-material';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const { user, isAuthenticated, logout } = useAuth();
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState(null);

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        logout();
        handleClose();
        navigate('/login');
    };

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

                {isAuthenticated ? (
                    <Box className="flex items-center gap-2">
                        <Button
                            color="inherit"
                            component={Link}
                            to="/"
                            className="hidden md:inline-flex"
                            sx={{
                                color: 'white',
                                '&:hover': {
                                    background: 'rgba(255, 255, 255, 0.1)',
                                },
                            }}
                        >
                            Tools
                        </Button>
                        <Button
                            color="inherit"
                            component={Link}
                            to="/history"
                            className="hidden md:inline-flex"
                            sx={{
                                color: 'white',
                                '&:hover': {
                                    background: 'rgba(255, 255, 255, 0.1)',
                                },
                            }}
                        >
                            History
                        </Button>

                        <IconButton
                            size="large"
                            onClick={handleMenu}
                            sx={{
                                background: 'rgba(255, 255, 255, 0.15)',
                                '&:hover': {
                                    background: 'rgba(255, 255, 255, 0.25)',
                                },
                            }}
                        >
                            <Avatar
                                sx={{
                                    width: 32,
                                    height: 32,
                                    background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                                    fontSize: '1rem',
                                    fontWeight: 600,
                                }}
                            >
                                {user?.name?.charAt(0).toUpperCase()}
                            </Avatar>
                        </IconButton>
                        <Menu
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                            PaperProps={{
                                sx: {
                                    mt: 1.5,
                                    borderRadius: 3,
                                    minWidth: 200,
                                    boxShadow: '0 8px 32px rgba(31, 38, 135, 0.2)',
                                },
                            }}
                        >
                            <MenuItem disabled sx={{ opacity: 1 }}>
                                <Box>
                                    <Typography variant="body2" className="font-bold">
                                        {user?.name}
                                    </Typography>
                                    <Typography variant="caption" color="text.secondary">
                                        {user?.email}
                                    </Typography>
                                </Box>
                            </MenuItem>
                            <MenuItem onClick={() => { navigate('/profile'); handleClose(); }}>
                                <Person fontSize="small" className="mr-2" />
                                Profile
                            </MenuItem>
                            <MenuItem onClick={handleLogout}>
                                <Logout fontSize="small" className="mr-2" />
                                Logout
                            </MenuItem>
                        </Menu>
                    </Box>
                ) : (
                    <Box className="flex gap-2">
                        <Button
                            color="inherit"
                            component={Link}
                            to="/login"
                            sx={{
                                color: 'white',
                                '&:hover': {
                                    background: 'rgba(255, 255, 255, 0.1)',
                                },
                            }}
                        >
                            Login
                        </Button>
                        <Button
                            variant="contained"
                            component={Link}
                            to="/register"
                            sx={{
                                background: 'white',
                                color: '#667eea',
                                '&:hover': {
                                    background: 'rgba(255, 255, 255, 0.9)',
                                    transform: 'translateY(-2px)',
                                },
                            }}
                        >
                            Register
                        </Button>
                    </Box>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
