import React, { useContext, useState, useEffect } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import { v4 as uuidv4 } from 'uuid';

const AuthContext = React.createContext({})


export const useAuth = () => {
    return useContext(AuthContext)
}

interface ProviderInterface {
    children?: React.ReactNode;
    [key: string]: any;
  }

export const AuthProvider: React.FC<ProviderInterface> = ({children}) => {
    const [auth, setAuth] = useLocalStorage('auth', null)
    
    return (
        <AuthContext.Provider value={{auth, setAuth}}>
            {children}
       </AuthContext.Provider>
    );
};
