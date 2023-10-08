import * as React from 'react';
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Avatar } from '@mui/material';
import { Link } from 'react-router-dom';
import { useLocation, useNavigate } from 'react-router-dom';
import { ListItemSidebar } from './ListItemSidebar';
import { gray, white } from '../../../lib/color';
const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
        ...openedMixin(theme),
        '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
        ...closedMixin(theme),
        '& .MuiDrawer-paper': closedMixin(theme),
    }),
}));

type PropsType = {
    handleDrawerClose: () => void;
    open: boolean;
};

type SidebarLinks = {
    name: string;
    path: string;
    text: string;
    icon: React.ReactNode;
};

const Sidebar: React.FC<PropsType> = ({ handleDrawerClose, open }) => {
    const theme = useTheme();
    const navigate = useNavigate();
    const location = useLocation();
    const handleClick = (item: SidebarLinks) => {
        navigate(item.path);
    };

    return (
        <Drawer
            variant="permanent"
            open={open}
            PaperProps={{
                sx: {
                    backgroundColor: gray[100],
                    color: 'white',
                },
            }}
        >
            <DrawerHeader sx={{ paddingLeft: '20px', justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, justifyContent: 'space-between' }}>
                    <Avatar alt="Remy Sharp" src="https://vapa.vn/wp-content/uploads/2022/12/anh-3d-thien-nhien.jpeg" />
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
                            FOOD
                        </Typography>
                    </Link>
                </Box>
                <IconButton sx={{ color: white[50] }} onClick={handleDrawerClose}>
                    {open && <ChevronLeftIcon />}
                </IconButton>
            </DrawerHeader>
            <Divider />
            <List>
                {ListItemSidebar.map((item, index) => (
                    <ListItem
                        key={index}
                        sx={location.pathname === item.path ? { backgroundColor: gray[50] } : null}
                        onClick={() => handleClick(item)}
                        disablePadding
                    >
                        <ListItemButton
                            sx={{
                                minHeight: 48,
                                justifyContent: open ? 'initial' : 'center',
                                px: 2.5,
                            }}
                        >
                            <ListItemIcon
                                sx={{
                                    minWidth: 0,
                                    color: white[50],
                                    mr: open ? 2 : 'auto',
                                    justifyContent: 'center',
                                }}
                            >
                                {item.icon}
                            </ListItemIcon>
                            <ListItemText primary={item.text} sx={{ opacity: open ? 1 : 0 }} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Drawer>
    );
};

export { Sidebar };
