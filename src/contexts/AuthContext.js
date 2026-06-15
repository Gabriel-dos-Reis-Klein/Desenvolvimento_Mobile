import { createContext, useEffect, useState, useCallback } from 'react';

import {
  getToken,
  saveAuth,
  removeAuth,
} from '../services/storage/auth.storage';

import { setLogoutCallback } from '../services/api/interceptors';

export const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [signed, setSigned] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadAuth() {
      const token = await getToken();

      setSigned(!!token);
      setLoading(false);
    }

    loadAuth();
  }, []);

  const signIn = useCallback(async ({ token }) => {
    await saveAuth({ token });
    setSigned(true);
  }, []);

  const signOut = useCallback(async () => {
    await removeAuth();
    setSigned(false);
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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}