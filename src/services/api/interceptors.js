export async function requestInterceptor (config) {
    // TODO: Adicionar implementação de tokens
    /*
    const token = await AsyncStorage.getItem('@App:token');
    */
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJwb250by1nZXN0YW8iLCJzdWIiOiI2ZWJiODc1MS03ZmY4LTRlNzUtODc4Mi1hMzU5YjdkMmMyOTMifQ.qQkCKCJwATHUfRBxQgbZS1YCo1PC6xzoDjWOWYkc3LA"
  
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    
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