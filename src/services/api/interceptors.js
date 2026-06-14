export async function requestInterceptor (config) {
    // TODO: Adicionar implementação de tokens
    /*
    const token = await AsyncStorage.getItem('@App:token');
    */
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJwb250by1nZXN0YW8iLCJzdWIiOiI0NTRhMDg5Yi0xM2M0LTQ5MWEtODI5MS1jY2I0NGQ4MDhiYTAifQ._7UIvHe8Xsn50NbvveUUh19vNvBti45fDAlZ1XKeSrk"
  
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
    console.error("Erro na API - Status:", error.response?.status);
    console.error("Erro na API - Dados:", error.response?.data);
    console.error("Erro na API - Completo:", error);
    
    return Promise.reject({
        message:
            error.response?.data?.message ||
            error.response?.data?.error ||
            error.response?.data?.detail ||
            JSON.stringify(error.response?.data) ||
            'Erro inesperado',

        status: error.response?.status,
        data: error.response?.data,
    });
};