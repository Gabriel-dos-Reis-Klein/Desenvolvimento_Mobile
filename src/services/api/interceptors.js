export async function requestInterceptor (config) {
    // TODO: Adicionar implementação de tokens
    /*
    const token = await AsyncStorage.getItem('@App:token');
    */
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJwb250by1nZXN0YW8iLCJzdWIiOiJhMDQ5MWIxNS0xODZjLTRlNTAtYjVhZi1hM2RlMmVkZjEwNDIiLCJleHAiOjE3ODEyMjEyNTV9.4eiHkvRD7P2yfXPquH7gmqmHxWZdHG3HraU1gE7e4EQ"
  
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