import axios, { InternalAxiosRequestConfig } from 'axios';


const axiosInterceptorCoreSignal = axios.create();

const token = process.env.NEXT_PUBLIC_CORESIGNAL_TOKEN;

axiosInterceptorCoreSignal.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {

      config.headers.Authorization = `Bearer ${token}`;


    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInterceptorCoreSignal;