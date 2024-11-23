import React from 'react'
import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';


export const MainLayout = () => {
    return (
        <main className='font-light text-light_text bg-light_background dark:text-dark_text dark:bg-dark_background'>
            <Navbar />
            <Outlet />
        </main>
    )
}
