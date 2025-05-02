import { createContext, useState, useContext, useEffect } from 'react';
import * as authServices from '../services/AuthServices';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(() => localStorage.getItem('jwtToken') || null);

    useEffect(() => {
        if (token) {
            localStorage.setItem('jwtToken', token);
        } else {
            localStorage.removeItem('jwtToken');
        }
    }, [token]);

    const getResponse = async (response) => {
        const data = await response;
        if (data?.token) {
            setToken(data.token);
        }
        return data;
    };

    // Prisijungimas
    const login = async (email, password) => {
        return getResponse(authServices.login(email, password));
    };

    // Atsijungimas
    const logout = () => {
        setToken(null);
    };


    // Naujo vartotojo kūrimas
    const createUser = async (userData) => {
        return getResponse(authServices.createUser(userData, token));
    };


    return (
        <AuthContext.Provider
            value={{
                token,
                setToken,
                login,
                logout,
                createUser,
                getResponse,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth turi būti naudojamas su AuthProvider');
    }
    return context;
};