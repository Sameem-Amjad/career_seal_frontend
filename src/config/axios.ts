import axios, { InternalAxiosRequestConfig } from 'axios';
import Cookies from 'js-cookie';


const axiosInterceptor = axios.create();

axiosInterceptor.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = Cookies.get('token');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInterceptor;