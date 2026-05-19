import axios from 'axios';
import { setupInterceptors } from './interceptors';

const api = axios.create({
    baseURL: 'https://ponto-gestor.onrender.com/api/',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json'
    },
});

setupInterceptors(api);

export default api;