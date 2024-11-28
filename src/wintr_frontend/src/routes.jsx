import { createBrowserRouter } from 'react-router-dom';

import { MainLayout } from './components/layout/MainLayout';
import { MainLayoutUser } from './components/layout_user/MainLayout';

import LandingPage from './pages/LandingPage';
import { UserPage } from './pages/users/UserPage';
import { UserEditPage } from './pages/users/UserEditPage';
import { UserCreate } from './pages/users/UserCreate';
import { NotFound404 } from './pages/status/NotFound404';


const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                index: true,
                element: <LandingPage />
            },
        ]
    },
    {
        path: "/admin",
        element: <MainLayoutUser />,
        children: [
            {
                index: true,
                element: <UserEditPage />
            },
        ]
    },
    // create_user 
    {
        path: "/create_user",
        element: <UserCreate />
    },
    // user 
    {
        path: "/:username",
        element: <UserPage />
    },

    // status page
    {
        path: "/404",
        element: <NotFound404 />
    },
]);

export default router;
