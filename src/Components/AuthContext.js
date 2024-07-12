import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('user')
        if (storedUser) {
            try {
                const parsedUser = JSON.parse(storedUser)
                setUser(parsedUser)
            } catch (error) {
                console.error('Error parsing user data:', error)
                localStorage.removeItem('user')
                setUser(null)
            }
        } else {
            setUser(null)
        }
    }, []);

    const handleLogin = (userData) => {
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
    };

    const handleLogout = () => {
        setUser(null);
        localStorage.removeItem('user')
    };

    return (
        <AuthContext.Provider value={{ user, handleLogin, handleLogout }}>
            { children }
        </AuthContext.Provider>
    );
}