// src/contexts/AuthContext.js
import React, { useContext, useState, useEffect, createContext } from 'react';
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '../firebase';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      const firebaseAuth = await auth;
      const unsubscribe = onAuthStateChanged(firebaseAuth, (user) => {
        setCurrentUser(user);
        setLoading(false);
      });

      return unsubscribe;
    };

    initializeAuth();
  }, []);

  const login = async (email, password) => {
    const firebaseAuth = await auth;
    return signInWithEmailAndPassword(firebaseAuth, email, password);
  };

  const register = async (email, password) => {
    const firebaseAuth = await auth;
    return createUserWithEmailAndPassword(firebaseAuth, email, password);
  };

  const logout = async () => {
    const firebaseAuth = await auth;
    return signOut(firebaseAuth);
  };

  return (
    <AuthContext.Provider value={{ currentUser, login,register, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
