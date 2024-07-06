// JURIDEX/client/src/contexts/AuthContext.js

import React, { createContext, useState, useEffect } from 'react';
import { login } from '../services/api';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [authData, setAuthData] = useState(null);

    useEffect(() => {
        const storedAuthData = localStorage.getItem('authData');
        if (storedAuthData) {
            setAuthData(JSON.parse(storedAuthData));
        }
    }, []);

    const loginHandler = async (credentials) => {
        const data = await login(credentials);
        setAuthData(data);
        localStorage.setItem('authData', JSON.stringify(data));
    };

    const logoutHandler = () => {
        setAuthData(null);
        localStorage.removeItem('authData');
    };

    return (
        <AuthContext.Provider value={{ authData, loginHandler, logoutHandler }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };
