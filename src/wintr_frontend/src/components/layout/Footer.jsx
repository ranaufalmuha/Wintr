import { useEffect, useState } from 'react';
import { GlobeIcon } from '../../components/icons/Icons';
import { InstagramIcon, GithubIcon, LinkedinIcon, ThreadsIcon, XIcon } from '../../components/icons/SocialMedia';

export const Footer = () => {

    const ICON_STYLE = "h-8 object-contain ";
    const [social] = useState([
        {
            name: "website",
            icon: <GlobeIcon className={ICON_STYLE} />,
            url: "https://wintr.app/",
        },
        {
            name: "instagram",
            icon: <InstagramIcon className={ICON_STYLE} />,
            url: "https://www.instagram.com/wintr.app/",
        },
        {
            name: "x",
            icon: <XIcon className={ICON_STYLE} />,
            url: "https://x.com/wintr_app",
        },
        {
            name: "github",
            icon: <GithubIcon className={ICON_STYLE} />,
            url: "https://www.linkedin.com/in/ranaufalmuha/",
        }
    ]

    );

    return (
        <footer className="flex flex-col bg-light_text dark:bg-dark_text text-light_background dark:text-dark_background">
            <div className="bg-light_background dark:bg-dark_background w-full h-28 rounded-b-3xl mb-12"></div>
            <div className="flex px-6 pt-12 justify-center">
                <div className="flex flex-col items-center gap-6 w-[600px]">
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-accent rounded-full animate-pulse"></div>
                        <p className='uppercase'>We are live now</p>
                    </div>
                    <p className='text-5xl font-bold text-center'>Connect with us today!</p>
                    <p className='w-3/4 text-center'>Feel free to adjust any part to better fit your branding or desired tone!</p>
                    {/* social media  */}
                    <div className="flex items-center gap-6 pt-1 duration-300">
                        {social.map((item, index) => (
                            <a href={item.url} target="_blank" rel="noopener noreferrer" className='hover:scale-110 duration-300' key={index}>
                                {item.icon}
                            </a>
                        ))}
                    </div>
                </div>
            </div>
            <hr className='mx-6 my-20 border-dark_disabled' />
            <div className="flex items-center gap-3 justify-center h-20 relative overflow-hidden pt-14">
                <img src="./assets/logo_white.svg" className='w-32 aspect-square dark:invert' alt='logo' />
                <p className='text-[11rem] font-medium dark:text-black text-white'>Wintr</p>
            </div>
        </footer>
    );
}
