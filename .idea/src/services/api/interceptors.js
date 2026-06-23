import { getToken, removeAuth } from '../storage/auth.storage';
import { parseHttpError } from '../../errors';

let logoutCallback = null;

export function setLogoutCallback(fn) {
  logoutCallback = fn;
}

export async function requestInterceptor(config) {
  const token = await getToken();

  if (token) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${token}`,
    };
  }

  return config;
}

export function requestErrorInterceptor(error) {
  return Promise.reject(error);
}

export function responseInterceptor(response) {
  return response;
}

export async function responseErrorInterceptor(error) {
  const status = error.response?.status;

  const parsedError = parseHttpError(error);

  console.error('Erro na API:', parsedError);

  if (status === 401) {
    await removeAuth();

    if (logoutCallback) {
      logoutCallback();
    }
  }

  return Promise.reject(parsedError);
}