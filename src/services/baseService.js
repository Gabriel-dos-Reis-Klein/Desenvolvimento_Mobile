import axios from 'axios';

class BaseService{
    constructor(endpoint){
        this.endpoint = endpoint;

        this.api = axios.create({
            baseURL: 'https://ponto-gestor.onrender.com/api/',
            timeout: 10000,
            headers: {
                'Content-Type': 'application/json'
            },
        });

        // TODO: Adicionar implementação de tokens
        this.api.interceptors.request.use(
        (config) => {
            // const token = await AsyncStorage.getItem('@token');
            // if (token) config.headers.Authorization = `Bearer ${token}`;
            return config;
        },
        (error) => Promise.reject(error)
        );

        this.api.interceptors.response.use(
        (response) => response,
        (error) => {
            console.error("Erro na API:", error.response || error.message);
            return Promise.reject(error);
        }
        );
    }

    async getAll(config = {}){
        const response = await this.api.get(this.endpoint, config);
        return response.data;
    }

    async getById(id, config = {}){
        const response = await this.api.get(`${this.endpoint}/${id}`, config);
        return response.data;
    }

    async create(data, config = {}){
        const response = await this.api.post(this.endpoint, data, config);
        return response.data;
    }

    async update(data, config = {}){
        const response = await this.api.patch(this.endpoint, data, config);
        return response.data;
    }

    async delete(id, config = {}){
        const response = await this.api.delete(`${this.endpoint}/${id}`, config);
        return response.data;
    }
}

export default BaseService();