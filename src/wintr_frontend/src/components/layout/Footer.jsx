import { useState } from 'react';
import { GlobeIcon } from '../../components/icons/Icons';
import { InstagramIcon, GithubIcon, XIcon } from '../../components/icons/SocialMedia';
import { useTranslation } from 'react-i18next';

export const Footer = () => {
    const { t, i18n } = useTranslation();
    const ICON_STYLE = "h-8 object-contain ";

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
        localStorage.setItem('lang', lng);
    };
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
            url: "https://github.com/ranaufalmuha/Wintr",
        }
    ]

    );

    return (
        <footer className="flex flex-col bg-dark_background dark:bg-light_background text-dark_text dark:text-light_text">
            <div className="bg-light_background dark:bg-dark_background w-full h-12 rounded-b-3xl mb-12 -translate-y-2"></div>
            <div className="flex px-6 pt-12 justify-center">
                <div className="flex flex-col items-center gap-6 w-[600px]">
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-accent rounded-full animate-pulse"></div>
                        <p className='uppercase'>{t('footer.live_now')}</p>
                    </div>
                    <p className='text-5xl font-bold text-center'>{t('footer.connect_with_us')}</p>
                    <p className='w-3/4 text-center'>{t('footer.adjust_branding')}</p>
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


            <hr className='mx-6 mt-20 mb-3 border-dark_borderdisabled dark:border-light_borderdisabled' />
            {/* ================================================================ */}
            <div className="mx-6 mt-2 flex gap-4 justify-center flex-wrap">
                <button onClick={() => changeLanguage('ar')} className='hover:text-accent'>
                    العربية
                </button>
                <button onClick={() => changeLanguage('bn')} className='hover:text-accent'>
                    বাংলা
                </button>
                <button onClick={() => changeLanguage('en')} className='hover:text-accent'>
                    English
                </button>
                <button onClick={() => changeLanguage('es')} className='hover:text-accent'>
                    Español
                </button>
                <button onClick={() => changeLanguage('fr')} className='hover:text-accent'>
                    Français
                </button>
                <button onClick={() => changeLanguage('hi')} className='hover:text-accent'>
                    हिंदी
                </button>
                <button onClick={() => changeLanguage('id')} className='hover:text-accent'>
                    Bahasa Indonesia
                </button>
                <button onClick={() => changeLanguage('ja')} className='hover:text-accent'>
                    日本語
                </button>
                <button onClick={() => changeLanguage('jv')} className='hover:text-accent'>
                    Jawa
                </button>
                <button onClick={() => changeLanguage('min')} className='hover:text-accent'>
                    Minang
                </button>
                <button onClick={() => changeLanguage('pt')} className='hover:text-accent'>
                    Português
                </button>
                <button onClick={() => changeLanguage('ru')} className='hover:text-accent'>
                    Русский
                </button>
                <button onClick={() => changeLanguage('tr')} className='hover:text-accent'>
                    Türkçe
                </button>
            </div>
            {/* ================================================================ */}
            <hr className='mx-6 mb-20 mt-3 border-dark_borderdisabled dark:border-light_borderdisabled' />


            <div className="flex items-center gap-3 justify-center h-24 relative overflow-hidden pt-14 px-6">
                <img src="./assets/logo_white.svg" className='w-32 max-md:w-16 aspect-square dark:invert' alt='logo' />
                <p className='text-[11rem] max-md:text-[6rem] font-medium dark:text-light_text text-dark_text'>Wintr</p>
            </div>
        </footer>
    );
}
