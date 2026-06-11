import axios from 'axios';
import { 
  requestInterceptor, 
  requestErrorInterceptor, 
  responseInterceptor, 
  responseErrorInterceptor 
} from './interceptors';

// TODO: diminuir tempo de resposta da API
const api = axios.create({
  baseURL: 'https://ponto-gestor.onrender.com/',
  timeout: 120000,
});

api.interceptors.request.use(requestInterceptor, requestErrorInterceptor);
api.interceptors.response.use(responseInterceptor, responseErrorInterceptor);

export default api;