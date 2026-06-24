import api from "./api";

export function setupInterceptors(api) {
    // TODO: Adicionar implementação de tokens
    api.interceptors.request.use(
        async (config) => {
            // const token = await AsyncStorage.getItem('@token');
            // if (token) config.headers.Authorization = `Bearer ${token}`;
            return config;
        },
        (error) => Promise.reject(error)
    );

    api.interceptors.response.use(
        (response) => response,
        (error) => {
            console.error("Erro na API:", error.response || error.message);
            return Promise.reject({
                message:
                    error.response?.data?.message ||
                    'Erro inesperado',

                status: error.response?.status,
            });
        }
    );
}