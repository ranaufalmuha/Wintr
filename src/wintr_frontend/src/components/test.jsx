import { createContext, useContext, useState, useEffect } from 'react';
import { AuthClient } from '@dfinity/auth-client';
import { HttpAgent, Actor } from "@dfinity/agent";
import { canisterId, idlFactory } from "../../../declarations/wintr_backend/index.js";

const AuthContext = createContext();

// Helper to determine environment
const isDevelopment = process.env.DFX_NETWORK === 'local';

// Configuration for different environments
const CONFIG = {
    development: {
        host: "http://127.0.0.1:4943",
        identityProvider: `http://${process.env.CANISTER_ID_INTERNET_IDENTITY}.localhost:4943`
    },
    production: {
        host: "https://icp-api.io",
        identityProvider: 'https://identity.ic0.app/#authorize'
    }
};

export const AuthProvider = ({ children }) => {
    const [principal, setPrincipal] = useState(null);
    const [loading, setLoading] = useState(true);
    const [authenticatedActor, setAuthenticatedActor] = useState(null);

    // Get current environment configuration
    const currentConfig = isDevelopment ? CONFIG.development : CONFIG.production;

    const createAuthenticatedActor = async (identity) => {
        try {
            const agent = new HttpAgent({
                identity,
                host: currentConfig.host
            });

            // Only fetch root key in development
            if (isDevelopment) {
                await agent.fetchRootKey().catch(console.warn);
            }

            // Create new actor with authenticated identity
            const actor = Actor.createActor(idlFactory, {
                agent,
                canisterId: isDevelopment ? process.env.CANISTER_ID_WINTR_BACKEND : canisterId
            });

            return actor;
        } catch (error) {
            console.error("Error creating authenticated actor:", error);
            return null;
        }
    };

    const checkAuth = async () => {
        try {
            const authClient = await AuthClient.create({
                idleOptions: {
                    disableDefaultIdleCallback: true,
                    idleTimeout: 1000 * 60 * 30
                }
            });

            const isAuthenticated = await authClient.isAuthenticated();

            if (isAuthenticated) {
                const identity = authClient.getIdentity();
                const principalId = identity.getPrincipal().toText();
                setPrincipal(principalId);

                const actor = await createAuthenticatedActor(identity);
                if (actor) {
                    setAuthenticatedActor(actor);
                }
            } else {
                setPrincipal(null);
                setAuthenticatedActor(null);
            }
        } catch (error) {
            console.error("Auth check error:", error);
            setPrincipal(null);
            setAuthenticatedActor(null);
        } finally {
            setLoading(false);
        }
    };

    const login = async () => {
        try {
            const authClient = await AuthClient.create();

            const loginOptions = {
                identityProvider: currentConfig.identityProvider,
                windowOpenerFeatures: `
                    width=800,
                    height=600,
                    left=${(window.screen.width - 800) / 2},
                    top=${(window.screen.height - 600) / 2},
                    toolbar=0,
                    location=0,
                    menubar=0,
                    status=0
                `,
                onSuccess: async () => {
                    const identity = authClient.getIdentity();
                    const principalId = identity.getPrincipal().toText();
                    setPrincipal(principalId);

                    const actor = await createAuthenticatedActor(identity);
                    if (actor) {
                        setAuthenticatedActor(actor);
                    }
                },
                onError: (error) => {
                    console.error("Login failed:", error);
                    if (error.message?.includes('popup')) {
                        alert("Please allow popups for this site to login.");
                    }
                }
            };

            await authClient.login(loginOptions);
        } catch (error) {
            console.error("Login error:", error);
            if (error.message?.includes('popup')) {
                alert("Please allow popups for this site to login. Check your browser settings.");
            }
        }
    };

    const logout = async () => {
        try {
            const authClient = await AuthClient.create();
            await authClient.logout();
            setPrincipal(null);
            setAuthenticatedActor(null);
            window.location.href = '/';
        } catch (error) {
            console.error("Logout error:", error);
        }
    };

    useEffect(() => {
        checkAuth();
    }, []);

    // Debug output for development
    useEffect(() => {
        if (isDevelopment) {
            console.log('Current environment:', {
                isDevelopment,
                host: currentConfig.host,
                identityProvider: currentConfig.identityProvider,
                backendCanisterId: isDevelopment ? process.env.CANISTER_ID_WINTR_BACKEND : canisterId,
                principal: principal?.slice(0, 10) + '...'
            });
        }
    }, [principal]);

    const value = {
        principal,
        setPrincipal,
        loading,
        login,
        logout,
        checkAuth,
        authenticatedActor,
        isDevelopment // Expose environment info to consumers
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
            {isDevelopment && (
                <div style={{
                    position: 'fixed',
                    bottom: 10,
                    right: 10,
                    background: 'rgba(0,0,0,0.8)',
                    color: 'white',
                    padding: 10,
                    borderRadius: 5,
                    fontSize: 12,
                    zIndex: 9999
                }}>
                    <div>ENV: {isDevelopment ? 'Development' : 'Production'}</div>
                    <div>Principal: {principal?.slice(0, 10)}...</div>
                    <div>Has Actor: {authenticatedActor ? 'Yes' : 'No'}</div>
                </div>
            )}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};