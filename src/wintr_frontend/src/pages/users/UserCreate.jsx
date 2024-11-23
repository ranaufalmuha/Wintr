import React, { useState, useEffect } from 'react';
import { useAuth } from './../../components/AuthContext';
import { useNavigate } from 'react-router-dom';

export const UserCreate = () => {
    const { authenticatedActor, principal, login, loading: authLoading } = useAuth();
    const navigate = useNavigate();
    const [usernameInput, setUsernameInput] = useState("");
    const [error, setError] = useState("");
    const [isCreating, setIsCreating] = useState(false);
    const [isValid, setIsValid] = useState(false);
    const [isChecking, setIsChecking] = useState(false);

    useEffect(() => {
        async function checkUsername() {
            try {
                const response = await authenticatedActor.hasExistingUsername();
                const username = response.length ? response[0] : null;
                if (username) {
                    navigate('/admin');
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
        if (!authenticatedActor && !authLoading) {
            login();
        }
    }, [authenticatedActor, authLoading, login]);

    const debounce = (func, wait) => {
        let timeout;
        return (...args) => {
            clearTimeout(timeout);
            timeout = setTimeout(() => func(...args), wait);
        };
    };

    const validateUsername = debounce(async (username) => {
        if (!username) {
            setIsValid(false);
            setError("");
            return;
        }

        if (!authenticatedActor) {
            setIsValid(false);
            setError("Please log in first");
            return;
        }

        try {
            setIsChecking(true);
            setError("");

            if (username.length < 3) {
                setIsValid(false);
                setError("Username must be at least 3 characters");
                return;
            }

            if (!/^[a-zA-Z0-9_]+$/.test(username)) {
                setIsValid(false);
                setError("Only letters, numbers, and underscores allowed");
                return;
            }

            const response = await authenticatedActor.getProfile(username);

            if ('ok' in response) {
                setIsValid(false);
                setError("Username already taken");
            } else if ('err' in response && 'NotFound' in response.err) {
                setIsValid(true);
                setError("");
            } else {
                setIsValid(false);
                setError("Error checking username");
            }
        } catch (err) {
            console.log('Username check error:', err);
            setIsValid(false);
            // Don't set error message for connection errors
            setError("");
        } finally {
            setIsChecking(false);
        }
    }, 500);

    const handleOnChange = (value) => {
        setUsernameInput(value);
        validateUsername(value);
    };

    const handleCreate = async () => {
        if (!isValid || !usernameInput || isCreating) return;

        try {
            setIsCreating(true);
            setError("");

            if (!authenticatedActor) {
                await login();
                return;
            }

            console.log('Creating profile:', usernameInput);
            const response = await authenticatedActor.createProfile(usernameInput);

            if ('ok' in response) {
                console.log('Profile created successfully');
                navigate(`/admin`);
            } else {
                const errorMessage = response.err?.message || "Failed to create profile";
                setError(errorMessage);
            }
        } catch (err) {
            console.error("Create error:", err);
            setError("Unable to create profile. Please try again.");
        } finally {
            setIsCreating(false);
        }
    };

    if (!authenticatedActor || authLoading) {
        return (
            <main className='flex flex-col min-h-dvh justify-center items-center'>
                <div className="animate-pulse">Loading...</div>
            </main>
        );
    }

    return (
        <main className='flex flex-col min-h-dvh justify-center items-center'>
            <div className="flex flex-col gap-3">
                <p className='text-disabled text-sm'>Create Username</p>
                <div className={`py-3 px-6 rounded-xl w-96 border ${error ? 'border-red-500' :
                    isValid ? 'border-green-500' :
                        'border-dark'
                    } flex items-center gap-2`}>
                    <p className='text-disabled'>@</p>
                    <input
                        type="text"
                        className='bg-transparent focus:outline-none w-full'
                        value={usernameInput}
                        onChange={(e) => handleOnChange(e.target.value)}
                        placeholder="username"
                        disabled={isCreating}
                        minLength={3}
                    />
                    {usernameInput && !isChecking && (
                        <span className='text-sm'>
                            {isValid && !error && '✓'}
                        </span>
                    )}
                    {isChecking && (
                        <span className='text-sm animate-pulse'>...</span>
                    )}
                </div>
                {error && <p className="text-red-500 text-sm">{error}</p>}
                <button
                    className={`bg-black text-white p-2 mt-3 rounded-xl transition-all ${(!isValid || isCreating || !authenticatedActor || isChecking) ?
                        'opacity-50 cursor-not-allowed' :
                        'hover:bg-gray-800'
                        }`}
                    onClick={handleCreate}
                    disabled={!isValid || isCreating || !authenticatedActor || isChecking}
                >
                    {isCreating ? 'Creating...' :
                        !authenticatedActor ? 'Please login first' :
                            isChecking ? 'Checking...' :
                                'Create'}
                </button>
            </div>

            {/* Debug info */}
            <div className="fixed bottom-4 right-4 text-xs bg-black/80 p-2 rounded text-white">
                <div>Actor: {authenticatedActor ? 'Yes' : 'No'}</div>
                <div>Principal: {principal?.slice(0, 8)}...</div>
                <div>Loading: {authLoading ? 'Yes' : 'No'}</div>
                <div>Valid: {isValid ? 'Yes' : 'No'}</div>
                <div>Checking: {isChecking ? 'Yes' : 'No'}</div>
                <div>Length: {usernameInput.length}</div>
            </div>
        </main>
    );
};