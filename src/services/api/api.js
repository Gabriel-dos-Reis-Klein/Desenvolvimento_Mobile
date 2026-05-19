import axios from 'axios';
import { 
  requestInterceptor, 
  requestErrorInterceptor, 
  responseInterceptor, 
  responseErrorInterceptor 
} from './interceptors';

const api = axios.create({
  baseURL: 'https://ponto-gestor.onrender.com/api/',
  timeout: 60000,
});

api.interceptors.request.use(requestInterceptor, requestErrorInterceptor);
api.interceptors.response.use(responseInterceptor, responseErrorInterceptor);

export default api;