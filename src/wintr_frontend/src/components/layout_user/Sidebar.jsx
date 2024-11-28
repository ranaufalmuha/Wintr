import React from 'react';
import { useAuth } from './../AuthContext';
import { WalletIcon, SunIcon, MoonIcon } from '../icons/Icons';
import { useTranslation } from 'react-i18next';

export const Sidebar = ({ toggleTheme, darkMode }) => {
    const { principal, login, logout, loading } = useAuth();
    const { t } = useTranslation();

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
        <nav className='flex fixed h-full max-md:w-full max-md:h-auto md:flex-col justify-between p-3 items-center z-20 dark:bg-light_background bg-dark_background shadow-lg shadow-accent border-r border-accent'>
            <a href="/" className='h-10 w-10 p-2 object-contain'>
                {darkMode ? (
                    <img src="./assets/logo_dark.svg" className='w-full h-full' alt='logo' />
                ) : (
                    <img src="./assets/logo_light.svg" className='w-full h-full' alt='logo' />
                )}
            </a>

            {loading ? (
                <div className="animate-pulse bg-gray-700 h-8 w-28 rounded-xl"></div>
            ) : principal ? (
                <div className="flex md:flex-col items-center gap-4">
                    <label className="myswap cursor-pointer relative h-10 w-10">
                        <input type="checkbox" className="theme-controller" checked={darkMode} onChange={toggleTheme} />
                        <SunIcon className='myicon sun h-full w-full p-2 rounded-full bg-dark_button fill-dark_text' />
                        <MoonIcon className='myicon moon h-full w-full p-2 rounded-full  bg-light_button fill-light_text' />
                    </label>
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
                <div className="flex md:flex-col items-center gap-4">
                    <label className="myswap cursor-pointer relative h-10 w-10">
                        <input type="checkbox" className="theme-controller" checked={darkMode} onChange={toggleTheme} />
                        <SunIcon className='myicon sun h-full w-full p-2 rounded-full bg-dark_button fill-dark_text' />
                        <MoonIcon className='myicon moon h-full w-full p-2 rounded-full  bg-light_button fill-light_text' />
                    </label>
                    <button
                        className='text-light_text dark:text-dark_text bg-light_button dark:bg-dark_button h-10 w-10 rounded-full shadow-lg flex gap-1 items-center'
                        onClick={handleLogin}
                    >
                        <WalletIcon className='h-full w-full p-3' />
                    </button>
                </div>
            )}
        </nav>
    );
};