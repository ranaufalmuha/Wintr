import React from 'react';
import { useAuth } from './../AuthContext';

export const Navbar = () => {
    const { principal, login, logout, loading } = useAuth();

    const handleLogin = async () => {
        try {
            await login();
        } catch (error) {
            console.error("Login failed:", error);
        }
    };

    const handleLogout = async () => {
        try {
            await logout();
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    const formatPrincipal = (principal) => {
        if (!principal) return '';
        return `${principal.slice(0, 5)}...${principal.slice(-3)}`;
    };

    return (
        <nav className='w-full fixed flex justify-between py-3 px-10 items-center z-50 bg-light_background dark:bg-dark_background'>
            <div className="flex gap-5 items-center">
                <a href="/" className='h-8 object-contain'>
                    <img src="./assets/logo_black.svg" className='w-full h-full dark:invert' alt='logo' />
                </a>
            </div>

            {loading ? (
                <div className="animate-pulse bg-gray-700 h-8 w-28 rounded-xl"></div>
            ) : principal ? (
                <div className="flex items-center gap-5 py-2">
                    <p>{formatPrincipal(principal)}</p>
                    <button
                        onClick={handleLogout}
                        className='w-6 aspect-square overflow-hidden hover:opacity-80'
                    >
                        <img
                            src="./assets/svg/logout.svg"
                            alt="Logout"
                            className='h-full object-contain invert'
                        />
                    </button>
                </div>
            ) : (
                <button
                    className='text-light_text dark:text-dark_text bg-light_button dark:bg-dark_button py-5 px-8 rounded-full shadow-lg'
                    onClick={handleLogin}
                >
                    Authentication
                </button>
            )}
        </nav>
    );
};