import { Suspense, useEffect } from 'react';
import { Box, ThemeProvider } from '@mui/material';
import { defaultTheme } from './styles/theme';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Router } from './router/Router';
import { QueryClientProvider } from 'react-query';
import { queryClient } from './lib/react-query';
import { idUser, userAtom } from './lib/atom/authAtom';
import { useAtom, useSetAtom } from 'jotai';
import { request } from './lib/request';

function App() {
    const setUser = useSetAtom(userAtom);
    const setIdUser = useSetAtom(idUser);
    const [id] = useAtom(idUser);
    const fetchUser = async () => {
        if (id) {
            const res = await request.get(`/user/${id}`);
            setUser(res.data.data);
            setIdUser(res.data.data.id);
        }
    };
    useEffect(() => {
        fetchUser();
    }, [id]);
    return (
        <ThemeProvider theme={defaultTheme}>
            <QueryClientProvider client={queryClient}>
                <Suspense fallback="Loading....">
                    <ToastContainer />
                    <Router />
                </Suspense>
            </QueryClientProvider>
        </ThemeProvider>
    );
}

export default App;
