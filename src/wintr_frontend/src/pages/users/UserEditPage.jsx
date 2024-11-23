import React, { useEffect, useState, useRef } from 'react';
import { useAuth } from './../../components/AuthContext';
import { Principal } from '@dfinity/principal';
import { DotsIcon, DeleteIcon } from '../../components/icons/Icons';

export const UserEditPage = () => {
    const { authenticatedActor, principal, login, loading: authLoading } = useAuth();
    const containerRef = useRef(null);
    const [loading, setLoading] = useState(true);
    const [components, setComponents] = useState([]);
    const [profile, setProfile] = useState({
        principalId: principal,
        username: null,
        // Optional fields initialized as null
        displayName: null,
        bio: null,
        profileUrl: null,
        // Complex fields initialized as empty arrays
        socialLinks: [],
        components: components,
        backgroundStyle: null
    });

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
                    setComponents(fetchedComponents);

                    setProfile({
                        principalId: principal,
                        coverUrl: response.ok.coverUrl?.[0] || null,
                        profileUrl: response.ok.profileUrl?.[0] || null,
                        username: checkUsername[0], // This might be undefined/null
                        displayName: response.ok.displayName?.[0] || null,
                        bio: response.ok.bio?.[0] || null,
                        socialLinks: response.ok.socialLinks?.[0] || [],
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
                title: group.title?.length > 0 ? [group.title[0]] : [],
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
            <div className='flex flex-col gap-3 p-4 bg-gray-50 rounded-xl'>
                <div className='flex items-center justify-between'>
                    <input
                        type="text"
                        name="title"
                        placeholder='Group Title (optional)'
                        value={localTitle}
                        onChange={(e) => setLocalTitle(e.target.value)}
                        onBlur={handleTitleBlur}
                        className='p-3 border rounded-lg flex-1'
                    />
                    <button
                        onClick={() => handleRemoveGroup(group.id)}
                        className='p-2 text-red-500 hover:bg-red-50 rounded-lg'
                    >
                        <DeleteIcon className='w-6 h-6' />
                    </button>
                </div>

                <div className='flex flex-col gap-3 pl-4'>
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
                    className='self-end px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-lg'
                >
                    + Add Link
                </button>
            </div>
        );
    }

    function LinkComponent({ groupId, component }) {
        // Local state for immediate updates
        const [localContent, setLocalContent] = useState(component.content || '');
        const [localUrl, setLocalUrl] = useState(component.directUrl || '');

        // Update local state when prop changes
        useEffect(() => {
            setLocalContent(component.content || '');
            setLocalUrl(component.directUrl || '');
        }, [component.content, component.directUrl]);

        // Handle the blur event to update parent state
        const handleBlur = (field) => {
            const value = field === 'content' ? localContent : localUrl;
            handleComponentChange(groupId, component.id, field, value);
        };

        return (
            <div className='flex items-center gap-3'>
                <DotsIcon className='w-8 object-contain pointer-events-none' />
                <div className="flex items-center gap-5 p-6 bg-white rounded-3xl shadow-lg w-full">
                    {/* <p>{component.id}</p> */}
                    <div className="flex flex-col w-full gap-3">
                        <input
                            type="text"
                            name="content"
                            placeholder='Title'
                            value={localContent}
                            onChange={(e) => setLocalContent(e.target.value)}
                            onBlur={() => handleBlur('content')}
                            className='p-3 font-medium'
                        />
                        <input
                            type="text"
                            name="directUrl"
                            placeholder='Url'
                            value={localUrl}
                            onChange={(e) => setLocalUrl(e.target.value)}
                            onBlur={() => handleBlur('directUrl')}
                            className='p-3 border rounded-lg'
                        />
                    </div>
                    <button
                        className='hover:scale-105 duration-300'
                        onClick={() => handleRemoveComponent(groupId, component.id)}
                    >
                        <DeleteIcon className='w-8 object-contain pointer-events-none fill-red-500' />
                    </button>
                </div>
            </div>
        );
    }

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


    if (authLoading || loading) {
        return (
            <main className='pt-16 px-6 flex justify-center items-center min-h-screen'>
                <div className="animate-pulse">Loading...</div>
            </main>
        );
    }

    return (
        <main className='pt-16 flex justify-center'>
            <div className="container flex flex-col gap-3 p-6">
                <p className='text-3xl font-medium'>Detail User</p>
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
                        className='p-3 border rounded-lg'
                    />
                    <input
                        type="text"
                        name="displayName"
                        placeholder='Full Name'
                        value={profile.displayName || ""}
                        onChange={handleInputChange}
                        className='p-3 border rounded-lg'
                    />
                    <input
                        type="text"
                        name="bio"
                        placeholder='Bio'
                        value={profile.bio || ""}
                        onChange={handleInputChange}
                        className='p-3 border rounded-lg'
                    />

                </div>

                <div className="flex justify-between items-center">
                    <p className='text-xl my-5'>Links</p>
                    <div className="flex gap-3">
                        <button
                            onClick={addGroup}
                            className="border border-dark px-4 py-2 rounded-lg hover:scale-110 duration-300"
                        >
                            + Add Group
                        </button>
                        <button
                            onClick={addStandaloneComponent}
                            className="border border-dark px-4 py-2 rounded-lg hover:scale-110 duration-300"
                        >
                            + Add Link
                        </button>
                    </div>
                </div>

                <div className="flex flex-col gap-3" ref={containerRef}>
                    {profile.components.map((group) => (
                        <GroupComponent key={group.id} group={group} />
                    ))}
                </div>


                <div className="flex justify-center mt-5">
                    <button
                        onClick={handleSubmit}
                        className='bg-dark px-7 py-3 rounded-3xl text-white hover:scale-110 duration-300'
                    >
                        Submit
                    </button>
                </div>
            </div>
        </main>
    );
};