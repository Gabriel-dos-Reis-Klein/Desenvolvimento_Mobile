import { createContext, useEffect, useState, useCallback } from 'react';

import {
  getToken,
  saveAuth,
  removeAuth,
} from '../services/storage/auth.storage';

import { setLogoutCallback } from '../services/api/interceptors';
import { userService } from '../services';

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
  const [user, setUser] = useState(null);

  const fetchUserProfile = useCallback(async (token) => {
      try {
        const payload = decodeJwt(token);

        if (payload && payload.sub) {
          const fullUserData = await userService.getById(payload.sub);
          setUser(fullUserData);
          setSigned(true);
        }
      } catch (error) {
        console.error("Erro ao carregar dados do usuário:", error);
        await removeAuth();
        setUser(null);
        setSigned(false);
      }
    }, []);

  useEffect(() => {
    async function loadAuth() {
      const token = await getToken();

      if (token) {
        await fetchUserProfile(token);
      }

      setLoading(false);
    }

    loadAuth();
  }, [fetchUserProfile]);

  const signIn = useCallback(async ({ token }) => {
    await saveAuth({ token });
    await fetchUserProfile(token);
  }, [fetchUserProfile]);

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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}