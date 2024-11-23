import { createBrowserRouter } from 'react-router-dom';

import { MainLayout } from './components/layout/MainLayout';

import LandingPage from './pages/LandingPage';
import { UserPage } from './pages/users/UserPage';
import { UserEditPage } from './pages/users/UserEditPage';
import { NotFound404 } from './pages/NotFound404';
import { UserCreate } from './pages/users/UserCreate';


const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                index: true,
                element: <LandingPage />
            },
            {
                path: "admin",
                element: <UserEditPage />
            },
            {
                path: "create_user",
                element: <UserCreate />
            },
        ]
    },
    // user 
    {
        path: "/:username",
        element: <UserPage />
    },

    // notfound page
    {
        path: "/404",
        element: <NotFound404 />
    },
]);

export default router;
