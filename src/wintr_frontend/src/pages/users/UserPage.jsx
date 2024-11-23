import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { wintr_backend } from 'declarations/wintr_backend';
import { LinkIcon, DotsIcon, LogoutIcon } from '../../components/icons/Icons';
import { InstagramIcon, GithubIcon, LinkedinIcon, ThreadsIcon, XIcon } from '../../components/icons/SocialMedia';
import { NotFound404 } from '../NotFound404';


export const UserPage = () => {
    const { username } = useParams();
    const [isProfileFound, setIsProfileFound] = useState(null);
    const [isSubscribe, setIsSubscribe] = useState(false);
    const [socialmedia, setSocialMedia] = useState([
        {
            id: 1,
            platform: "instagram",
            directUrl: "",
            iconUrl: [],
        },
        {
            id: 2,
            platform: "x",
            directUrl: "",
            iconUrl: [],
        },
        {
            id: 3,
            platform: "github",
            directUrl: "",
            iconUrl: [],
        },
        {
            id: 4,
            platform: "linkedin",
            directUrl: "",
            iconUrl: [],
        },
        {
            id: 4,
            platform: "threads",
            directUrl: "",
            iconUrl: [],
        },
    ]);
    const [components, setComponents] = useState([
        {
            id: 0,
            title: "My Website",
            components: [
                {
                    id: 0,
                    content: "Personal Website",
                    directUrl: "https://www.ranaufalmuha.tech/",
                    styling: {
                        backgroundColor: null,
                        textColor: null,
                    }
                },
                {
                    id: 1,
                    content: "Latest Blog Post",
                    directUrl: "https://www.ranaufalmuha.tech/",
                    styling: {
                        backgroundColor: null,
                        textColor: null,
                    }
                }
            ]
        },
        {
            id: 1,
            title: "Latest Projects",
            components: [
                {
                    id: 2,
                    content: "AI Project Demo",
                    directUrl: "https://example.com/ai-demo",
                    styling: {
                        backgroundColor: null,
                        textColor: null,
                    }
                },
                {
                    id: 3,
                    content: "Mobile App",
                    directUrl: "https://example.com/app",
                    styling: {
                        backgroundColor: null,
                        textColor: null,
                    }
                }
            ]
        },
        {
            id: 2,
            components: [
                {
                    id: 4,
                    content: "Subscribe to Newsletter",
                    directUrl: "https://example.com/newsletter",
                    styling: {
                        backgroundColor: null,
                        textColor: null,
                    }
                }
            ]
        }
    ]);
    const [profile, setProfile] = useState({
        coverUrl: null,
        profileUrl: "./images/temp/profile.gif",
        username: username,
        displayName: null,
        bio: null,
        socialLinks: [],
        components: [],
    });

    useEffect(() => {
        async function initialize() {
            try {
                const response = await wintr_backend.getProfile(username);
                if ("ok" in response) {
                    console.log('Profile response:', response.ok);
                    setIsProfileFound(true);

                    // Safely extract data with optional chaining and fallbacks
                    setProfile({
                        coverUrl: response.ok.coverUrl?.[0] || null,
                        profileUrl: response.ok.profileUrl?.[0] || "./images/temp/profile.gif",
                        username: username,
                        displayName: response.ok.displayName?.[0] || null,
                        bio: response.ok.bio?.[0] || null,
                        socialLinks: response.ok.socialLinks?.[0] || [],
                        components: response.ok.components?.[0] || [],
                    });
                } else {
                    console.log('Profile not found:', response.err);
                    setIsProfileFound(false);
                }
            } catch (error) {
                console.error('Error fetching profile:', error);
                setIsProfileFound(false);
            }
        }

        if (username) {
            initialize();
        }
    }, [username]);


    function SocialMediaComponent({ platform, directUrl, iconUrl = '' }) {
        const ICON_CLASS = `${isSubscribe ? "fill-accent" : "fill-white"} h-6 object-contain`;
        const iconData = {
            github: <GithubIcon className={ICON_CLASS} />,
            instagram: <InstagramIcon className={ICON_CLASS} />,
            linkedin: <LinkedinIcon className={ICON_CLASS} />,
            threads: <ThreadsIcon className={ICON_CLASS} />,
            x: <XIcon className={ICON_CLASS} />,
        };

        const currentIcon = iconUrl.length === 0 ? iconData[platform] : <img src={iconUrl} className='h-6 object-contain invert' alt={`${platform} icon`} />;

        return (
            <a href={directUrl} target="_blank" rel="noopener noreferrer" className='hover:scale-110 duration-300'>
                {currentIcon}
            </a>
        );
    }


    function GroupComponent({ title, components = [] }) {
        if (!components || components.length === 0) return null;

        return (
            <div className="flex flex-col gap-4">
                {title && (
                    <p className="font-medium text-white text-center">{title}</p>
                )}
                {components.map((item, i) => (
                    <LinkComponent
                        key={item.id || i}
                        content={item.content}
                        directUrl={item.directUrl}
                        styling={item.styling}
                    />
                ))}
            </div>
        );
    }

    function LinkComponent({ content, directUrl, styling }) {
        const styles = {
            backgroundColor: styling?.backgroundColor || 'transparent',
            color: styling?.textColor || 'accent',
            borderColor: styling?.borderColor || 'accent',
            borderRadius: styling?.borderRadius ? `${styling.borderRadius}px` : '1.5rem'
        };

        return (
            <a href={directUrl} target="_blank" className={`hover:scale-105 duration-300 px-6 py-5 bg-content w-full rounded-3xl shadow-lg flex gap-4 items-center justify-between ${isSubscribe ? "border-2 border-accent bg-transparent text-accent" : "text-white"}`}>
                <LinkIcon className="text-accent h-5 aspect-square object-contain" />
                <p className='text-center font-normal text-sm'>{content}</p>
                <div className="w-5 flex justify-end">
                    <DotsIcon className="text-accent w-4 aspect-square object-contain" />
                </div>
            </a>
        );
    }

    return (
        <div className={`min-h-screen bg-dark_background`}>
            <main className='flex flex-col items-center font-light pb-20'>
                <div className="bg-accent h-[220px] shadow-xl z-40 w-full max-w-[500px] rounded-b-3xl flex justify-center relative">
                    <img src="./images/soulAnimated.gif" className='h-full' alt="" />
                    <a href="/" className='hover:scale-110 duration-300 w-7 aspect-square absolute right-0 top-0 m-6 z-50'>
                        <img src="./assets/logo_light.svg" className='object-contain w-full h-full' alt="" />
                    </a>
                </div>
                <div className="flex flex-col w-full max-w-[500px] gap-7 px-6 ">
                    {/* content 1 ====================== */}
                    <section className={`rounded-b-3xl flex flex-col justify-center items-center ${isSubscribe ? 'pt-24' : 'py-12'} gap-6 shadow-md relative bg-content`}>
                        {/* Profile */}
                        {isSubscribe ? (
                            <div className="absolute w-full h-full z-0 top-0">
                                <img
                                    src={profile.profileUrl}
                                    className='object-cover w-full h-full'
                                    alt=""
                                    onError={(e) => {
                                        e.target.src = "./images/temp/profile.gif";
                                    }}
                                />
                                <div className="bg-gradient-to-t from-black from-5% w-full h-full z-10 absolute bottom-0"></div>
                            </div>
                        ) : (
                            <img
                                src={profile.profileUrl}
                                className='absolute bg-black object-cover top-12 z-10 w-32 aspect-square rounded-full'
                                alt=""
                                onError={(e) => {
                                    e.target.src = "./images/temp/profile.gif";
                                }}
                            />
                        )}


                        {/* Name  */}
                        <div className="text-center flex flex-col gap-3 z-10 mt-[160px] px-12">
                            <p className='text-xl text-center text-white font-medium'>{profile.displayName != "" ? profile.displayName : "@" + username}</p>
                            <p className='text-sm text-white/80'>{profile.bio}</p>
                            {/* Social Media  */}
                            {profile.socialLinks && profile.socialLinks.length > 0 && (
                                <div className="flex gap-5 items-end justify-center mt-3">
                                    {profile.socialLinks.map(function (item, i) {
                                        return <SocialMediaComponent key={i} platform={item.platform} directUrl={item.directUrl} iconUrl={item.iconUrl} />;
                                    })}
                                </div>
                            )}
                        </div>
                    </section>

                    {/* content 2 ====================== */}
                    {profile.components?.length > 0 && profile.components.map((group, i) => (
                        <GroupComponent
                            key={group.id || i}
                            title={group.title}
                            components={group.components}
                        />
                    ))}


                </div>
            </main>
        </div>
    )
}

