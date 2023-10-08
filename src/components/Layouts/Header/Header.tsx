import { Box, Button, IconButton, Toolbar, Typography, styled } from '@mui/material';
import { white } from '../../../lib/color';
import MenuIcon from '@mui/icons-material/Menu';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { blue } from '@mui/material/colors';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import LogoutIcon from '@mui/icons-material/Logout';
import { useAtom, useSetAtom } from 'jotai';
import { userAtom } from '../../../lib/atom/authAtom';
type PropsType = {
    handleDrawerOpen: () => void;
    open: boolean;
};
const Header: React.FC<PropsType> = ({ handleDrawerOpen, open }) => {
    const [user, setUser] = useAtom(userAtom);
    console.log('user', user);
    const navigate = useNavigate();

    const logOut = () => {
        setUser(null);
        localStorage.removeItem('idUser');
        localStorage.removeItem('token');
        navigate('/login');
    };
    return (
        <AppBar position="fixed" open={open}>
            <Toolbar sx={{ padding: '0 20px', justifyContent: open ? 'flex-end' : 'space-between' }}>
                {!open && (
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Box>
                            <IconButton
                                color="inherit"
                                aria-label="open drawer"
                                onClick={handleDrawerOpen}
                                edge="start"
                                sx={{
                                    marginRight: 1,
                                }}
                            >
                                <MenuIcon />
                            </IconButton>
                        </Box>
                        <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                            <Typography
                                sx={{
                                    mr: 2,
                                    display: { xs: 'none', md: 'flex' },
                                    fontFamily: 'monospace',
                                    fontWeight: 700,
                                    letterSpacing: '.3rem',
                                    color: 'inherit',
                                    textDecoration: 'none',
                                }}
                                variant="h6"
                                noWrap
                                component="div"
                            >
                                FASTFOOD
                            </Typography>
                        </Link>
                    </Box>
                )}
                <Box sx={{ display: 'flex', gap: 3, alignItems: 'center' }}>
                    {user ? (
                        <>
                            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                                <PhoneIcon />
                                <Typography>Name : {user.name}</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                                <EmailIcon />
                                <Typography>{user.email}</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                                <LogoutIcon />
                                <Button onClick={logOut} variant="text" sx={{ color: '#fff' }}>
                                    Đăng xuất
                                </Button>
                            </Box>
                        </>
                    ) : (
                        <></>
                    )}
                </Box>
            </Toolbar>
        </AppBar>
    );
};
const drawerWidth = 240;
interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}
const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,

    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
    backgroundColor: blue[100],
    boxShadow: '0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)',
    color: white[50],
}));

export { Header };
