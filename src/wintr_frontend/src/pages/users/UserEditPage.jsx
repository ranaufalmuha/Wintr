import React, { useEffect, useState, useRef } from 'react';
import { useAuth } from './../../components/AuthContext';
import { ConstIconData, platforms } from './../../components/Const';
import { Principal } from '@dfinity/principal';
import { UserPage } from './UserPage';
import { MobilePhoneIcon, DeleteIcon, AddIcon, ClipboardIcon } from '../../components/icons/Icons';
import { LoadingPage } from '../status/LoadingPage';

export const UserEditPage = () => {
    const { authenticatedActor, principal, login, loading: authLoading } = useAuth();
    const containerRef = useRef(null);
    const [isSubscribe, setIsSubscribe] = useState(false);
    const [loading, setLoading] = useState(true);
    const [socialLinks, setSocialLinks] = useState([]);
    const [components, setComponents] = useState([]);
    const [profile, setProfile] = useState({
        principalId: principal,
        username: null,
        // Optional fields initialized as null
        displayName: null,
        bio: null,
        profileUrl: null,
        // Complex fields initialized as empty arrays
        socialLinks: socialLinks,
        components: components,
        backgroundStyle: null
    });

    // modal 
    const [isOpenEmulator, setIsOpenEmulator] = useState(false);
    const [isOpenAddSocialMedia, setIsOpenAddSocialMedia] = useState(false);


    // Check authentication
    useEffect(() => {
        const checkAuth = async () => {
            if (!authenticatedActor && !authLoading) {
                console.log('No authenticated actor, redirecting to login');
                try {
                    await login();
                } catch (error) {
                    console.error('Login failed:', error);
                }
            }
        };

        checkAuth();
    }, [authenticatedActor, authLoading]);

    // Fetch profile data
    useEffect(() => {
        async function fetchProfile() {
            if (!authenticatedActor) return;

            try {
                setLoading(true);
                const checkUsername = await authenticatedActor.hasExistingUsername();

                if (checkUsername.length <= 0) {
                    setLoading(false);
                    return; // Exit if no username found
                }

                console.log('Fetching profile for:', checkUsername[0]);
                const response = await authenticatedActor.getProfile(checkUsername[0]);
                console.log('Profile response:', response);

                if ('ok' in response) {
                    const fetchedComponents = response.ok.components?.[0] || [];
                    const fetchedSocialLinks = response.ok.socialLinks?.[0] || [];
                    setComponents(fetchedComponents);
                    setSocialLinks(fetchedSocialLinks);

                    setProfile({
                        principalId: principal,
                        coverUrl: response.ok.coverUrl?.[0] || null,
                        profileUrl: response.ok.profileUrl?.[0] || null,
                        username: checkUsername[0], // This might be undefined/null
                        displayName: response.ok.displayName?.[0] || null,
                        bio: response.ok.bio?.[0] || null,
                        socialLinks: fetchedSocialLinks,
                        components: fetchedComponents,
                    });
                } else {
                    console.error('Profile fetch error:', response.err);
                }
            } catch (error) {
                console.error("Error fetching profile:", error);
            } finally {
                setLoading(false);
            }
        }

        if (authenticatedActor) {
            fetchProfile();
        }
    }, [authenticatedActor]);

    // Add Social Links
    const addSocialLinks = (platform, directUrl) => {
        const newId = profile.socialLinks.length;
        const newSocial = {
            id: newId,
            platform: platform,
            directUrl: directUrl,
            iconUrl: [],
        };

        setProfile(prev => ({
            ...prev,
            socialLinks: [...prev.socialLinks, newSocial]
        }));
    };

    // Add new group
    const addGroup = () => {
        const newId = profile.components.length;
        const newGroup = {
            id: newId,
            title: "",
            components: []
        };

        setProfile(prev => ({
            ...prev,
            components: [...prev.components, newGroup]
        }));
    };

    // Add component to group
    const addComponent = (groupId) => {
        setProfile(prev => ({
            ...prev,
            components: prev.components.map(group => {
                if (group.id === groupId) {
                    const newComponentId = group.components.length;
                    return {
                        ...group,
                        components: [...group.components, {
                            id: newComponentId,
                            content: "",
                            directUrl: "",
                            styling: null,
                            backgroundUrl: null,
                            prefixUrl: null,
                            componentSize: { normal: null }
                        }]
                    };
                }
                return group;
            })
        }));
    };

    // Add standalone component
    const addStandaloneComponent = () => {
        const newId = profile.components.length;
        const newGroup = {
            id: newId,
            components: [{
                id: 0,
                content: "",
                directUrl: "",
                styling: null,
                backgroundUrl: null,
                prefixUrl: null,
                componentSize: { normal: null }
            }]
        };

        setProfile(prev => ({
            ...prev,
            components: [...prev.components, newGroup]
        }));
    };

    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProfile(prev => ({
            ...prev,
            [name]: value.trim() === "" ? null : value
        }));
    };

    // Handle group changes
    const handleGroupChange = (groupId, field, value) => {
        // Update components state
        setComponents(prevComponents =>
            prevComponents.map(group =>
                group.id === groupId
                    ? { ...group, [field]: value }
                    : group
            )
        );

        // Update profile.components as well
        setProfile(prev => ({
            ...prev,
            components: prev.components.map(group =>
                group.id === groupId
                    ? { ...group, [field]: value }
                    : group
            )
        }));
    };

    // Handle component changes
    const handleComponentChange = (groupId, componentId, field, value) => {
        // Update components state
        setComponents(prevComponents =>
            prevComponents.map(group =>
                group.id === groupId
                    ? {
                        ...group,
                        components: group.components.map(comp =>
                            comp.id === componentId
                                ? { ...comp, [field]: value }
                                : comp
                        )
                    }
                    : group
            )
        );

        // Update profile.components as well
        setProfile(prev => ({
            ...prev,
            components: prev.components.map(group =>
                group.id === groupId
                    ? {
                        ...group,
                        components: group.components.map(comp =>
                            comp.id === componentId
                                ? { ...comp, [field]: value }
                                : comp
                        )
                    }
                    : group
            )
        }));
    };

    // Remove group
    const handleRemoveGroup = (groupId) => {
        setProfile(prev => ({
            ...prev,
            components: prev.components.filter(group => group.id !== groupId)
                .map((group, index) => ({ ...group, id: index }))
        }));
    };

    // Remove component
    const handleRemoveComponent = (groupId, componentId) => {
        setProfile(prev => ({
            ...prev,
            components: prev.components.map(group => {
                if (group.id === groupId) {
                    return {
                        ...group,
                        components: group.components.filter(comp => comp.id !== componentId)
                            .map((comp, index) => ({ ...comp, id: index }))
                    };
                }
                return group;
            })
        }));
    };

    // Submit form
    async function handleSubmit() {
        try {
            if (!profile.username) {
                alert("No username found!");
                return;
            }

            // Fixed component formatting with proper styling structure
            const componentsWithBigInt = profile.components.map(group => ({
                id: BigInt(group.id),
                title: group.title?.length > 0 ? (typeof group.title === 'string' ? [group.title] : [group.title[0]]) : [],
                components: group.components.map(comp => ({
                    id: BigInt(comp.id),
                    content: comp.content || "",
                    directUrl: comp.directUrl || "",
                    componentSize: comp.componentSize?.length > 0 ? [comp.componentSize[0]] : [],
                    backgroundUrl: comp.backgroundUrl?.length > 0 ? [comp.backgroundUrl[0]] : [],
                    prefixUrl: comp.prefixUrl?.length > 0 ? [comp.prefixUrl[0]] : [],
                    styling: comp.styling?.length > 0 ? [comp.styling] : [],
                }))
            }));

            const updateRecord = {
                principalId: Principal.fromText(profile.principalId),
                username: profile.username,
                displayName: profile.displayName ? [profile.displayName] : [],
                bio: profile.bio ? [profile.bio] : [],
                profileUrl: profile.profileUrl ? [profile.profileUrl] : [],
                coverUrl: profile.coverUrl ? [profile.coverUrl] : [],
                backgroundStyle: profile.backgroundStyle ? [profile.backgroundStyle] : [],
                socialLinks: profile.socialLinks?.length > 0 ? [profile.socialLinks] : [],
                components: componentsWithBigInt?.length > 0 ? [componentsWithBigInt] : []
            };

            // Debug log to check the structure
            console.log("Submitting update record:", JSON.stringify(updateRecord, (key, value) =>
                typeof value === 'bigint' ? value.toString() : value, 2)
            );

            const result = await authenticatedActor.updateProfile(profile.username, updateRecord);

            if ("ok" in result) {
                alert("Profile updated successfully!");
            } else {
                console.error("Update failed:", result.err);
                alert("Failed to update profile: " + Object.keys(result.err)[0]);
            }
        } catch (error) {
            console.error("Error updating profile:", error);
            alert("Error updating profile: " + error.message);
        }
    }

    function GroupComponent({ group }) {
        const [localTitle, setLocalTitle] = useState(group.title || '');

        useEffect(() => {
            setLocalTitle(group.title || '');
        }, [group.title]);

        const handleTitleBlur = () => {
            handleGroupChange(group.id, 'title', localTitle);
        };

        return (
            <div className='flex flex-col gap-5 p-5 bg-light_button/50 dark:bg-dark_button/50 rounded-3xl shadow-lg'>
                <div className='flex items-center justify-between'>
                    <input
                        type="text"
                        name="title"
                        placeholder='Group Title (optional)'
                        value={localTitle}
                        onChange={(e) => setLocalTitle(e.target.value)}
                        onBlur={handleTitleBlur}
                        className='p-3 border rounded-xl flex-1 text-sm bg-transparent border-light_input_border dark:border-dark_input_border'
                    />
                    <button
                        onClick={() => handleRemoveGroup(group.id)}
                        className='px-5 hover:scale-110 duration-300'
                    >
                        <DeleteIcon className='w-5 object-contain  fill-red-500' />
                    </button>
                </div>

                <div className='flex flex-col gap-5 pl-5'>
                    {group.components.map((component) => (
                        <LinkComponent
                            key={component.id}
                            groupId={group.id}
                            component={component}
                        />
                    ))}
                </div>

                <button
                    type="button"
                    onClick={() => addComponent(group.id)}
                    className='self-end px-4 py-2 text-sm text-blue-600 rounded-lg'
                >
                    + Add Link
                </button>
            </div>
        );
    }

    function LinkComponent({ groupId, component }) {
        const [localContent, setLocalContent] = useState(component.content || '');
        const [localUrl, setLocalUrl] = useState(component.directUrl || '');

        useEffect(() => {
            setLocalContent(component.content || '');
            setLocalUrl(component.directUrl || '');
        }, [component.content, component.directUrl]);

        const handleBlur = (field) => {
            const value = field === 'content' ? localContent : localUrl;
            handleComponentChange(groupId, component.id, field, value);
        };

        return (
            <div className="flex items-center gap-5 px-8 py-5 border bg-transparent border-light_input_border dark:border-dark_input_border rounded-3xl w-full">
                <div className="flex flex-col w-full gap-3 ">
                    <input
                        type="text"
                        name="content"
                        placeholder='Title'
                        value={localContent}
                        onChange={(e) => setLocalContent(e.target.value)}
                        onBlur={() => handleBlur('content')}
                        className='text-sm font-medium focus:outline-none bg-transparent'
                    />
                    <input
                        type="text"
                        name="directUrl"
                        placeholder='Url'
                        value={localUrl}
                        onChange={(e) => setLocalUrl(e.target.value)}
                        onBlur={() => handleBlur('directUrl')}
                        className='text-xs focus:outline-none bg-transparent '
                    />
                </div>
                <button
                    className='hover:scale-110 duration-300 pl-5'
                    onClick={() => handleRemoveComponent(groupId, component.id)}
                >
                    <DeleteIcon className='w-5 object-contain fill-red-500' />
                </button>
            </div>
        );
    }

    function SocialLinkComponent({ platform, directUrl, iconUrl = '', id }) {
        const iconData = ConstIconData(isSubscribe);
        const currentIcon = iconUrl.length === 0 ? iconData[platform] : <img src={iconUrl} className='h-6 object-contain invert' alt={`${platform} icon`} />;
        return (
            <div className="w-12 h-12 rounded-xl bg-light_input_background dark:bg-dark_input_background flex justify-center items-center shadow-lg relative overflow-hidden group duration-300">
                <button className="absolute bg-black/80 w-full h-full hidden duration-300 justify-center items-center group-hover:flex" onClick={() => handleRemoveSocialLink(id)}>
                    <DeleteIcon className='text-red-500' />
                </button>
                {currentIcon}
            </div>
        );
    }

    const handleRemoveSocialLink = (id) => {
        setProfile(prev => ({
            ...prev,
            socialLinks: prev.socialLinks.filter(link => link.id !== id)
                .map((link, index) => ({ ...link, id: index }))
        }));
    };

    const SocialLinkModal = () => {
        const [social, setSocial] = useState({
            platform: '',
            directUrl: '',
        });

        const handleInputChange = (e) => {
            const { name, value } = e.target;
            setSocial(prev => ({
                ...prev,
                [name]: value,
            }));
        };

        const handleAddSocialLinks = (e) => {
            e.stopPropagation();
            addSocialLinks(social.platform, social.directUrl);
            setSocial({ platform: '', directUrl: '' });
            setIsOpenAddSocialMedia(false);
        };

        const isDisabled = !social.platform || !social.directUrl;

        return (
            <button
                className={`absolute h-dvh w-full top-0 left-0 z-50 bg-black/30 flex justify-center items-center p-6 ${isOpenAddSocialMedia ? '' : 'hidden'}`}
                onClick={() => setIsOpenAddSocialMedia(false)}
            >
                <div className="bg-light_background text-light_text p-10 rounded-3xl flex flex-col gap-4 w-[500px]" onClick={(e) => e.stopPropagation()}>
                    <select
                        name="platform"
                        onChange={handleInputChange}
                        value={social.platform}
                        className='p-3 border rounded-lg bg-transparent border-light_input_border dark:border-dark_input_border w-full'
                    >
                        <option value="">Select a platform</option>
                        {platforms.map((platform, index) => (
                            <option key={index} value={platform}>
                                {platform.charAt(0).toUpperCase() + platform.slice(1).replace(/_/g, ' ')}
                            </option>
                        ))}
                    </select>
                    <input
                        type="text"
                        name="directUrl"
                        placeholder='Direct URL'
                        value={social.directUrl}
                        onChange={handleInputChange}
                        className='p-3 border rounded-lg bg-transparent border-light_input_border dark:border-dark_input_border'
                    />
                    <button
                        className={`bg-light_button p-3 rounded-full shadow-lg duration-300 ${isDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'}`}
                        onClick={handleAddSocialLinks}
                        disabled={isDisabled}
                    >
                        Add Social Media
                    </button>
                </div>
            </button>
        );
    };

    const handleImg = async (e) => {
        try {
            const file = e.target.files[0];
            if (!file) return;

            // Check file size - strict 1.5MB limit
            const maxFileSize = 1.5 * 1024 * 1024; // 1.5MB in bytes
            if (file.size > maxFileSize) {
                const currentSizeMB = (file.size / (1024 * 1024)).toFixed(2);
                // Clear input
                e.target.value = '';
                // Clear existing preview if any
                setProfile(prev => ({
                    ...prev,
                    profileUrl: ''
                }));
                return;
            }

            // If size is okay, proceed with conversion
            const reader = new FileReader();
            reader.onload = (event) => {
                const base64String = event.target.result;
                setProfile(prev => ({
                    ...prev,
                    profileUrl: base64String
                }));
            };

            reader.onerror = () => {
                // Clear input and preview
                e.target.value = '';
                setProfile(prev => ({
                    ...prev,
                    profileUrl: ''
                }));
            };

            reader.readAsDataURL(file);

        } catch (error) {
            console.error('Error:', error);
            // Clear input and preview
            e.target.value = '';
            setProfile(prev => ({
                ...prev,
                profileUrl: ''
            }));
        }
    };

    const copyToClipboard = async (text) => {
        try {
            await navigator.clipboard.writeText(text);
            console.log('Text copied to clipboard:', text);
        } catch (err) {
            console.error('Failed to copy text: ', err);
        }
    };


    if (authLoading || loading) {
        return (
            <LoadingPage />
        );
    }

    return (
        <main className='ml-16 max-md:ml-0 max-md:pt-24 flex justify-center bg-light_background text-light_text dark:bg-dark_background dark:text-dark_text w-full p-12 max-md:p-6 max-h-dvh overflow-hidden'>
            <div className="container flex flex-col gap-3 lg:pr-12 mr-[398px] overflow-auto no-scrollbar max-lg:mr-0">
                <div className='text-xl flex items-center'>
                    <p>
                        <label >Hi {profile.username}, Welcome to </label>
                        <label className='font-medium'>Wintr</label>
                    </p>
                    <img src="./assets/icons/subs_lifetime.gif" className='w-10' alt="" />
                </div>
                <hr className='border-light_borderdisabled' />
                <div className="flex flex-col w-full gap-3">
                    <div>
                        <p className="text-xl my-5">
                            Profile
                        </p>
                        {profile.profileUrl && (
                            <div className="mb-2">
                                <img
                                    src={profile.profileUrl}
                                    alt="Preview"
                                    className="max-w-xs rounded-md aspect-square object-cover"
                                />
                            </div>
                        )}
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImg}
                            className="w-full rounded-md border border-gray-300 p-3 focus:ring-2 focus:ring-black focus:border-transparent"
                            required
                        />

                    </div>
                    <input
                        type="text"
                        name="username"
                        placeholder='Username'
                        value={profile.username || ""}
                        disabled
                        onChange={handleInputChange}
                        className='p-3 border rounded-lg bg-light_bgdisabled border-light_input_border dark:bg-dark_bgdisabled dark:border-dark_borderdisabled'
                    />
                    <input
                        type="text"
                        name="displayName"
                        placeholder='Full Name'
                        value={profile.displayName || ""}
                        onChange={handleInputChange}
                        className='p-3 border rounded-lg bg-transparent border-light_input_border dark:border-dark_input_border'
                    />
                    <input
                        type="text"
                        name="bio"
                        placeholder='Bio'
                        value={profile.bio || ""}
                        onChange={handleInputChange}
                        className='p-3 border rounded-lg bg-transparent border-light_input_border dark:border-dark_input_border'
                    />

                </div>

                {/* SocialLinks  */}
                <div className="flex flex-wrap gap-7 mt-5 items-center">

                    {profile.socialLinks.map((social, i) => (
                        <SocialLinkComponent key={i} platform={social.platform} directUrl={social.directUrl} iconUrl={social.iconUrl} id={social.id} />
                    ))}

                    <button className="text-2xl hover:scale-105 duration-300 w-12 h-12 border-2 border-dashed border-light_textdisabled rounded-xl text-light_textdisabled flex items-center justify-center" onClick={() => setIsOpenAddSocialMedia(!isOpenAddSocialMedia)}>
                        <AddIcon size={17} />
                    </button>

                    {/* modal input social  */}
                    <SocialLinkModal />
                </div>

                {/* Links Submit */}
                <div className="flex justify-between items-center">
                    <p className='text-xl my-5'>Links</p>
                    <div className="flex gap-3">
                        <button
                            onClick={addGroup}
                            className="px-6 py-3 rounded-lg hover:scale-110 duration-300 bg-light_button dark:bg-dark_button"
                        >
                            + Add Group
                        </button>
                        <button
                            onClick={addStandaloneComponent}
                            className="px-6 py-3 rounded-lg hover:scale-110 duration-300 bg-light_button dark:bg-dark_button"
                        >
                            + Add Link
                        </button>
                    </div>
                </div>

                <div className="flex flex-col gap-7" ref={containerRef}>
                    {profile.components.map((group) => (
                        <GroupComponent key={group.id} group={group} />
                    ))}
                </div>

                {/* Button Submit */}
                <div className="flex justify-center mt-5">
                    <button
                        onClick={handleSubmit}
                        className='bg-light_button dark:bg-dark_button shadow-lg px-8 py-5 rounded-full hover:scale-110 duration-300'
                    >
                        Submit
                    </button>
                </div>
                <div className="mb-32"></div>
            </div>

            {/* preview  */}
            <section className={`z-30 ${isOpenEmulator ? '' : 'max-lg:hidden'}`}>
                <button className={`h-dvh w-full bg-black/40 absolute left-0 top-0 lg:hidden`} onClick={() => { setIsOpenEmulator(!isOpenEmulator) }}></button>
                <div className={`h-dvh fixed right-0 top-0 flex flex-col justify-center items-center bg-light_background dark:bg-dark_background max-lg:w-full max-lg:justify-start max-lg:top-40 max-lg:rounded-t-[3rem] `}>
                    <div className="h-12 max-lg:h-12 duration-300 "></div>
                    {/* phone */}
                    <div className="p-12 max-lg:p-0 border-l max-lg:border-0 border-light_borderdisabled dark:border-dark_button flex flex-col duration-300 gap-5">
                        <div className="flex justify-center gap-2">
                            <a href={`/${profile.username}`} className='font-medium' target="_blank">wintr.app/{profile.username}</a>
                            <button onClick={() => copyToClipboard(`https://wintr.app/${profile.username}`)}>
                                <ClipboardIcon size={18} />
                            </button>
                        </div>
                        <div className="w-[350px] h-[767px] max-lg:h-auto max-lg:aspect-[1/2] bg-red-400 rounded-[3rem] border-2 border-accent shadow-2xl shadow-accent/30 overflow-y-scroll no-scrollbar duration-300">
                            <UserPage initProfile={profile} isEditing={true} />
                        </div>
                    </div>
                    <div className="h-12 max-lg:h-0"></div>
                </div>

            </section>

            {/* gradient  */}
            <div className="bg-gradient-to-t dark:from-dark_background from-light_background dark:via-dark_background via-light_background h-28 w-full absolute right-0 bottom-10 max-lg:bottom-0 mr-[446px] max-lg:mr-0 ">
            </div>

            {/* open modal */}
            <button className="" onClick={() => { setIsOpenEmulator(!isOpenEmulator) }}>
                <div className='w-80 h-40 bg-dark_background rotate-[135deg] shadow-lg shadow-accent/30 fixed -bottom-20 -right-40'>
                </div>
                <MobilePhoneIcon className='fill-dark_text bottom-5 right-5 absolute' />
            </button>

        </main>
    );
};