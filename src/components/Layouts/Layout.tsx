import { Box } from '@mui/material';
import React from 'react';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { Outlet } from 'react-router-dom';
const Layout: React.FC = () => {
    return (
        <Box>
            <Header />
            <Sidebar />
            <Outlet />
        </Box>
    );
};

export { Layout };
