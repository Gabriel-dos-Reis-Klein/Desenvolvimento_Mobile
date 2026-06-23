import AsyncStorage from '@react-native-async-storage/async-storage';

const AUTH_STORAGE_KEY = '@app/auth';

const EXPIRATION_TIME = 6 * 60 * 60 * 1000; // 6 horas

export async function saveAuth({ token }) {
  const payload = {
    token,
    expiresAt: Date.now() + EXPIRATION_TIME,
  };

  await AsyncStorage.setItem(
    AUTH_STORAGE_KEY,
    JSON.stringify(payload)
  );
}

export async function getAuth() {
  const raw = await AsyncStorage.getItem(AUTH_STORAGE_KEY);

  if (!raw) return null;

  try {
    const auth = JSON.parse(raw);

    if (Date.now() > auth.expiresAt) {
      await removeAuth();
      return null;
    }

    return auth;
  } catch {
    return null;
  }
}

export async function getToken() {
  const auth = await getAuth();
  return auth?.token ?? null;
}

export async function removeAuth() {
  await AsyncStorage.removeItem(AUTH_STORAGE_KEY);
}