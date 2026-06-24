import { createContext, useEffect, useState, useCallback } from 'react';

import {
  getToken,
  saveAuth,
  removeAuth,
} from '../services/storage/auth.storage';

import { setLogoutCallback } from '../services/api/interceptors';

function decodeJwt(token) {
  try {
    const base64Payload = token.split('.')[1];
    const decoded = JSON.parse(atob(base64Payload));
    return decoded;
  } catch {
    return null;
  }
}

export const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [signed, setSigned] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null); // { id, nome, email, permissao }

  useEffect(() => {
    async function loadAuth() {
      const token = await getToken();

      if (token) {
        const payload = decodeJwt(token);
        setUser(payload);
        setSigned(true);
      }

      setLoading(false);
    }

    loadAuth();
  }, []);

  const signIn = useCallback(async ({ token }) => {
    await saveAuth({ token });
    const payload = decodeJwt(token);
    setUser(payload);
    setSigned(true);
  }, []);

  const signOut = useCallback(async () => {
    await removeAuth();
    setUser(null);
    setSigned(false);
  }, []);

  const refreshUser = useCallback((updatedUser) => {
    setUser((prev) => ({ ...prev, ...updatedUser }));
  }, []);

  useEffect(() => {
    setLogoutCallback(() => {
      signOut();
    });
  }, [signOut]);

  return (
    <AuthContext.Provider
      value={{
        signed,
        loading,
        signIn,
        signOut,
        user,
        refreshUser,
        isAdmin: user?.permissao === 'ADMIN',
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}