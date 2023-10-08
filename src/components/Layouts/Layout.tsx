import { Box, styled } from '@mui/material';
import React from 'react';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { Outlet } from 'react-router-dom';
const Layout: React.FC = () => {
    const [open, setOpen] = React.useState(true);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };
    return (
        <Box>
            <Box sx={{ display: 'flex' }}>
                <Header handleDrawerOpen={handleDrawerOpen} open={open} />
                <Sidebar handleDrawerClose={handleDrawerClose} open={open} />
            </Box>
            <Main open={open}>
                <Outlet />
            </Main>
        </Box>
    );
};

const drawerWidth = 240;
const drawerWidthMb = 65;
const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'isSidebarOpen' })<{
    open?: boolean;
}>(({ theme, open = true }) => ({
    ...(open
        ? {
              marginTop: '64px',
              marginLeft: drawerWidth,
              width: `calc(100% - ${drawerWidth}px)`,
              transition: theme.transitions.create(['width', 'margin'], {
                  easing: theme.transitions.easing.sharp,
                  duration: theme.transitions.duration.enteringScreen,
              }),
          }
        : {
              marginTop: '64px',
              marginLeft: drawerWidthMb,
              width: `calc(100% - ${drawerWidthMb}px)`,
              transition: theme.transitions.create(['width', 'margin'], {
                  easing: theme.transitions.easing.sharp,
                  duration: theme.transitions.duration.enteringScreen,
              }),
          }),
}));
export { Layout };
