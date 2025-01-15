import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { useAuth } from './../../components/AuthContext';
import { useNavigate } from 'react-router-dom';
import { LoadingPage } from '../../pages/status/LoadingPage';


export const MainLayoutUser = () => {
    const [darkMode, setDarkMode] = useState(false);
    const navigate = useNavigate();
    const { authenticatedActor, loading: authLoading } = useAuth();

    useEffect(() => {
        async function checkUsername() {
            try {
                const response = await authenticatedActor.hasExistingUsername();
                const username = response.length ? response[0] : null;
                if (username == null) {
                    navigate('/create_user');
                }
            } catch (error) {
                console.error("Error checking username:", error);
            }
        }

        if (authenticatedActor) {
            checkUsername();
        }
    }, [authenticatedActor, navigate]);

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            setDarkMode(savedTheme === 'dark');
        }
    }, []);

    const toggleTheme = () => {
        setDarkMode((prevMode) => {
            const newMode = !prevMode;
            localStorage.setItem('theme', newMode ? 'dark' : 'light');
            return newMode;
        });
    };

    if (!authenticatedActor || authLoading) {
        return (<LoadingPage />);
    }

    return (
        <main className={`font-light ${darkMode ? 'dark' : ''} flex max-md:flex-col`}>
            <Sidebar toggleTheme={toggleTheme} darkMode={darkMode} />
            <Outlet />
        </main>
    )
}
