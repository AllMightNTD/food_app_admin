import { Route, Routes } from 'react-router-dom';
import { ForgotPassword, Login, Register } from '../components/auth';
import { Layout } from '../components/Layouts/Layout';
import { ManageOrder } from '../screen/Order/ManageOrder';

const authRoutes = [
    {
        path: '/login',
        element: <Login />,
    },
    {
        path: '/register',
        element: <Register />,
    },
    {
        path: '/forgot-password',
        element: <ForgotPassword />,
    },
];

const routes = [
    {
        path: '/order-manage',
        element: <ManageOrder />,
    },
];

const Router: React.FC = () => {
    return (
        <Routes>
            {authRoutes.map((route, index) => {
                return <Route path={route.path} key={index} element={route.element}></Route>;
            })}
            <Route path="/" element={<Layout />}></Route>
            {routes.map((route, index) => {
                return <Route path={route.path} key={index} element={route.element}></Route>;
            })}
        </Routes>
    );
};

export { Router };
