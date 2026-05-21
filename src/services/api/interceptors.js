export async function requestInterceptor (config) {
    // TODO: Adicionar implementação de tokens
    /*
    const token = await AsyncStorage.getItem('@App:token');
  
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    */
    return config;
};

export function requestErrorInterceptor (error) {
  return Promise.reject(error);
};

export function responseInterceptor (response) {
  return response;
};

export async function responseErrorInterceptor (error) {
    console.error("Erro na API:", error.response || error.message);
    return Promise.reject({
        message:
            error.response?.data?.message ||
            'Erro inesperado',

        status: error.response?.status,
    });
};