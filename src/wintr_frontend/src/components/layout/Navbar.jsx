import React from 'react';
import { useAuth } from './../AuthContext';
import { WalletIcon, SunIcon, MoonIcon } from '../icons/Icons';
import { useTranslation } from 'react-i18next';

export const Navbar = ({ toggleTheme, darkMode }) => {
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
        <nav className='w-full fixed flex justify-between py-3 px-6 items-center z-50 bg-light_background dark:bg-dark_background'>
            <a href="/" className='h-8 aspect-square object-contain'>
                {darkMode ? (
                    <img src="./assets/logo_light.svg" className='w-full h-full' alt='logo' />
                ) : (
                    <img src="./assets/logo_dark.svg" className='w-full h-full' alt='logo' />
                )}
            </a>

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
                <div className="flex items-center gap-4">
                    <label className="myswap cursor-pointer relative h-14 w-14">
                        <input type="checkbox" className="theme-controller" checked={darkMode} onChange={toggleTheme} />
                        <SunIcon className='myicon sun h-full w-full p-4 rounded-full bg-dark_background  fill-dark_text' />
                        <MoonIcon className='myicon moon h-full w-full p-4 rounded-full bg-light_background fill-light_text' />
                    </label>
                    <button
                        className='text-light_text dark:text-dark_text bg-light_button dark:bg-dark_button py-5 px-8 rounded-full shadow-lg flex gap-1 items-center'
                        onClick={handleLogin}
                    >
                        <p>{t('navbar.connect')}</p>
                        <WalletIcon className='h-4' />
                    </button>
                </div>
            )}
        </nav>
    );
};