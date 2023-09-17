import { Suspense } from 'react';
import { Box, ThemeProvider } from '@mui/material';
import { defaultTheme } from './styles/theme';
import { ToastContainer } from 'react-toastify';
import { Router } from './router/Router';
import CssBaseline from '@mui/material/CssBaseline';

function App() {
    return (
        <ThemeProvider theme={defaultTheme}>
            <Suspense fallback="Loading....">
                <ToastContainer />
                <Router />
            </Suspense>
        </ThemeProvider>
    );
}

export default App;
